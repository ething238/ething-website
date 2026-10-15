import { renderToStaticMarkup } from 'react-dom/server'
import SiteHeader from '../src/components/SiteHeader.jsx'
import { StaticRouter } from 'react-router-dom'
import RelatedServices from '../src/components/RelatedServices.jsx'

export function renderStaticHeader(activePath) {
  return renderToStaticMarkup(<SiteHeader activePath={activePath} staticMarkup />)
    .replace(/<link\b[^>]*rel="preload"[^>]*>/g, '')
}

export function renderStaticRelatedServices(pathname, links, title, description) {
  return renderToStaticMarkup(<StaticRouter location={pathname}>
    <RelatedServices pathname={pathname} links={links} title={title} description={description} nativeLinks />
  </StaticRouter>)
}
