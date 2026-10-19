import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import { transformWithOxc } from 'vite';

const formSource = readFileSync(new URL('../src/components/ai-staff/AIConsultationForm.jsx', import.meta.url), 'utf8')
  .replace(/^import .*;\r?\n/gm, '')
  .replace('export default function AIConsultationForm', 'function AIConsultationForm');
const trackingSource = readFileSync(new URL('../src/lib/tracking.js', import.meta.url), 'utf8')
  .replaceAll('import.meta.env', 'env').replaceAll('export ', '');
const { code } = await transformWithOxc(formSource + '\nmodule.exports.default = AIConsultationForm;', 'AIConsultationForm.jsx', { jsx: { runtime: 'classic' } });
const valid = { name: ' Test Visitor ', email: 'visitor@example.invalid', company: 'Example', phone: '', hiringNeed: 'Data engineer', projectDetails: 'A test brief', consent: 'agreed', botcheck: '' };
function fixture(deliver = async () => ({ success: true })) {
  let cursor = 0;
  const slots = [], effects = [], requests = [], gaCalls = [], window = { gtag: (...args) => gaCalls.push(args), location: { search: '?utm_source=test&utm_campaign=ai&gclid=test-click' }, dataLayer: [] };
  const React = {
    useState(initial) { const i = cursor++; if (!(i in slots)) slots[i] = initial; return [slots[i], value => { slots[i] = value; }]; },
    useRef(initial) { const i = cursor++; return slots[i] ||= { current: initial }; },
    useEffect(effect) { effects.push(effect); },
    createElement(type, props, ...children) { return { type, props: props || {}, children: children.flat(Infinity).filter(Boolean) }; },
  };
  const module = { exports: {} };
  vm.runInNewContext(trackingSource + '\n' + code, { module, exports: module.exports, React, ...React, window, URLSearchParams, env: {}, leadDeliveryError: 'Delivery failed.', submitLeadRequest: async lead => { requests.push(lead); return deliver(lead); },
    FormData: class { constructor(form) { this.values = form.values; } [Symbol.iterator]() { return Object.entries(this.values)[Symbol.iterator](); } },
    require(name) { if (name === 'react') return React; if (name === '../lib/leadDelivery') return { leadDeliveryError: 'Delivery failed.', submitLeadRequest: async lead => { requests.push(lead); return deliver(lead); } }; throw new Error(name); },
  });
  const render = () => { cursor = 0; return module.exports.default(); };
  const find = (node, predicate) => !node || typeof node !== 'object' ? undefined : predicate(node) ? node : node.children?.map(child => find(child, predicate)).find(Boolean);
  const form = () => find(render(), node => node.type === 'form');
  const submit = (values = valid) => form().props.onSubmit({ preventDefault() {}, currentTarget: { values } });
  const events = () => window.dataLayer.map(item => item.event);
  return { render, form, find, submit, requests, window, events, slots, gaCalls };
}

test('confirmed delivery sends a trimmed readable brief, attribution and one conversion', async () => {
  const f = fixture();
  f.form().props.onInput(); f.form().props.onInput();
  await f.submit();
  assert.equal(f.requests.length, 1);
  assert.equal(f.requests[0].name, 'Test Visitor');
  assert.equal(f.requests[0].landingPage, '/ai_staff_augmentation');
  assert.equal(f.requests[0].hiringNeed, 'AI staff augmentation: Data engineer');
  assert.match(f.requests[0].message, /Name: Test Visitor/);
  assert.match(f.requests[0].message, /Requirements: A test brief/);
  assert.match(f.requests[0].message, /utm_source: test/);
  assert.match(f.requests[0].message, /gclid: test-click/);
  assert.deepEqual(f.events(), ['lead_form_start', 'lead_form_submit', 'lead_form_success', 'generate_lead']);
  assert.equal(f.gaCalls.filter(args => args[0] === 'event' && args[1] === 'generate_lead').length, 1);
  assert.ok(f.find(f.render(), node => node.props.role === 'status'));
  assert.equal(f.form(), undefined);
  for (const event of f.window.dataLayer) assert.deepEqual(Object.keys(event).sort(), ['event', 'form_name', 'landing_page']);
});
test('pending requests disable fields and suppress repeated submissions', async () => {
  let resolve;
  const f = fixture(() => new Promise(done => { resolve = done; }));
  const pending = f.submit();
  await f.submit();
  assert.equal(f.requests.length, 1);
  assert.equal(f.find(f.render(), node => node.type === 'fieldset').props.disabled, true);
  assert.ok(!f.events().includes('generate_lead'));
  resolve({ success: true }); await pending;
  assert.equal(f.events().filter(event => event === 'generate_lead').length, 1);
});
test('delivery failure retains the form, shows an error and allows retry without a false conversion', async () => {
  let attempts = 0;
  const f = fixture(async () => { if (++attempts === 1) throw new Error('Please try again.'); return { success: true }; });
  await f.submit();
  assert.ok(f.find(f.render(), node => node.props.role === 'alert'));
  assert.ok(f.form());
  assert.equal(f.find(f.render(), node => node.type === 'fieldset').props.disabled, false);
  assert.deepEqual(f.events(), ['lead_form_submit', 'lead_form_error']);
  await f.submit();
  assert.equal(f.requests.length, 2);
  assert.equal(f.events().filter(event => event === 'generate_lead').length, 1);
});
test('empty required values and honeypot entries never reach delivery', async () => {
  for (const values of [{ ...valid, name: '  ' }, { ...valid, email: '' }, { ...valid, company: '' }, { ...valid, projectDetails: ' ' }, { ...valid, botcheck: 'spam' }]) {
    const f = fixture(); await f.submit(values);
    assert.equal(f.requests.length, 0);
    assert.deepEqual(f.events(), []);
  }
});
test('native email, required consent and field limits remain in the rendered form', () => {
  const f = fixture(), tree = f.render();
  const field = name => f.find(tree, node => node.props.name === name);
  assert.equal(field('email').props.type, 'email');
  for (const name of ['name', 'email', 'company', 'projectDetails', 'consent']) assert.equal(field(name).props.required, true);
  assert.equal(field('projectDetails').props.maxLength, 2048);
  assert.equal(field('botcheck').props.tabIndex, -1);
});
