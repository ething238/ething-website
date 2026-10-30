import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { aiFaqs } from '../src/data/aiHiringContent.js';

const html = await fs.readFile('dist/hire-ai-developers/index.html', 'utf8');

test('consolidated page renders all agreed content and one set of FAQs', () => {
  for (const heading of ['Skills our AI engineers bring', 'What your AI team can build', 'Help support teams find the right answers.', 'Engineers who work as part of your team.', 'Choose how we work together']) assert.ok(html.includes(heading), heading);
  assert.equal((html.match(/class="ai-expertise-card"/g) || []).length, 6);
  assert.equal((html.match(/class="ai-sector"/g) || []).length, 4);
  assert.equal((html.match(/Discuss this option/g) || []).length, 3);
  assert.equal((html.match(/class="ai-profile-label"/g) || []).length, 3);
  assert.equal((html.match(/<details><summary>/g) || []).length, aiFaqs.length);
  assert.equal(new Set(aiFaqs.map(([question]) => question)).size, aiFaqs.length);
  assert.ok(html.includes('class="ai-example-label">Example</span>'));
  assert.doesNotMatch(html, /ai-illustrative-note|ai-example-caption|ai-profile-note|<figcaption|class="eyebrow"/);
  for (const section of html.matchAll(/<section\b[^>]*>([\s\S]*?)<\/section>/g)) assert.equal((section[1].match(/<h[1-6]\b/g) || []).length, 1, 'Each section needs one heading');
  assert.doesNotMatch(html, /Representative engagement metrics|AI Staff Augmentation/);
  assert.match(html, /Based on 25\+ reviews/);
  assert.match(html, /Rated 4.8 out of 5/);
  for (const field of ['name', 'email', 'phone', 'company', 'hiringNeed']) assert.ok(html.includes(`name="${field}"`), field);
});

test('metadata and structured FAQ data use the consolidated URL and visible answers', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.ok(html.includes('href="https://www.ethingsolutions.com/hire-ai-developers"'));
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const faq = schemas.flatMap(schema => schema['@graph'] || [schema]).find(node => node['@type'] === 'FAQPage');
  assert.deepEqual(faq.mainEntity.map(item => [item.name, item.acceptedAnswer.text]), aiFaqs);
});

test('retired page is absent from the sitemap, navigation and generated internal links', async () => {
  const sitemap = await fs.readFile('dist/sitemap.xml', 'utf8');
  assert.doesNotMatch(sitemap, /ai_staff_augmentation|ai-staff-augmentation/);
  await assert.rejects(fs.access('dist/ai_staff_augmentation/index.html'));
  async function inspect(directory) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      if (entry.name === '_next' || entry.name === 'assets') continue;
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) await inspect(file);
      else if (entry.name.endsWith('.html')) {
        const text = await fs.readFile(file, 'utf8');
        assert.doesNotMatch(text, /href="(?:https?:\/\/(?:www\.)?ethingsolutions\.com)?\/ai[-_]staff[-_]augmentation(?:["/?#])/i, file);
        assert.doesNotMatch(text, />AI Staff Augmentation</, file);
      }
    }
  }
  await inspect('dist');
});

test('permanent redirects cover both retired spellings on supported hosts', async () => {
  const apache = await fs.readFile('dist/.htaccess', 'utf8');
  assert.ok(apache.includes('^ai[-_]staff[-_]augmentation(?:/index\\.html)?/?$ https://www.ethingsolutions.com/hire-ai-developers [R=301,L,NE,NC]'));
  const netlify = await fs.readFile('dist/_redirects', 'utf8');
  assert.ok(netlify.includes('/ai_staff_augmentation /hire-ai-developers 301'));
  assert.ok(netlify.includes('/ai-staff-augmentation /hire-ai-developers 301'));
  const vercel = JSON.parse(await fs.readFile('vercel.json', 'utf8'));
  for (const source of ['/ai_staff_augmentation', '/ai-staff-augmentation']) assert.ok(vercel.redirects.some(row => row.source === source && row.destination === 'https://www.ethingsolutions.com/hire-ai-developers' && row.statusCode === 301));
});
