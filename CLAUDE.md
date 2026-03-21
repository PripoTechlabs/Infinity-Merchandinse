# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static landing page for **Infinity Merchandise** — a Dubai-based global sourcing and trading company. The site was originally exported from Webflow and extended with custom CSS and JavaScript.

To preview locally, open `index.html` directly in a browser or use any static file server:
```bash
python3 -m http.server 8080
```

## Architecture

This is a no-build, single-page static site. There are no dependencies, package managers, or build steps.

### File Structure

- **`index.html`** — The entire page. Contains Webflow-generated markup, inline `<style>` blocks for Webflow IX2 animation initial states, and references to all CSS/JS.
- **`css/LAoaahHINWYT.css`** — Webflow-generated stylesheet. Do not edit manually; changes will be lost if the site is re-exported from Webflow.
- **`css/styles.css`** — Base CSS reset (Webflow normalize).
- **`css/infinity.css`** — **Custom brand styles.** All new styles should go here. Defines CSS variables under `:root` with the `--im-` prefix.
- **`js/webflow*.js`** — Webflow runtime scripts (interactions, scroll, components). Do not edit.
- **`js/infinity.js`** — **Custom JavaScript.** All new behaviour goes here.

### CSS Variables (Brand Tokens)

Defined in `css/infinity.css`:
```
--im-navy: #0B2641
--im-navy-dark: #071829
--im-gold: #C49A2E
--im-gold-light: #E8C160
--im-white / --im-off-white / --im-gray-light / --im-gray
--im-text-dark: #121212
--im-radius: 0.75rem
```

Always use these tokens instead of hardcoded hex values for brand colours.

### Custom JavaScript Features (`js/infinity.js`)

The script is an IIFE with these sections:

1. **Enquiry Modal** — `#im-enquiry-modal`. Opened by any element with `[data-im-open-modal]` (passes `data-im-category` to pre-check a product checkbox). Also triggered by `#im-enquiry-tab` (desktop fixed tab) and `#im-enquiry-mobile`.
2. **Form Submission** — `#im-enquiry-form` POSTs to Formspree via `fetch`. The form `action` attribute on the element in `index.html` contains the Formspree endpoint.
3. **Product Category Accordion** — `.im-product-card` elements toggle `.open` class on click; `.im-product-enquiry-btn` inside a card opens the modal with that category.
4. **World Map Region Tabs** — `.im-region-tab[data-region]` tabs render product lists into `#im-region-products`. Region data is hardcoded in `REGION_DATA` object.
5. **Smooth Scroll** — All `a[href^="#"]` links.
6. **Sticky Navbar** — `.rt-navbar-v1` gets an inline background applied after 80px of scroll.

### Webflow Conventions

- Webflow classes use the `rt-` prefix (e.g. `.rt-navbar-v1`, `.rt-container`).
- Custom classes use the `im-` prefix.
- `data-w-id` attributes are used by Webflow's IX2 animation engine — do not remove them.
- The inline `<style>` block at the top of `<head>` sets initial transform/opacity states for Webflow animations; keep it intact.
