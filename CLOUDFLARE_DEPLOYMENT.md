# Cloudflare Pages deployment — getassist.pro

Final hosting decision (owner, 26 Oct 2026): the public website runs on **Cloudflare Pages**
with automatic deployments from GitHub. It is **not** deployed to the VPS.

| What                 | Where                                                                                |
| -------------------- | ------------------------------------------------------------------------------------ |
| Public website       | `https://getassist.pro` — Cloudflare Pages                                           |
| `www.getassist.pro`  | 301 redirect to `https://getassist.pro`                                              |
| SaaS app (unchanged) | `https://zoventio.udboy.com` — "Open the app" links here                             |
| Future SaaS domain   | `app.getassist.pro` — migration postponed; nothing here touches it                   |
| GitHub repository    | `https://github.com/MDMahmudulHasanRudra/getassist` (website only)                   |
| DNS                  | `getassist.pro` zone is already on Cloudflare (`amalia` / `viddy.ns.cloudflare.com`) |

Nothing in this guide changes the SaaS, its Docker containers, PostgreSQL, Meta OAuth,
WhatsApp, Telegram, `NEXTAUTH_URL` or any API callback URL.

## 1. What gets built

| Item               | Value                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| Framework          | Astro 7, `output: 'static'`, no adapter, no SSR, no API routes                                                  |
| Server functions   | None (no `functions/` folder, no `_worker.js`)                                                                  |
| Database / secrets | None. No environment secrets are needed.                                                                        |
| Node.js            | 24 (`.nvmrc`, `package.json` engines `>=24`; Astro needs ≥ 22.23.4)                                             |
| Install            | `npm ci` (Cloudflare runs it automatically from `package-lock.json`)                                            |
| Build command      | `npm run build:pages`                                                                                           |
| Output directory   | `dist`                                                                                                          |
| Headers            | `public/_headers` → security headers on every page, 1-year cache on `/_astro/*`                                 |
| Clean URLs         | Cloudflare serves `/privacy.html` at `/privacy` and 308-redirects `/privacy/` and `/privacy.html` to `/privacy` |
| 404                | `dist/404.html` is served with status 404                                                                       |

`npm run build:pages` builds the site and runs `check:output` (banned words, external
resources, inline scripts, broken links). On the **production branch (`main`) it also runs
`check:placeholders`**, so a production build fails while any `[[OWNER: …]]` placeholder is
left. Preview branches skip that one check so you can review drafts.

> **Important:** 17 owner facts are still placeholders (see `LAUNCH_BLOCKERS.md`). Until they
> are filled, every build of `main` fails on purpose and **getassist.pro will not go live**.
> Use a preview branch (step 5) to review the site in the meantime.

## 2. Create the Pages project

Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** tab →
**Import an existing Git repository** (Connect to Git).

1. Connect GitHub and allow the Cloudflare Pages app access to
   `MDMahmudulHasanRudra/getassist` only.
2. Select the repository → **Begin setup**.
3. Project name: `getassist` (the preview address becomes `getassist.pages.dev`).
4. Production branch: `main`.
5. Build settings:
   - Framework preset: **None** (or Astro, then overwrite the command below)
   - Build command: `npm run build:pages`
   - Build output directory: `dist`
   - Root directory: leave empty
6. Environment variables (add for both Production and Preview):
   - `NODE_VERSION` = `24`
7. **Save and Deploy.**

The first production deploy will **fail at `check:placeholders`** until the owner facts are
filled. That is expected and does not affect anything else.

## 3. Automatic and preview deployments

Project → **Settings** → **Builds** (Builds & deployments) → **Branch control**:

- Production branch: `main`; **Automatic deployments: enabled**.
- Preview branches: **All non-production branches**.

Every push to `main` deploys production; every push to another branch gets its own preview
URL: `https://<branch>.getassist.pages.dev`. Preview deployments are public URLs but are
not indexed for the custom domain (canonical URLs point to getassist.pro).

## 4. Custom domains and DNS

Add these only **after a production deployment has succeeded** (Cloudflare will not serve a
custom domain without one).

Project → **Custom domains** → **Set up a custom domain**:

1. Add `getassist.pro` → Continue → **Activate domain**. Because the zone is on Cloudflare,
   this creates the DNS record for you.
2. Add `www.getassist.pro` the same way.

Resulting DNS records (Cloudflare → `getassist.pro` → DNS → Records):

| Type  | Name                  | Content               | Proxy            |
| ----- | --------------------- | --------------------- | ---------------- |
| CNAME | `getassist.pro` (`@`) | `getassist.pages.dev` | Proxied (orange) |
| CNAME | `www`                 | `getassist.pages.dev` | Proxied (orange) |

