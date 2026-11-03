import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'

// Keep event coverage and cache versions consistent across native and exported pages.
const version = async file => createHash('sha256').update(await fs.readFile(file)).digest('hex').slice(0, 12)
const eventsVersion = await version('public/site-analytics-events.js')
const eventsTag = `<script defer src="/site-analytics-events.js?v=${eventsVersion}"></script>`
const files = ['index.html']
for (const route of Object.keys(JSON.parse(await fs.readFile('src/data/pageHeadings.json', 'utf8')))) {
  if (route === '/') continue
  const file = path.join('public', route.slice(1), 'index.html')
  if (await fs.access(file).then(() => true, () => false)) files.push(file)
}
for (const file of files) {
  let html = await fs.readFile(file, 'utf8')
  const original = html
  html = html.replace(/<script\b[^>]*src="\/site-analytics-events\.js(?:\?[^\"]*)?"[^>]*><\/script>/g, '')
    .replace('</head>', `${eventsTag}</head>`)
  for (const asset of ['/oracle-ebs/assets/analytics.js', '/banking-finance/assets/analytics.js']) {
    const escaped = asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    if (html.includes(asset)) html = html.replace(new RegExp(`${escaped}(?:\\?[^"\\s<>]*)?`, 'g'), `${asset}?v=${await version('public' + asset)}`)
  }
  if (html !== original) await fs.writeFile(file, html)
}
console.log(`Synchronized contact-intent tracking and analytics asset versions on ${files.length} source templates.`)
