import { useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ScrollToTopButton from './ScrollToTopButton.jsx'
import Seo from './Seo.jsx'
import KeywordPageContent from './KeywordPageContent.jsx'
import RelatedServices from './RelatedServices.jsx'
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

  // Reviewed pages own their layout and metadata; keep their App-level trackers.
  if (pathname === '/hire-ai-developers' || pathname === '/about_us' || pathname === '/healthcare_industry' || pathname === '/aerospace_industry' || pathname === '/website-development' || pathname === '/mobile_application' || pathname === '/ai_staff_augmentation' || pathname === '/sap-services' || pathname === '/salesforce-staff-augmentation' || pathname === '/oracle-ebs') return children

  return (
    <div className={'flex min-h-screen flex-col' + (pathname === '/' ? ' homepage-layout' : '')}>
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
        {children}
        {pathname !== '/' && isKnownRoute && !isLandingPage && <KeywordPageContent pathname={pathname} />}
        {pathname !== '/' && isKnownRoute && !isLandingPage && <RelatedServices pathname={pathname} />}
      </main>
      {!isLandingPage && <Footer content={content} />}
      {!isLandingPage && <ScrollToTopButton />}
    </div>
  )
}