Do **not** add an A record for `@` pointing at the VPS. Leave any existing records (mail,
verification TXT, etc.) alone. Do not create `app` yet.

**www → apex redirect:** `getassist.pro` zone → **Rules** → **Redirect Rules** → Create rule
(or use the "Redirect from WWW to root" template):

- When incoming requests match: Hostname equals `www.getassist.pro`
- Then: Dynamic redirect, expression
  `concat("https://getassist.pro", http.request.uri.path)`, status **301**, preserve query string.

**HTTPS:** `getassist.pro` zone → **SSL/TLS** → **Edge Certificates** → turn on
**Always Use HTTPS**. Certificates are issued automatically. Add HSTS only after both
hostnames work over HTTPS; start with a short max-age and do **not** enable
includeSubDomains or preload without the owner's approval (that would also affect the future
`app.getassist.pro`).

**Email (separate task):** `contact@`, `support@` and `privacy@getassist.pro` must exist
before launch. If they are not hosted elsewhere, Cloudflare **Email Routing** (zone → Email)
can forward them to an existing inbox; it adds its own MX/TXT records.

## 5. Reviewing before launch (preview branch)

```bash
git switch -c staging
git push -u origin staging
```

Cloudflare builds `https://staging.getassist.pages.dev` with placeholders visible. Check it:

```bash
scripts/smoke.sh https://staging.getassist.pages.dev preview
```

## 6. Going live

1. Fill every owner fact (`LAUNCH_BLOCKERS.md`); locally `npm run check:placeholders` passes.
2. Have the legal pages reviewed; set the effective and last-updated dates.
3. Commit and push to `main`. The production build passes and deploys.
4. Add the custom domains (step 4).
5. Verify:

   ```bash
   scripts/smoke.sh https://getassist.pro public
   ```

   This checks all 12 pages, `robots.txt`, `sitemap-index.xml`, the 404 page, security
   headers, mixed content, HTTP → HTTPS, www → apex and the certificate.

6. Paste the URLs from `docs/meta-review-checklist.md` into the Meta App Dashboard.

## 7. Rollback

- **Instant:** project → **Deployments** → find the last good production deployment →
  **⋯** → **Rollback to this deployment**. Takes effect in seconds; no rebuild.
- **In git:** `git revert <commit>` and push to `main`; Cloudflare deploys the revert.
- **Pause deploys:** Settings → Builds → Branch control → turn off automatic production
  deployments while investigating.
- **Take the site offline:** remove the custom domains from the Pages project. This does not
  touch the SaaS on zoventio.udboy.com.

## 8. Updating content

Edit `src/config/*.ts` or `src/pages/*`, run `npm run verify` and `npm run check:placeholders`
locally, then push to `main` (or to a branch first for a preview).

## 9. Final deployment checklist

- [ ] Pages project created from `MDMahmudulHasanRudra/getassist`, production branch `main`
- [ ] Build command `npm run build:pages`, output `dist`, `NODE_VERSION=24` (Production and Preview)
- [ ] Automatic production deployments on; preview deployments for all other branches
- [ ] Preview branch reviewed (`scripts/smoke.sh <preview-url> preview` passes)
- [ ] All `[[OWNER: …]]` facts filled; `npm run check:placeholders` passes; production build green
- [ ] Legal pages reviewed by a lawyer; effective and last-updated dates set
- [ ] contact@, support@, privacy@getassist.pro receive mail
- [ ] Custom domains `getassist.pro` and `www.getassist.pro` active
- [ ] Redirect Rule www → apex (301); Always Use HTTPS on
- [ ] `scripts/smoke.sh https://getassist.pro public` passes
- [ ] "Open the app" goes to https://zoventio.udboy.com
- [ ] Final 1024 × 1024 app icon ready; Meta Dashboard URLs pasted (`docs/meta-review-checklist.md`)

## Earlier VPS test (removed)

On 26 Oct 2026, before the hosting decision, a staging copy of the website ran on the VPS as
container `getassist-web` (`127.0.0.1:8081`, never public; Caddy was never changed). With the
owner's approval it was removed the same day: container, its network, image
`getassist-web:3df3d350290d`, `~/getassist-web`, `~/getassist.pro.caddy` and the
`docker-ps` snapshot files. The SaaS containers and the Caddyfile were verified unchanged.

The `Dockerfile`, `docker-compose.yml`, `nginx/` and `scripts/deploy.sh` stay in the
repository as an unused fallback; Cloudflare ignores them.
