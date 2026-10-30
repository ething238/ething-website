# AI Developers consolidation audit

Verified 30 October 2026 against main `f66f3d90b426a9ab0dbcafde4d910f59c5695333`.

## Page and copy

- Retained URL and canonical: `https://www.ethingsolutions.com/hire-ai-developers`.
- Title: “Hire AI Developers in India | eThing”. One H1: “Hire AI Developers in India”.
- The full page, nine FAQs, tab panels, form, navigation and footer are present in the delivered HTML. JavaScript enhances the interactions; React is used only during the build of this page.
- Proofread the consolidated copy and aligned the FAQ structured data with the rendered answers.
- All 13 keyword phrases from the retired page are included. Combined density is **2.00%: 30 non-overlapping exact phrase mentions / 1,500 main-content words**. Longer phrases are counted before shorter overlapping phrases. The calculation includes accessible FAQ and tab copy, and excludes navigation, footer, metadata and JSON-LD. This is a requested editorial target, not a search ranking guarantee.
- The keyword set is: AI development companies; artificial intelligence development companies; AI developers; AI devs; artificial intelligence developer; staff augmentation; contract staffing; hire AI engineers; ML developer; machine learning in drug discovery; AI product development; hire AI developers; staffing solution.

## Computed typography

Measured in Chromium at 1280 × 800 and 390 × 844. Values are CSS pixels, rounded to two decimals. Existing approved responsive sizes are retained.

| Element | Desktop | Mobile |
| --- | ---: | ---: |
| Cover H1 | 60.27 | 45.07 |
| Cover description | 19.47 | 17.71 |
| Standard section H2 | 41.07 | 34.67 |
| Standard section description | 18.67 | 17.07 |
| Skill card title | 20.27 | 20.27 |
| Skill card description | 16.43 | 16.27 |
| Technology tags | 12.91 | 12.75 |
| Support example H2 | 43.07 | 36.67 |
| Support example description | 20.67 | 19.07 |
| Related services H2 | 22.67 | 22.67 |

Letter spacing is normal. Main section headings are centered; cover and card content remain left aligned. The selected section introductions remain centered as approved. The entire related services section remains left aligned. No horizontal overflow at either viewport. The document ends at the footer, with only subpixel rounding differences.

## Page weight

| Resource | Raw bytes | Gzip bytes |
| --- | ---: | ---: |
| Complete HTML | 46,387 | 10,157 |
| Interactive runtime | 10,742 | 4,145 |
| Page CSS | 80,713 | 12,973 |
| WebP hero | 46,170 | Already compressed |

The hero is 72.3% smaller than its 166,784-byte JPEG source. It is preloaded; below-the-fold illustration media remains lazy loaded. Content-hashed page assets have immutable cache headers. HTML, CSS and JavaScript have Apache compression rules. Figures above exclude existing analytics vendors, Google Fonts and other images; they are build sizes rather than measured production transfer sizes.

## Retirement and redirects

- Removed the standalone AI Staff Augmentation destination from desktop navigation, mobile navigation and footer links across generated pages and existing standalone exports.
- Hire Talent retains AI Developers at `/hire-ai-developers`. Relevant internal service links now target that URL.
- Removed the old page component, page data, stylesheet and obsolete page/form tests. The old URL is absent from the generated sitemap and published HTML links.
- Apache redirects underscore/hyphen spellings, slash variants and `/index.html` variants directly to the HTTPS www canonical URL with **301**, retaining query strings. The rule precedes host canonicalization to avoid a second redirect.
- Equivalent legacy mappings are included for Netlify and Vercel. The React router also forwards legacy in-app navigation.
- Live verification exposed conflicting host directory-slash normalization. An explicit AI HTML rewrite precedes the shared trailing-slash rule; both slash forms serve the same HTML, with the original slashless canonical retained. This also accommodates visitors with a cached older directory redirect.
- A real localhost HTTP check returns complete HTML with 200 at the retained URL, and 301 for the retired aliases with query preservation. Local preview redirects use the localhost destination; production uses the canonical domain.

## Validation and scope

- `npm run build` passes and verifies all 34 sitemap pages for content, H1, titles, descriptions, canonicals, links and scripts.
- 21 focused consolidation, density, asset-budget and lead-delivery tests pass.
- Browser checks pass for mouse/keyboard example tabs, FAQ expansion, mobile menu open/close/Escape, CTA scrolling, inline required-field validation and the localhost preview success state. No real test enquiry was sent. Existing confirmed-delivery handling and first-party visit/lead analytics are retained. No browser warnings or errors were reported on the final page.
- Approved hero and page motion remains enabled, with reduced-motion handling and offscreen/background pausing.
- Compared other generated pages with a clean baseline: 31 main-content extracts are identical; three differ only by retired AI link removal or retargeting. Existing Oracle EBS and Banking & Finance main content is unchanged.
- The existing shared-header test has an inherited string-comparison mismatch for Oracle EBS, whose native navigation includes additional attributes and a mobile contact link. This release preserves that existing navigation structure and removes only the retired AI links; the mismatch is not a new AI-page failure. Shared footer year and scoped header-CSS checks pass.

Reproduce the copy and asset audit with `node scripts/audit-ai-hiring.mjs` after `npm run build`. Deployment uses the repository's existing Hostinger workflow: upload the complete generated `dist/`, including `.htaccess` and assets. A Git push alone does not establish that Hostinger has deployed it.
