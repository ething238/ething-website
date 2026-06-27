# Ething Website

Marketing website for [Ething Solutions](https://www.ethingsolutions.com) — a software engineering and AI staff augmentation company based in India, serving enterprise and SMB clients globally.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + React Router v7 |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| SEO | react-helmet-async |
| Hosting | Hostinger (static + PHP backend) |

## Project Structure

```
src/
├── App.jsx                     # Router, all routes defined here
├── main.jsx                    # Entry point
├── index.css                   # Global styles + Tailwind
├── assets/                     # Images (portraits, hero)
├── components/
│   ├── landing/                # Components exclusive to /hire-developers-india
│   │   ├── AnimatedCounter.jsx
│   │   ├── CalendlyButton.jsx
│   │   ├── ClientsSection.jsx
│   │   ├── ExitIntentPopup.jsx
│   │   ├── HeroIllustration.jsx
│   │   ├── IcpSection.jsx
│   │   ├── LandingFooter.jsx
│   │   ├── LandingHeader.jsx
│   │   ├── LandingSeo.jsx
│   │   ├── LeadCaptureModal.jsx
│   │   ├── LeadForm.jsx
│   │   ├── StickyMobileCta.jsx
│   │   └── lpCtaStyles.js
│   └── sections/               # Home page section components
├── data/
│   ├── siteContent.js          # Single source of truth for all site copy
│   ├── landingPageContent.js   # Copy for /hire-developers-india
│   └── pageTitles.js           # Page titles by route (used for sitemap)
├── lib/
│   ├── tracking.js             # GTM, GA4, Meta Pixel, Clarity, Google Ads
│   ├── googleSheets.js         # Lead-to-Google-Sheets pipeline
│   ├── hubspot.js              # HubSpot Forms API
│   ├── web3forms.js            # Email notifications for new leads
│   ├── mediumFeed.js           # Medium RSS feed reader
│   ├── utmParams.js            # UTM param capture and persistence
│   └── siteBaseUrl.js          # Canonical URL helper
└── pages/                      # One file per route
public/
├── api/
│   ├── visit.php               # Logs page visits to Supabase
│   └── visits.php              # Reads visits for /visitor-dashboard
├── clients/                    # Client logo SVGs/PNGs
├── images/                     # Logo, testimonial images
└── config.json                 # Runtime config fallback (for Hostinger deploys)
```

## Pages & Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about_us` | About (team, vision, leaders) |
| `/staffing_services` | Staffing Services |
| `/ai_staff_augmentation` | AI Staff Augmentation |
| `/engineering-services` | Engineering Services overview |
| `/software_development` | Software Development |
| `/mobile_application` | Mobile Application |
| `/firmware_engg` | Firmware Engineering |
| `/cloud_services` | Cloud Services |
| `/quality_testing` | QA & Testing |
| `/product_security` | Product Security |
| `/healthcare_industry` | Healthcare Industry |
| `/aerospace_industry` | Aerospace & Defence |
| `/automotive_industry` | Automotive |
| `/railways_industries` | Railways |
| `/banking_finance_industry` | Banking & Finance |
| `/education_industry` | Education |
| `/blogs` | Blog (Medium RSS) |
| `/careers` | Careers |
| `/contact` | Contact form |
| `/privacy-policy` | Privacy Policy |
| `/hire-developers-india` | **Google Ads landing page** |
| `/visitor-dashboard` | Internal analytics dashboard |

Legacy redirect aliases: `/about` → `/about_us`, `/staffing-services` → `/staffing_services`, `/ai-staff-augmentation` → `/ai_staff_augmentation`

## Editing Content

All website copy, navigation, service cards, testimonials, industry pages, and engineering pages are controlled from a single file:

```
src/data/siteContent.js
```

The Google Ads landing page copy is in:

```
src/data/landingPageContent.js
```

Editing either file updates the entire site — no component changes needed for copy updates.

## Environment Variables

Copy `.env.example` to `.env.local` for local development, or set these in `.env.production` for production builds.

```bash
# Contact form (web3forms.com — free tier)
VITE_WEB3FORMS_ACCESS_KEY=

# Canonical site URL (no trailing slash)
VITE_SITE_URL=https://www.ethingsolutions.com

# Medium blog RSS
VITE_MEDIUM_FEED_URL=https://medium.com/feed/@EthingSolutions
VITE_MEDIUM_PROFILE_URL=https://medium.com/@EthingSolutions
VITE_RSS2JSON_API_KEY=          # Optional — higher rate limits

# Calendly (discovery calls)
VITE_CALENDLY_URL=https://calendly.com/ankgupta79/introduction-meeting

# Analytics
VITE_GTM_ID=                    # Google Tag Manager container ID
VITE_GA4_MEASUREMENT_ID=        # GA4 Measurement ID (G-XXXXXXXXXX)

# Google Ads conversion tracking (/hire-developers-india lead form)
VITE_GOOGLE_ADS_CONVERSION_ID=  # AW-XXXXXXXXX
VITE_GOOGLE_ADS_CONVERSION_LABEL=

# Meta Pixel (optional)
VITE_META_PIXEL_ID=

# Microsoft Clarity (optional)
VITE_CLARITY_PROJECT_ID=

# HubSpot CRM (landing page lead form)
VITE_HUBSPOT_PORTAL_ID=
VITE_HUBSPOT_FORM_GUID=

# Supabase (visitor analytics — server-side PHP only, not exposed to browser)
VITE_SUPABASE_URL=
SUPABASE_SECRET_KEY=
```

> **Hostinger deploy note:** If env vars are missing from the build, the app falls back to reading `public/config.json` at runtime. Keep that file in sync for keys that change without redeployment.

## Development

```bash
npm install
npm run dev        # starts local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

## Integrations

### Lead Capture (`/hire-developers-india`)

On form submit, three things fire in parallel:

1. **HubSpot** (`src/lib/hubspot.js`) — creates a contact in CRM via Forms API
2. **Google Sheets** (`src/lib/googleSheets.js`) — appends a row via Apps Script webhook (hidden form POST, image beacon fallback)
3. **Web3Forms** (`src/lib/web3forms.js`) — sends an email notification to the team

### Conversion Tracking

`trackLeadConversion()` in `src/lib/tracking.js` fires on every successful form submit:

- GTM `dataLayer` push (`generate_lead`)
- `gtag('event', 'generate_lead')` → GA4
- `gtag('event', 'conversion', { send_to: 'AW-ID/LABEL' })` → Google Ads
- `fbq('track', 'Lead')` → Meta Pixel (if configured)

### Visitor Analytics (PHP + Supabase)

Every page navigation fires a beacon to `/api/visit` (PHP). The script:
- Resolves visitor geo via `ipapi.co` (fallback: `ipwho.is`)
- Detects browser, platform, screen, language, timezone
- Assigns a persistent `visitor_id` cookie (1 year)
- Writes a row to the `visitor_visits` table in Supabase

Results are viewable at `/visitor-dashboard`.

## Deployment

Build and upload `dist/` to Hostinger via FTP or the file manager. The `public/.htaccess` handles SPA routing (all paths → `index.html`).

```bash
npm run build
# upload dist/ to Hostinger public_html
```
