import { renderToStaticMarkup } from 'react-dom/server'
import SiteHeader from '../src/components/SiteHeader.jsx'

export function renderStaticHeader(activePath) {
  return renderToStaticMarkup(<SiteHeader activePath={activePath} staticMarkup />)
    .replace(/<link\b[^>]*rel="preload"[^>]*>/g, '')
}
