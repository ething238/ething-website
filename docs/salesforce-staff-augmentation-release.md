# Salesforce staff augmentation release

Adds the approved `/salesforce-staff-augmentation` page to the production React app. The cover contains the compact enquiry form, required phone field and yellow Explore the roles button. The static talent illustration remains in the bottom next-steps section. All approved copy, role cards, cloud specialisations, notebook FAQs and three related-service links are retained.

Salesforce is placed under Hire Talent after the existing Explore Engineering Talent and SAP Services entries. The release reuses the production header, footer, Web3Forms delivery helper and existing site-wide GA/GTM bootstrap. No other page content or analytics-container configuration is changed.

The route is included in shared metadata/sitemap generation, pre-rendered to its own HTML and given an explicit Vercel rewrite. Its inline Service/BreadcrumbList schema remains in place for matching browser hydration.

Validation:

- Production build and prerender verification passed for all 34 sitemap routes.
- Fourteen Salesforce, header and SAP tests passed, including required fields, confirmed-success tracking, retries, duplicate protection and no personal details in analytics parameters. Delivery is mocked; no test enquiry is sent.
- The full suite reports 59 passing tests and six failures. The same six failures were reproduced on untouched base `main` (`65c3b0d`) in the existing homepage-enquiry and older tracking-bootstrap tests. Those unrelated tests and implementation files were left unchanged.
- Compared all 36 existing generated HTML documents with the base build: main content and metadata are unchanged, allowing only the requested shared navigation link. Each of the nine standalone hiring pages differs only by the Salesforce menu anchors.
- Browser verification covered desktop/menu placement, required phone input, mobile layout and hydration without console errors.

GA4 account reception and the previously documented legacy GTM native-submit Ads trigger remain account-side follow-up items. This release preserves the approved direct GA4 form events and does not publish GTM changes.
