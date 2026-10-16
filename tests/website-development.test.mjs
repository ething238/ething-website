import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'

const html = fs.readFileSync('dist/website-development/index.html', 'utf8')
const homepage = fs.readFileSync('dist/index.html', 'utf8')

test('website HTML has the fixed canonical, complete content and engineering navigation', () => {
  assert.match(html, /rel="canonical"[^>]*href="https:\/\/www\.ethingsolutions\.com\/website-development"/)
  assert.equal((html.match(/<h1\b/g) || []).length, 1)
  assert.equal((html.match(/role="tabpanel"/g) || []).length, 8)
  assert.equal((html.match(/<details\b/g) || []).length, 19) // 16 FAQs and 3 header dropdowns.
  const menu = html.match(/<nav class="about-copy-nav"[\s\S]*?<\/nav>/)?.[0]
  assert.ok(menu?.indexOf('Software Development') < menu?.indexOf('Website Development'))
  assert.ok(menu?.indexOf('Website Development') < menu?.indexOf('Mobile Application'))
  assert.match(html, /href="\/website-development"[^>]*aria-current="page"/)
  assert.match(fs.readFileSync('dist/sitemap.xml', 'utf8'), /<loc>https:\/\/www\.ethingsolutions\.com\/website-development<\/loc>/)
  assert.ok(html.indexOf('type="application/ld+json"') > html.indexOf('<div id="root">'), 'JSON-LD must stay in its hydrated tree')
  const rewrites = JSON.parse(fs.readFileSync('vercel.json', 'utf8')).rewrites
  assert.equal(rewrites.find(rule => rule.source === '/website-development')?.destination, '/website-development/index.html')
})

test('website GA4 and GTM bootstrap matches the homepage without duplicate loaders', () => {
  for (const page of [html, homepage]) {
    assert.equal((page.match(/src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-2W7W1TB2H4"/g) || []).length, 1)
    assert.equal((page.match(/gtag\('config', 'G-2W7W1TB2H4'\)/g) || []).length, 1)
    assert.equal((page.match(/'dataLayer', 'GTM-TX73DK5H'\)/g) || []).length, 1)
    assert.equal((page.match(/src="https:\/\/www\.googletagmanager\.com\/ns\.html\?id=GTM-TX73DK5H"/g) || []).length, 1)
  }
})

test('website form events use the shared GA4 and GTM sender without contact details', () => {
  const formSource = fs.readFileSync('src/components/website-development/WebsiteProjectForm.jsx', 'utf8')
  const source = fs.readFileSync('src/lib/tracking.js', 'utf8').replaceAll('import.meta.env', 'env').replaceAll('export ', '')
  const module = { exports: {} }, calls = [], window = { dataLayer: [], gtag: (...args) => calls.push(args) }
  const track = formSource.match(/function track\(event\) \{[\s\S]*?\n\}/)?.[0]
  assert.ok(track)
  vm.runInNewContext(source + '\n' + track + '\nmodule.exports = { track };', { module, window, env: {} })
  for (const event of ['lead_form_view', 'lead_form_start', 'lead_form_submit', 'lead_form_success', 'generate_lead', 'lead_form_error']) {
    module.exports.track(event)
    assert.equal(window.dataLayer.filter(entry => entry.event === event).length, 1)
    assert.equal(calls.filter(args => args[0] === 'event' && args[1] === event).length, 1)
  }
  for (const entry of window.dataLayer) assert.deepEqual(Object.keys(entry).sort(), ['event', 'form_name', 'landing_page'])
})
