import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync(new URL('../src/components/website-development/leadDelivery.js', import.meta.url), 'utf8')
  .replace("import { web3formsAccessKey } from './web3formsConfig.js';", '')
  .replace(/export (const|async function)/g, '$1')
  + '\nmodule.exports = { leadDeliveryError, leadDeliveryTimeout, readLeadDeliveryResponse, submitLeadRequest };';

function fixture(fetch = () => { throw new Error('Unexpected fetch'); }, { key = 'test-public-form-token', timers = {} } = {}) {
  const module = { exports: {} };
  vm.runInNewContext(source, { module, fetch, web3formsAccessKey: key, AbortController, setTimeout, clearTimeout, ...timers });
  return module.exports;
}

const jsonResponse = (body, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { 'content-type': 'application/json' },
});

test('HTML routing failures never surface the JSON parser error or report success', async () => {
  const helper = fixture();
  for (const status of [200, 404, 500]) {
    const response = new Response('<!doctype html><html><body>Not found</body></html>', {
      status, headers: { 'content-type': 'text/html' },
    });
    await assert.rejects(helper.readLeadDeliveryResponse(response), (error) => error.message === helper.leadDeliveryError);
  }
});

test('empty and malformed JSON responses use the contact fallback', async () => {
  const helper = fixture();
  for (const body of ['', '{"ok":', 'Internal Server Error']) {
    await assert.rejects(helper.readLeadDeliveryResponse(new Response(body)), (error) => error.message === helper.leadDeliveryError);
  }
});

test('JSON primitives and arrays cannot confirm successful delivery', async () => {
  const helper = fixture();
  for (const body of [null, true, 'success', 1, []]) {
    await assert.rejects(helper.readLeadDeliveryResponse(jsonResponse(body)), (error) => error.message === helper.leadDeliveryError);
  }
});

test('Web3Forms success requires an affirmative boolean success flag', async () => {
  const helper = fixture();
  for (const body of [{}, { ok: true }, { success: false }, { success: 'true' }, { success: 1 }]) {
    await assert.rejects(helper.readLeadDeliveryResponse(jsonResponse(body)), (error) => error.message === helper.leadDeliveryError);
  }
  for (const body of [{ success: true }, { ok: true, success: true, email: 'private@example.invalid' }]) {
    assert.equal(JSON.stringify(await helper.readLeadDeliveryResponse(jsonResponse(body))), '{"ok":true,"success":true}');
  }
});

test('HTTP errors cannot confirm delivery even with a success flag', async () => {
  const helper = fixture();
  await assert.rejects(helper.readLeadDeliveryResponse(jsonResponse({ success: true }, 502)), (error) => error.message === helper.leadDeliveryError);
});

test('brief plain API validation messages remain useful to visitors', async () => {
  const helper = fixture();
  const message = 'Enter a valid work email address.';
  await assert.rejects(helper.readLeadDeliveryResponse(jsonResponse({ message }, 400)), (error) => error.message === message);
  await assert.rejects(helper.readLeadDeliveryResponse(jsonResponse({ success: false, message })), (error) => error.message === message);
});

test('HTML, diagnostics and invalid server messages use the safe fallback', async () => {
  const helper = fixture();
  for (const message of ['', ' ', '<h1>Failure</h1>', 'Unexpected token in JSON', 'SyntaxError: bad JSON', 'DOCTYPE html', 'x'.repeat(301), { detail: 'private' }]) {
    await assert.rejects(helper.readLeadDeliveryResponse(jsonResponse({ message }, 503)), (error) => error.message === helper.leadDeliveryError);
  }
});

