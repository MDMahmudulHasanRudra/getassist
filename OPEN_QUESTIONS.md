# Open questions for the owner

Every item here shows on the site as a yellow `[[OWNER: …]]` placeholder until it is
filled in. A production deploy is blocked while any placeholder remains
(`npm run check:placeholders`). Fill values in `src/config/*.ts` unless noted.

## Blocking for launch

### Company and contact — `src/config/site.ts`

- [ ] Legal operator name, registered address, country (`operator`)
- [ ] Privacy email, support email, general contact email (`emails`)

### Legal facts — `src/config/site.ts`

- [ ] Effective date and last-updated date of the legal documents (`legal.effectiveDate`, `legal.lastUpdated`)
- [ ] Governing law and jurisdiction (`legal.governingLaw`)
- [ ] Data storage location: country/region and provider (`legal.storageLocation`)
- [ ] Deletion timeframe in days (`legal.deletionTimeframe`)
- [ ] AI provider and its data policy, including whether customer messages are used to train models (`legal.aiProviderPolicy`)
- [ ] Pricing, renewal, cancellation and refund terms (`legal.pricingAndRefunds`)
- [ ] Eligibility: minimum age, business use only, etc. (`legal.eligibility`)
- [ ] Complaints process and any dispute-resolution body (`legal.complaints`)
- [ ] Retention periods for messages, account data, logs and backups (`retention`)
- [ ] Commitments you can truthfully make: no selling of data, encryption in transit, encryption at rest (`commitments`, booleans; each adds a sentence to the Privacy Policy)

### Facts written inline on legal pages (replace the `fact(null, …)` call in the page)

- [ ] Payment provider, or "no payments are taken yet" — `src/pages/privacy.astro` §3
- [ ] Security measures actually in place — `src/pages/privacy.astro` §9
- [ ] International transfer safeguards (e.g. standard contractual clauses) — `src/pages/privacy.astro` §9
- [ ] Cookies the app at app.getassist.pro sets, and why — `src/pages/privacy.astro` §13
- [ ] Liability cap, if any — `src/pages/terms.astro` §13
- [ ] What happens to stored conversations after a Page/account is disconnected — `src/pages/data-deletion.astro`
- [ ] Whether the SaaS handles Meta's data deletion callback, and what it deletes — `src/pages/data-deletion.astro`

### Subprocessors — `src/config/subprocessors.ts`

- [ ] Name, purpose and location of each: VPS host, AI provider, email, payments, monitoring

### Meta permissions — `src/config/permissions.ts`

- [ ] Which login flow the app uses: Facebook Login, or Instagram Login (which uses `instagram_business_*` permissions instead of `instagram_basic` / `instagram_manage_messages`)
- [ ] Check every candidate permission against the Meta App Dashboard and the review screencast. Set `confirmed: true` on the ones requested, delete the rest, and fix the plain-language reasons if they differ from what the screencast shows. Then remove the placeholder by setting `loginFlow` to a value.

### Product truth

- [ ] Feature status (`src/config/features.ts`): every feature is "Coming soon". Change each to `available` or `beta` only when it is live in the deployed product.
- [ ] Channel status: both are "Pending Meta approval". Change to `available` only after Meta approves the app.
- [ ] Check that the copy matches the product: the "How it works" steps on Home (in particular "AI drafts or sends answers" — can the user choose between drafting and auto-sending?), the connect/disconnect steps on the integration pages ("channel settings of your project"), and the FAQ answers.
- [ ] Is Telegram live? (`telegramLive` in site.ts; currently not mentioned anywhere.)

## Brand assets

- [ ] **Do not use the tagline lockup** (`logo with tag line.png`): it reads "Get Asisist", and its tagline "Simplified Customer Management with AI" was not approved. It is not in this repository and must not be used anywhere (website, Meta app, Open Graph image).
- [ ] Final icon as SVG, or at least a 2048 px PNG on a plain or transparent background. The current icon is cropped from a ~520 px PNG and is not good enough for the 1024×1024 Meta app icon.
- [ ] Final horizontal lockup (icon + "Get Assist") as SVG or 2048 px PNG.
- [ ] A simplified favicon version that still reads at 16 px. `public/favicon.svg` is a temporary stand-in drawn for development (blue-violet circle with a white chat bubble); replace it with the designer's version.
- [ ] Original brand colours from the design file. The palette in `DESIGN.md` and `src/styles/global.css` was sampled from the PNG and is approximate.
- [ ] Consider having a designer finalise the logo in vector and running a trademark search. AI-generated marks can have weak copyright/trademark protection and may resemble existing marks. (This is not legal advice.)
- [ ] Real product screenshots, if you want them on the site. None are used now; the hero conversation is a labelled illustration.

When final files arrive: put them in `../logo/` (or anywhere) and rerun
`python scripts/brand/prepare-assets.py <folder>`, or replace `src/assets/brand/icon.png`,
`src/assets/brand/lockup.png`, `public/favicon.*`, `public/apple-touch-icon.png`,
`public/icon-192.png`, `public/icon-512.png` and `public/og-image.png` directly.

## Before launch

- [ ] **Have a lawyer review the Privacy Policy, Terms of Service and Data deletion page.** They were drafted from the brief, not by a lawyer, and must reflect how the product and company actually work.
- [ ] VPS access for deployment (see `docs/RUNBOOK.md`). Not available during the build, so no VPS inspection or deployment was done.
- [ ] DNS records (see `docs/RUNBOOK.md` → DNS).
