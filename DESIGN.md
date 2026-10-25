# Get Assist website — design plan

## The idea

Get Assist lives inside conversation threads, and its most important moment is the
**handover**: the point where the AI stops and a person on the team picks the
conversation up. The site borrows its identity from that moment instead of from
gradients and dashboards.

- The hero is a typeset conversation (labelled "Illustration"), not a device mockup.
  The AI answers a routine question, the customer asks something outside the
  knowledge base, and a handover marker passes the thread to a named teammate.
- That handover marker — a short rule with a label — is the only recurring
  ornament. It appears once in the hero and once as the turn in "How it works".
  Nowhere else.
- Two speakers, two colours: AI turns carry violet (from the logo's sparkle),
  human-team turns carry teal. The colour code is explained in the hero caption and
  reused on the features page for "Human handover".

## Palette

Brand colours were sampled from the owner's logo (approximate; match against the
original design file when it arrives). The logo gradient is used **only inside the
logo itself**; everything else is flat colour.

| Name          | Hex       | Role                                                     |
| ------------- | --------- | -------------------------------------------------------- |
| Navy ink      | `#031A41` | Headings, body text, logo wordmark colour                |
| Signal blue   | `#1556D4` | Buttons, links, focus ring (6.3:1 on white)              |
| Logo blue     | `#0E6EEA` | Logo only; small accents on white, never for body text   |
| Violet        | `#8533EA` | AI speaker marker, "beta" badge (5.6:1 on white)         |
| Handover teal | `#0B6F63` | Human speaker marker, "available" badge (6.0:1 on white) |
| Mist          | `#F3F5FA` | Alternate section background, thread surface             |
| Line          | `#D9DFEA` | Borders                                                  |
| Slate         | `#47536E` | Secondary text (7.4:1 on white)                          |

Status badges: available = teal, beta = violet, coming soon / pending = slate outline.
The site has no dark theme: the owner's notes say the logo must not be placed on dark
backgrounds, and the JPG/PNG logo has an opaque white background.

## Typography

One family: **Figtree** (variable, self-hosted via `@fontsource-variable/figtree`).
It is a friendly geometric sans close to the wordmark's letterforms without copying
them, and it is not Inter/Roboto/Arial.

- Display: 600, tight tracking (-0.02em), sizes 2.5–3.75 rem via `clamp()`.
- Headings: 600, 1.5 / 1.25 / 1.125 rem.
- Body: 400, 1.0625 rem, line-height 1.65, measure max 68ch.
- Thread messages: 400 at 1 rem, speaker labels 600 at 0.8125 rem (sentence case).
- No all-caps eyebrows, no italic or coloured word in headlines.

## Layout

Desktop-first presentation on a 1200 px container, fully fluid to 320 px.

Home (desktop):

```
+----------------------------------------------------------------+
| [icon] Get Assist      Features  Integrations  Contact  Open app|
+----------------------------------------------------------------+
| Customer support,             |  Illustration                   |
| simplified with AI.           |  Customer: Do you ship to...    |
| Bring your customer ...       |  AI (violet): Yes, ...          |
| [See features] [Contact us]   |  Customer: My order arrived...  |
|                               |  ---- Handed to Nadia ----      |
|                               |  Nadia (teal): Sorry about ...  |
+----------------------------------------------------------------+
| What Get Assist does: three plain statements in a row           |
+----------------------------------------------------------------+
| How it works   1 Connect  2 Add knowledge  3 AI answers         |
|                ---- handover ----  4 Your team takes over       |
+----------------------------------------------------------------+
| Channels: Messenger [Pending Meta approval]  Instagram [...]    |
+----------------------------------------------------------------+
| Your data: short text + links to Privacy / Data deletion        |
| FAQ (details/summary)                                           |
| Contact call to action                                          |
| footer: legal links, trademark line, operator line              |
```

Inner page (integration):

```
+----------------------------------------------------------------+
| header                                                          |
| Facebook Messenger integration            [Pending Meta approval]|
| one-paragraph summary                                           |
+---------------------------+------------------------------------+
| On this page (sticky)     | What it does                        |
|  What it does             | How to connect (ordered list)       |
|  Connect                  | How to disconnect / revoke          |
|  Disconnect               | Permissions table                   |
|  Permissions              | How data is handled -> Privacy      |
|  Data                     |                                     |
+---------------------------+------------------------------------+
```

The features page is a specification list (rows: name, sentence, status), not a grid
of identical cards.

## Motion

One orchestrated moment: on first load the hero thread's messages fade in one after
another (CSS only, ~1.6 s total). With `prefers-reduced-motion: reduce` everything is
shown immediately. No scroll reveal, no hover lift.

## Interactivity

Zero client JavaScript. The mobile menu is a `<details>` element, the FAQ uses
`<details>/<summary>`. No framework islands.

## Review against the brief — what I changed

1. First draft had a soft blue-to-violet gradient wash behind the hero. That is the
   "gradient as decoration" tell, and the owner's notes restrict the gradient to the
   logo. Replaced with a flat white hero and a Mist thread surface.
2. First draft put the eight features in a 4×2 grid of identical rounded cards with
   icons. Replaced with a specification list, which reads faster and shows status
   badges in one aligned column.
3. First draft used a mono typeface for speaker labels as a second family. It added
   nothing the weight contrast in Figtree could not; removed (one family only).
4. Removed accessory: a decorative sparkle repeated next to section headings. The
   sparkle stays inside the logo and the AI speaker marker only.
