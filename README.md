# getassist

Static marketing, integration, legal and trust website for **Get Assist**, hosted on
**Cloudflare Pages** with automatic deployments from GitHub `main`. Astro (static output) +
TypeScript strict + Tailwind CSS 4. No JavaScript is shipped to the browser, no cookies, no
analytics, no third-party requests, no server functions.

The "Open the app" link goes to the current SaaS at https://zoventio.udboy.com.

## Requirements

- Node 24 (see `.nvmrc`)

## Commands

```bash
npm ci                     # install
npm run dev                # dev server at http://localhost:4321
npm run build              # static build into dist/
npm run check              # astro check (types)
npm run lint               # eslint
npm run format:check       # prettier
npm run check:output       # banned words, external resources, inline scripts, broken links
npm run check:placeholders # fails while any [[OWNER: ...]] remains
npm run build:pages        # Cloudflare Pages build (placeholders allowed on preview branches only)
npm run verify             # check + lint + build + check:output
```

Deploy: push to `main` — see [CLOUDFLARE_DEPLOYMENT.md](CLOUDFLARE_DEPLOYMENT.md).

The `Dockerfile`, `docker-compose.yml`, `nginx/`, `scripts/deploy.sh` and
[docs/RUNBOOK.md](docs/RUNBOOK.md) are an unused VPS fallback kept for reference; the
website is not deployed to the VPS.

## Where things live

| Path                          | What                                                              |
| ----------------------------- | ----------------------------------------------------------------- |
| `src/config/site.ts`          | Every business fact: operator, emails, dates, retention, app URL  |
| `src/config/features.ts`      | Feature and channel status badges                                 |
| `src/config/permissions.ts`   | Meta permissions and plain-language reasons                       |
| `src/config/subprocessors.ts` | Service providers listed in the Privacy Policy                    |
| `src/pages/`                  | One file per URL                                                  |
| `src/assets/brand/`           | Logo icon and lockup (dev crops; see docs/BRAND_ASSETS_REPORT.md) |
| `public/`                     | favicon, OG image, robots.txt                                     |
| `nginx/`                      | Container nginx config and security headers                       |
| `scripts/`                    | Checks, deploy, rollback, smoke tests, brand asset prep           |

A missing owner fact is a `fact(null, 'what is needed')` in config. It renders as a
visible `[[OWNER: what is needed]]` placeholder and blocks production builds. See
[LAUNCH_BLOCKERS.md](LAUNCH_BLOCKERS.md). Owner decisions: [OWNER_DECISIONS_RESOLVED.md](OWNER_DECISIONS_RESOLVED.md); claim sources: [FACT_VERIFICATION_REPORT.md](FACT_VERIFICATION_REPORT.md); owner-only questions: [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).

Design decisions: [DESIGN.md](DESIGN.md). Meta Dashboard values:
[docs/meta-review-checklist.md](docs/meta-review-checklist.md).
