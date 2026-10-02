import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'

const sitemap = await fs.readFile('dist/sitemap.xml', 'utf8')
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
const titles = new Set()
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
  assert.match(html, /<script\b[^>]*(?:src=|type="module")/, `${route}: missing interactive scripts`)
}
for (const file of ['dist/404.html', 'dist/visitor-dashboard/index.html']) {
  assert.match(await fs.readFile(file, 'utf8'), /content="noindex, follow"/)
}
assert.equal(await fs.readFile('dist/home.html', 'utf8'), await fs.readFile('dist/index.html', 'utf8'))
console.log(`Verified ${urls.length} sitemap pages: content, H1, unique titles, descriptions, canonicals and scripts.`)
