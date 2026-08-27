# Edge headers and caching (Cloudflare)

`public/_headers` is Netlify / Cloudflare **Pages** syntax. This site is GitHub
Pages behind Cloudflare, and **GitHub Pages ignores `_headers` entirely** — so
every rule in that file is inert. The security headers and the real caching
policy both have to be set at the Cloudflare edge.

Run `./scripts/cloudflare-headers.sh` to apply them. The rest of this document
explains what it does and why, and gives the dashboard equivalent.

## What's wrong today

Verified against the live site on 2026-08-27:

```
$ curl -sSI https://home-stories.12f.dk/ | grep -i cache-control
cache-control: max-age=600        # GitHub Pages default, not our 1-year rule

$ curl -sSI https://home-stories.12f.dk/ | grep -icE 'strict-transport|content-security|x-content-type|referrer-policy'
0
```

Cloudflare **is** proxying the domain (`cf-ray` present, Cloudflare IPs), so
Transform Rules and Cache Rules will apply. `cf-cache-status: DYNAMIC` confirms
Cloudflare currently caches no HTML at all.

## Blast radius — read before running anything

The Cloudflare zone is **`12f.dk`**, and it hosts other sites. Every rule the
script writes is scoped with:

```
http.host eq "home-stories.12f.dk"
```

Do not remove that filter, and do not use the zone-wide **SSL/TLS → Edge
Certificates → HSTS** toggle for this. That setting applies to the whole zone,
and `includeSubDomains` on a zone with siblings you are not currently testing is
how you take an unrelated subdomain offline for six months. The script sets HSTS
as a host-scoped Transform Rule instead.

## The API token

The script needs a token; the wrangler OAuth login on this machine has only
`zone (read)` and cannot write rulesets.

Create at **https://dash.cloudflare.com/profile/api-tokens → Create Custom Token**:

| Setting | Value |
| --- | --- |
| Permissions | `Zone` → `Transform Rules` → **Edit** |
| | `Zone` → `Cache Rules` → **Edit** |
| | `Zone` → `Zone` → **Read** |
| Zone Resources | Include → Specific zone → **12f.dk** |

Then `export CF_API_TOKEN=...` in the shell you run the script from. Don't commit
it; it is not needed after the rules are in place.

## Rollout — one stage at a time

Verify between every stage. The stages are idempotent: each rewrites the whole
ruleset from the definitions in the script, so re-running one is safe.

```bash
./scripts/cloudflare-headers.sh status        # what's live now
./scripts/cloudflare-headers.sh headers       # 1. safe headers + HSTS max-age=300
./scripts/cloudflare-headers.sh verify
./scripts/cloudflare-headers.sh cache         # 2. cache rules
./scripts/cloudflare-headers.sh verify
./scripts/cloudflare-headers.sh csp-report    # 3. CSP report-only — blocks nothing
#    ...browse the site, check DevTools console for CSP violation reports...
./scripts/cloudflare-headers.sh csp-enforce   # 4. enforce CSP
./scripts/cloudflare-headers.sh hsts-full     # 5. HSTS 1 year — only after days of 1-4 holding
```

**Stage 1** is risk-free: `X-Content-Type-Options`, `Referrer-Policy`,
`Permissions-Policy`, `X-Frame-Options`, `Cross-Origin-Opener-Policy`, and HSTS
at a deliberately tiny `max-age=300` so a mistake expires in five minutes rather
than a year.

**Stage 3 before 4 is the important one.** `Content-Security-Policy-Report-Only`
ships the exact policy stage 4 will enforce, but only reports violations instead
of blocking. Load the homepage, a blog post, `/about/` and a localized page, and
watch the console. Anything that would break shows up there first.

**Stage 5 last, and not the same day.** Raising HSTS to a year is effectively
irreversible for anyone who has already received the header — their browser will
refuse plain HTTP to this host until it expires. Let stages 1–4 sit for a few
days first. `preload` is deliberately *not* set: submitting to the preload list
is a one-way door that is painful to undo, and it is not worth it here.

## The Content-Security-Policy

Derived from what the built site actually loads, not from a template:

- the only external script is `https://umami.robert-jensen.dk/script.js`
- Umami POSTs to `https://umami.robert-jensen.dk/api/send` → needs `connect-src`
- stylesheets, fonts, images and video are all self-hosted
- the compiled CSS contains a `data:image/svg+xml` background → `img-src data:`
- the theme bootstrap and the JSON-LD blocks are inline → `'unsafe-inline'`

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://umami.robert-jensen.dk;
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
font-src 'self';
media-src 'self';
connect-src 'self' https://umami.robert-jensen.dk;
object-src 'none';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
upgrade-insecure-requests
```

`'unsafe-inline'` on `script-src` is required while `Layout.astro` emits the
theme bootstrap and the JSON-LD inline. It weakens the policy meaningfully — it
is the difference between a CSP that stops XSS and one that mostly stops mixed
content and framing. Removing it needs per-build nonces or hashes, which Astro's
static output does not generate today. Ship this version first; treat nonces as
a follow-up, not a blocker.

## Cache rules

| Order | Rule | Matches | Edge TTL | Browser TTL |
| --- | --- | --- | --- | --- |
| 1 | HTML | everything on this host **except** the two below | 1 hour | 10 min |
| 2 | AI text surfaces | `/llms.txt`, `/llms-full.txt`, `/ai.txt`, `/robots.txt` | 1 day | 1 day |
| 3 | Immutable assets | `/_astro/`, `/fonts/`, `/videos/`, and `.webp .png .jpg .jpeg .svg .woff2 .mp4` | 1 year | 1 year |

**The order matters.** Cache Rules are *stackable*, not first-match-wins: when
several rules match one request, the **last** matching rule wins for a given
setting ([docs](https://developers.cloudflare.com/cache/how-to/cache-rules/order/)).
So the broad HTML rule goes first and the specific ones after it. Listed the
other way round, the catch-all would overwrite the one-year TTL on hashed assets
with the ten-minute HTML TTL — which is exactly the bug this file previously
described.

The rules are also written to be mutually exclusive (rule 1 carries `not (...)`
for the other two), so they stay correct even if someone reorders them later.
Belt and braces.

Everything in rule 3 is content-hashed by Astro or version-stable, so a year is
safe there and only there. HTML stays short so a deploy is visible quickly — the
current `max-age=600` from GitHub Pages is roughly right for HTML; it was only
ever wrong for assets.

## Dashboard equivalent

If you'd rather click than run the script:

- **Rules → Transform Rules → Modify Response Header** — one rule, custom filter
  expression `http.host eq "home-stories.12f.dk"`, then *Set static* for each
  header in the CSP section above.
- **Caching → Cache Rules** — three rules matching the table above.

The script is preferable mainly because the config ends up in git where it can
be diffed and re-applied, rather than living only in a dashboard.

## Verifying

```bash
./scripts/cloudflare-headers.sh verify
```

Or by hand:

```bash
curl -sSI https://home-stories.12f.dk/ | grep -iE 'strict-transport|content-security|x-content-type|referrer-policy|permissions-policy|x-frame|cache-control'
curl -sSI https://home-stories.12f.dk/_astro/<hashed-asset>.js | grep -i cache-control
```

It's right when HTML returns a short `max-age` and a hashed asset under
`/_astro/` returns `max-age=31536000`.
