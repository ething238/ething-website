import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { auditAiHiring } from '../scripts/audit-ai-hiring.mjs';

const audit = await auditAiHiring();
const html = await fs.readFile('dist/hire-ai-developers/index.html', 'utf8');

test('all original keywords occur naturally at the requested combined density', () => {
  assert.equal(Object.keys(audit.copy.keywords).length, 13);
  for (const [keyword, count] of Object.entries(audit.copy.keywords)) assert.ok(count > 0, keyword);
  assert.equal(audit.copy.words, 1500);
  assert.equal(audit.copy.combinedMentions, 30);
  assert.equal(audit.copy.combinedDensityPercent, 2);
});

test('the retained URL serves complete indexable HTML without a website framework bundle', () => {
  assert.equal(audit.canonical, 'https://www.ethingsolutions.com/hire-ai-developers');
  assert.equal(audit.title, 'Hire AI Developers in India | eThing');
  assert.equal(audit.h1Count, 1);
  assert.match(html, /<h1[^>]*>Hire AI Developers in India<\/h1>/);
  assert.doesNotMatch(html, /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i);
  assert.doesNotMatch(html, /<script[^>]*src="\/(?:_next|assets\/index)/);
  assert.match(html, /aria-controls="about-copy-mobile-nav"/);
  assert.match(html, /id="about-copy-mobile-nav"/);
  assert.match(html, /class="ai-hero-atmosphere" aria-hidden="true"/);
});

test('the AI page keeps its first-party runtime and image small', async () => {
  const script = audit.assets.filter(asset => asset.url.endsWith('.js'));
  const styles = audit.assets.filter(asset => asset.url.endsWith('.css'));
  assert.equal(script.length, 1);
  assert.equal(styles.length, 1);
  assert.ok(script[0].bytes < 16000, 'Runtime should stay below 16 KB uncompressed');
  assert.ok(script[0].gzipBytes + styles[0].gzipBytes < 22000, 'Script + CSS should stay below 22 KB gzipped');
  const images = (await fs.readdir('dist/ai-hiring-assets')).filter(name => name.endsWith('.webp'));
  assert.equal(images.length, 1);
  assert.ok((await fs.stat(`dist/ai-hiring-assets/${images[0]}`)).size < 50000);
  assert.match(html, new RegExp(`rel="preload"[^>]*href="/ai-hiring-assets/${images[0]}"`));
});
