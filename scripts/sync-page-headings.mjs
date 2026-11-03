import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import ts from 'typescript'

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
// Remove only decorative labels immediately above the main heading. Update
// exported React calls too, so hydration cannot bring those labels back.
const badgeScripts = new Set()
let removedBadges = 0
for (const route of Object.keys(headings)) {
  if (route === '/') continue
  const file = path.join(root, route.slice(1), 'index.html')
  const html = files.get(file)
  if (!html) continue
  const pattern = /<(p|div)\b(?=[^>]*class="[^"]*\b(?:eyebrow|erp-service-kicker|hub-hero-wordmark)\b[^"]*")[^>]*>[\s\S]*?<\/\1>\s*(?=<h1\b)/g
  const next = html.replace(pattern, '')
  if (next === html) continue
  files.set(file, next)
  removedBadges++
  if (html.includes('id="__NEXT_DATA__"')) {
    for (const match of html.matchAll(/<script\b[^>]*src="(\/[^\"]+)"/g)) {
      badgeScripts.add(path.join(root, new URL(match[1], 'https://local.invalid').pathname))
    }
  }
}
let removedHydrationBadges = 0
for (const file of badgeScripts) {
  const text = files.get(file)
  if (!text || !/className\s*:\s*["'][^"']*\b(?:eyebrow|hub-hero-wordmark)\b/.test(text)) continue
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS)
  const edits = new Map()
  function visit(node) {
    if (ts.isCallExpression(node) && node.arguments[0] && ts.isStringLiteral(node.arguments[0]) && node.arguments[0].text === 'h1') {
      let child = node
      while (child.parent && !ts.isArrayLiteralExpression(child.parent) && !ts.isFunctionLike(child.parent)) child = child.parent
      if (child.parent && ts.isArrayLiteralExpression(child.parent)) {
        const siblings = child.parent.elements
        const index = siblings.indexOf(child)
        const previous = index > 0 ? siblings[index - 1] : null
        if (previous && /className\s*:\s*["'][^"']*\b(?:eyebrow|hub-hero-wordmark)\b/.test(previous.getText(source))) {
          edits.set(previous.getStart(source), previous.end)
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  let next = text
  for (const [start, end] of [...edits].sort(([a], [b]) => b - a)) next = next.slice(0, start) + 'null' + next.slice(end)
  if (next !== text) { files.set(file, next); pending.add(file); removedHydrationBadges += edits.size }
}
if (badgeScripts.size && !removedHydrationBadges) throw new Error('Could not remove the exported hero labels from their hydration bundles')
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
console.log(`Synchronized ${updated} standalone headings; removed ${removedBadges} hero labels and ${removedHydrationBadges} hydration label calls.`)
