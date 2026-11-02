import fs from 'node:fs/promises'
import path from 'node:path'
import { createServer } from 'vite'

// Render the same component into independent pages without adding a React runtime.
const directory = process.argv.includes('--dist') ? 'dist' : 'public'
const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })
try {
  const { renderStaticFooter } = await server.ssrLoadModule('/scripts/static-header-entry.jsx')
  const footer = renderStaticFooter()
  await fs.mkdir(path.join(directory, 'site-footer'), { recursive: true })
  await fs.copyFile('src/styles/site-footer.css', path.join(directory, 'site-footer/site-footer.css'))
  const entries = await fs.readdir(directory, { withFileTypes: true })
  let updated = 0
  for (const entry of entries.filter(item => item.isDirectory())) {
    const file = path.join(directory, entry.name, 'index.html')
    let html = await fs.readFile(file, 'utf8').catch(() => null)
    if (!html) continue
    const siteFooter = /<footer\b[^>]*class="(?:hire-site-footer|about-copy-footer[^"\n]*|fs-footer)"[^>]*>[\s\S]*?<\/footer>/g
    if (!siteFooter.test(html)) throw new Error(`${file}: missing site footer`)
    html = html.replace(siteFooter, footer)
      .replace(/<footer\b[^>]*class="(?:campaign-footer|hub-footer)"[^>]*>[\s\S]*?<\/footer>/g, '')
    const stylesheet = '<link rel="stylesheet" href="/site-footer/site-footer.css"/>'
    if (!html.includes(stylesheet)) html = html.replace('</head>', stylesheet + '</head>')
    if ((html.match(/class="fs-footer"/g) || []).length !== 1) throw new Error(`${file}: expected one shared footer`)
    await fs.writeFile(file, html)
    updated++
  }
  if (directory === 'public' && updated !== 11) throw new Error(`Expected 11 standalone footers; found ${updated}`)
  console.log(`Synchronized ${updated} ${directory} pages with the shared footer.`)
} finally {
  await server.close()
}
