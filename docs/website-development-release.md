# Website development service release

Verified 16 October 2026. Canonical URL: https://www.ethingsolutions.com/website-development

## Scope

- Adds the reviewed website development page and its local responsive artwork.
- Adds Website Development immediately after Software Development in the common Engineering Services menu and the Engineering Services capabilities list. The nine standalone landing-page files change only in their header menus.
- Registers the route, title, description and sitemap entry. Existing Apache rules serve its prerendered HTML at the slashless URL. A route-specific Vercel rewrite also points to that HTML.
- Keeps this page's inline JSON-LD inside its React tree so hydration preserves one canonical and does not rebuild the page. Other prerendered routes retain their existing behaviour.
- Uses the existing shared header, related-services component, and GA/GTM sender. New page styles are scoped to `.website-development-page`.

## Validation

- Production build passes; all 32 sitemap pages pass the existing prerender verification.
- Raw HTTP response for the slashless route contains the H1, eight service panels, all 16 FAQ answers, canonical and structured data before JavaScript executes.
- Browser hydration retains one canonical at the intended URL and has no hydration error on this page.
- Combined keyword density: 54 longest non-overlapping exact phrase mentions / 2,700 main-content words = 2.00%. The list includes all 19 originally requested phrases; app-development phrases and removed redundant local variants remain absent to preserve the later website-only instructions. Header/footer, scripts, styles and duplicated noscript text are excluded; selectable panels and FAQ answers are included.
- One H1, 11 H2s and 46 H3s in complete prerendered main content, with no skipped heading levels. The counts include inactive service panels and collapsed FAQ questions.
- Desktop H1: 72px; major H2s: 48px. At 320px, H1: 50px; major H2s: 36px. The shared related-services title remains 20px. Card and FAQ H3s retain their context-specific sizes. No heading clipping or horizontal page overflow at desktop or 320px. Measurements are in `artifacts/website-development-release/heading-pixels.json`; these are design values, not Google-mandated pixel thresholds.
- GA4 `G-2W7W1TB2H4` and GTM `GTM-TX73DK5H` match the existing homepage, each with one bootstrap. The form uses the shared sender for GA4 and data-layer events. Automated tests verify each event once and exclude contact details from analytics payloads. No live enquiry was sent, as requested; inbox delivery and GA reporting latency are not claimed.
- All 15 selected regression tests pass, covering the new page, header consistency, existing homepage isolation and shared analytics behaviour.

Reproduce with `npm run build`, `node --test tests/website-development.test.mjs tests/site-header.test.mjs tests/aerospace-tracking.test.mjs tests/homepage.test.mjs`, and `python scripts/audit-website-development.py --report artifacts/website-development-release/seo-audit.json`.
