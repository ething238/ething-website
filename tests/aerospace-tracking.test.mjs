import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'

// Exercise the shared sender used by Aerospace against the existing inline tags.
const source = readFileSync(new URL('../src/lib/tracking.js', import.meta.url), 'utf8')
  .replaceAll('import.meta.env', 'env').replaceAll('export ', '')
  + '\nmodule.exports = { initTracking, trackEvent }'

test('Aerospace events reach GTM and GA4 exactly once without another tag bootstrap', () => {
  const module = { exports: {} }, calls = [], injected = []
  const window = { dataLayer: [], gtag: (...args) => calls.push(args) }
  const document = {
    querySelector: () => ({}),
    getElementById: () => null,
    createElement: tag => ({ tag }),
    head: { appendChild: tag => injected.push(tag) },
    body: { prepend: tag => injected.push(tag) },
  }
  vm.runInNewContext(source, { module, window, document, env: { VITE_GTM_ID: 'GTM-TX73DK5H', VITE_GA4_MEASUREMENT_ID: 'G-2W7W1TB2H4' } })
  module.exports.initTracking()
  module.exports.initTracking()
  for (const name of ['lead_form_view', 'lead_form_start', 'lead_form_submit', 'lead_form_success', 'generate_lead']) {
    module.exports.trackEvent(name, { landing_page: '/aerospace_industry', form_name: 'aerospace_enquiry', page_category: 'aerospace' })
    assert.equal(window.dataLayer.filter(event => event.event === name).length, 1)
    assert.equal(calls.filter(args => args[0] === 'event' && args[1] === name).length, 1)
  }
  assert.equal(injected.length, 0)
})

test('tracking is safe during prerendering with no browser globals', () => {
  const module = { exports: {} }
  vm.runInNewContext(source, { module, env: {} })
  assert.doesNotThrow(() => module.exports.initTracking())
  assert.doesNotThrow(() => module.exports.trackEvent('generate_lead'))
})

test('events remain available to GTM when the Google tag is unavailable', () => {
  const module = { exports: {} }, window = {}
  vm.runInNewContext(source, { module, window, env: {} })
  assert.doesNotThrow(() => module.exports.trackEvent('lead_form_error', { reason: 'network_error' }))
  assert.equal(window.dataLayer.length, 1)
  assert.equal(window.dataLayer[0].event, 'lead_form_error')
})
