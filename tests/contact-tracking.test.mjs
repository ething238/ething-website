import fs from 'node:fs'
import vm from 'node:vm'
import assert from 'node:assert/strict'
import test from 'node:test'

const formSource = fs.readFileSync('src/components/ContactForm.jsx', 'utf8')
const logic = formSource.slice(0, formSource.indexOf('  const fieldClass'))
  .replace(/^import .*\r?\n/gm, '')
  .replace('export default function ContactForm', 'function ContactForm')
  .replaceAll('import.meta.env', 'env')
  + '\nreturn {onSubmit,status};}\nmodule.exports=ContactForm;'
function fixture({ response = { ok: true, json: async () => ({ success: true }) }, key = 'public-test-key' } = {}) {
  const slots = [], events = [], requests = []
  let cursor = 0, resets = 0
  const module = { exports: {} }
  vm.runInNewContext(logic, {
    module, window: { location: { pathname: '/contact' } }, web3formsAccessKey: key,
    useState(initial) { const i = cursor++; if (!(i in slots)) slots[i] = initial; return [slots[i], v => { slots[i] = v }] },
    useRef(initial) { const i = cursor++; return slots[i] ||= { current: initial } },
    trackEvent: (name, params) => events.push({ name, params }),
    FormData: class { get(name) { return ({ name: 'Private Visitor', email: 'private@example.test', phone: '+15555550100', subject: 'Private subject', message: 'Private message' })[name] } },
    fetch: async (url, options) => { requests.push({ url, options }); if (typeof response === 'function') return response(); return response },
  })
  const render = () => { cursor = 0; return module.exports({ content: { contactSection: { form: {}, homeTitle: 'Contact us' } } }) }
  const submit = () => render().onSubmit({ preventDefault() {}, currentTarget: { reset() { resets++ } } })
  return { render, submit, events, requests, resets: () => resets }
}
test('contact enquiry records one confirmed lead and never sends contact fields to Analytics', async () => {
  const f = fixture(); await f.submit(); await f.submit()
  assert.equal(f.requests.length, 1)
  assert.equal(f.resets(), 1)
  assert.equal(f.render().status, 'success')
  assert.deepEqual(f.events.map(e => e.name), ['lead_form_submit', 'lead_form_success', 'generate_lead'])
  assert.doesNotMatch(JSON.stringify(f.events), /Private|private@example|15555550100/)
  for (const { params } of f.events) assert.deepEqual(Object.keys(params).sort(), ['form_name', 'landing_page'])
})
test('failed, malformed and unconfirmed contact responses never record a lead', async () => {
  for (const response of [
    { ok: false, json: async () => ({ success: true }) },
    { ok: true, json: async () => ({ success: false }) },
    { ok: true, json: async () => ({ success: 'true' }) },
    { ok: true, json: async () => { throw Error('invalid JSON') } },
    () => { throw Error('network failure') },
  ]) {
    const f = fixture({ response }); await f.submit()
    assert.equal(f.render().status, 'error')
    assert.equal(f.events.filter(e => ['lead_form_success', 'generate_lead'].includes(e.name)).length, 0)
    assert.equal(f.events.filter(e => e.name === 'lead_form_error').length, 1)
  }
})
test('missing delivery configuration and repeated clicks cannot create extra conversions', async () => {
  const missing = fixture({ key: '' }); await missing.submit()
  assert.equal(missing.requests.length, 0)
  assert.deepEqual(missing.events.map(e => e.name), ['lead_form_error'])
  let complete
  const f = fixture({ response: () => new Promise(resolve => { complete = resolve }) })
  const first = f.submit(); await f.submit()
  assert.equal(f.requests.length, 1)
  complete({ ok: true, json: async () => ({ success: true }) }); await first
  assert.equal(f.events.filter(e => e.name === 'generate_lead').length, 1)
})

test('contact links record intent once without sending addresses or phone numbers', () => {
  const code = fs.readFileSync('public/site-analytics-events.js', 'utf8')
  const handlers = [], calls = []
  const window = { location: { pathname: '/about_us' }, gtag: (...args) => calls.push(args) }
  const context = { window, document: { addEventListener: (name, handler) => handlers.push(handler) } }
  vm.runInNewContext(code, context); vm.runInNewContext(code, context)
  assert.equal(handlers.length, 1)
  for (const href of ['mailto:private@example.test', 'tel:+15555550100', '/contact']) {
    const link = { getAttribute: () => href, closest: selector => selector === 'footer' ? {} : null }
    handlers[0]({ target: { closest: () => link } })
  }
  assert.equal(calls.length, 2)
  assert.deepEqual(Array.from(window.dataLayer, item => item.contact_method), ['email', 'phone'])
  assert.doesNotMatch(JSON.stringify({ calls, events: window.dataLayer }), /private@example|15555550100/)
  assert.ok(calls.every(args => args[1] === 'contact_click' && args[2].send_to === 'G-2W7W1TB2H4'))
})
