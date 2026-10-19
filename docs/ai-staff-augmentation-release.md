# AI staff augmentation page

Reviewed on 19 October 2026. This integrates the approved local redesign into the existing React/Vite website. The public route and canonical remain `https://www.ethingsolutions.com/ai_staff_augmentation`.

The generated `dist/ai_staff_augmentation/index.html` contains the complete page, consultation form, FAQs and three success-story panels before JavaScript runs. Apache's existing route rules serve it without changing the URL; the Vercel configuration now explicitly serves this document before its SPA fallback. The page owns its layout and metadata, with the existing shared header, footer and form delivery helper. The success-story interface is a clearly labelled example, without invented client results or metrics.

## Performance

Responsive WebP images retain the approved subjects and layout. Below-fold photography is lazy loaded; the hero has high priority. Images have intrinsic dimensions and asynchronous decoding. Both hero elements use the same responsive candidates so the browser can reuse the selected file. The header uses the existing optimized brand logo only on this route. Its favicon is 4.5 KB rather than the 1.3 MB original PNG.

The image byte budget at DPR 1 is 257,895 bytes for a 1280 px desktop and 134,419 bytes for a 390 px mobile viewport, versus 1,844,386 bytes before optimization. These are file budgets, not PageSpeed scores or guarantees of a particular load time. The existing application bundle still contains other pages; it was not restructured as part of this page-only change. See `artifacts/ai-staff/performance-audit.json`.

## Content, layout and SEO

- Proofread the main page and corrected word spacing around heading line breaks.
- All 13 supplied keyword phrases are present: 39 longest, non-overlapping phrase occurrences in 1,954 main-content words, a combined density of 1.9959%. The calculation includes FAQ answers and all three story panels, and excludes shared navigation, footer, metadata and structured data.
- Exactly one H1 and one heading in each of 11 main sections. No em dashes, duplicate IDs or broken section anchors.
- Desktop, tablet and mobile checks at 1280, 768, 390 and 320 px. Equal desktop application panels are 572.4 by 720 px; consultation panels are 572.4 by 579.2 px. They stack naturally on narrow screens. Narrow-screen hero and consultation headings fit their containers.
- Consistent section-heading and card-title sizes, two FAQ columns on desktop, working FAQ disclosure and keyboard-operable story tabs. Animated infographic elements were observed changing between samples. Reduced-motion rules are retained.
- All 31 other route renderings have the same SHA-256 hashes as unchanged main. Shared-header optimization defaults off for other pages; added CSS is scoped to the AI page.

## Form and analytics

The consultation form uses the same existing Web3Forms delivery helper and public configuration as the website and mobile forms. It validates required fields, blocks duplicate pending submissions, reports confirmed delivery, retains the form on failure, and supports retry. Human-readable enquiry messages include source-page and campaign attribution.

All six form lifecycle events use the existing shared tracking sender: `lead_form_view`, `lead_form_start`, `lead_form_submit`, `lead_form_success`, `generate_lead`, and `lead_form_error`. Conversion events only follow confirmed delivery. Analytics events contain no contact details.

The GA4 ID `G-2W7W1TB2H4` and GTM container `GTM-TX73DK5H` match the live website response. Runtime browser checks observed GTM loading its Google tag. As on the existing mobile page, the AI route avoids an additional direct GA loader while retaining one explicit GA configuration and the GTM noscript iframe. Bootstrap checks verify that other routes retain their previous loader behavior.

No real enquiry was sent. Success, failure, attribution, timeout, retry and duplicate-submission behavior were checked with mocked delivery, not the production inbox. Access to GA reporting or GTM dashboards was not used.

## Verification

`npm run build` passes, including the existing verifier for all 32 sitemap pages. Run:

```text
node --test tests/ai-staff-page.test.mjs tests/ai-consultation-form.test.mjs tests/ai-lead-response.test.mjs tests/site-header.test.mjs
python scripts/audit-ai-staff.py
```

All 25 focused checks pass. The full suite has 48 passes and six pre-existing failures, reproduced on unchanged main `1c9ae85`: four homepage enquiry test fixtures cannot evaluate an unchanged ESM import, and two older homepage/website analytics assertions expect a direct script tag despite the existing conditional bootstrap. These unrelated tests and production flows were left unchanged. Details are in `artifacts/ai-staff/test-summary.json`.

Committing or merging this change does not itself upload `dist/` to Hostinger. Follow the repository's existing deployment process to publish the built files.
