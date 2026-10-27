# Launch blockers

Only items that are genuinely outstanding. As of 27 Oct 2026 **no `[[OWNER: …]]`
placeholders remain**: `npm run check:placeholders` passes and the Cloudflare production
build succeeds. The items below do not show on the site but must be done before or soon
after launch.

## Before launch

- ⚠ **Create and test** contact@, support@ and privacy@getassist.pro. Every legal page tells
  people to write to them.
- ⚠ **Create the Cloudflare Pages project**, custom domains and www redirect (owner action).
  See `CLOUDFLARE_DEPLOYMENT.md`.
- ⚠ **Lawyer review** of Privacy, Terms, Data deletion, Cookies, Security, Subprocessors and
  AI transparency. If the text changes, update `legal.lastUpdated`.

## Before Meta App Review

- ⚠ **Meta data deletion callback is not built.** The data deletion page says so honestly and
  tells people to email instead. Meta accepts a Data Deletion Instructions URL
  (`https://getassist.pro/data-deletion`), but building the callback in the SaaS is
  recommended; when it exists, update `legal.metaDeletionCallback`.
- ⚠ **Final 1024 × 1024 app icon** from a vector or ≥ 2048 px master. See
  [docs/BRAND_ASSETS_REPORT.md](docs/BRAND_ASSETS_REPORT.md).
- ⚠ Integration pages' connect/disconnect steps checked against the real app UI and the
  screencast.

## Before taking payments

- ⚠ **Refund rules**: free or paid trial and its length; 100% or 90% trial refund; fixed 80%
  or prorated early-cancellation refund; billing cycles, renewal, payment methods, refund
  timing. The Terms use interim wording ("terms on request, confirmed in writing before you
  pay") until then.

## Open but not blocking

- ⚠ Minimum age for account owners and staff, if any (`legal.eligibility`).
- ⚠ Feature badges: all "Coming soon" until each feature is confirmed live (`features.ts`).
- ⚠ Telegram: hidden until confirmed available to users (`site.telegramLive`).
- ⚠ Owner-confirmed claims not yet verified in the app code (security measures, workspace
  isolation, retention, disconnect behaviour). See
  [FACT_VERIFICATION_REPORT.md](FACT_VERIFICATION_REPORT.md).
- ⚠ Log and backup retention (90 / 30 days) are now public commitments: make sure the
  server actually deletes them on that schedule.
