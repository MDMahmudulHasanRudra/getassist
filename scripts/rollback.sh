#!/usr/bin/env bash
# Restore a previously built image: scripts/rollback.sh <tag>
# With no argument, uses the tag recorded in .deploy/previous.
set -euo pipefail

cd "$(dirname "$0")/.."
TAG="${1:-$(cat .deploy/previous 2>/dev/null || true)}"
export WEB_PORT="${WEB_PORT:-8081}"

if [[ -z "$TAG" ]]; then
  echo "Usage: scripts/rollback.sh <tag>   (available tags below)" >&2
  docker image ls getassist-web --format '  {{.Tag}}\t{{.CreatedSince}}' >&2
  exit 1
fi

if ! docker image inspect "getassist-web:$TAG" >/dev/null 2>&1; then
  echo "Image getassist-web:$TAG not found. Available:" >&2
  docker image ls getassist-web --format '  {{.Tag}}\t{{.CreatedSince}}' >&2
  exit 1
fi

echo "==> Rolling back to getassist-web:$TAG"
TAG="$TAG" docker compose up -d --no-build

for _ in $(seq 1 30); do
  if [[ "$(docker inspect --format '{{.State.Health.Status}}' getassist-web)" == "healthy" ]]; then
    mkdir -p .deploy
    echo "$TAG" >.deploy/current
    echo "$(date -u +%FT%TZ) rollback $TAG" >>.deploy/history.log
    echo "==> getassist-web:$TAG is healthy."
    exit 0
  fi
  sleep 2
done
echo "!! getassist-web:$TAG did not become healthy." >&2
exit 1
