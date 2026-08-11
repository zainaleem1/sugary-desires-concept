# Sugary Desires Cakes — Website Concept

**Type:** Unsolicited design study · portfolio proof
**Subject:** [@sugarydesirescakes](https://www.instagram.com/sugarydesirescakes/) — bespoke cake business, ~9,995 Instagram followers
**Deliverable:** 3-page static site — home, gallery, order flow. No build step, no framework.
**Status:** Built and functionally verified in headless Chrome. Gallery is waiting on real photos. No Loom recorded yet.

---

## The idea

Search "cake website" and you get the same page thirty times: pastel pink, a script font,
a carousel of stock photos, a contact form nobody fills in.

This goes the other way — **cake treated as luxury fashion**. Near-black plum ground,
champagne-gold line art, a high-contrast display serif (Fraunces), film grain, and generous
whitespace. The visual argument is that a £400 wedding centrepiece should be sold the way a
£400 anything else is sold.

Three pages:

| Page | What it does |
|---|---|
| `index.html` | Hero, signature collection, stats, gallery preview, process, interactive flavour selector, occasions, delivery, closing CTA |
| `gallery.html` | Filterable masonry gallery with captions and a keyboard-navigable lightbox |
| `order.html` | Six-step order flow that ends in a ready-to-send message |

---

## What is real and what is not

This matters — it's an unsolicited concept and it carries their name.

**Taken directly from their Instagram:**

- "You Desire We Design!" — their tagline, used as the hero headline.
- "Bespoke cakes made to become the highlight of your events!" — their own positioning line.
- The six ranges: cakesicles, mermaid cakes, wedding, brownies, gift packs — these are their
  actual story highlight categories.
- "Cake@Venue" — their own name for delivery, taken from a highlight.
- "For enquiries please dm" — why every path on the site ends in a DM rather than a checkout.
- 9,995 followers, shown as "9.9K".

**Written for the concept and clearly marked as such:**

- The seven flavours. The page says the list is *indicative* and the README says it here:
  these are plausible bakery flavours, not a menu they published. Replace before this is
  ever presented as their real site.
- Process copy, delivery copy, occasion descriptions. Reasonable inferences about how a
  bespoke cake business works, not quotes.

**Deliberately absent:** no testimonials, no review stars, no client names, no "500 cakes
delivered", no prices, no phone number, no address. None of that is knowable from outside
the business, so none of it is on the page.

Every page carries a permanent banner stating it is an independent, unsolicited concept and
not an official site, linking to their real Instagram.

---

## Why the gallery is empty

**Instagram cannot be scraped.** I fetched a post URL directly and got back a 602KB
JavaScript shell with zero image URLs in it — no `og:image`, no `display_url`, no
`scontent` links. Instagram serves the actual content only to a logged-in session.

Hotlinking wouldn't work either: Instagram CDN URLs are signed and expire within days, so a
site built on them goes blank within a week.

So the gallery is built as a **data-driven system you fill in once**, and it degrades
gracefully — every tile that has no photo renders gold line art instead, which looks
deliberate rather than broken.

### Filling it in — about 20 minutes

1. Open the Instagram profile while logged in.
2. Save the 12 best photos.
3. Rename them `01.jpg` … `12.jpg`, drop them into `images/`.
4. Open `data/gallery.js`. For each entry, paste the real caption between the quotes on the
   `caption:` line, and the post link on the `link:` line.
5. Set `DRAFT = false` at the top of that file to hide the "caption needed" reminders.
6. Refresh.

Nothing else needs touching. Add more entries by copying a block; the filters, masonry and
lightbox all pick them up automatically.

A hero photo can go in too — add `style="background-image:url('images/hero.jpg')"` to the
`<div class="seal__photo">` in `index.html` and it replaces the rotating line-art seal.

---

## The order flow

Six panes on one page — occasion, cake, flavour & finish, when & where, contact details,
review — with a progress rail you can click backwards through.

It ends by composing a formatted message and copying it to the clipboard, then opening
Instagram, because a DM is where their orders actually happen. No fake "order confirmed"
screen, no fake payment.

**Two optional settings at the top of `assets/order.js`:**

```js
var WHATSAPP = "";   // full international number, digits only e.g. "923001234567"
var WEBHOOK  = "";   // n8n / Make / Zapier webhook URL
```

Set `WHATSAPP` and a WhatsApp button appears, pre-filled with the whole order.
Set `WEBHOOK` and "Send my order" POSTs the order as structured JSON — so it can land in
Airtable, a Sheet or a Slack channel automatically. If the POST fails it silently falls back
to copy-and-DM, so a broken webhook never costs an enquiry.

**That webhook is the resellable piece.** It's the same structured-intake pattern any
appointment or quote business needs.

### Verified behaviour

Driven programmatically in headless Chrome, not eyeballed:

| Check | Result |
|---|---|
| Advances through all six panes | pass |
| Blocks with no contact details at all | pass |
| Blocks with a name but no contact method | pass |
| Blocks on a malformed email | pass |
| Passes on a valid email | pass |
| Summary rows built, empty fields omitted | 12 rows |
| Date rendered as "19 September 2026" | pass |
| Gallery filters | wedding → 2 of 12 |
| Lightbox open / next / prev / close | pass |
| Icon sprite | 19 symbols |
| Mobile at 500px | no horizontal overflow |

---

## Stack

Plain HTML, CSS and vanilla JS. No framework, no build, no dependencies.

```
index.html · gallery.html · order.html
assets/site.css     all styling for all three pages
assets/site.js      header, drawer, reveals, flavour selector, gallery, lightbox
assets/order.js     the six-step order flow
assets/icons.js     SVG sprite, injected (works over file://)
data/gallery.js     ← the only file you edit to fill the gallery
images/             ← drop photos here
```

One external request: Google Fonts (Fraunces + Jost). Everything else is local. Swap the
`<link>` for self-hosted `.woff2` files if it ever needs to run fully offline.

Accessibility: keyboard-navigable throughout, focus-visible rings, `aria-pressed` on all
toggles, `aria-live` on the order status, Escape closes the lightbox and drawer, arrow keys
move through the lightbox, and `prefers-reduced-motion` disables grain, parallax and every
transition.

## How to view

Open `index.html` in a browser. To re-render screenshots:

```bash
chrome --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1440,1250 --virtual-time-budget=9000 \
  --screenshot=out.png "file:///<path>/index.html"
```

Note: the dark palette can look washed-out in a headless capture — that's the scroll-reveal
transition caught mid-fade, not a rendering bug. It resolves in a real browser.

---

## Reuse

Extractable into `../../06-skills/reusable-blocks/`:

- **Multi-step form engine** — pane state machine, progress rail, per-step validation,
  structured JSON output, webhook POST with graceful fallback. The highest-value block here;
  it fits any quote or booking intake.
- **Data-driven gallery** — one config file, filters, masonry, lightbox, automatic line-art
  fallback for missing images. Reusable for any visual business with a thin website.
- **Dark editorial theme kit** — token palette, film grain, gradient blooms, gold line-art
  icon sprite, scroll-reveal with stagger.
- **DM handoff pattern** — compose → copy → open channel. Right answer for any business that
  sells in DMs and shouldn't be pushed into a checkout.

## Open items

- [ ] Operator: download 12 photos and paste captions into `data/gallery.js`
- [ ] Replace the seven placeholder flavours with real ones before showing this to the business
- [ ] Record the 3–4 min Loom (their live site vs this, then the order flow running)
- [ ] Export before/after screenshots for LinkedIn Featured and Upwork
- [ ] Decide: keep as a portfolio concept, or send it to them as a pitch
