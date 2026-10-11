# Aerospace integration and analytics check

The reviewed Aerospace page replaces the generic industry page at the unchanged `/aerospace_industry` route. Its canonical remains `https://www.ethingsolutions.com/aerospace_industry`. The owner requested committing, pushing and merging this work, and explicitly instructed us not to publish it.

## Scope and proofreading

The page retains the approved staffing message, five expertise sections and photographs, animated technical skill cards, illustrative role examples and enquiry form. Section headings remain centred, service headings remain left-aligned, and desktop photographs remain vertically centred beside the complete heading and description. The FAQ, process and visible breadcrumb stay removed. Breadcrumb structured data remains present.

The rendered copy, metadata, form labels and feedback were proofread. One sentence now clearly distinguishes writing code, participating in reviews and debugging; the success message is shorter. The wording describes engineers joining client-led teams and does not invent customer results, certifications or market rankings. No sentence combines developer and engineer terminology. The generated hero and testing image are concept illustrations, not evidence of a customer project. The other four service photographs are retained from the approved preview.

Only Aerospace routing, metadata, scoped styles, assets, form integration and verification are changed. Existing site chrome, global analytics, hosting rules and other pages remain unchanged.

## HTML and regression checks

- `npm run build` passes, including prerendering and verification of all 31 sitemap pages.
- Aerospace has populated HTML before JavaScript runs, one H1, one title, one canonical, connected structured data, five service images and five technical skill cards. All six form fields are present in the HTML.
- All 33 HTML outputs outside Aerospace match the pre-change build after normalising application bundle filenames.
- `node --test tests/about-enquiry.test.mjs tests/aerospace-enquiry.test.mjs tests/aerospace-tracking.test.mjs` passes all 16 tests. No real enquiry or analytics request is sent by these tests.
- The approved responsive CSS and reduced-motion rules are retained. No new browser visual verification is claimed.

## GA4 and GTM

- The page reuses the shared GA4 measurement ID `G-2W7W1TB2H4` and GTM container `GTM-TX73DK5H`. Its built HTML contains exactly one GA4 loader/configuration and one GTM initialization/noscript iframe.
- No new tracking bootstrap is introduced. Tests confirm the shared sender forwards each custom event once to the data layer and once to `gtag`, and does not add duplicate loaders when existing tags are present.
- `lead_form_view` fires when the form enters the viewport; `lead_form_start` fires once on first focus. `lead_form_submit` precedes delivery. `lead_form_success` and `generate_lead` fire only after Web3Forms confirms success. Validation, missing configuration and delivery failures produce `lead_form_error` without a successful-lead event. A synchronous submission guard prevents duplicate requests while delivery is pending.
- Analytics parameters contain page/form identifiers and failure categories, not names, email addresses, phone numbers, company names or role requirements. Campaign attribution is retained in the enquiry message.
- The public GTM container was read on 11 October 2026 (HTTP 200, resource version 5). Its tag configuration contains Google Ads and Clarity but no second GA4 configuration or GA4 custom-event tag forwarding these events.
- **Existing GTM issue:** Google Ads tag 6 uses a generic `gtm.formSubmit` trigger. This does not establish successful backend delivery and can count failed attempts. Before a future publication, the GTM owner should review that trigger and use a confirmed-success event (for Aerospace, `generate_lead` with `form_name = aerospace_enquiry`), with exclusions preventing duplicate conversions. No live container change was made because publication is prohibited.
- GSC Wizard reports that the connected account has no Google Analytics scope. GA4 DebugView receipt, key-event settings, enhanced measurement and account-level attribution therefore remain unverified. Code checks are not evidence of live dashboard delivery.

## Form configuration and publication boundary

The Next.js preview endpoint is replaced with the production site's existing Web3Forms service. The build environment must provide `VITE_WEB3FORMS_ACCESS_KEY` registered to the intended recipient, `support@ething.in`. That key is absent from this local build, as it was for the existing About Us form. A missing key shows an error and cannot report a successful lead. Configure the private build environment and verify actual inbox delivery before a future deployment; no credentials are committed.

The production build is available locally in `dist/`. Neither Hostinger nor GTM is published by this change. The existing Hostinger route rules already serve the prerendered Aerospace HTML at the same slashless URL.
