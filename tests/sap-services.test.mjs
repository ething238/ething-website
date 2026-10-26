import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import test from 'node:test';
import postcss from 'postcss';
import { sapRequirementTypes } from '../src/data/sapContent.js';

const html = fs.readFileSync('dist/sap-services/index.html', 'utf8');
const canonical = 'https://www.ethingsolutions.com/sap-services';

test('SAP is rendered, indexable and linked second under Hire Talent', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/<main\b/g) || []).length, 1);
  assert.match(html, /<h1[^>]*>SAP Staff Augmentation Services<\/h1>/);
  assert.match(html, new RegExp(`rel="canonical" href="${canonical}"`));
  assert.doesNotMatch(html, /noindex|sap-hero-artwork/);
  assert.equal((html.match(/id="sap-role-detail-\d+"/g) || []).length, 15);
  for (const name of ['SAP Staffing Services', 'SAP Expertise', 'SAP Professionals You Can Hire', 'How We Work', 'Why eThing', 'Frequently Asked Questions', 'Discuss Your SAP Staffing Needs', 'Explore Other Services']) assert.ok(html.includes(name), name);
  const navigation = JSON.parse(fs.readFileSync('src/data/aboutUsCopy.json', 'utf8')).navigation;
  const hire = navigation.find(item => item.id === 'hire-talent');
  assert.deepEqual(hire.children.slice(0, 2).map(item => item.path), ['/other-services/', '/sap-services']);
  assert(!navigation.find(item => item.id === 'engineering').children.some(item => item.path === '/sap-services'));
  assert.ok(fs.readFileSync('dist/sitemap.xml', 'utf8').includes(canonical));
  assert.equal(JSON.parse(fs.readFileSync('vercel.json', 'utf8')).rewrites.find(rule => rule.source === '/sap-services').destination, '/sap-services/index.html');
});

test('SAP styles cannot affect other routes and all local media exist', () => {
  const css = fs.readFileSync('src/styles/sap-services.css', 'utf8');
  postcss.parse(css).walkRules(rule => {
    if (rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
    for (const selector of rule.selectors) assert.ok(selector.includes('.sap-page'), selector);
  });
  for (const match of (css + html).matchAll(/\/sap-services\/[a-zA-Z0-9._-]+\.(?:webp|svg|png)/g)) assert.ok(fs.existsSync(path.join('public', match[0])), match[0]);
  assert.match(css, /rgba\(4,17,34,\.97\) 58%/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /#sap-related/);
  assert.ok(!html.includes('data:image/'));
});

const formSource = fs.readFileSync('src/components/sap-services/SapEnquiryForm.jsx', 'utf8')
  .replace(/^import .*;\r?\n/gm, '')
  .replace('export default function SapEnquiryForm', 'function SapEnquiryForm');
const trackingSource = fs.readFileSync('src/lib/tracking.js', 'utf8').replaceAll('import.meta.env', 'env').replaceAll('export ', '');
const valid = { name: ' Test Visitor ', email: 'visitor@example.invalid', company: 'Example', phone: '+10000000000', requirementType: sapRequirementTypes[0], projectDetails: ' Local mock only ', botcheck: '' };
function fixture(deliver = async () => ({ success: true })) {
  let cursor = 0;
  const slots = [], requests = [], gaCalls = [];
  const window = { gtag: (...args) => gaCalls.push(args), dataLayer: [], location: { search: '?utm_source=local-test' } };
  const react = {
    useState(initial) { const i = cursor++; if (!(i in slots)) slots[i] = initial; return [slots[i], value => { slots[i] = value; }]; },
    useRef(initial) { const i = cursor++; return slots[i] ||= { current: initial }; },
    useEffect() {},
  };
  const jsx = (type, props = {}) => ({ type, props, children: [props.children].flat(Infinity).filter(Boolean) });
  const module = { exports: {} };
  vm.runInNewContext(trackingSource + '\n' + formSource + '\nmodule.exports = SapEnquiryForm;', {
    module, react, jsx_runtime: { jsx, jsxs: jsx }, window, URLSearchParams, sapRequirementTypes, env: {},
    web3formsAccessKey: 'local-mock', leadDeliveryError: 'Delivery failed.',
    submitLeadRequest: async lead => { requests.push(lead); return deliver(lead); },
    FormData: class { constructor(form) { return Object.entries(form.values); } },
  });
  const render = () => { cursor = 0; return module.exports({}); };
  const find = (node, predicate) => !node || typeof node !== 'object' ? undefined : predicate(node) ? node : node.children?.map(child => find(child, predicate)).find(Boolean);
  const form = () => find(render(), node => node.type === 'form');
  const submit = (values = valid) => form().props.onSubmit({ preventDefault() {}, currentTarget: { values } });
  return { render, find, form, submit, requests, gaCalls, events: () => window.dataLayer.map(item => item.event), window };
}

test('all six fields are required and whitespace or honeypot values cannot create a lead', async () => {
  for (const name of ['name', 'email', 'company', 'phone', 'requirementType', 'projectDetails']) {
    const f = fixture();
    assert.equal(f.find(f.render(), node => node.props.name === name).props.required, true);
    await f.submit({ ...valid, [name]: '   ' });
    assert.equal(f.requests.length, 0);
    assert.equal(f.events().length, 0);
  }
  const spam = fixture();
  await spam.submit({ ...valid, botcheck: 'filled' });
  assert.equal(spam.requests.length, 0);
});

test('confirmed delivery sends a trimmed SAP brief and one conversion without contact details in analytics', async () => {
  const f = fixture();
  f.form().props.onInput();
  f.form().props.onInput();
  await f.submit();
  assert.equal(f.requests.length, 1);
  assert.equal(f.requests[0].name, 'Test Visitor');
  assert.equal(f.requests[0].projectDetails, 'Local mock only');
  assert.equal(f.requests[0].landingPage, '/sap-services');
  assert.equal(f.requests[0].utm_source, 'local-test');
  assert.match(f.requests[0].message, /Company: Example/);
  assert.deepEqual(f.events(), ['lead_form_start', 'lead_form_submit', 'lead_form_success', 'generate_lead']);
  assert.equal(f.gaCalls.filter(args => args[0] === 'event' && args[1] === 'generate_lead').length, 1);
  for (const event of f.window.dataLayer) assert.deepEqual(Object.keys(event).sort(), ['event', 'form_name', 'landing_page']);
  assert.ok(f.find(f.render(), node => node.props.role === 'status'));
  assert.equal(f.form(), undefined);
});

test('pending delivery blocks duplicates and rejected delivery permits retry without a false conversion', async () => {
  let resolve;
  const pending = fixture(() => new Promise(done => { resolve = done; }));
  const first = pending.submit();
  await pending.submit();
  assert.equal(pending.requests.length, 1);
  assert.equal(pending.find(pending.render(), node => node.type === 'fieldset').props.disabled, true);
  assert(!pending.events().includes('generate_lead'));
  resolve({ success: true });
  await first;
  const failed = fixture(async () => { throw new Error('Rejected mock'); });
  await failed.submit();
  assert.deepEqual(failed.events(), ['lead_form_submit', 'lead_form_error']);
  assert.ok(failed.form());
  await failed.submit();
  assert.equal(failed.requests.length, 2);
  assert(!failed.events().includes('generate_lead'));
});
