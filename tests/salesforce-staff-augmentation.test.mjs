import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import test from 'node:test';
import postcss from 'postcss';

const route = '/salesforce-staff-augmentation';
const canonical = 'https://www.ethingsolutions.com' + route;
const html = fs.readFileSync('dist/salesforce-staff-augmentation/index.html', 'utf8');

test('Salesforce is pre-rendered, indexable and linked under Hire Talent without moving SAP', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/<main\b/g) || []).length, 1);
  assert.equal((html.match(/<form\b/g) || []).length, 1);
  assert.match(html, /<title[^>]*>Salesforce Staff Augmentation Services \| eThing<\/title>/);
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`));
  assert.doesNotMatch(html, /noindex|Extend My Salesforce Team|Discuss This Role|Illustrative talent network/);
  const hire = JSON.parse(fs.readFileSync('src/data/aboutUsCopy.json', 'utf8')).navigation.find(item => item.id === 'hire-talent');
  assert.deepEqual(hire.children.slice(0, 3).map(item => item.path), ['/other-services/', '/sap-services', route]);
  assert.ok(fs.readFileSync('dist/sitemap.xml', 'utf8').includes(canonical));
  assert.equal(JSON.parse(fs.readFileSync('vercel.json', 'utf8')).rewrites.find(rule => rule.source === route).destination, route + '/index.html');
  const hero = html.slice(html.indexOf('class="sf-hero"'), html.indexOf('class="sf-company-strip"'));
  assert.ok(hero.includes('<form'));
  assert.match(hero, /href="#salesforce-roles" class="sf-button"/);
  assert.ok(html.slice(html.indexOf('id="salesforce-next-steps"')).includes('/salesforce/cloud-talent-v4.webp'));
  assert.match(html.match(/<input\b(?=[^>]*id="sf-phone")[^>]*>/)[0], /\brequired(?:="")?/);
  assert.equal((html.match(/class="sf-role-card /g) || []).length, 6);
  const faq = html.slice(html.indexOf('id="salesforce-faqs"'), html.indexOf('id="salesforce-next-steps"'));
  assert.equal((faq.match(/<details\b/g) || []).length, 17);
  for (const image of ['cloud-talent-v4.webp', 'engineering-team-v4.webp']) assert.ok(fs.existsSync(path.join('public/salesforce', image)));
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(match => JSON.parse(match[1])['@graph']);
  assert.ok(schemas.some(schema => schema['@type'] === 'Service'));
  assert.ok(schemas.some(schema => schema['@type'] === 'BreadcrumbList'));
});

test('Salesforce styles are isolated from other pages and existing tracking/delivery are reused', () => {
  for (const filename of ['salesforce-staff-augmentation.css', 'salesforce-design-refresh.css']) {
    postcss.parse(fs.readFileSync('src/styles/' + filename, 'utf8')).walkRules(rule => {
      if (rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
      for (const selector of rule.selectors) assert.ok(selector.includes('.sf-'), selector);
    });
  }
  const form = fs.readFileSync('src/components/salesforce/SalesforceEnquiryForm.jsx', 'utf8');
  assert.match(form, /from '\.\.\/website-development\/leadDelivery\.js'/);
  assert.doesNotMatch(form, /createRoot|googletagmanager\.com\/|fetch\(/);
});

const originalForm = fs.readFileSync('src/components/salesforce/SalesforceEnquiryForm.jsx', 'utf8');
const inputHandler = originalForm.match(/onInput=\{(.+?)\} aria-label=/)[1];
const formLogic = originalForm.slice(0, originalForm.indexOf('  return <div className="sf-form-card"'))
  .replace(/^import .*;\r?\n/gm, '')
  .replace('import.meta.env', 'env')
  .replace('export default function SalesforceEnquiryForm', 'function SalesforceEnquiryForm')
  + `return { submit, status, error, start: ${inputHandler} };}\nmodule.exports = SalesforceEnquiryForm;`;
const valid = { name: ' Test Visitor ', email: 'visitor@example.invalid', phone: ' +1 202 555 0100 ', company: '', hiringNeed: 'Developer', projectDetails: ' Local simulated brief ', consent: 'agreed', botcheck: '' };
function fixture(deliver = async () => ({ ok: true, success: true })) {
  let cursor = 0;
  const slots = [], requests = [], gaCalls = [];
  const window = { dataLayer: [], location: { search: '?utm_source=local-test' }, gtag: (...args) => gaCalls.push(args) };
  const module = { exports: {} };
  vm.runInNewContext(formLogic, {
    module, window, URLSearchParams, env: { VITE_GA4_MEASUREMENT_ID: 'G-TESTONLY' },
    useState(initial) { const i = cursor++; if (!(i in slots)) slots[i] = initial; return [slots[i], value => { slots[i] = value; }]; },
    useRef(initial) { const i = cursor++; return slots[i] ||= { current: initial }; },
    useEffect() {}, leadDeliveryError: 'Delivery failed.',
    submitLeadRequest: async lead => { requests.push(lead); return deliver(lead); },
    FormData: class { constructor(form) { return Object.entries(form.values); } },
  });
  const render = () => { cursor = 0; return module.exports({}); };
  const submit = (values = valid) => render().submit({ preventDefault() {}, currentTarget: { values } });
  return { render, submit, requests, window, gaCalls, events: () => window.dataLayer.filter(item => item.event).map(item => item.event) };
}

test('required contact/brief values, consent and honeypot prevent delivery before conversion', async () => {
  for (const name of ['name', 'email', 'phone', 'projectDetails', 'consent']) {
    for (const empty of ['', '   ']) {
      const f = fixture(); await f.submit({ ...valid, [name]: empty });
      assert.equal(f.requests.length, 0, name);
      assert.equal(f.gaCalls.length, 0, name);
    }
  }
  const spam = fixture(); await spam.submit({ ...valid, botcheck: 'filled' });
  assert.equal(spam.requests.length, 0);
});

test('confirmed delivery preserves the readable brief and emits one conversion with no personal data', async () => {
  const f = fixture(); f.render().start(); f.render().start(); await f.submit();
  assert.equal(f.requests.length, 1);
  assert.equal(f.requests[0].phone, '+1 202 555 0100');
  assert.equal(f.requests[0].landingPage, route);
  assert.equal(f.requests[0].utm_source, 'local-test');
  assert.match(f.requests[0].message, /Phone: \+1 202 555 0100/);
  assert.deepEqual(f.events(), ['lead_form_start', 'lead_form_submit', 'lead_form_success', 'generate_lead']);
  assert.equal(f.gaCalls.filter(call => call[1] === 'generate_lead').length, 1);
  for (const call of f.gaCalls) {
    assert.deepEqual(Object.keys(call[2]).sort(), ['form_name', 'landing_page', 'send_to']);
    assert.equal(call[2].send_to, 'G-TESTONLY');
  }
  assert.ok(!JSON.stringify(f.gaCalls).includes('visitor@example.invalid'));
  assert.ok(!JSON.stringify(f.gaCalls).includes('555'));
  assert.equal(f.render().status, 'success');
});

test('pending and failed requests cannot produce duplicate or false confirmed-lead events', async () => {
  let resolve;
  const pending = fixture(() => new Promise(done => { resolve = done; }));
  const first = pending.submit(); await pending.submit();
  assert.equal(pending.requests.length, 1);
  assert.ok(!pending.events().includes('generate_lead'));
  resolve({ success: true }); await first;
  await pending.submit();
  assert.equal(pending.requests.length, 1);
  let attempts = 0;
  const failed = fixture(async () => { if (++attempts === 1) throw new Error('Mock delivery failed'); return { success: true }; });
  await failed.submit();
  assert.deepEqual(failed.events(), ['lead_form_submit', 'lead_form_error']);
  assert.equal(failed.render().status, 'error');
  await failed.submit();
  assert.equal(failed.events().filter(event => event === 'generate_lead').length, 1);
});

test('GA4 events queue safely if the Google tag has not loaded yet', async () => {
  const f = fixture(); delete f.window.gtag; await f.submit();
  const commands = f.window.dataLayer.filter(item => item[0] === 'event');
  assert.deepEqual(commands.map(item => item[1]), ['lead_form_submit', 'lead_form_success', 'generate_lead']);
  assert.equal(commands.filter(item => item[1] === 'generate_lead').length, 1);
});
