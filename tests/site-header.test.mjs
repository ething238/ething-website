import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import postcss from 'postcss'

const files = (await fs.readdir('dist', { recursive: true })).filter(file => file.endsWith('.html'))
const pages = await Promise.all(files.map(async file => ({ file, html: await fs.readFile(path.join('dist', file), 'utf8') })))
const reference = pages.find(page => page.file === path.join('about_us', 'index.html'))
const desktopNav = html => html.match(/<nav class="about-copy-nav"[\s\S]*?<\/nav>/)?.[0].replace(/ aria-current="page"/g, '')

test('every rendered page uses the About Us header and navigation', () => {
  const expected = desktopNav(reference.html)
  assert.ok(expected)
  for (const { file, html } of pages) {
    const headers = [...html.matchAll(/<header\b[^>]*class="[^"]*ething-header[^>]*>[\s\S]*?<\/header>/g)]
    assert.equal(headers.length, 1, `${file}: expected one common header`)
    assert.equal(desktopNav(headers[0][0]), expected, `${file}: navigation differs from About Us`)
    assert.match(headers[0][0], /class="about-copy-logo brand-logo"/)
    if (['hire-ai-developers', 'sap-services', 'salesforce-staff-augmentation'].some(route => file === path.join(route, 'index.html'))) {
      assert.match(headers[0][0], /src="\/website-development\/brand\/ething-logo-192\.webp"/)
      assert.match(headers[0][0], /srcSet="[^\"]*ething-logo-96\.webp 96w/)
    } else assert.match(headers[0][0], /src="\/brand\/ething-logo-new-font\.png"/)
    assert.match(headers[0][0], /aria-controls="about-copy-mobile-nav"/)
  }
})

test('all visible page footer copyrights show 2026', () => {
  for (const { file, html } of pages) {
    const footers = [...html.matchAll(/<footer\b[\s\S]*?<\/footer>/g)].map(match => match[0]).join('')
    assert.match(footers, /©\s*(?:<!--[^>]*-->\s*)?2026/, `${file}: missing 2026 copyright`)
    assert.doesNotMatch(footers, /©\s*(?:<!--[^>]*-->\s*)?2023/, `${file}: obsolete copyright`)
  }
})

test('exported and React pages use the same scoped header CSS and logo sizes', async () => {
  const css = await fs.readFile('src/styles/site-header.css', 'utf8')
  assert.equal(await fs.readFile('public/site-header/site-header.css', 'utf8'), css)
  assert.match(css, /\.ething-header \.about-copy-logo\.brand-logo img\s*\{\s*width:60px; height:60px;/)
  assert.match(css, /@media\(max-width:639px\)/)
  assert.match(css, /width:48px;height:48px/)
  postcss.parse(css).walkRules(rule => { for (const selector of rule.selectors) assert.ok(selector.startsWith('.ething-header'), selector) })
})
