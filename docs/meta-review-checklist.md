# Meta App Review — website checklist

Paste these into the Meta App Dashboard (App settings → Basic) once the site is live
over HTTPS and every `[[OWNER: …]]` placeholder is filled.

| Dashboard field                  | Value                                                                                                                                        |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| App Domains                      | `getassist.pro`                                                                                                                              |
| Privacy Policy URL               | `https://getassist.pro/privacy`                                                                                                              |
| Terms of Service URL             | `https://getassist.pro/terms`                                                                                                                |
| Data Deletion Instructions URL   | `https://getassist.pro/data-deletion`                                                                                                        |
| Website (Platform → Website) URL | `https://getassist.pro`                                                                                                                      |
| App icon (1024 × 1024)           | **Not ready.** Needs the final icon file (SVG or ≥ 2048 px PNG). Do not upscale `public/icon-512.png`. See OPEN_QUESTIONS.md → Brand assets. |
| Contact email                    | The privacy email from `src/config/site.ts` (`emails.privacy`) once set                                                                      |
| App name / display name          | `Get Assist` (exact spelling)                                                                                                                |

## Checks before submitting

- [ ] All three legal URLs return 200 over HTTPS without login or cookie wall (`scripts/smoke.sh https://getassist.pro public`).
- [ ] Footer on every page links to Privacy, Terms and Data deletion.
- [ ] Brand name, icon and domain on the site are identical to the Meta app's.
- [ ] Integration pages list only the permissions the app requests, in the same plain language as the screencast (`src/config/permissions.ts`, all `confirmed: true`).
- [ ] Feature and channel badges are honest. Channels stay "Pending Meta approval" until approval.
- [ ] Nothing on the site says or implies Meta has approved the app or that Get Assist is a Meta partner.
- [ ] Lawyer has reviewed the legal pages.

## Not on this website

OAuth redirect URIs, webhooks (callback URL and verify token), the data deletion
callback URL, Business Verification and permissions requests are configured in the
Get Assist SaaS (app.getassist.pro) and the Meta App Dashboard, not on this site.
