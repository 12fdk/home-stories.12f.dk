#!/usr/bin/env bash
# Apply the edge headers and cache rules for home-stories.12f.dk.
#
# WHY THIS EXISTS
#   public/_headers is Netlify/Cloudflare-Pages syntax. This site is GitHub
#   Pages behind Cloudflare, and GitHub Pages ignores _headers entirely, so
#   none of it applies. The site also ships no security headers at all.
#   Both have to be set at the Cloudflare edge. This script does that via the
#   Rulesets API so the config is reviewable and repeatable instead of a
#   sequence of dashboard clicks nobody can diff.
#
# BLAST RADIUS
#   The zone is 12f.dk and it hosts other sites. EVERY rule here is scoped to
#   http.host == home-stories.12f.dk. Do not remove that filter.
#
# TOKEN
#   Create at https://dash.cloudflare.com/profile/api-tokens -> Create Custom Token
#     Permissions: Zone > Transform Rules > Edit
#                  Zone > Cache Rules     > Edit
#                  Zone > Zone            > Read
#     Zone Resources: Include > Specific zone > 12f.dk
#   Then:  export CF_API_TOKEN=...
#
# USAGE
#   ./scripts/cloudflare-headers.sh status        # what is live now
#   ./scripts/cloudflare-headers.sh headers       # stage 1: safe headers + HSTS 300s
#   ./scripts/cloudflare-headers.sh cache         # stage 2: cache rules
#   ./scripts/cloudflare-headers.sh csp-report    # stage 3: CSP in report-only
#   ./scripts/cloudflare-headers.sh csp-enforce   # stage 4: enforce CSP
#   ./scripts/cloudflare-headers.sh hsts-full     # stage 5: HSTS 1 year
#   ./scripts/cloudflare-headers.sh verify        # curl the live headers back
#
#   Run them in order and verify between each. Stages are idempotent: each one
#   rewrites the whole ruleset from the definitions below, so re-running is safe
#   and the file stays the single source of truth.

set -euo pipefail

ZONE_NAME="12f.dk"
HOST="home-stories.12f.dk"
API="https://api.cloudflare.com/client/v4"
FILTER="http.host eq \"${HOST}\""

: "${CF_API_TOKEN:?Set CF_API_TOKEN first — see the token block at the top of this file}"

api() {
  local method=$1 path=$2 body=${3:-}
  local args=(-sS -X "$method" -H "Authorization: Bearer ${CF_API_TOKEN}" -H "Content-Type: application/json")
  [ -n "$body" ] && args+=(--data "$body")
  curl "${args[@]}" "${API}${path}"
}

# Fail loudly on an API error rather than silently writing nothing.
check() {
  node -e '
    let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{
      let j; try { j=JSON.parse(s) } catch { console.error("Non-JSON response:\n"+s); process.exit(1) }
      if (!j.success) {
        console.error("Cloudflare API error:");
        (j.errors||[]).forEach(e=>console.error(`  [${e.code}] ${e.message}`));
        process.exit(1);
      }
      process.stdout.write(s);
    });'
}

zone_id() {
  api GET "/zones?name=${ZONE_NAME}" | check \
    | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const z=JSON.parse(s).result[0];if(!z){console.error("zone not found");process.exit(1)}process.stdout.write(z.id)});'
}

# ---------------------------------------------------------------- header sets

# Verified against the built site on 2026-08-27:
#   - the only external script is https://umami.robert-jensen.dk/script.js
#   - umami POSTs to https://umami.robert-jensen.dk/api/send  -> connect-src
#   - stylesheets, fonts, images and video are all self-hosted
#   - CSS contains a data:image/svg+xml background                -> img-src data:
#   - the theme bootstrap and the JSON-LD blocks are inline       -> 'unsafe-inline'
CSP="default-src 'self'; \
script-src 'self' 'unsafe-inline' https://umami.robert-jensen.dk; \
style-src 'self' 'unsafe-inline'; \
img-src 'self' data:; \
font-src 'self'; \
media-src 'self'; \
connect-src 'self' https://umami.robert-jensen.dk; \
object-src 'none'; \
frame-ancestors 'none'; \
base-uri 'self'; \
form-action 'self'; \
upgrade-insecure-requests"

# HSTS is set here as a Transform Rule rather than the zone-wide SSL/TLS toggle
# on purpose: the zone-wide setting would apply to every other 12f.dk site,
# and includeSubDomains on a zone you do not fully control is how you take
# a sibling subdomain offline.
# JSON is generated with node rather than hand-escaped into a heredoc. The
# Cloudflare filter expressions contain nested quotes and regex backslashes, and
# escaping those by hand through bash produced malformed payloads — caught by
# dry-running this script against a stubbed API.

json_headers() {
  local hsts=$1 csp_header=${2:-}
  HSTS="$hsts" CSP_HEADER="$csp_header" CSP_VALUE="$CSP" FILTER="$FILTER" node -e '
    const h = {
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
      "X-Frame-Options": "DENY",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Strict-Transport-Security": process.env.HSTS,
    };
    if (process.env.CSP_HEADER) h[process.env.CSP_HEADER] = process.env.CSP_VALUE.replace(/\s+/g, " ").trim();
    const headers = {};
    for (const [k, v] of Object.entries(h)) headers[k] = { operation: "set", value: v };
    process.stdout.write(JSON.stringify({
      rules: [{
        expression: process.env.FILTER,
        description: "home-stories security headers",
        action: "rewrite",
        action_parameters: { headers },
      }],
    }));'
}

