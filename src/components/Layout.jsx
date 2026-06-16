import { useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ScrollToTopButton from './ScrollToTopButton.jsx'
import Seo from './Seo.jsx'
import { pageTitles, pageDescriptions } from '../data/siteContent.js'

const knownPaths = new Set(Object.keys(pageTitles))

const landingPagePaths = new Set(['/hire-developers-india'])

export default function Layout({ content, children }) {
  const location = useLocation()
  const pathname = location.pathname
  const isLandingPage = landingPagePaths.has(pathname)
  const isFullBleed = location.pathname === '/' || isLandingPage
  const isKnownRoute = knownPaths.has(pathname) || isLandingPage
  const title = isKnownRoute ? pageTitles[pathname] : 'Page not found - Ething'
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
        {children}
      </main>
      {!isLandingPage && <Footer content={content} />}
      {!isLandingPage && <ScrollToTopButton />}
    </div>
  )
}
