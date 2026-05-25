import { useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ScrollToTopButton from './ScrollToTopButton.jsx'
import Seo from './Seo.jsx'
import { pageTitles, pageDescriptions } from '../data/siteContent.js'

const knownPaths = new Set(Object.keys(pageTitles))

export default function Layout({ content, children }) {
  const location = useLocation()
  const isFullBleed = location.pathname === '/'
  const pathname = location.pathname
  const isKnownRoute = knownPaths.has(pathname)
  const title = isKnownRoute ? pageTitles[pathname] : 'Page not found — Ething'
  const description = isKnownRoute
    ? pageDescriptions[pathname]
    : 'The page you are looking for is not available. Browse Ething for software engineering, staffing, and services.'

  return (
    <div className="flex min-h-screen flex-col">
      <Seo
        title={title}
        description={description}
        pathname={pathname}
        ogImage={content.meta.defaultOgImage}
        noindex={!isKnownRoute}
        organizationJsonLd={pathname === '/' ? content : undefined}
        siteName={content.meta.siteName}
      />
      <Header content={content} />
      <main
        className={
          isFullBleed
            ? 'flex-1'
            : 'flex-1 bg-zinc-50'
        }
      >
        {children}
      </main>
      <Footer content={content} />
      <ScrollToTopButton />
    </div>
  )
}
