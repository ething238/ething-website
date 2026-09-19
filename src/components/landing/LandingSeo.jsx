import { Helmet } from 'react-helmet-async'
import { getSiteBaseUrl } from '../../lib/siteBaseUrl.js'
import { landingPageContent, landingPageMeta } from '../../data/landingPageContent.js'

function absoluteUrl(base, pathOrAbsolute) {
  if (!base || !pathOrAbsolute) return undefined
  if (pathOrAbsolute.startsWith('http://') || pathOrAbsolute.startsWith('https://')) {
    return pathOrAbsolute
  }
  return `${base}${pathOrAbsolute.startsWith('/') ? pathOrAbsolute : `/${pathOrAbsolute}`}`
}

function countryArea(code, name) {
  return { '@type': 'Country', name, alternateName: code }
}

function buildJsonLd(base, canonical, meta, content) {
  const orgId = `${base}/#organization`
  const pageId = `${canonical}#webpage`
  const serviceId = `${canonical}#service`
  const { geo } = meta

  const globalService = {
    '@type': 'Service',
    '@id': `${canonical}#service-global`,
    name: 'Hire Remote Developers from India - Global Companies',
    description:
      'Pre-vetted remote software engineers from India for small and mid-size global companies (20-300 employees). Staff augmentation, dedicated teams, and managed engineering.',
    provider: { '@id': orgId },
    areaServed: geo.targetCountryNames.map((name, i) => countryArea(geo.targetCountries[i], name)),
    audience: {
      '@type': 'BusinessAudience',
      audienceType: geo.audience,
    },
    serviceType: 'Global Remote Staff Augmentation from India',
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageId,
        url: canonical,
        name: meta.title,
        description: meta.description,
        isPartOf: { '@id': `${base}/#website` },
        about: { '@id': serviceId },
        inLanguage: 'en',
        audience: {
          '@type': 'Audience',
          audienceType: geo.audience,
          geographicArea: geo.targetCountryNames.map((name, i) =>
            countryArea(geo.targetCountries[i], name),
          ),
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: absoluteUrl(base, meta.ogImage),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: meta.breadcrumbLabel,
            item: canonical,
          },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': serviceId,
        name: 'Ething Solutions - Remote Engineering Talent from India',
        description: meta.description,
        url: canonical,
        image: absoluteUrl(base, meta.ogImage),
        provider: { '@id': orgId },
        areaServed: geo.targetCountryNames.map((name, i) =>
          countryArea(geo.targetCountries[i], name),
        ),
        audience: {
          '@type': 'BusinessAudience',
          audienceType: geo.audience,
        },
        knowsAbout: [
          'Remote staff augmentation from India',
          'Global offshore development teams',
          'Hire software developers in India',
          'Dedicated remote engineering teams',
          'Mid-size company engineering hiring',
        ],
        serviceType: content.services.items.map((s) => s.title),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Remote Engineering Hiring for Global Companies',
          itemListElement: content.services.items.map((s, i) => ({
            '@type': 'Offer',
            position: i + 1,
            areaServed: geo.targetCountryNames.map((name, j) =>
              countryArea(geo.targetCountries[j], name),
            ),
            itemOffered: {
              '@type': 'Service',
              name: s.title,
              description: s.description,
            },
          })),
        },
      },
      globalService,
      {
        '@type': 'Organization',
        '@id': orgId,
        name: meta.siteName,
        url: `${base}/`,
        logo: absoluteUrl(base, meta.ogImage),
        email: 'support@ething.in',
        telephone: '+1-929-557-4560',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Building Number 145, Sector 44 Rd',
          addressLocality: 'Gurugram',
          addressRegion: 'Haryana',
          postalCode: '122003',
          addressCountry: 'IN',
        },
        areaServed: geo.targetCountryNames.map((name, i) =>
          countryArea(geo.targetCountries[i], name),
        ),
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+1-929-557-4560',
            contactType: 'sales',
            areaServed: 'US',
            availableLanguage: ['English'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+1-929-557-4560',
            contactType: 'sales',
            areaServed: 'GB',
            availableLanguage: ['English'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+91-7011956780',
            contactType: 'customer support',
            areaServed: 'IN',
            availableLanguage: ['English'],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${base}/#website`,
        url: `${base}/`,
        name: meta.siteName,
        publisher: { '@id': orgId },
        inLanguage: 'en',
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: content.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  }
}

export default function LandingSeo({ meta = landingPageMeta, content = landingPageContent }) {
  const base = getSiteBaseUrl()
  const canonical = base ? `${base}${meta.path}` : undefined
  const ogImageUrl = absoluteUrl(base, meta.ogImage)
  const keywords = meta.keywords.join(', ')
  const jsonLd = base && canonical ? buildJsonLd(base, canonical, meta, content) : null
  const { geo } = meta

  return (
    <Helmet htmlAttributes={{ lang: 'en' }}>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Ething Solutions" />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />

      {/* Global audience targeting */}
      <meta name="geo.placename" content="Global" />
      <meta name="target" content={geo.audience} />
      <meta httpEquiv="content-language" content="en" />

      {canonical && <link rel="canonical" href={canonical} />}
      {canonical && <link rel="alternate" hrefLang="en" href={canonical} />}
      {canonical && <link rel="alternate" hrefLang="x-default" href={canonical} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      {canonical && <meta property="og:url" content={canonical} />}
      {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
      {ogImageUrl && (
        <meta
          property="og:image:alt"
          content={meta.ogImageAlt}
        />
      )}
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {ogImageUrl && <meta name="twitter:image" content={ogImageUrl} />}
      {ogImageUrl && (
        <meta
          name="twitter:image:alt"
          content={meta.ogImageAlt}
        />
      )}

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
