import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'

// Independent exported pages are checked into public/. Keep their initial HTML
// and Next.js hydration copy aligned with the headings used by native React pages.
const root = path.resolve('public')
const headings = JSON.parse(await fs.readFile('src/data/pageHeadings.json', 'utf8'))
const original = new Map()
async function readTree(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) await readTree(file)
    else if (/\.(?:html|js|json)$/.test(entry.name)) original.set(file, await fs.readFile(file, 'utf8'))
  }
}
await readTree(root)
const files = new Map(original)
const pending = new Set()
const escapeHtml = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const plain = text => text.replace(/<br\s*\/?\s*>/gi, ' ').replace(/<[^>]+>/g, '').replaceAll('&amp;', '&').replaceAll('&nbsp;', ' ').replaceAll('&#x27;', "'").replaceAll('&#39;', "'").replaceAll('&quot;', '"').replace(/\s+/g, ' ').trim()
let updated = 0
for (const [route, heading] of Object.entries(headings)) {
  if (route === '/') continue
  const file = path.join(root, route.slice(1), 'index.html')
  const html = files.get(file)
  if (!html) continue
  const matches = [...html.matchAll(/<h1\b([^>]*)>([\s\S]*?)<\/h1>/gi)]
  if (matches.length !== 1) throw new Error(`${route}: expected one static H1`)
  const previous = plain(matches[0][2])
  if (previous === heading) continue
  let replacement = escapeHtml(heading)
  if (route === '/oracle-ebs') replacement = replacement.replace('Oracle EBS', '<span class="oracle-title-accent">Oracle EBS</span>')
  files.set(file, html.replace(matches[0][0], `<h1${matches[0][1]}>${replacement}</h1>`))
  let bundleMatches = 0
  for (const [bundle, source] of files) {
    if (!bundle.endsWith('.js')) continue
    let next = source
    if (route === '/other-services') {
      // The original H1 was split into text, <br> and <em> children.
      const compound = /("h1",\{children:)\["Hire Software & AI Engineers",[\s\S]{0,180}?"from India"\}\)\]/g
      next = next.replace(compound, (_, prefix) => { bundleMatches++; return `${prefix}[${JSON.stringify(heading)}]` })
    }
    const oldLiteral = JSON.stringify(previous)
    if (next.includes(oldLiteral)) {
      bundleMatches++
      next = next.replaceAll(oldLiteral, JSON.stringify(heading))
    }
    if (next !== source) { files.set(bundle, next); pending.add(bundle) }
  }
  if (html.includes('id="__NEXT_DATA__"') && !bundleMatches) throw new Error(`${route}: could not update Next.js hydration heading`)
  updated++
}

// Changed bundles receive new filenames. Update both complete URLs and the
// hash-only entries used by Webpack, then fingerprint any affected dependants.
for (let pass = 0; pending.size; pass++) {
  if (pass > 8) throw new Error('Heading asset references did not stabilize')
  const replacements = []
  for (const file of pending) {
    const name = path.basename(file)
    const match = name.match(/^(.*)-([a-f0-9]{16})\.js$/)
    if (!match) continue
    const hash = createHash('sha256').update(files.get(file)).digest('hex').slice(0, 16)
    if (hash === match[2]) continue
    const nextName = `${match[1]}-${hash}.js`
    const nextFile = path.join(path.dirname(file), nextName)
    files.set(nextFile, files.get(file))
    files.delete(file)
    replacements.push([name, nextName], [match[2], hash])
  }
  pending.clear()
  if (!replacements.length) break
  for (const [file, source] of files) {
    let next = source
    for (const [oldText, newText] of replacements) next = next.replaceAll(oldText, newText)
    if (next !== source) { files.set(file, next); if (file.endsWith('.js')) pending.add(file) }
  }
}

// Next.js build manifests keep their build-ID paths, so version their script
// URLs when their route bundle references change.
for (const [file, source] of files) {
  if (!file.endsWith('_buildManifest.js') || source === original.get(file)) continue
  const url = '/' + path.relative(root, file).split(path.sep).join('/')
  const version = createHash('sha256').update(source).digest('hex').slice(0, 12)
  for (const [htmlFile, html] of files) {
    if (!htmlFile.endsWith('.html')) continue
    const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    files.set(htmlFile, html.replace(new RegExp(`(${escaped})(\\?[^"\\s<>]*)?`, 'g'), (_, base, query = '') => {
      const existing = query.replace(/([?&])headings=[^&]*/g, '$1').replace(/[?&]$/, '')
      return `${base}${existing}${existing ? '&' : '?'}headings=${version}`
    }))
  }
}
for (const [file, source] of files) if (source !== original.get(file)) await fs.writeFile(file, source)
for (const file of original.keys()) {
  if (files.has(file)) continue
  if (!file.startsWith(root + path.sep) || !file.endsWith('.js')) throw new Error('Unexpected asset removal')
  await fs.unlink(file)
}
console.log(`Synchronized ${updated} standalone page headings and their hydration assets.`)
