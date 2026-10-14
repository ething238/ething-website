import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import postcss from 'postcss'

const html = await fs.readFile('dist/index.html', 'utf8')

test('homepage is prerendered at the existing canonical URL', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1)
  assert.match(html, /<h1[^>]*>IT Staff Augmentation Services<\/h1>/)
  assert.match(html, /rel="canonical"[^>]*href="https:\/\/www\.ethingsolutions\.com\/"/)
  for (const heading of ['Skills for your team', 'Client reviews', 'Hire software developers', 'AI for your business', 'Industries we support', 'Frequently asked questions', 'Contact us']) assert.ok(html.includes(heading), heading)
  assert.match(html, /<header\b/)
  assert.match(html, /<footer\b/)
  assert.doesNotMatch(html, /<meta[^>]*name="robots"[^>]*content="noindex/)
  assert.doesNotMatch(html, /Ways to work with us|It is also called IT staff aug\.|Suitable candidate profiles shared in/)
})

test('existing GA4 and GTM are each bootstrapped once', () => {
  assert.equal((html.match(/src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-2W7W1TB2H4"/g) || []).length, 1)
  assert.equal((html.match(/gtag\('config', 'G-2W7W1TB2H4'\)/g) || []).length, 1)
  assert.equal((html.match(/'dataLayer', 'GTM-TX73DK5H'\)/g) || []).length, 1)
  assert.equal((html.match(/src="https:\/\/www\.googletagmanager\.com\/ns\.html\?id=GTM-TX73DK5H"/g) || []).length, 1)
})

test('all Skills tabs reserve space but only one is accessible', () => {
  const panels = [...html.matchAll(/<div\b[^>]*class="expertise-panel"[^>]*>/g)].map(match => match[0])
  assert.equal(panels.length, 6)
  assert.equal(panels.filter(panel => panel.includes('aria-hidden="false"')).length, 1)
  assert.equal(panels.filter(panel => panel.includes('aria-hidden="true"') && panel.includes('inert=""')).length, 5)
  for (const id of ['software', 'ai', 'cloud', 'mobile', 'quality', 'embedded']) {
    assert.match(html, new RegExp(`aria-controls="area-panel-${id}"`))
    assert.match(html, new RegExp(`id="area-panel-${id}"`))
  }
})

test('homepage submits on site without triggering a native-submit conversion on attempts', () => {
  assert.match(html, /<button[^>]*type="button"[^>]*>Send enquiry/)
  const form = html.match(/<form\b[\s\S]*?<\/form>/)?.[0]
  assert.ok(form)
  assert.doesNotMatch(form, /type="submit"/)
  assert.doesNotMatch(html, /Open email draft|Review your enquiry|Copy enquiry/)
  for (const name of ['name', 'email', 'engagement', 'specialty', 'message']) assert.match(form, new RegExp(`name="${name}"`))
})

test('homepage CSS cannot target other pages or shared chrome', async () => {
  const css = postcss.parse(await fs.readFile('src/styles/homepage.css', 'utf8'))
  css.walkRules(rule => {
    let parent = rule.parent
    while (parent) { if (parent.type === 'atrule' && parent.name.includes('keyframes')) return; parent = parent.parent }
    for (const selector of rule.selectors) assert.ok(selector.startsWith('.homepage-reviewed'), selector)
  })
})
