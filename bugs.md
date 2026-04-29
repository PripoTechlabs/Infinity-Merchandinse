# Infinity Merchandise — QA Bug Report

Date: 2026-04-27
Scope: index.html, product.html, all-products.html, css/infinity.css, js/* (custom only — Webflow runtime untouched).

Severity legend:
- **P0** Production blocker. Site cannot ship.
- **P1** Functional/data error visible to user.
- **P2** Copy / spelling / minor mismatch.
- **P3** Cosmetic / housekeeping.

---

## P0 — Production blockers

### B-001 Form action is placeholder (`YOUR_FORM_ID`)
- Files: `index.html:3922`, `product.html:190`, `all-products.html:159`
- `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
- Fix: replace with real Formspree endpoint OR rely on `GSHEET_URL`.

### B-002 `GSHEET_URL` empty in JS — form data only logged to console
- File: `js/infinity.js:13`
- `const GSHEET_URL = '';`
- Effect: every enquiry submission falls into `console.warn(...)` branch and shows fake success. No lead captured.
- Fix: deploy Apps Script + paste URL.

### B-003 WhatsApp floating button uses placeholder number
- File: `index.html:3901`
- `href="https://wa.me/9999999999?text=Hi"`
- Footer uses real number `wa.me/971551632727` — inconsistent. Floating button = bogus number.
- Fix: change to `wa.me/971551632727?text=...`.

### B-004 Privacy Policy + Terms of Service links are dead (`href="#"`)
- File: `index.html:3894-3895`
- Legal pages don't exist. Footer hrefs = `#`.
- Fix: build pages OR remove links until ready.

---

## P1 — Functional / data errors

### B-005 Stationery carousel slide uses wrong image
- File: `index.html:2072` (and duplicate `2121`)
- `<img src="images/corporate.webp" alt="Stationery Items">` — `corporate.webp` is the Corporate Gifts thumbnail.
- Fix: point to a real Stationery image (e.g. `images/compressed/Stationeries/Stationery Items.webp`).

### B-006 Meta description claims "14 categories" — only 12 exist
- Files: `index.html:11, 1008` (also `og:description`, `twitter:description`)
- `product-data.js` has 12 keys (textiles-apparel, shoes-footwear, corporate-gifts, stationery, furnitures, wall-decor, dry-fruits, electronics, kitchen-utilities, commercial-machinery, toys, arcade-games).
- Fix: change to "12 categories" OR add the 2 missing categories (Wholesale Consumer Goods + Promotional Merchandise images already exist in `/images/compressed/`).

### B-007 "Furnitures" — incorrect plural
- Many places: `index.html:2077, 2126, 2619, 2642, 2666, 2697, 2744, 2768`, `product.html:239`, `all-products.html:204`, `js/product-data.js id: 'furnitures'`.
- "Furniture" is uncountable in English; plural is unusual.
- Fix: rename label to "Furniture" everywhere. Keep `id: 'furnitures'` URL slug or migrate to `furniture` (slug change requires data + redirect).

### B-008 Wall paintings name mismatch
- Carousel + checkbox label: "Wall Paintings & Décor" — `index.html:2081, 2124`, `product.html:246`, `all-products.html:211`.
- Product-data canonical name: `"Wall Paintings & Home Décor"` — `js/product-data.js:143`.
- Checkbox `value="Home Decor"` (no diacritic) but display "Home Décor" — inconsistent.
- Fix: pick one canonical name and apply everywhere.

### B-009 HQ2 Chennai info inconsistent between desktop popup and mobile card
- `index.html:2689` (popup): `"India operations hub sourcing & export"`
- `index.html:2783` (mobile card): `"India operations hub"` (truncated)
- Fix: use same string in both layouts.

### B-010 `target="_blank"` without `rel="noopener"` (security: tabnabbing)
- `index.html:1156` (Facebook), `index.html:1173` (X), `index.html:3901` (WhatsApp floating).
- Fix: add `rel="noopener noreferrer"` to all external `target="_blank"` anchors.

### B-011 Email domain mismatch
- Footer email: `sales@infymd.com` (`index.html:3833`)
- Site canonical domain: `infinitymerchandise.com` (meta + structured data).
- Fix: confirm correct mailbox. Likely should be `sales@infinitymerchandise.com` OR display matches `infymd.com` consistently across schema.org `Organization`, OG meta, etc.

### B-012 Map footnote sentence missing punctuation
- `index.html:2909`: `Arcs show trade flows into our HQ in Dubai and HQ2 in Chennai hover a pin to explore each market`
- Two sentences fused without punctuation.
- Fix: insert period after "Chennai" + capitalize "Hover" (or replace fusion with em-dash).

### B-013 Mission item 1 — run-on / missing punctuation
- `index.html:1676`: `Connect buyers with reliable manufacturers directly quality and cost-effectiveness built in.`
- Two clauses fused.
- Fix: `Connect buyers with reliable manufacturers directly — quality and cost-effectiveness built in.`

### B-014 `Frequently asked any questions` — broken phrasing
- `index.html:3656`
- Fix: "Frequently asked questions".

### B-015 Stationery / Dry Fruits / Arcade Games carousel slides have no looping video while others do
- 9 slides reference `video/*.mp4`; 3 fall back to images.
- User just confirmed real-world image acceptable for Dry Fruits + Arcade. Stationery still on wrong image (B-005).
- Fix: either add stationery.mp4 OR confirm static image acceptable; ensure visual consistency in carousel.

---

## P2 — Spelling / copy

### B-016 `Years of experince` (typo) — `index.html:1617`
- Note: parent block is HTML-commented out (`<!-- ... -->`) so not user-visible, but cleanup.

### B-017 `forward thinking brands` should be hyphenated
- `index.html:1390`: `forward thinking` → `forward-thinking` (compound adjective).

### B-018 Card description missing terminal period
- `index.html:1722-1723`: `Source right. Source smart. Source at origin` — missing `.` after "origin".

### B-019 Stray closing curly quotes (`”`) without matching opening (`“`)
- `index.html:1776`: `consignments to large-scale trade.”</p>`
- `index.html:1810`: `Decisions backed by data, not assumptions.”</p>`
- Several testimonial lines: `index.html:3142, 3209, 3214, …` — verify each block opens with `“`.
- Fix: insert opening quotes OR remove the stray `”`.

### B-020 Vertora / theme placeholder alt text everywhere
- 30+ images carry `alt="Vertora-..."` from the Webflow template:
  - hero rotate images: `Vertora-hero-rotate-image-three/four/one/...`
  - logos: `Vertora-logo-one/two/.../eight`
  - service tiles: `Vertora-service-image-*`
  - testimonials: `Vertora-icon`, `Vertora-reviewer-image`, `Vertora-profile-image-*`
  - tick icons: `Vertora-black-tick-icon`, `Vertora-white-tick-icon`
  - arrows: `vertora-arrow`, `Vertora-black-arrow`
- SEO + a11y issue (mentioned theme name). Replace with descriptive alt text relevant to image.

### B-021 Hero rotate img alt mismatch with slot
- `index.html:1280`: alt = `Vertora-rotate-image-nine` while class = `rt-ten`. Off-by-one across all alts (`-three` for slot one, etc.). Symptom of theme defaults left intact.
- Fix together with B-020.

### B-022 "Top rated company" — short / weak testimonial header
- `index.html:3142` — verify intentional copy.

---

## P3 — Cosmetic / housekeeping

### B-023 Empty Webflow JS files committed
- `js/AhPuUDiOEfdS.js`, `js/FxHbQsqsoGvy.js` (1 line), `js/KwM3Gne9Z3WS.js`, `js/ni7JBGK5tgsF.js`, `js/Po88mxF1hV03.js` (33 lines), `js/QC14EUUAwxc6.js` (2 lines), `js/webflow-components.js` (1 line), `js/webflow-config.js`, `js/webflow-scroll.js`, `js/webflow.js` — sizes ≤ 33 lines or 0.
- Verify which are actually loaded by the page; remove unreferenced.

### B-024 Closing-quote consistency in panel body
- `index.html:1524`: `“Infinity Merchandise is a global sourcing and trading partner …”` — opens with `“`, but the close `”` is buried inside a `<span>`. Cosmetic, but visually awkward.

### B-025 Process card section duplicated as commented block
- `index.html:1965-2004`: full `<section class="im-process-section">` is HTML-commented but kept in source. Bloats DOM transfer. Delete or move to `.archive`.

### B-026 `data-w-id`, inline transforms scattered everywhere
- Original Webflow IX2 noise. Doesn't break anything but increases payload + visual diff churn. Long-term: strip.

### B-027 OG image cache: hard-refresh required after each regenerate
- After `og-image.jpg` rebuild, FB / LinkedIn cache stale image. Recommend documenting `https://developers.facebook.com/tools/debug/` step in README.

---

## Edge-case scenarios to verify manually

1. **Form submission with empty `GSHEET_URL`**: confirm fallback flow shows "Enquiry Received!" banner (it does, but data is lost — see B-002).
2. **Modal open via deep-link** (`#` + `data-im-open-modal`): pressing browser Back after submitting closes modal? Verify no scroll-lock left on `<body>`.
3. **Carousel auto-scroll** + arrow click: prev/next during auto-scroll → check no double scroll race.
4. **Mobile hamburger** (≤420px): panel goes full-width per CSS rule. Cross icon position correct? Verify scroll-lock on body when open.
5. **Map pins overlap** at small breakpoints — does Australia pin overlap Asia popup? With new lat/lng (-25.3, 133.8) verify visually.
6. **Arc paths** when only 1 HQ visible — code in `infinity.js:482` assumes ≥1 HQ. Confirm both HQs render.
7. **Video lazy-load**: on slow networks, slides without videos (Stationery / Dry Fruits / Arcade) layout-shift?
8. **Reduced-motion**: WhatWeDo cards have `prefers-reduced-motion` rule. Hero carousel (Webflow IX2) does not — animations still play. Acceptable?
9. **Region tabs vs world map**: `REGION_DATA` referenced in `infinity.js` comment but not visible — confirm dead code or live feature.
10. **Browser back from product.html** preserves Our Products carousel scroll position? `outer.scrollLeft` not restored.
11. **Touch drag** vs Apple inertial scrolling: dragging carousel on iOS may fight with native scroll. Test on real device.
12. **Footer year auto-update**: `new Date().getFullYear()` runs client-side; SSR/SEO snapshot may show 2026. OK because dynamic.
13. **Long product names** in subProduct grid: do labels wrap or get clipped on mobile?
14. **404 page**: no custom `404.html` in repo. Server-side fallback?
15. **Sitemap / robots.txt**: not present in repo root.

---

## Open questions for product owner

1. **Privacy Policy + Terms**: do you have copy ready, or should links be removed from footer until pages exist? (B-004)
2. **WhatsApp number for floating CTA**: confirm `+971 55 163 2727` is correct. If yes, replace `9999999999` with it. (B-003)
3. **Email domain**: is `sales@infymd.com` correct, or should it be `sales@infinitymerchandise.com`? (B-011)
4. **Category count**: site claims 14, data has 12. Add 2 categories (Wholesale Consumer Goods + Promotional Merchandise — folders already exist) or change copy to 12? (B-006)
5. **"Furnitures"** plural: keep as-is (intentional for B2B-style listing) or change to "Furniture"? (B-007)
6. **Wall paintings naming**: "Wall Paintings & Décor" vs "Wall Paintings & Home Décor" — pick one. (B-008)
7. **Stationery carousel media**: stock image already has Stationeries folder; fine to swap, or do you want a video like the others? (B-005, B-015)
8. **Top rated company** testimonial line: real testimonial text needed or keep generic? (B-022)
9. **Formspree endpoint** OR **Google Apps Script URL**: which delivery channel for enquiries? Provide URL. (B-001, B-002)
10. **Webflow theme cleanup**: OK to bulk-rename `alt="Vertora-..."` → descriptive alts? Will break literal grep on theme name. (B-020, B-021)

---

## Coverage notes

- Did not run automated Lighthouse / axe scan.
- Did not test against multiple real browsers (Chrome / Safari / Firefox / Edge / iOS Safari / Android Chrome). Assume Webflow's runtime handles cross-browser.
- Did not verify image dimensions / weights for performance.
- Did not test screen-reader pass on hamburger panel keyboard trap.
- Form CSRF / spam protection: relies on Formspree / Apps Script — not reviewed.
