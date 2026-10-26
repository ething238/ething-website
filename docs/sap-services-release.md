# SAP staffing services page

Integrates the approved SAP page at `/sap-services`, based on preview source `07a1a0a42f70d2e9029ac4f35d31392d0f8b30dc`. The page uses the repository's existing React runtime, shared header/footer, enquiry delivery helper and analytics sender. No preview hosting configuration, environment file or additional analytics bootstrap is included.

The approved main copy is preserved exactly: 1,497 words, all 15 specialist roles, required enquiry fields, grouped role selector, How We Work interactions, mobile diagrams, background-only SAP cover with its stronger readability treatment, and left-aligned related services. SAP Services is second under Hire Talent, immediately below Explore Engineering Talent. The nine existing standalone pages change only in their headers to expose this required link.

Production integration adds the canonical URL, indexable metadata, sitemap entry, page schema and Vercel rewrite. Apache's existing route rules already serve the prerendered route. All SAP CSS selectors are scoped to `.sap-page`. The eleven optimized media files total 260,199 bytes; the largest is 74,284 bytes. The existing shared application bundle is retained without restructuring other pages.

## Verification

- `npm run build` passes, including the existing verifier for all 33 sitemap pages.
- `node --test tests/sap-services.test.mjs tests/site-header.test.mjs`: eight checks pass.
- Browser checks cover the shared menu order, role selection, FAQ disclosure, process activation and pointer-leave reset, visible mobile diagrams and all ten number badges, required fields and left-aligned related services. No horizontal overflow at 390px or 320px; no browser console errors observed.
- Enquiry and conversion tests use mocked delivery. No real enquiry was sent. Production inbox receipt and GA reporting are not claimed.

Build and upload `dist/` using the existing hosting process to deploy the main website. A Git commit/push is not proof of a Hostinger deployment.
