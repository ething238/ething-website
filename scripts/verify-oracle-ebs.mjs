import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'

const root = process.cwd()
const base = process.argv[2] || 'dist'
const page = fs.readFileSync(path.join(root, base, 'oracle-ebs/index.html'), 'utf8')
const assets = path.join(root, base, 'oracle-ebs/assets')
const analytics = fs.readFileSync(path.join(assets, 'analytics.js'), 'utf8')
const enquiry = fs.readFileSync(path.join(assets, 'enquiry.js'), 'utf8')
const interaction = fs.readFileSync(path.join(assets, 'page.js'), 'utf8')
const css = fs.readFileSync(path.join(assets, 'styles.css'), 'utf8')
for (const [name, code] of Object.entries({ analytics, enquiry, interaction })) new vm.Script(code, { filename: name + '.js' })
assert.equal((page.match(/<h1\b/g) || []).length, 1)
assert.equal((page.match(/<header\b/g) || []).length, 1)
assert.equal((page.match(/<footer\b/g) || []).length, 1)
assert.match(page, /<link rel="canonical" href="https:\/\/www\.ethingsolutions\.com\/oracle-ebs">/)
assert.match(page, /<a href="\/oracle-ebs" aria-current="page">Oracle EBS Staffing<\/a>/)
assert.doesNotMatch(page, /data:image\/|<video|\/assets\/index-[^\"]+\.js|Request Oracle EBS Talent/)
assert.match(css, /\[hidden\]\{display:none!important\}/)
assert.match(css, /prefers-reduced-motion:reduce/)
assert.match(interaction, /visibilitychange/)

function analyticsContext(hostname) {
  const inserted = [], ids = new Map()
  const context = {
    URL, Date, Set, location: { hostname, origin: 'https://' + hostname, pathname: '/oracle-ebs', protocol: 'https:' },
    document: {
      readyState: 'complete', referrer: 'https://example.test/start?email=private',
      createElement: () => ({}), getElementById: id => ids.get(id),
      head: { appendChild(script) { inserted.push(script); ids.set(script.id, script) } }
    },
    requestIdleCallback: callback => callback(), setTimeout: callback => callback()
  }
  context.window = context
  return { context, inserted }
}
const production = analyticsContext('www.ethingsolutions.com')
vm.runInNewContext(analytics, production.context)
vm.runInNewContext(analytics, production.context)
assert.equal(production.inserted.length, 2, 'one GTM loader and one GA4 loader')
assert.equal(production.context.dataLayer.filter(item => item[0] === 'config').length, 1)
assert.equal(production.context.dataLayer.find(item => item[0] === 'config')[1], 'G-2W7W1TB2H4')
assert.equal(production.context.dataLayer.find(item => item[0] === 'config')[2].page_referrer, 'https://example.test/start')
production.context.oracleEbsTrack('generate_lead')
production.context.oracleEbsTrack('unknown_event')
assert.equal(production.context.dataLayer.filter(item => item.event === 'generate_lead').length, 1)
assert(!JSON.stringify(production.context.dataLayer).includes('private'))
const local = analyticsContext('127.0.0.1')
vm.runInNewContext(analytics, local.context)
assert.equal(local.inserted.length, 0, 'local QA must not load business tracking')
assert.equal(local.context.dataLayer.length, 0)

async function testSubmission(kind) {
  const events = [], calls = [], timers = [], handlers = {}
  const values = { access_key: 'public-test-key', name: 'QA Example', email: 'qa@example.test', company: 'Example', phone: '+123456789', model: 'Contract staffing', requirements: 'A test request', botcheck: '' }
  if (kind === 'whitespace') values.name = '  '
  if (kind === 'bot') values.botcheck = 'on'
  const status = { textContent: '' }, fallback = { hidden: true }, button = { textContent: 'Send', disabled: false }
  const form = {
    querySelector: () => button, reportValidity: () => kind !== 'invalid',
    addEventListener: (name, callback) => handlers[name] = callback,
    setAttribute() {}, removeAttribute() {}
  }
  const context = {
    AbortController, Error, FormData: class { constructor() { return Object.entries(values) } },
    document: { querySelector: selector => ({ '#brief-form': form, '#form-status': status, '#email-fallback': fallback })[selector] },
    window: { oracleEbsTrack: event => events.push(event) },
    setTimeout: callback => { timers.push(callback); return timers.length }, clearTimeout() {},
    fetch: async (url, options) => {
      calls.push({ url, payload: JSON.parse(options.body) })
      if (kind === 'timeout') { timers[0](); throw new Error('aborted') }
      if (kind === 'network') throw new Error('network')
      if (kind === 'malformed') return { ok: true, json: async () => { throw new Error('html response') } }
      return { ok: kind !== 'failure', json: async () => ({ success: kind !== 'failure' }) }
    }
  }
  vm.runInNewContext(enquiry, context)
  handlers.input(); handlers.input()
  assert.equal(events.filter(event => event === 'lead_form_start').length, 1)
  const action = { preventDefault() {} }
  const pending = handlers.submit(action)
  await handlers.submit(action)
  await pending
  if (kind === 'success') {
    assert.equal(calls.length, 1, 'double clicks must not duplicate delivery')
    assert.equal(events.filter(event => event === 'generate_lead').length, 1)
    assert.equal(calls[0].payload.landingPage, '/oracle-ebs')
    assert.equal(calls[0].payload.hiringNeed, 'Oracle EBS: Contract staffing')
    assert.match(status.textContent, /has been sent/)
    assert(button.disabled)
    await handlers.submit(action)
    assert.equal(calls.length, 1, 'a completed enquiry must not be sent twice')
  } else {
    assert(!events.includes('generate_lead'), `${kind}: no conversion without confirmed delivery`)
    if (['invalid','whitespace','bot'].includes(kind)) assert.equal(calls.length, 0)
    else {
      assert(!button.disabled)
      assert(!fallback.hidden)
      assert.match(status.textContent, kind === 'timeout' ? /could not confirm/ : /was not sent/)
    }
  }
}
for (const kind of ['success','failure','malformed','network','timeout','invalid','whitespace','bot']) await testSubmission(kind)
console.log('Oracle EBS checks passed: rendered metadata, scoped assets, single tracking bootstrap, local tracking exclusion, privacy, and eight mocked enquiry outcomes. No live enquiry was sent.')
