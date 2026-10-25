# Launch blockers

Only items that are genuinely outstanding. Items marked ⛔ show as `[[OWNER: …]]` on the
site and fail `npm run check:placeholders`, so a production build is refused until they
are filled. Items marked ⚠ do not show on the site but must be done before launch.

## Owner answers needed

- ⚠ **Full legal name** of the owner/operator and a **street or service address** (`site.operator.legalName`, `address`). Not shown publicly while missing, by owner instruction; a privacy lawyer should confirm whether the policy needs them.
- ⛔ **Inactive account retention**: is it a maximum of 12 months, or longer? Is anything purged automatically? (`retention.account`)
- ⛔ **Deletion timeframe** in days for verified requests (`legal.deletionTimeframe`).
- ⚠ **Refund rules** before taking any payment: free or paid trial and its length; 100% or 90% trial refund; fixed 80% or prorated early-cancellation refund; billing cycles, renewal, payment methods, refund timing. The Terms use interim wording ("terms on request, confirmed in writing before you pay") until then.
- ⚠ **Minimum age** for account owners and staff, if any.
- ⚠ **Create and test** contact@, support@ and privacy@getassist.pro.

## Technical facts to verify in the SaaS (agent can do this with access)

- ⛔ Where data is stored: VPS provider, datacenter region, backup location (`legal.storageLocation`).
- ⛔ Security measures actually in place (`legal.securityMeasures`).
- ⛔ Provider regions and transfer safeguards (`legal.transferSafeguards`).
- ⛔ Subprocessors: name, purpose, location (`src/config/subprocessors.ts`).
- ⛔ Payment provider, or confirm none (`legal.paymentProvider`).
- ⛔ Retention of messages, logs and backups (`retention.messages`, `logs`, `backups`).
- ⛔ What happens to stored conversations after disconnecting (`legal.afterDisconnect`).
- ⛔ What the Meta deauthorize and data-deletion callbacks do (`legal.metaDeletionCallback`).
- ⛔ Cookies set by app.getassist.pro (`legal.appCookies`).
- ⛔ Each Meta permission checked against the App Dashboard and screencast (`permissions.ts`, set `confirmed: true`).
- ⚠ Live SaaS API domain for OAuth and webhooks (not guessed from getassist.pro).
- ⚠ Which features are live, to update `features.ts` badges.

## Legal

- ⛔ Liability cap (`legal.liabilityCap`), after legal review.
- ⛔ Effective date and last-updated date: set on the day the reviewed final versions are published.
- ⚠ **Lawyer review** of Privacy, Terms, Data deletion, Cookies, Security, Subprocessors and AI transparency.

## Brand

- ⚠ Final icon (SVG or ≥ 2048 px), horizontal lockup, and a 16 px favicon. Required for the 1024×1024 Meta app icon. See [docs/BRAND_ASSETS_REPORT.md](docs/BRAND_ASSETS_REPORT.md).

## Deployment

- ⚠ Choose VPS Docker or Cloudflare Pages; VPS access or Cloudflare account access; DNS records. See `docs/RUNBOOK.md` and `docs/CLOUDFLARE_PAGES.md`.
