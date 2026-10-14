import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const deliverySource = readFileSync(new URL('../src/lib/web3forms.js', import.meta.url), 'utf8').replaceAll('import.meta.env', 'env').replaceAll('export ', '') + '\nmodule.exports = sendWeb3FormsEmail'
const enquirySource = readFileSync(new URL('../src/lib/homepageEnquiry.js', import.meta.url), 'utf8').replace(/^import .*\n/gm, '').replace('export async function', 'async function') + '\nmodule.exports = submitHomepageEnquiry'
const lead = { name: 'Test Visitor', email: 'visitor@example.invalid', engagement: 'Dedicated team', specialty: 'AI & data', message: 'Test project requirements.' }

function fixture({ configured = true, ok = true, accepted = true, networkError = false, malformed = false } = {}) {
  const requests = [], events = [], delivery = { exports: {} }, enquiry = { exports: {} }
  vm.runInNewContext(deliverySource, { module: delivery, env: { VITE_WEB3FORMS_ACCESS_KEY: configured ? 'test-key' : '' }, console: { error() {} }, fetch: async (url, options) => {
    requests.push({ url, body: JSON.parse(options.body) })
    if (networkError) throw new Error('private service details')
    return { ok, json: async () => { if (malformed) throw new Error('invalid response'); return { success: accepted } } }
  } })
  vm.runInNewContext(enquirySource, { module: enquiry, sendWeb3FormsEmail: delivery.exports, trackEvent: (name, params) => events.push({ name, params }) })
  return { requests, events, submit: enquiry.exports }
}

test('invalid or empty required values never reach the delivery service', async () => {
  const f = fixture()
  for (const key of ['name', 'email', 'message']) assert.equal((await f.submit({ ...lead, [key]: ' ' })).ok, false)
  assert.equal((await f.submit({ ...lead, email: 'invalid' })).ok, false)
  assert.equal((await f.submit(null)).ok, false)
  assert.equal(f.requests.length, 0)
})

test('the homepage sends all form fields to the existing contact service', async () => {
  const f = fixture()
  assert.equal((await f.submit(lead)).ok, true)
  assert.equal(f.requests.length, 1)
  assert.equal(f.requests[0].url, 'https://api.web3forms.com/submit')
  assert.equal(f.requests[0].body.access_key, 'test-key')
  for (const value of Object.values(lead)) assert.ok(f.requests[0].body.message.includes(value))
  assert.ok(f.requests[0].body.message.includes('Source page: /'))
  assert.deepEqual(f.events.map(event => event.name), ['lead_form_submit', 'lead_form_success', 'generate_lead'])
  for (const event of f.events) assert.doesNotMatch(JSON.stringify(event.params), /visitor@|Test Visitor|Test project/)
})

test('missing configuration, rejected responses, malformed responses and network failures cannot report success', async () => {
  for (const options of [{ configured: false }, { ok: false }, { accepted: false }, { malformed: true }, { networkError: true }]) {
    const f = fixture(options)
    assert.equal((await f.submit(lead)).ok, false)
    assert.deepEqual(f.events.map(event => event.name), ['lead_form_submit', 'lead_form_error'])
  }
})

test('the email subject removes line breaks', async () => {
  const f = fixture()
  await f.submit({ ...lead, engagement: 'Team\r\nBcc: other@example.invalid', specialty: 'Cloud\nHeader' })
  assert.doesNotMatch(f.requests[0].body.subject, /[\r\n]/)
})
