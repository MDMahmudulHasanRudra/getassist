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
| Contact email                    | `privacy@getassist.pro` (create and test the mailbox first)                                                                                  |
| App name / display name          | `Get Assist` (exact spelling)                                                                                                                |

## Integration setup to match on the site

- Use case: Facebook Login, one platform-owned Meta app. Instagram is connected through the
  Facebook Page linked to an Instagram professional account (the integration pages say this).
- If the app actually requests `instagram_business_*` permissions (Instagram Login), the
  Instagram page and `src/config/permissions.ts` must be changed before submitting.
- Reviewer needs: a test user, a test Page, a linked Instagram professional account, and an
  end-to-end screencast whose wording matches the permissions table.
- Data Deletion: give either the callback URL from the SaaS or the Data Deletion
  Instructions URL above; the callback's behaviour must match what the data deletion page says.

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