json_cache() {
  FILTER="$FILTER" node -e '
    const f = process.env.FILTER;
    const ttl = (edge, browser) => ({
      cache: true,
      edge_ttl: { mode: "override_origin", default: edge },
      browser_ttl: { mode: "override", default: browser },
    });
    const YEAR = 31536000, DAY = 86400;

    // ORDER IS LOAD-BEARING. Cache Rules are stackable, not first-match-wins:
    // when several rules match one request, the LAST matching rule wins for a
    // given setting. So the broad HTML rule goes FIRST and the specific ones
    // after it, otherwise the catch-all would overwrite the one-year TTL on
    // hashed assets with the ten-minute HTML TTL.
    // https://developers.cloudflare.com/cache/how-to/cache-rules/order/
    const ASSETS = `starts_with(http.request.uri.path, "/_astro/") or starts_with(http.request.uri.path, "/fonts/") or starts_with(http.request.uri.path, "/videos/") or http.request.uri.path matches "\\.(webp|png|jpg|jpeg|svg|woff2|mp4)$"`;
    const TEXT = `http.request.uri.path in {"/llms.txt" "/llms-full.txt" "/ai.txt" "/robots.txt"}`;

    process.stdout.write(JSON.stringify({
      rules: [
        {
          // Belt and braces: the exclusions make the rules mutually exclusive,
          // so this stays correct even if someone reorders them later.
          expression: `${f} and not (${ASSETS}) and not (${TEXT})`,
          description: "home-stories HTML",
          action: "set_cache_settings",
          action_parameters: ttl(3600, 600),
        },
        {
          expression: `${f} and (${TEXT})`,
          description: "home-stories AI text surfaces",
          action: "set_cache_settings",
          action_parameters: ttl(DAY, DAY),
        },
        {
          expression: `${f} and (${ASSETS})`,
          description: "home-stories immutable assets",
          action: "set_cache_settings",
          action_parameters: ttl(YEAR, YEAR),
        },
      ],
    }));'
}

put_headers() {
  local zid; zid=$(zone_id)
  api PUT "/zones/${zid}/rulesets/phases/http_response_headers_transform/entrypoint" "$(json_headers "$1" "${2:-}")" | check >/dev/null
  echo "  applied: HSTS=\"$1\"${2:+, $2}"
}

put_cache() {
  local zid; zid=$(zone_id)
  api PUT "/zones/${zid}/rulesets/phases/http_request_cache_settings/entrypoint" "$(json_cache)" | check >/dev/null
  echo "  applied: 3 cache rules (immutable assets / AI text / HTML)"
}

# ---------------------------------------------------------------------- verify

verify() {
  echo "Live response headers for https://${HOST}/"
  curl -sSI "https://${HOST}/" | grep -iE \
    'strict-transport|content-security|x-content-type|referrer-policy|permissions-policy|x-frame|cross-origin-opener|cache-control|cf-cache-status' \
    | sed 's/^/  /' || echo "  (none of the target headers present yet)"
  echo
  echo "A hashed asset (should become max-age=31536000 after the cache stage):"
  local asset
  asset=$(curl -s "https://${HOST}/" | grep -oE '/_astro/[A-Za-z0-9._-]+\.(js|css)' | head -1)
  [ -n "$asset" ] && curl -sSI "https://${HOST}${asset}" | grep -iE 'cache-control|cf-cache-status' | sed 's/^/  /'
}

status() {
  local zid; zid=$(zone_id)
  echo "zone ${ZONE_NAME} = ${zid}"
  for phase in http_response_headers_transform http_request_cache_settings; do
    echo "--- ${phase}"
    api GET "/zones/${zid}/rulesets/phases/${phase}/entrypoint" \
      | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const j=JSON.parse(s);
        if(!j.success){console.log("    (no ruleset yet)");return}
        (j.result.rules||[]).forEach(r=>{console.log("    "+(r.description||r.id)+"  ["+(r.enabled?"on":"off")+"]");
          const h=r.action_parameters&&r.action_parameters.headers;
          if(h)Object.keys(h).forEach(k=>console.log("        "+k));});});'
  done
}

case "${1:-}" in
  status)      status ;;
  headers)     echo "Stage 1: baseline security headers + HSTS max-age=300"; put_headers "max-age=300" "" ;;
  cache)       echo "Stage 2: cache rules";                                   put_cache ;;
  csp-report)  echo "Stage 3: CSP in report-only (does not block anything)";   put_headers "max-age=300" "Content-Security-Policy-Report-Only" ;;
  csp-enforce) echo "Stage 4: enforcing CSP";                                  put_headers "max-age=300" "Content-Security-Policy" ;;
  hsts-full)   echo "Stage 5: HSTS 1 year";                                    put_headers "max-age=31536000; includeSubDomains" "Content-Security-Policy" ;;
  verify)      verify ;;
  *) sed -n '2,40p' "$0" | sed 's/^# \{0,1\}//'; exit 1 ;;
esac
