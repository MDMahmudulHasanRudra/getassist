# Runbook — getassist.pro (unused VPS fallback)

> **Not used.** The owner decided on 26 Oct 2026 to host the website on Cloudflare Pages
> ([CLOUDFLARE_DEPLOYMENT.md](../CLOUDFLARE_DEPLOYMENT.md)). Do not deploy the website to the
> VPS. This file is kept only as a reference.

The site is a static Astro build served by `nginx-unprivileged` in one container
(`getassist-web`), bound to `127.0.0.1:${WEB_PORT:-8081}` on the VPS. A reverse proxy
on the VPS terminates TLS and forwards `getassist.pro` to it. The SaaS
(app.getassist.pro) is separate and is never touched by these steps.

## 1. Inspect the VPS first (read-only)

Run and save the output before changing anything:

```bash
uname -a; cat /etc/os-release | head -3
df -h /; free -h
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}' | tee ~/docker-ps-before.txt
docker network ls
sudo ss -tlnp | grep -E ':(80|443|8081)\b'
systemctl is-active nginx caddy 2>/dev/null; docker ps --format '{{.Names}} {{.Image}}' | grep -Ei 'nginx|caddy|traefik|proxy'
ls /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null
sudo grep -RhoE 'server_name[^;]+' /etc/nginx/ 2>/dev/null | sort -u
ls /etc/letsencrypt/live/ 2>/dev/null; systemctl list-timers | grep -i certbot
sudo ufw status 2>/dev/null || sudo firewall-cmd --list-all 2>/dev/null
```

Pick a free loopback port for `WEB_PORT` (8081 unless taken).

## 2. Routing — choose one by what step 1 found

**A. Host nginx owns 80/443 (most likely).**

1. Back up: `sudo cp -a /etc/nginx /etc/nginx.bak.$(date +%Y%m%d%H%M%S)`
2. Copy `docs/host-nginx-getassist.pro.conf` to `/etc/nginx/sites-available/getassist.pro.conf`
   (or `conf.d/` if that is how the existing sites are set up), set the proxy port,
   and at first enable only the port-80 block.
3. `sudo nginx -t && sudo systemctl reload nginx` (reload, never restart).
4. Issue the certificate the same way the other sites do, e.g.
   `sudo certbot certonly --nginx -d getassist.pro -d www.getassist.pro`.
5. Enable the 443 blocks, `sudo nginx -t && sudo systemctl reload nginx`.
6. Do not edit or remove any other vhost.

**B. A proxy runs in Docker (Traefik, Caddy, nginx-proxy).** Remove the `ports:` line
in `docker-compose.yml`, add the proxy's network as an external network, and add the
host rule in that proxy's native way (labels for Traefik/nginx-proxy, a site block for
Caddy). Do not restart the proxy container unless that is how it reloads config.

**C. Nothing listens on 80/443.** Ask the owner before binding them. Then run a Caddy
container with automatic HTTPS on the same Docker network as `getassist-web`:

```
getassist.pro {
  reverse_proxy getassist-web:8080
}
www.getassist.pro {
  redir https://getassist.pro{uri} permanent
}
```

**HSTS:** only after HTTPS works for both hosts. Start with `max-age=300`, raise later.
No `includeSubDomains` or `preload` without the owner's approval.

## 3. DNS (owner action)

At the DNS provider for getassist.pro:

| Type  | Name  | Value                                                      | TTL |
| ----- | ----- | ---------------------------------------------------------- | --- |
| A     | `@`   | `<VPS IPv4>`                                               | 300 |
| CNAME | `www` | `getassist.pro`                                            | 300 |
| AAAA  | `@`   | `<VPS IPv6>` — only if the VPS and proxy really serve IPv6 | 300 |

Leave the existing `app` record alone. If the zone is on Cloudflare, set the records
to **DNS only** (grey cloud) for the cutover. Raise TTL to 3600 once stable.

Before changing DNS, test the VPS directly:

```bash
curl --resolve getassist.pro:443:<VPS_IP> -I https://getassist.pro
RESOLVE_IP=<VPS_IP> scripts/smoke.sh https://getassist.pro public
```

## 4. First deploy

```bash
git clone <repo-url> /opt/getassist-web && cd /opt/getassist-web
WEB_PORT=8081 scripts/deploy.sh                                   # production
DEPLOY_ENV=staging ALLOW_PLACEHOLDERS=1 WEB_PORT=8081 scripts/deploy.sh   # staging only
```

`deploy.sh` refuses a dirty working tree, builds `getassist-web:<git sha>` (the build
stage runs the site build, `check:output` and — for production — `check:placeholders`),
starts it, waits for the health check, runs `scripts/smoke.sh` against the container and
rolls back automatically if anything fails. Previous images are kept; the tags are
recorded in `.deploy/`. Set `PUBLIC_URL=https://getassist.pro` to also run the public
checks after deploying.

After the first deploy compare `docker ps` with `~/docker-ps-before.txt`: the only
difference should be the new `getassist-web` container.

## 5. Updating content

1. Edit `src/config/*.ts` (facts, statuses, permissions, subprocessors) or `src/pages/*`.
2. Locally: `npm run verify` and `npm run check:placeholders`.
3. Commit and push, then on the VPS: `git pull && scripts/deploy.sh`.

## 6. Rolling back

```bash
scripts/rollback.sh               # previous tag from .deploy/previous
scripts/rollback.sh <tag>         # any kept tag; run without a valid tag to list them
```

Clean up old images occasionally, keeping the last few:
`docker image ls getassist-web` then `docker image rm getassist-web:<old-tag>`.

## 7. Health and logs

```bash
docker inspect --format '{{.State.Health.Status}}' getassist-web
docker logs --tail 100 getassist-web
curl -s http://127.0.0.1:8081/healthz
```
