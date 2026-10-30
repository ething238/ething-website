import fs from 'node:fs/promises'
import path from 'node:path'
import { createServer } from 'vite'

const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })
try {
  await fs.mkdir('public/site-header', { recursive: true })
  await fs.copyFile('src/styles/site-header.css', 'public/site-header/site-header.css')
  await fs.mkdir('public/footer-brand', { recursive: true })
  await fs.copyFile('src/styles/footer-brand.css', 'public/footer-brand/footer-brand.css')
  await fs.mkdir('public/page-spacing', { recursive: true })
  await fs.copyFile('src/styles/hiring-page-spacing.css', 'public/page-spacing/hiring-page-spacing.css')
  await fs.mkdir('public/related-services', { recursive: true })
  await fs.copyFile('src/styles/related-services.css', 'public/related-services/related-services.css')
  const { renderStaticHeader, renderStaticRelatedServices } = await server.ssrLoadModule('/scripts/static-header-entry.jsx')
  const directories = await fs.readdir('public', { withFileTypes: true })
  let updated = 0
  for (const directory of directories.filter(entry => entry.isDirectory())) {
    const file = path.join('public', directory.name, 'index.html')
    let html = await fs.readFile(file, 'utf8').catch(() => null)
    if (!html?.includes('/hire-talent-chrome/site-chrome.js')) continue
    const route = '/' + directory.name
    const favicon = '<link rel="icon" type="image/png" href="/brand/ething-logo-new-font.png"/>'
    if (!/<link\b[^>]*rel=["'](?:shortcut )?icon["']/i.test(html)) html = html.replace('</head>', favicon + '</head>')
    html = html.replace(/<header\b[^>]*class="[^"]*hire-site-header[^"]*"[^>]*>[\s\S]*?<\/header>/, renderStaticHeader(route))
    const styles = '<link rel="stylesheet" href="/site-header/site-header.css"/>'
    if (!html.includes(styles)) html = html.replace('</head>', styles + '</head>')
    const footerStyles = '<link rel="stylesheet" href="/footer-brand/footer-brand.css"/>'
    if (!html.includes(footerStyles)) html = html.replace('</head>', footerStyles + '</head>')
    const spacingStyles = '<link rel="stylesheet" href="/page-spacing/hiring-page-spacing.css"/>'
    if (!html.includes(spacingStyles)) html = html.replace('</head>', spacingStyles + '</head>')
    const relatedStyles = '<link rel="stylesheet" href="/related-services/related-services.css"/>'
    if (!html.includes(relatedStyles)) html = html.replace('</head>', relatedStyles + '</head>')
    const relatedPattern = /<section\b(?=[^>]*(?:data-ething-related-services="true"|aria-labelledby="related-services-heading"))[^>]*>[\s\S]*?<\/section>/g
    const existing = [...html.matchAll(relatedPattern)]
    if (existing.length !== 1) throw new Error(`${route}: expected one related-services strip`)
    const decode = text => text.replace(/&(?:amp|lt|gt|quot|apos);|&#(?:x[\da-f]+|\d+);/gi, entity => {
      const named = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'" }
      return named[entity.toLowerCase()] ?? String.fromCodePoint(entity[2].toLowerCase() === 'x' ? parseInt(entity.slice(3), 16) : parseInt(entity.slice(2), 10))
    })
    const strip = existing[0][0]
    const links = [...strip.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map(match => ({ path: decode(match[1]), label: decode(match[2].replace(/<[^>]*>/g, '')) }))
    if (links.length !== 3) throw new Error(`${route}: expected three related links`)
    const title = decode(strip.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/)[1])
    const description = decode(strip.match(/<p\b[^>]*>([\s\S]*?)<\/p>/)[1])
    const footerPattern = /<footer\b[^>]*class="hire-site-footer"[^>]*>/
    if (!footerPattern.test(html)) throw new Error(`${route}: missing visible site footer`)
    html = html.replace(relatedPattern, '').replace(footerPattern, match => renderStaticRelatedServices(route, links, title, description) + match)
    html = html.replace(/<footer\b[^>]*class="hire-site-footer"[^>]*>[\s\S]*?<\/footer>/g, footer => footer
      .replace(/Ething Solutions/g, 'eThing')
      .replace(/© 2026 Ething/g, '© 2026 eThing')
      .replace(/class="hire-site-logo"/g, 'class="hire-site-logo site-footer-logo"')
      .replace(/alt="Ething"/g, 'alt="eThing"')
      .replace(/aria-label="Ething home"/g, 'aria-label="eThing home"')
      .replace(/width="44" height="44"/g, 'width="60" height="60"'))
    html = html.replace(/(<footer\b[\s\S]*?<\/footer>)/g, footer => footer.replace(/© 2023/g, '© 2026'))
    await fs.writeFile(file, html)
    updated++
  }
  if (updated !== 8) throw new Error(`Expected eight standalone pages; found ${updated}`)
  console.log(`Synchronized ${updated} standalone headers with the About Us reference and footer branding.`)
} finally {
  await server.close()
}
