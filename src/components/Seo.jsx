import { Helmet } from 'react-helmet-async'
import { pageLabels } from '../data/relatedPages.js'
import { getSiteBaseUrl } from '../lib/siteBaseUrl.js'

function absoluteUrl(base, pathOrAbsolute) {
  if (!base || !pathOrAbsolute) return undefined
  if (pathOrAbsolute.startsWith('http://') || pathOrAbsolute.startsWith('https://')) {
    return pathOrAbsolute
  }
  return `${base}${pathOrAbsolute.startsWith('/') ? pathOrAbsolute : `/${pathOrAbsolute}`}`
}

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.pathname - router pathname, e.g. `/about_us`
 * @param {string} [props.ogImage] - absolute URL or path relative to site origin
 * @param {boolean} [props.noindex]
 * @param {object} [props.organizationJsonLd]
 * @param {string} [props.siteName] - for `og:site_name`
 */
export default function Seo({
  title,
  description,
  pathname,
  ogImage,
  noindex,
  organizationJsonLd,
  siteName = 'Ething',
}) {
  const base = getSiteBaseUrl()
  const canonicalHref =
    base && pathname != null
      ? `${base}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`
      : undefined
  const ogImageUrl = absoluteUrl(base, ogImage)

  const pageScript = canonicalHref && !noindex ? JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': pathname === '/about_us' ? 'AboutPage' : pathname === '/contact' ? 'ContactPage' : 'WebPage',
        '@id': `${canonicalHref}#webpage`,
        url: canonicalHref,
        name: title,
        description,
        inLanguage: 'en',
        isPartOf: { '@id': `${base}/#website` },
        ...(pathname !== '/' && { breadcrumb: { '@id': `${canonicalHref}#breadcrumb` } }),
      },
      ...(pathname !== '/' ? [{
        '@type': 'BreadcrumbList',
        '@id': `${canonicalHref}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
          { '@type': 'ListItem', position: 2, name: pageLabels[pathname] || title, item: canonicalHref },
        ],
      }] : []),
    ],
  }) : null

  const orgScript =
    organizationJsonLd && base
      ? JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              '@id': `${base}/#organization`,
              name: organizationJsonLd.brand?.name?.replace(/\s+/g, ' ').trim() || 'Ething',
              url: `${base}/`,
              description: organizationJsonLd.meta?.defaultDescription,
              logo: absoluteUrl(base, organizationJsonLd.meta?.defaultOgImage),
              email: organizationJsonLd.footer?.email,
              address: organizationJsonLd.footer?.address
                ? {
                    '@type': 'PostalAddress',
                    streetAddress: [
                      organizationJsonLd.footer.address.line1,
                      organizationJsonLd.footer.address.line2,
                    ]
                      .filter(Boolean)
                      .join(', '),
                    addressLocality: 'Gurugram',
                    addressRegion: 'Haryana',
                    postalCode: '122003',
                    addressCountry: 'IN',
                  }
                : undefined,
              contactPoint:
                Array.isArray(organizationJsonLd.footer?.phones) &&
                organizationJsonLd.footer.phones.length > 0
                  ? organizationJsonLd.footer.phones.map((p) => ({
                      '@type': 'ContactPoint',
                      telephone: p.value,
                      contactType: 'customer support',
                      areaServed: p.label,
                    }))
                  : undefined,
            },
            {
              '@type': 'WebSite',
              '@id': `${base}/#website`,
              url: `${base}/`,
              name: organizationJsonLd.meta?.siteName || 'Ething',
              publisher: { '@id': `${base}/#organization` },
            },
          ],
        })
      : null

  return (
    <Helmet htmlAttributes={{ lang: 'en' }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}

      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonicalHref && <meta property="og:url" content={canonicalHref} />}
      {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
      <meta property="og:site_name" content={siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImageUrl && <meta name="twitter:image" content={ogImageUrl} />}

      {pageScript && <script type="application/ld+json">{pageScript}</script>}
      {orgScript && (
        <script type="application/ld+json">{orgScript}</script>
      )}
    </Helmet>
  )
}
