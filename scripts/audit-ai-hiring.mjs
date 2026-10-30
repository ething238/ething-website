import fs from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { aiKeywords } from '../src/data/aiHiringContent.js';

function decode(text) {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  return text.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (_, entity) => entity[0] === '#' ? String.fromCodePoint(entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10)) : named[entity.toLowerCase()]);
}
export function auditCopy(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (!main) throw new Error('The AI page must contain a rendered main element.');
  const text = decode(main.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
  const words = text.match(/[A-Za-z0-9]+(?:[’'-][A-Za-z0-9]+)*/g) || [];
  const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s+');
  const pattern = aiKeywords.slice().sort((a, b) => b.length - a.length).map(keyword => `\\b${escape(keyword)}\\b`).join('|');
  const mentions = text.match(new RegExp(pattern, 'gi')) || [];
  return {
    words: words.length, combinedMentions: mentions.length,
    combinedDensityPercent: mentions.length / words.length * 100,
    method: 'Non-overlapping exact phrases, longest first, divided by main-content words. Includes accessible tab/FAQ content; excludes navigation, footer, metadata and JSON-LD.',
    keywords: Object.fromEntries(aiKeywords.map(keyword => [keyword, (text.match(new RegExp(`\\b${escape(keyword)}\\b`, 'gi')) || []).length])),
  };
}

export async function auditAiHiring(directory = 'dist') {
  const html = await fs.readFile(path.join(directory, 'hire-ai-developers/index.html'), 'utf8');
  const references = new Set([
    ...[...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(match => match[1]),
    ...[...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)].map(match => match[1]),
  ].filter(url => url.startsWith('/ai-hiring-assets/')));
  const assets = [];
  for (const url of references) {
    const bytes = await fs.readFile(path.join(directory, url));
    assets.push({ url, bytes: bytes.length, gzipBytes: gzipSync(bytes).length });
  }
  return {
    canonical: html.match(/rel="canonical"[^>]*href="([^"]+)"/)?.[1],
    title: decode(html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1] || ''),
    h1Count: (html.match(/<h1\b/g) || []).length,
    htmlBytes: Buffer.byteLength(html), htmlGzipBytes: gzipSync(html).length,
    copy: auditCopy(html), assets,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await auditAiHiring(process.argv[2] || 'dist');
  await fs.mkdir('artifacts/ai-hiring-release', { recursive: true });
  await fs.writeFile('artifacts/ai-hiring-release/content-and-size-audit.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
}
