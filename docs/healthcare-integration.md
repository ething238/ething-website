# Healthcare integration

Integrated the reviewed Healthcare page into eThing238/ething-website at the existing `/healthcare_industry` route. The canonical remains `https://www.ethingsolutions.com/healthcare_industry`.

`src/pages/Healthcare.jsx` owns its reviewed header, footer, layout and metadata. The route replaces only Healthcare in the generic industry map. The shared Layout bypass prevents duplicate headings, metadata, breadcrumbs and extra keyword blocks. App-level visitor tracking remains present. Other industry routes retain their existing components.

The page retains the six capabilities, compact images, healthcare/IT hero, audience cards, three AI governance cards, engineering team support and related services. The delivery process, assurance section, sidebar and Track what matters box remain removed. The grammar review clarified decision records and the surgical test scope. The governance section describes the five delivery areas confirmed by the owner without naming a client, claiming measured outcomes or asserting market leadership.

The supplied PNG remains unchanged at `/brand/ething-logo.png`; the shared `/images/ething-logo.png` is updated to the same bytes for existing pages and exported landing pages. Global logo intrinsic dimensions match 1122 × 1402 while existing display styles remain. Other Services' HTML, hydrated script and legacy CSS point to the supplied PNG. Client logos are untouched.

## Verification

- `npm run build` passes: all 31 sitemap pages contain prerendered HTML, one H1, unique titles/descriptions, canonical URLs, structured data, crawlable links, valid local destinations and interactive scripts.
- Focused Healthcare checks verify six H2 headings, six capability IDs, three governance cards, the removed sections' absence, the supplied header/footer logo, local hero and connected WebPage/CreativeWork metadata.
- Healthcare's built HTML has one GA4 loader/configuration for `G-2W7W1TB2H4` and one GTM initialization/noscript for `GTM-TX73DK5H`. The shared analytics bootstrap and visitor tracker are preserved; no Healthcare-specific loader is added.
- The available GA4 reporting connector has no Analytics account authorization, so live event receipt and account-level GTM/GA4 settings were not inspected. This is a tool-access limit, not evidence that the website's existing tracking is absent.
- Six existing About Us enquiry tests pass. They use mocks and send no email.
- Healthcare visible desktop copy: 1,215 words, nine nonoverlapping keyword occurrences (0.74%), covering 24 words (1.98%). Both measures satisfy the 2% limit. Hidden menus, metadata/schema, alt text and decorative utilities are excluded; longest matching inherited/user-supplied phrases win.
- Compared all 33 HTML outputs outside Healthcare against the preparation baseline: no content changes beyond application bundle filenames and owner-logo references/intrinsic dimensions.
- Supplied PNG SHA-256: `cd618426047ec6e70a5d7a9e3e780a415c3c4e7ade67a04a25b73bf9d1e125f6`.
- The production build and HTML/CSS were checked locally. No browser visual inspection is claimed.

## Publishing

This integration does not publish the website. The existing manual Hostinger process remains: build the merged main branch with the production environment, then upload the complete `dist/` output, including `.htaccess`, route HTML, assets and PHP APIs. Existing `.htaccess` rules already serve Healthcare at the same slashless URL; no hosting-rule changes are required.
