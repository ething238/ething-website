import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'

const sitemap = await fs.readFile('dist/sitemap.xml', 'utf8')
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname)
let expectedLinks
const internal = new Set()
for (const route of [...routes, '/visitor-dashboard', '/404']) {
  const file = route === '/' ? 'dist/index.html' : route === '/404' ? 'dist/404.html' : path.join('dist', route, 'index.html')
  const html = await fs.readFile(file, 'utf8')
  const footers = [...html.matchAll(/<footer\b[^>]*class="fs-footer"[^>]*>[\s\S]*?<\/footer>/g)]
  assert.equal(footers.length, 1, `${route}: expected one shared footer`)
  const footer = footers[0][0]
  assert.doesNotMatch(footer, /Instagram|AI Staff Augmentation|Product Security|Explore all talent/i, `${route}: removed footer content returned`)
  assert.match(footer, /AI engineering, Python development and Oracle EBS services/)
  assert.match(footer, /width="70" height="70"/)
  assert.doesNotMatch(footer, /Back to top|fs-back-top/, `${route}: removed bottom-row link returned`)
  assert.doesNotMatch(html, /<footer\b[^>]*class="(?:campaign-footer|hub-footer|hire-site-footer|about-copy-footer)/, `${route}: duplicate legacy footer`)
  const links = [...footer.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1])
  assert.equal(links.length, 35, `${route}: footer links are incomplete`)
  assert.equal(links.filter(href => href === '/privacy-policy').length, 1, `${route}: Privacy Policy must appear once`)
  const company = footer.match(/<nav\b[^>]*class="fs-company"[^>]*>[\s\S]*?<\/nav>/)?.[0]
  assert.ok(company, `${route}: missing Company navigation`)
  const companyLinks = [...company.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1])
  assert.deepEqual(companyLinks, ['/', '/about_us', '/staffing_services', '/blogs', '/careers'], `${route}: Company must keep five links with Home first`)
  const bottom = footer.match(/<div\b[^>]*class="fs-bottom"[^>]*>[\s\S]*?<\/div>/)?.[0]
  assert.match(bottom || '', /<a\b[^>]*href="\/privacy-policy"[^>]*>Privacy Policy<\/a>/, `${route}: Privacy Policy belongs in the bottom row`)
  if (!expectedLinks) expectedLinks = links
  assert.deepEqual(links, expectedLinks, `${route}: footer destinations differ`)
  for (const href of links) {
    if (href.startsWith('/')) {
      internal.add(href)
      const target = href === '/' ? 'dist/index.html' : path.join('dist', href, 'index.html')
      const targetHtml = await fs.readFile(target, 'utf8')
      assert.match(targetHtml, /<h1\b/i, `${route}: ${href} has no page content`)
      assert.doesNotMatch(targetHtml, /<title[^>]*>Page not found/i, `${route}: ${href} is a soft 404`)
    } else if (href.startsWith('mailto:')) assert.equal(href, 'mailto:support@ething.in')
    else if (href.startsWith('tel:')) assert.match(href, /^tel:\+[1-9]\d{9,14}$/)
    else if (href.startsWith('#')) assert.equal(href, '#top')
    else assert.ok(['https://www.linkedin.com/company/ething/', 'https://www.youtube.com/@ethingsolutions'].includes(href), `${route}: unexpected external destination`)
  }
}
await fs.access('dist/brand/ething-logo-new-font.png')
assert.equal(await fs.readFile('dist/site-footer/site-footer.css', 'utf8'), await fs.readFile('src/styles/site-footer.css', 'utf8'))

const report = { pages: routes.length + 2, linksPerFooter: expectedLinks.length, uniqueInternalDestinations: internal.size, live: [] }
if (process.argv.includes('--live')) {
  const destinations = [...internal]
  // Small batches avoid flooding the public server.
  for (let index = 0; index < destinations.length; index += 4) {
    const results = await Promise.all(destinations.slice(index, index + 4).map(async route => {
      const response = await fetch(`https://www.ethingsolutions.com${route}`, { signal: AbortSignal.timeout(25000) })
      const html = await response.text()
      assert.equal(response.status, 200, `${route}: public destination returned ${response.status}`)
      assert.match(html, /<h1\b/i, `${route}: public destination has no heading`)
      assert.doesNotMatch(html, /<title[^>]*>Page not found/i, `${route}: public soft 404`)
      return { route, status: response.status, finalUrl: response.url }
    }))
    report.live.push(...results)
  }
}
await fs.mkdir('artifacts/footer-release', { recursive: true })
await fs.writeFile('artifacts/footer-release/link-verification.json', JSON.stringify(report, null, 2))
console.log(`Verified shared footer on ${report.pages} pages: ${report.linksPerFooter} links each, ${internal.size} internal destinations.${report.live.length ? ` All ${report.live.length} public destinations return HTTP 200.` : ''}`)