test('submission posts all hiring fields and attribution with the fixed public Web3Forms key', async () => {
  const requests = [];
  const helper = fixture(async (url, options) => {
    requests.push({ url, options });
    return jsonResponse({ success: true });
  });
  const lead = { name: 'Test Visitor', email: 'visitor@example.invalid', phone: '+1 202 555 0100', company: 'Example Company', companySize: '11-50', hiringNeed: 'Full Stack Developer', engineersNeeded: '2-3', projectDetails: 'An optional brief', landingPage: '/hire-developers/', utm_source: 'test', utm_medium: 'search', utm_campaign: 'hiring', utm_term: 'engineer', utm_content: 'variant', gclid: 'click-id', access_key: 'visitor-cannot-choose-key', subject: 'visitor-cannot-choose-subject' };
  assert.equal((await helper.submitLeadRequest(lead)).success, true);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].url, 'https://api.web3forms.com/submit');
  assert.equal(requests[0].options.method, 'POST');
  assert.equal(requests[0].options.headers['content-type'], 'application/json');
  const payload = JSON.parse(requests[0].options.body);
  for (const field of Object.keys(lead).filter(field => !['access_key', 'subject'].includes(field))) assert.equal(payload[field], lead[field]);
  assert.equal(payload.access_key, 'test-public-form-token');
  assert.equal(payload.subject, 'New engineering enquiry: Full Stack Developer');
  assert.equal(requests[0].options.signal.aborted, false);
});

test('network failures do not expose raw browser or server diagnostics', async () => {
  const helper = fixture(async () => { throw new Error('private connection details'); });
  await assert.rejects(helper.submitLeadRequest({}), (error) => error.message === helper.leadDeliveryError);
});

test('website enquiries deliver a readable brief with optional phone and no hiring-only fields', async () => {
  const requests = [];
  const helper = fixture(async (url, options) => {
    requests.push({ url, payload: JSON.parse(options.body) });
    return jsonResponse({ success: true });
  });
  const message = 'New eThing website development enquiry\n\nName: Test Visitor\nWork email: visitor@example.invalid\nProject brief: Rebuild our business website\nSource page: /website-development';
  const result = await helper.submitLeadRequest({ name: 'Test Visitor', email: 'visitor@example.invalid', phone: '', projectDetails: 'Rebuild our business website', hiringNeed: 'Website development', landingPage: '/website-development', message });
  assert.equal(result.success, true);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].url, 'https://api.web3forms.com/submit');
  assert.equal(requests[0].payload.message, message);
  assert.equal(requests[0].payload.subject, 'New engineering enquiry: Website development');
  assert.equal(requests[0].payload.projectDetails, 'Rebuild our business website');
  assert.equal(requests[0].payload.landingPage, '/website-development');
  assert.equal(requests[0].payload.access_key, 'test-public-form-token');
});

test('unconfigured public form key refuses delivery before making a request', async () => {
  let requests = 0;
  const helper = fixture(async () => { requests++; }, { key: '' });
  await assert.rejects(helper.submitLeadRequest({}), (error) => error.message === helper.leadDeliveryError);
  assert.equal(requests, 0);
});

test('subject removes visitor-controlled header line breaks', async () => {
  const requests = [];
  const helper = fixture(async (_url, options) => { requests.push(options); return jsonResponse({ success: true }); });
  await helper.submitLeadRequest({ hiringNeed: 'Developer\r\nBcc: other@example.invalid' });
  assert.doesNotMatch(JSON.parse(requests[0].body).subject, /[\r\n]/);
});

test('25-second abort deadline returns an accurate unconfirmed-delivery message', async () => {
  let expire, delay, cleared = false;
  const helper = fixture((_url, options) => new Promise((_resolve, reject) => {
    options.signal.addEventListener('abort', () => reject(new Error('private timeout details')));
  }), { timers: {
    setTimeout(callback, duration) { expire = callback; delay = duration; return 7; },
    clearTimeout(timer) { assert.equal(timer, 7); cleared = true; },
  } });
  const request = helper.submitLeadRequest({});
  assert.equal(delay, 25000);
  expire();
  await assert.rejects(request, (error) => error.message === helper.leadDeliveryTimeout);
  assert.equal(cleared, true);
});

test('confirmed responses clear the abort deadline', async () => {
  let cleared = false;
  const helper = fixture(async () => jsonResponse({ success: true }), { timers: {
    setTimeout(_callback, delay) { assert.equal(delay, 25000); return 9; },
    clearTimeout(timer) { assert.equal(timer, 9); cleared = true; },
  } });
  assert.equal((await helper.submitLeadRequest({})).ok, true);
  assert.equal(cleared, true);
});
