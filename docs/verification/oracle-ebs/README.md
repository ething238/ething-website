# Oracle EBS release verification

Reviewed 30 October 2026. Route and canonical: `https://www.ethingsolutions.com/oracle-ebs`.

The approved EBS design is delivered as complete static HTML, with its own small scripts and stylesheet. It does not load the site's React application bundle. The route is present in the sitemap, Apache's existing static-route mapping, and an explicit Vercel rewrite. A React navigation fallback reloads this static route if reached through client-side navigation.

## Scope

- Adds the EBS page, its optimized assets, route metadata, verification tools and Hire Talent entry.
- The nine existing standalone hiring pages differ only by the added Oracle EBS Staffing navigation link; their main content and footers are unchanged.
- Retains the yellow heading, removed hero button/captions, compact form, shared header/footer, darker cover and compact engagement cards approved in the preview.

## Copy and SEO

Proofread the headings, descriptions, module/role copy, calls to action and all fourteen FAQ answers. Oracle Fusion is distinguished from E-Business Suite; the route describes EBS staffing. The cover illustration depicts finance, supply chain, people and database modules. Supporting photos and SVG diagrams match the adjacent roles; decorative backgrounds have empty alternative text.

The keyword target is **2.00%**: 38 non-overlapping topic-phrase occurrences across 1,900 editorial words. This combines `Oracle EBS` (32) and `Oracle E-Business Suite` (6). The reproducible method excludes navigation, footer, form controls, SVG labels, eyebrow captions and hidden elements, while including the full FAQ copy. This is an editorial count, not a claim about ranking performance.

The initial response includes one H1, the section headings, descriptions, links, form, and all FAQ answers. The page has a unique title and description, one canonical, Open Graph metadata, and WebPage, Service and BreadcrumbList structured data. Local assets, internal links and fragment targets were checked.

Technical reference checked for Release 12.2 online patching: https://docs.oracle.com/cd/E26401_01/doc.122/e87011/T660854T660860.htm

## Tracking and enquiries

Uses the existing GA4 measurement ID `G-2W7W1TB2H4` and GTM container `GTM-TX73DK5H`. Their public scripts returned HTTP 200 during the 29 October audit. The published container's explicit Google tag destination was an Ads ID, with no occurrence of this GA4 measurement ID; the EBS page therefore has one direct GA4 configuration and one GTM bootstrap. Loading is asynchronous and scheduled after page load. Local/file previews do not load these business tracking scripts.

Form events contain only the event name, page path and form name. The GA4 page and referrer values omit query strings. Contact values are sent only to the same Web3Forms integration used by the site's other enquiries, not to the analytics event parameters.

The original mail-draft action is replaced with the existing delivery integration. Conversion events require an HTTP success response with `success: true`. Verification covers successful delivery, rejection, malformed responses, network failures, timeout, invalid fields, whitespace-only fields and the honeypot, including duplicate-submit protection. These tests use mocked responses; no live enquiry was sent and production analytics receipt has not been observed before deployment.

## Media, motion and browser checks

The original 5,095,244-byte portable HTML becomes 51,866 bytes (estimated gzip: 12,172 bytes). All first-party assets total 506,107 bytes, including all three responsive cover candidates; a browser selects one candidate. The cover files are about 16/30/47 KB. Repeated photos share assets, eleven images are lazy-loaded, image dimensions are specified, and fonts are self-hosted with their OFL licenses. There is no video or added animation library. Motion respects reduced-motion preferences and pauses when the document is hidden.

The local `/oracle-ebs` URL returned HTTP 200 with the H1 in its response body. Browser checks found no horizontal overflow at effective viewport widths of 375, 753, 1009 and 1265 pixels. The form stays at or below 480 pixels, the hidden honeypot remains hidden, and desktop/mobile menus and the use-case selector work. The engagement cards have no reserved paragraph minimum height. No browser console errors were observed.

These are local delivery and behavior checks, not a measured field Core Web Vitals score. Google marketing tag traffic is additional to the first-party totals.

## Reproduce

```text
npm run build
node scripts/verify-oracle-ebs.mjs
python scripts/audit-oracle-ebs.py
git diff --check
```

`page-audit.json` records the word count, headings, metadata, links and asset weights. `editorial-copy.txt` records the audited editorial text.
