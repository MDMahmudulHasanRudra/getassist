# Cloudflare Pages runbook

Alternative to the VPS Docker deployment in [RUNBOOK.md](RUNBOOK.md). Use one or the
other for getassist.pro, not both at once. The SaaS (app.getassist.pro) is not affected
either way.

## 1. Create the project

Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git →
`MDMahmudulHasanRudra/getassist`.

| Setting                | Value                                           |
| ---------------------- | ----------------------------------------------- |
| Production branch      | `main`                                          |
| Framework preset       | None                                            |
| Build command          | `npm run build:pages`                           |
| Build output directory | `dist`                                          |
| Root directory         | (empty)                                         |
| Environment variable   | `NODE_VERSION` = `24` (also read from `.nvmrc`) |

`npm run build:pages` runs the build and `check:output`. On the production branch it also
runs `check:placeholders`, so **production builds fail while any `[[OWNER: …]]`
placeholder remains**. Preview branches (any other branch) allow placeholders, which gives
you a staging URL like `https://<branch>.<project>.pages.dev`.

Security and cache headers come from `public/_headers` (kept in sync with
`nginx/security-headers.conf`). Cloudflare Pages serves `404.html` for unknown paths and
serves `/features.html` at `/features`.

## 2. Custom domains

Project → Custom domains → add `getassist.pro`, then `www.getassist.pro`.

- If the zone is on Cloudflare, the DNS records are created for you. Leave the existing
  `app` record untouched.
- If DNS is elsewhere, add `CNAME www → <project>.pages.dev`. An apex CNAME needs a DNS host
  that supports CNAME flattening/ALIAS; otherwise move the zone to Cloudflare.

**www → apex redirect:** Rules → Redirect Rules → create rule: when hostname equals
`www.getassist.pro`, dynamic redirect to `concat("https://getassist.pro", http.request.uri.path)`,
status 301, preserve query string.

**HTTPS:** SSL/TLS → Edge Certificates → turn on "Always Use HTTPS". Add HSTS only after
both hostnames work over HTTPS, start with a short max-age, and do not enable
includeSubDomains or preload without the owner's approval (app.getassist.pro shares the
domain).

## 3. Verify

```bash
scripts/smoke.sh https://getassist.pro public
```

Also check by hand once:

- `/features/` and `/features.html` redirect to `/features` (Cloudflare's own trailing-slash
  and `.html` handling; if `/features/` does not redirect, add a rule in `public/_redirects`).
- `/this-page-does-not-exist` returns 404 with the site's 404 page.
- Response headers on `/privacy` include `Content-Security-Policy`.

## 4. Updating and rolling back

- Update: edit, commit and push to `main`; Cloudflare builds and deploys automatically.
- Roll back: project → Deployments → pick an earlier successful deployment → "Rollback to
  this deployment".
