# Fact verification report

What each public claim rests on. **No SaaS code, database, server or Meta Dashboard was
available during this work**, so every claim about the app below is `OWNER_CONFIRMED`
at best. The handoff asks for code and production verification before launch; that audit
is still to do (see the last section).

## Verified on this website (CODE_VERIFIED in this repo, tested locally)

| Claim                                                                      | Evidence                                                                                                        |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Website sets no cookies                                                    | `document.cookie` empty on every page in the browser; no `Set-Cookie` from nginx                                |
| No analytics or third-party scripts, fonts or images                       | `scripts/check-output.mjs` scans `dist/`; browser resource list shows only same-origin files                    |
| Strict CSP, no framing                                                     | `nginx/security-headers.conf`, `public/_headers`; `curl -I` shows the headers; no CSP violations in the console |
| No forms, no sign-in on the website                                        | No `<form>` in `src/`                                                                                           |
| WhatsApp, "Get Assisted", "GetAssist", "Gate/Gat Assist", "Asisist" absent | `check-output.mjs` banned-term scan of `dist/`                                                                  |

## Owner-confirmed, not verified in the app

| Claim on the site                                             | Pages                                         | Needed to verify                                                  |
| ------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------- |
| Each workspace chooses its own AI provider and model          | privacy §6, AI transparency, terms            | Read AI settings and provider code paths                          |
| We do not sell customer data                                  | home, privacy                                 | Owner's business practice (accepted as owner-confirmed)           |
| Facebook Login is used; Instagram via the linked Page         | integration pages                             | OAuth code and Meta Dashboard use case                            |
| Disconnect stops new messages straight away                   | integration pages, privacy §11, data deletion | Disconnect handler and webhook unsubscribe                        |
| Removing the app in Facebook settings revokes access          | integration pages, security                   | Standard Meta behaviour; check the app handles token invalidation |
| Workspace owners can request deletion; staff carry it out     | data deletion                                 | Deletion procedure, request log, confirmation email               |
| Connect/disconnect steps ("channel settings of your project") | integration pages                             | Match against the real app UI and the screencast                  |
| Handover keeps earlier messages visible; teammates have roles | home, features, AI transparency               | Product UI                                                        |

## Not claimed until verified (gated in config)

| Claim                                                                                                        | Gate                                                |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| Encryption in transit                                                                                        | `commitments.encryptionInTransit`                   |
| Encryption at rest (all customer data, not only tokens)                                                      | `commitments.encryptionAtRest`                      |
| AI content goes only to the workspace's own provider, nothing sent with AI off                               | `commitments.aiIsolationVerified`                   |
| Security measures, storage region, transfers, retention, app cookies, disconnect and Meta callback behaviour | `[[OWNER: …]]` placeholders; see LAUNCH_BLOCKERS.md |
| Any feature "Available" or "Beta"                                                                            | `features.ts` statuses                              |
| Telegram                                                                                                     | `site.telegramLive`                                 |

## Audit still to do (needs access to the SaaS repo and server)

1. Tenant isolation at API, worker and database level; role checks on messages, settings, exports, reports.
2. Credential encryption scope; TLS on public and internal paths; backup encryption and access.
3. Retention: messages, attachments, AI transcripts, logs, backups; whether inactive accounts are purged.
4. Meta deauthorize and data-deletion callbacks: endpoint, what they delete, confirmation code/status URL.
5. Disconnect behaviour for Pages and Instagram accounts.
6. Cookies set by the app at zoventio.udboy.com (runtime audit).
7. Actual providers and regions: VPS host and datacenter, email sender, payment processor, monitoring.
8. Exact Graph API scopes requested and the App Review submission.
9. Which features are live in production (for `features.ts`).
