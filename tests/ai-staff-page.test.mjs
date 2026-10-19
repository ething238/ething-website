import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import test from 'node:test';

const html = fs.readFileSync('dist/ai_staff_augmentation/index.html', 'utf8');
const canonical = 'https://www.ethingsolutions.com/ai_staff_augmentation';
test('the original URL serves complete HTML, unique metadata and exactly one heading per section', () => {
  assert.equal((html.match(/<link\b[^>]*rel="canonical"/g) || []).length, 1);
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`));
  assert.equal((html.match(/<title\b/g) || []).length, 1);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/<main\b/g) || []).length, 1);
  const sections = [...html.matchAll(/<section\b[^>]*>([\s\S]*?)<\/section>/g)];
  assert.equal(sections.length, 11);
  for (const section of sections) assert.equal((section[1].match(/<h[1-6]\b/g) || []).length, 1);
  assert.equal((html.match(/role="tabpanel"/g) || []).length, 3);
  assert.match(html, /<form\b[^>]*aria-label="Book a free consultation"/);
  assert.match(html, /Companies we have <br\/>worked with/);
  assert.doesNotMatch(html, /\u2014/);
  const rewrite = JSON.parse(fs.readFileSync('vercel.json', 'utf8')).rewrites.find(rule => rule.source === '/ai_staff_augmentation');
  assert.equal(rewrite.destination, '/ai_staff_augmentation/index.html');
});
test('all responsive image variants exist and below-fold photos load lazily', () => {
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    const image = match[0];
    const source = image.match(/src="([^"]+)"/)?.[1];
    if (source?.startsWith('/')) assert.ok(fs.existsSync(path.join('dist', source)));
    const candidates = image.match(/srcSet="([^"]+)"/)?.[1].split(',') || [];
    for (const candidate of candidates) assert.ok(fs.existsSync(path.join('dist', candidate.trim().split(/\s+/)[0])));
    if (/collaboration-|hardware-/.test(image)) assert.match(image, /loading="lazy"/);
  }
  assert.doesNotMatch(html, /<img\b[^>]*src="\/brand\/ething-logo-new-font\.png"/);
  assert.match(html, /fetchPriority="high"/);
  assert.match(html, /rel="icon"[^>]*href="\/ai-staff\/optimized\/favicon-48.png"/);
});
test('the existing GTM and GA4 configuration remains active with no extra AI-page loader', () => {
  assert.equal((html.match(/'dataLayer', 'GTM-TX73DK5H'\)/g) || []).length, 1);
  assert.equal((html.match(/src="https:\/\/www.googletagmanager.com\/ns.html\?id=GTM-TX73DK5H"/g) || []).length, 1);
  const bootstrap = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(match => match[1]).find(source => source.includes('function gtag()'));
  for (const pathname of ['/ai_staff_augmentation', '/ai_staff_augmentation/', '/mobile_application', '/website-development', '/']) {
    const inserted = [], context = { location: { pathname }, document: { createElement: () => ({}), head: { appendChild: element => inserted.push(element) } } };
    context.window = context;
    vm.runInNewContext(bootstrap, context);
    assert.equal(context.dataLayer.filter(item => item[0] === 'config' && item[1] === 'G-2W7W1TB2H4').length, 1);
    assert.equal(inserted.length, /^\/(?:ai_staff_augmentation|mobile_application)\/?$/.test(pathname) ? 0 : 1);
  }
});
