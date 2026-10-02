# Keyword section placement

Move the eight landing-page keyword sections into their main content rather than after the site footer.

- Seven independent exported pages place the section between role capabilities and the case study. Reuse their existing role-capabilities, eyebrow and capabilities-intro theme classes; remove the previous inline white-block styling.
- The React remote-developer landing places the section after talent and before the hiring process. Use its existing max-width, display typography and section spacing. Equivalent React technology routes use this same placement.
- Layout only supplies the bottom keyword section for the two non-landing service pages, which were outside the requested eight-page fix.
- Update the exported Next page runtime as well as the HTML so hydration retains the section. New content-hashed chunk filenames and updated HTML/manifests avoid stale script reuse.
- Preserve forms, tracking functions, CTAs, original copy and page metadata.

Validation: production build passes all 31 sitemap checks. Targeted checks confirm one keyword section per affected page, inside main, before the site footer and the chosen middle anchor. Evaluating the runtime section expressions verifies matching headings/paragraphs for all seven exported routes and no section on an unrelated route. Updated scripts pass Node syntax checks. Browser visual and form-submission verification was unavailable.

Hostinger deployment remains required after saving the source update.
