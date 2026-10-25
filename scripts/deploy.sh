#!/usr/bin/env bash
# Build and deploy getassist.pro on the VPS. Run from the repository root.
#
#   scripts/deploy.sh                      production deploy (no placeholders allowed)
#   DEPLOY_ENV=staging ALLOW_PLACEHOLDERS=1 scripts/deploy.sh
#
# Env: WEB_PORT (default 8081), PUBLIC_URL (optional, e.g. https://getassist.pro
# to also run the public smoke tests after deploying).
set -euo pipefail

cd "$(dirname "$0")/.."
DEPLOY_ENV="${DEPLOY_ENV:-production}"
ALLOW_PLACEHOLDERS="${ALLOW_PLACEHOLDERS:-0}"
export WEB_PORT="${WEB_PORT:-8081}"
STATE_DIR=".deploy"
mkdir -p "$STATE_DIR"

if [[ "$DEPLOY_ENV" == "production" && "$ALLOW_PLACEHOLDERS" == "1" ]]; then
  echo "Refusing: ALLOW_PLACEHOLDERS=1 is only allowed with DEPLOY_ENV=staging." >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Refusing: working tree has uncommitted changes. Commit them first." >&2
  exit 1
fi

SHA="$(git rev-parse --short=12 HEAD)"
export TAG="$SHA"
export ALLOW_PLACEHOLDERS

PREVIOUS=""
if docker inspect getassist-web >/dev/null 2>&1; then
  PREVIOUS="$(docker inspect --format '{{.Config.Image}}' getassist-web | sed 's/^getassist-web://')"
fi

echo "==> Building getassist-web:$TAG ($DEPLOY_ENV)"
# The build stage runs the site build, check-output and (unless allowed) check-placeholders.
docker compose build

echo "==> Starting getassist-web:$TAG on 127.0.0.1:$WEB_PORT"
docker compose up -d --no-build

wait_healthy() {
  for _ in $(seq 1 30); do
    status="$(docker inspect --format '{{.State.Health.Status}}' getassist-web 2>/dev/null || true)"
    [[ "$status" == "healthy" ]] && return 0
    sleep 2
  done
  return 1
}

if ! wait_healthy || ! scripts/smoke.sh "http://127.0.0.1:$WEB_PORT" local; then
  echo "!! New container failed health or smoke tests." >&2
  if [[ -n "$PREVIOUS" ]]; then
    echo "!! Rolling back to $PREVIOUS" >&2
    scripts/rollback.sh "$PREVIOUS"
  fi
  exit 1
fi

[[ -n "$PREVIOUS" && "$PREVIOUS" != "$TAG" ]] && echo "$PREVIOUS" >"$STATE_DIR/previous"
echo "$TAG" >"$STATE_DIR/current"
echo "$(date -u +%FT%TZ) $DEPLOY_ENV $TAG (previous: ${PREVIOUS:-none})" >>"$STATE_DIR/history.log"

if [[ -n "${PUBLIC_URL:-}" ]]; then
  scripts/smoke.sh "$PUBLIC_URL" public
fi

echo "==> Deployed getassist-web:$TAG. Previous image kept: ${PREVIOUS:-none}"
echo "    Roll back with: scripts/rollback.sh ${PREVIOUS:-<tag>}"
