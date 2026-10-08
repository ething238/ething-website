# About Us integration

Integrated on `codex/about-us-seo`, based on eThing238/ething-website main at `9862d11`.

The reviewed local About Us page is integrated into `src/pages/About.jsx`, with scoped CSS, its original `/about_us` URL, founder portrait, supplied logo, verified-review excerpts, success story, eight FAQs and five-field enquiry form. It owns its header/footer and SEO metadata; the shared layout bypasses its additional content only for this route.

The form uses the website's existing Web3Forms integration rather than the separate Next.js API, which is unavailable on this static website. Notification content includes name, work email, phone, company, hiring need, source page and campaign attribution. The Web3Forms access key must be registered for **support@ething.in**; the recipient is determined by that service's key configuration, not by a text field in the form.

## Email configuration still required

Set `VITE_WEB3FORMS_ACCESS_KEY` privately in `.env.local` or the production build environment using a key registered for support@ething.in. Rebuild after setting it. The local key is currently empty; no actual notification has been sent or inbox delivery verified. The browser shows a delivery error instead of false success when configuration is missing.

The owner requested committing and merging the page before configuring email. Actual delivery remains unverified until a consented test enquiry reaches the intended inbox; this integration does not claim verified email delivery.

## Tracking and verification

- Existing IDs remain `GTM-TX73DK5H` and `G-2W7W1TB2H4`. Both public Google script requests returned HTTP 200.
- Form events use the existing `trackEvent` helper for GTM and direct GA. View/start events are guarded against repeated React effect/focus calls; submit/error events describe the request; success and `generate_lead` fire only after confirmed Web3Forms success. Personal form fields are not included in the custom analytics event parameters.
- Browser inspection found one GTM loader and GA loader requests from both GTM and the direct tag, plus the existing Google Ads loader. Duplicate event reporting is not established by script presence alone and remains an account-level Tag Assistant check. Shared analytics code is unchanged.
- Six isolated email/tracking tests pass. They verify required fields, email content, safe errors, no false conversions, and no personal fields in the custom analytics parameters. They use mocks and send no real email.
- Production build and verification of all 31 sitemap routes pass. About Us remains prerendered with one H1, one form and the same canonical URL.
- The original comparison against the preparation base found 33 HTML outputs outside About Us identical apart from generated application bundle hashes. Newer main-branch changes to Hire Talent headers, footers and closing CTAs are retained; this integration changes only About Us files and its route-specific layout bypass.
- Browser verified the integrated page and missing-configuration error. An existing React hydration warning also appears on the unchanged homepage; broader prerendering changes are outside this About Us-only scope.

References: [Google event setup](https://developers.google.com/analytics/devguides/collection/ga4/events), [GTM data layer](https://developers.google.com/tag-platform/tag-manager/datalayer).
