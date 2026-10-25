#!/usr/bin/env bash
# Smoke tests.
#   scripts/smoke.sh http://127.0.0.1:8081 local    container checks
#   scripts/smoke.sh https://getassist.pro public   adds TLS, www and HTTP->HTTPS checks
# Before DNS points at the VPS, test the public checks with:
#   RESOLVE_IP=<VPS_IP> scripts/smoke.sh https://getassist.pro public
set -uo pipefail

BASE="${1:?base URL}"
MODE="${2:-local}"
HOST="$(echo "$BASE" | sed -E 's#^https?://([^/:]+).*#\1#')"
CURL=(curl -s --max-time 10)
if [[ -n "${RESOLVE_IP:-}" ]]; then
  CURL+=(--resolve "$HOST:443:$RESOLVE_IP" --resolve "$HOST:80:$RESOLVE_IP"
    --resolve "www.$HOST:443:$RESOLVE_IP" --resolve "www.$HOST:80:$RESOLVE_IP")
fi
fail=0

check() { # description expected actual
  if [[ "$2" == "$3" ]]; then echo "ok   $1"; else echo "FAIL $1 (expected $2, got $3)"; fail=1; fi
}
code() { "${CURL[@]}" -o /dev/null -w '%{http_code}' "$1"; }
location() { "${CURL[@]}" -o /dev/null -w '%{redirect_url}' "$1"; }

for path in / /features /integrations/facebook /integrations/instagram /contact /privacy /terms /data-deletion /robots.txt /sitemap-index.xml; do
  check "GET $path" 200 "$(code "$BASE$path")"
done
check "GET /healthz" 200 "$(code "$BASE/healthz")"
check "404 page" 404 "$(code "$BASE/this-page-does-not-exist")"
check "/features/ -> /features" "301" "$(code "$BASE/features/")"

headers="$("${CURL[@]}" -I "$BASE/privacy" | tr -d '\r' | tr 'A-Z' 'a-z')"
for h in "content-security-policy:" "x-content-type-options: nosniff" "x-frame-options: deny" "referrer-policy:" "permissions-policy:"; do
  if grep -q "^$h" <<<"$headers"; then echo "ok   header $h"; else echo "FAIL header $h missing"; fail=1; fi
done

if "${CURL[@]}" "$BASE/" | grep -Eq '(src|href)="http://'; then
  echo "FAIL mixed content: http:// resource on /"; fail=1
else
  echo "ok   no http:// resources on /"
fi

if [[ "$MODE" == "public" ]]; then
  check "http -> https (301)" 301 "$(code "http://$HOST/")"
  check "http redirect target" "https://$HOST/" "$(location "http://$HOST/")"
  check "www -> apex (301)" 301 "$(code "https://www.$HOST/")"
  check "www redirect target" "https://$HOST/" "$(location "https://www.$HOST/")"
  if "${CURL[@]}" -o /dev/null "https://$HOST/"; then
    echo "ok   TLS certificate verifies"
  else
    echo "FAIL TLS certificate does not verify"; fail=1
  fi
fi

exit $fail
