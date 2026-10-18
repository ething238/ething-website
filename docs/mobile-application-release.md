# Mobile Application service-page release

The existing Engineering Services → Mobile Application link continues to use `/mobile_application`. The redesigned page replaces the generic engineering detail page at that route, reuses the shared site header/footer and related-services component, and retains the existing canonical URL.

The page includes iOS/Android and business-app services, detailed illustrative app interfaces with independent preview disclosures, a six-stage process, engagement options, a two-column FAQ, and the shared enquiry delivery integration. Service descriptions are justified, feature lists align left, and service icons sit alongside headings when card width permits. The Enterprise applications card uses blue accents. Motion respects reduced-motion preferences and does not hide server-rendered content.

## Validation

- `npm run build` prerenders and verifies all 32 sitemap routes, including populated initial HTML, one H1, unique titles/descriptions, canonical URLs, structured data, and local link/image destinations.
- `/mobile_application` retains its native menu entry, one header/footer, ten FAQ answers and three related-service links.
- All 20 requested keyword phrases remain covered at 30 non-overlapping mentions / 1,500 main-content words = 2.00% combined density.
- Responsive checks passed at 1280, 768, 390 and 320px without horizontal overflow.
- The mobile enquiry form imports the same `submitLeadRequest` and `trackEvent` helpers as the website-development form. Required fields, invalid email, whitespace-only project input, rejected delivery, malformed JSON, network failure and success were checked using the actual component/helper with a simulated transport. No email was sent.
- The payload contains contact/project fields, a readable message summary, the source route and campaign attribution. Conversion events are emitted only after confirmed success; contact/project content is not included in analytics events.
- GA measurement `G-2W7W1TB2H4` and GTM container `GTM-TX73DK5H` load correctly. On the mobile route, the existing GTM Google tag runtime loads the GA measurement after its explicit configuration, avoiding a duplicate loader. Other routes retain direct GA loading. Prerender checks verify the route-dependent bootstrap and event queue.
- Runtime browser verification confirmed one GA measurement loader and one GTM loader. Google script endpoints returned HTTP 200.

Live inbox receipt and account-side analytics/conversion reporting were not tested. The page must be built and deployed through the existing Hostinger workflow; merging this source is not itself proof of a hosting deployment. No new hosting identity, route, environment file, credential or test-delivery fixture is included in this release.
