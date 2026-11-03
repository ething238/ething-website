import fs from 'node:fs/promises'
import path from 'node:path'
import vm from 'node:vm'
import assert from 'node:assert/strict'

const ga = 'G-2W7W1TB2H4', gtm = 'GTM-T9DHQSVJ'
const base = process.argv[2] || 'dist'
const sitemap = await fs.readFile(path.join(base, 'sitemap.xml'), 'utf8')
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname)
const htmlFor = route => fs.readFile(path.join(base, route === '/' ? 'index.html' : route.slice(1) + '/index.html'), 'utf8')
const inline = html => [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1])

export function trackingFixture(hostname, pathname) {
  const loaded = [], ids = new Map()
  const append = script => { loaded.push(script.src); if (script.id) ids.set(script.id, script) }
  const context = {
    URL, Date, Set,
    location: { hostname, pathname, origin: 'https://' + hostname, protocol: 'https:' },
    document: {
      readyState: 'complete', referrer: 'https://example.test/',
      createElement: () => ({}), getElementById: id => ids.get(id),
      getElementsByTagName: () => [{ parentNode: { insertBefore: append } }],
      head: { appendChild: append },
    },
    requestIdleCallback: callback => callback(), setTimeout: callback => callback(),
  }
  context.window = context
  return { context, loaded }
}

for (const route of [...routes, '/visitor-dashboard']) {
  const html = await htmlFor(route)
  if (route === '/visitor-dashboard') assert.doesNotMatch(html, /googletagmanager\.com\/ns\.html/, 'Private dashboard must also exclude the noscript tracker')
  const scripts = [...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(m => m[1])
  assert.equal(scripts.filter(src => src.startsWith('/site-analytics-events.js?')).length, 1, route + ': shared contact click tracking')
  let run
  const app = scripts.find(src => /\/_app-[a-f0-9]+\.js/.test(src))
  if (app) {
    const source = await fs.readFile(path.join(base, new URL(app, 'https://local.invalid').pathname), 'utf8')
    const declaration = source.match(/let productionAnalytics=[\s\S]*?let f=[\s\S]*?;/)?.[0]
    assert.ok(declaration, route + ': exported-page preview exclusion')
    const gtmCode = source.match(/__html:("(?:[^"\\]|\\.)*")\.concat\(f,("(?:[^"\\]|\\.)*")\)/)
    const gaCode = source.match(/__html:("(?:[^"\\]|\\.)*")\.concat\(h,("(?:[^"\\]|\\.)*")\)/)
    assert.ok(gtmCode && gaCode, route + ': exported GA4 and GTM bootstrap')
    run = context => {
      const ids = vm.runInNewContext(declaration + ';({f,h})', { window: context, m: { env: {} } })
      if (ids.f) vm.runInNewContext(JSON.parse(gtmCode[1]) + ids.f + JSON.parse(gtmCode[2]), context)
      if (ids.h) {
        context.document.head.appendChild({ src: 'https://www.googletagmanager.com/gtag/js?id=' + ids.h })
        vm.runInNewContext(JSON.parse(gaCode[1]) + ids.h + JSON.parse(gaCode[2]), context)
      }
    }
  } else {
    const external = scripts.find(src => /^\/(?:oracle-ebs|banking-finance)\/assets\/analytics\.js/.test(src))
    const code = external ? [await fs.readFile(path.join(base, new URL(external, 'https://local.invalid').pathname), 'utf8')]
      : inline(html).filter(script => script.includes(gtm) || script.includes("function gtag()"))
    assert.ok(code.length, route + ': missing analytics bootstrap')
    run = context => code.forEach(script => vm.runInNewContext(script, context))
  }
  for (const hostname of ['www.ethingsolutions.com', 'ethingsolutions.com', '127.0.0.1', 'localhost', 'preview.example.test']) {
    const { context, loaded } = trackingFixture(hostname, route)
    run(context)
    if (!app) run(context) // Template and plain-script bootstraps must also be idempotent.
    const production = ['www.ethingsolutions.com', 'ethingsolutions.com'].includes(hostname) && route !== '/visitor-dashboard'
    assert.equal(loaded.filter(src => src?.includes('/gtm.js?id=' + gtm)).length, production ? 1 : 0, `${route} ${hostname}: GTM loader`)
    assert.equal(loaded.filter(src => src?.includes('/gtag/js?id=' + ga)).length, production ? 1 : 0, `${route} ${hostname}: GA4 loader`)
    const configs = (context.dataLayer || []).filter(item => item[0] === 'config' && item[1] === ga)
    assert.equal(configs.length, production ? 1 : 0, `${route} ${hostname}: GA4 configuration count`)
    assert.equal((context.dataLayer || []).filter(item => item.event === 'gtm.js').length, production ? 1 : 0, `${route} ${hostname}: GTM initialization count`)
  }
}
assert.match(await fs.readFile(path.join(base, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/www\.ethingsolutions\.com\/sitemap\.xml/)
console.log(`Verified GA4 and GTM on ${routes.length} public pages across both production hosts; previews and the private dashboard excluded. Contact-click tracking and sitemap discovery verified.`)
