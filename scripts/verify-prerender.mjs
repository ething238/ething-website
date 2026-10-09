import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'

const sitemap = await fs.readFile('dist/sitemap.xml', 'utf8')
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
const titles = new Set()
const descriptions = new Set()
for (const url of urls) {
  const route = new URL(url).pathname
  const file = route === '/' ? 'dist/index.html' : path.join('dist', route, 'index.html')
  const html = await fs.readFile(file, 'utf8')
  assert.equal((html.match(/<h1\b/gi) || []).length, 1, `${route}: expected one H1`)
  assert.match(html, /<a\b[^>]*href=/i, `${route}: missing crawlable links`)
  assert.match(html, /<meta\b[^>]*name="description"[^>]*content="[^"]+"/i, `${route}: missing description`)
  assert.equal((html.match(/<title\b/gi) || []).length, 1, `${route}: duplicate titles`)
  assert.equal((html.match(/<link\b[^>]*rel="canonical"/gi) || []).length, 1, `${route}: duplicate canonicals`)
  const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1]
  assert.equal(canonical, url, `${route}: canonical must match sitemap`)
  assert.doesNotMatch(html, /<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i, `${route}: unexpectedly noindex`)
  const title = html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1]
  assert.ok(title && !titles.has(title), `${route}: missing or duplicate title`)
  titles.add(title)
  const description = html.match(/<meta\b[^>]*name="description"[^>]*content="([^"]+)"/i)?.[1]
  assert.ok(!descriptions.has(description), `${route}: duplicate description`)
  descriptions.add(description)
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => JSON.parse(match[1]))
  assert.ok(schemas.length, `${route}: missing structured data`)
  if (route !== '/') {
    assert.match(html, /aria-label="Breadcrumb"/, `${route}: missing visible breadcrumb`)
    assert.ok(schemas.some((schema) => (schema['@graph'] || [schema]).some((node) => node['@type'] === 'BreadcrumbList')), `${route}: missing breadcrumb schema`)
  }
  if (route === '/healthcare_industry') {
    assert.equal(title, 'Healthcare Software Development &amp; IT Staffing | eThing', `${route}: reviewed title changed`)
    assert.equal(description, 'Explore healthcare software development with eThing: clinical workflows, EHR requirements, integration, testing and engineering team support.', `${route}: reviewed description changed`)
    assert.equal(canonical, 'https://www.ethingsolutions.com/healthcare_industry', `${route}: reviewed canonical changed`)
    assert.equal((html.match(/<h2\b/gi) || []).length, 6, `${route}: expected six section headings`)
    for (const id of ['consumer-health-applications', 'clinical-applications', 'navigation-systems', 'surgical-ui', 'integration-services', 'testing-validation']) {
      assert.equal((html.match(new RegExp(`<article\\b[^>]*id="${id}"`, 'g')) || []).length, 1, `${route}: missing or duplicate capability ${id}`)
    }
    const caseGrid = html.match(/<div\b[^>]*class="healthcare-case-grid"[^>]*>([\s\S]*?)<\/div>/)?.[1]
    assert.ok(caseGrid, `${route}: missing governance approach cards`)
    assert.equal((caseGrid.match(/<article\b/gi) || []).length, 3, `${route}: expected three governance approach cards`)
    assert.doesNotMatch(html, /healthcare-case-measures|On this page/i, `${route}: removed content returned`)
    assert.equal((html.match(/<img\b[^>]*src="\/brand\/ething-logo\.png"/g) || []).length, 2, `${route}: expected supplied PNG logo in header and footer`)
    assert.match(html, /<img\b[^>]*class="healthcare-hero-image"[^>]*src="\/healthcare\/healthcare-it-utopia\.png"/, `${route}: missing local healthcare hero`)

    assert.equal((html.match(/<script\b[^>]*src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-2W7W1TB2H4"/g) || []).length, 1, `${route}: expected one GA4 loader`)
    assert.equal((html.match(/gtag\(\s*['"]config['"]\s*,\s*['"]G-2W7W1TB2H4['"]/g) || []).length, 1, `${route}: expected one GA4 configuration`)
    assert.equal((html.match(/['"]dataLayer['"]\s*,\s*['"]GTM-TX73DK5H['"]\s*\)/g) || []).length, 1, `${route}: expected one GTM initialization`)
    assert.equal((html.match(/<noscript\b[^>]*>(?:(?!<\/noscript>)[\s\S])*?<iframe\b[^>]*src="https:\/\/www\.googletagmanager\.com\/ns\.html\?id=GTM-TX73DK5H"/g) || []).length, 1, `${route}: expected one GTM noscript iframe`)

    const nodes = schemas.flatMap((schema) => schema['@graph'] || [schema])
    const works = nodes.filter((node) => node['@type'] === 'CreativeWork')
    const pages = nodes.filter((node) => node['@type'] === 'WebPage')
    assert.equal(works.length, 1, `${route}: expected one governance CreativeWork`)
    assert.equal(pages.length, 1, `${route}: expected one WebPage`)
    const work = works[0]
    const page = pages[0]
    assert.equal(work['@id'], `${url}#ai-governance-approach`, `${route}: governance approach ID changed`)
    assert.equal(work.genre, 'Service experience and approach', `${route}: governance approach genre changed`)
    assert.ok(!Object.hasOwn(work, 'citation'), `${route}: governance approach must not contain a citation`)
    assert.deepEqual(page.hasPart, { '@id': work['@id'] }, `${route}: WebPage must link to its governance approach`)
    assert.deepEqual(work.isPartOf, { '@id': page['@id'] }, `${route}: governance approach must link back to WebPage`)
  }
  // Detect broken local links and image URLs, including SSR source asset leaks.
  for (const match of html.matchAll(/<(?:a|img)\b[^>]*(?:href|src)="([^"#]+)"/gi)) {
    const local = new URL(match[1], url)
    if (local.origin !== new URL(url).origin) continue
    const target = path.join('dist', decodeURIComponent(local.pathname))
    assert.ok(await fs.access(target).then(() => true, () => false), `${route}: missing local destination ${local.pathname}`)
  }
  assert.match(html, /<script\b[^>]*(?:src=|type="module")/, `${route}: missing interactive scripts`)
}
for (const file of ['dist/404.html', 'dist/visitor-dashboard/index.html']) {
  assert.match(await fs.readFile(file, 'utf8'), /content="noindex, follow"/)
}
assert.equal(await fs.readFile('dist/home.html', 'utf8'), await fs.readFile('dist/index.html', 'utf8'))
console.log(`Verified ${urls.length} sitemap pages: content, H1, unique titles, descriptions, canonicals and scripts.`)
