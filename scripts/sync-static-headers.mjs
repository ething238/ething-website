import fs from 'node:fs/promises'
import path from 'node:path'
import { createServer } from 'vite'

const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })
try {
  await fs.mkdir('public/site-header', { recursive: true })
  await fs.copyFile('src/styles/site-header.css', 'public/site-header/site-header.css')
  await fs.mkdir('public/footer-brand', { recursive: true })
  await fs.copyFile('src/styles/footer-brand.css', 'public/footer-brand/footer-brand.css')
  const { renderStaticHeader } = await server.ssrLoadModule('/scripts/static-header-entry.jsx')
  const directories = await fs.readdir('public', { withFileTypes: true })
  let updated = 0
  for (const directory of directories.filter(entry => entry.isDirectory())) {
    const file = path.join('public', directory.name, 'index.html')
    let html = await fs.readFile(file, 'utf8').catch(() => null)
    if (!html?.includes('/hire-talent-chrome/site-chrome.js')) continue
    const route = '/' + directory.name
    html = html.replace(/<header\b[^>]*class="[^"]*hire-site-header[^"]*"[^>]*>[\s\S]*?<\/header>/, renderStaticHeader(route))
    const styles = '<link rel="stylesheet" href="/site-header/site-header.css"/>'
    if (!html.includes(styles)) html = html.replace('</head>', styles + '</head>')
    const footerStyles = '<link rel="stylesheet" href="/footer-brand/footer-brand.css"/>'
    if (!html.includes(footerStyles)) html = html.replace('</head>', footerStyles + '</head>')
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
  if (updated !== 9) throw new Error(`Expected nine standalone pages; found ${updated}`)
  console.log(`Synchronized ${updated} standalone headers with the About Us reference and footer branding.`)
} finally {
  await server.close()
}
