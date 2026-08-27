# Edge headers (Cloudflare)

`public/_headers` is Netlify / Cloudflare **Pages** syntax. This site is GitHub
Pages behind Cloudflare, and **GitHub Pages ignores `_headers` entirely** — so
every rule in that file is currently inert.

Verified on 2026-08-27 against the live site:

```
$ curl -sSI https://home-stories.12f.dk/ | grep -i cache-control
cache-control: max-age=600        # GitHub Pages default, not our 1-year rule
```

The same check found **no** `Strict-Transport-Security`, `Content-Security-Policy`,
`X-Content-Type-Options` or `Referrer-Policy` on any response.

Both need to be fixed in the Cloudflare dashboard — they cannot be committed to
this repo.

## 1. Cache Rules

Cloudflare dashboard → **Caching → Cache Rules**. Hashed assets and images are
immutable; HTML must stay short so a deploy is visible quickly.

| Rule | Match expression | Edge TTL | Browser TTL |
| --- | --- | --- | --- |
| Hashed build assets | `starts_with(http.request.uri.path, "/_astro/")` | 1 year | 1 year |
| Fonts | `starts_with(http.request.uri.path, "/fonts/")` | 1 year | 1 year |
| Images | `http.request.uri.path matches "\.(webp\|png\|jpg\|jpeg\|svg)$"` | 1 year | 1 year |
| Video | `starts_with(http.request.uri.path, "/videos/")` | 1 year | 1 year |
| AI text surfaces | `http.request.uri.path in {"/llms.txt" "/llms-full.txt" "/ai.txt"}` | 1 day | 1 day |
| HTML | `http.request.uri.path matches "(/\|\.html)$"` | 1 hour | 10 min |

Everything under `/_astro/`, `/fonts/` and the image directories is
content-hashed or version-stable, so `immutable` is safe there and only there.

## 2. Security headers

Cloudflare dashboard → **Rules → Transform Rules → Modify Response Header**,
matching all requests on this zone.

| Header | Value |
| --- | --- |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=()` |
| `Content-Security-Policy` | see below |

Content-Security-Policy, matching what the site actually loads (self-hosted
fonts and images, Umami analytics, App Store links, and Astro's inline theme
and JSON-LD scripts):

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://umami.robert-jensen.dk;
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
media-src 'self';
font-src 'self';
connect-src 'self' https://umami.robert-jensen.dk;
frame-ancestors 'none';
base-uri 'self';
form-action 'self'
```

`'unsafe-inline'` on `script-src` is required while the theme bootstrap in
`Layout.astro` and the JSON-LD blocks are emitted inline. Removing it means
moving to per-build nonces or hashes, which Astro's static output does not
generate today — so ship the policy above first and treat nonces as a
follow-up rather than a blocker.

**Roll out HSTS carefully.** Start with `max-age=300`, confirm nothing breaks on
the apex and any subdomain, then raise to a year before considering `preload`.
Preload submission is effectively irreversible.

## 3. Verifying

```bash
curl -sSI https://home-stories.12f.dk/ | grep -iE 'cache-control|strict-transport|content-security|x-content-type|referrer-policy'
curl -sSI https://home-stories.12f.dk/_astro/ -o /dev/null -w '%{http_code}\n'
```

Caching is right when HTML returns a short `max-age` and a hashed asset under
`/_astro/` returns `max-age=31536000, immutable`.
