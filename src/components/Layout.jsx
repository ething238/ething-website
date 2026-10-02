import { Link, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ScrollToTopButton from './ScrollToTopButton.jsx'
import Seo from './Seo.jsx'
import KeywordPageContent from './KeywordPageContent.jsx'
import RelatedServices from './RelatedServices.jsx'
import { pageLabels } from '../data/relatedPages.js'
import { pageTitles, pageDescriptions } from '../data/siteContent.js'
import { technologyLandingPagePaths } from '../data/technologyLandingPages.js'

const knownPaths = new Set(Object.keys(pageTitles))

const landingPagePaths = new Set(['/hire-developers-india', ...technologyLandingPagePaths])

export default function Layout({ content, children }) {
  const location = useLocation()
  const pathname = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '')
  const isLandingPage = landingPagePaths.has(pathname)
  const isFullBleed = location.pathname === '/' || isLandingPage
  const isKnownRoute = knownPaths.has(pathname) || isLandingPage
  const title = pathname === '/visitor-dashboard' ? 'Visitor Dashboard - Ething' : isKnownRoute ? pageTitles[pathname] : 'Page not found - Ething'
  const description = isKnownRoute
    ? pageDescriptions[pathname]
    : 'The page you are looking for is not available. Browse Ething for software engineering, staffing, and services.'

  return (
    <div className="flex min-h-screen flex-col">
      {!isLandingPage && (
        <Seo
          title={title}
          description={description}
          pathname={pathname}
          ogImage={content.meta.defaultOgImage}
          noindex={!isKnownRoute}
          organizationJsonLd={pathname === '/' ? content : undefined}
          siteName={content.meta.siteName}
        />
      )}
      {!isLandingPage && <Header content={content} />}
      <main
        className={
          isFullBleed
            ? 'flex-1'
            : 'flex-1 bg-zinc-50'
        }
      >
        {pathname !== '/' && isKnownRoute && (
          <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6 text-sm text-zinc-600 sm:px-6 lg:px-8">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{pageLabels[pathname]}</li>
            </ol>
          </nav>
        )}
        {children}
        {isKnownRoute && !isLandingPage && <KeywordPageContent pathname={pathname} />}
        {isKnownRoute && <RelatedServices pathname={pathname} />}
      </main>
      {!isLandingPage && <Footer content={content} />}
      {!isLandingPage && <ScrollToTopButton />}
    </div>
  )
}
