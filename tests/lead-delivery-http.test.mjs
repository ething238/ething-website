import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import fs from 'node:fs/promises'
import net from 'node:net'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = fileURLToPath(new URL('../', import.meta.url))
const routes = ['hire-developers', 'hire-ai-developers', 'hire-python-developers', 'hire-full-stack-developers', 'hire-react-developers', 'hire-devops-engineers', 'staff-augmentation', 'hire-top-talent']

test('all eight unchanged forms point at the explicit PHP rewrite, before the SPA fallback', async () => {
  const rules = await fs.readFile(path.join(root, 'public/.htaccess'), 'utf8')
  assert.ok(rules.includes('RewriteRule ^api/hire-developers/?$ api/hire-developers.php [L]'))
  assert.ok(rules.indexOf('api/hire-developers.php') < rules.indexOf('RewriteRule . /index.html'))
  for (const route of routes) {
    const html = await fs.readFile(path.join(root, `public/${route}/index.html`), 'utf8')
    for (const field of ['name', 'email', 'phone', 'company', 'hiringNeed']) {
      assert.ok(html.includes(`name="${field}"`), `Required ${field} missing on ${route}`)
    }
    const shared = html.match(/src="([^"]*60-3ff588cd19a9620b\.js)"/)
    assert.ok(shared, `Shared form chunk missing on ${route}`)
    const js = await fs.readFile(path.join(root, 'public', shared[1]), 'utf8')
    assert.ok(js.includes('fetch("/api/hire-developers"'), route)
  }
})

test('real PHP HTTP entrypoint returns JSON errors, never HTML or fake success without configuration', async () => {
  assert.ok(process.env.PHP_BINARY, 'Set PHP_BINARY to a PHP 8.2+ executable')
  // Isolated fixture has NO credentials, config.local.php or SMTP dependency.
  const fixture = await fs.mkdtemp(path.join(os.tmpdir(), 'ething-lead-http-'))
  await fs.mkdir(path.join(fixture, 'public_html/api'), { recursive: true })
  await fs.mkdir(path.join(fixture, 'server/lead-delivery'), { recursive: true })
  const entry = path.join(fixture, 'public_html/api/hire-developers.php')
  const handler = path.join(fixture, 'server/lead-delivery/handler.php')
  await fs.copyFile(path.join(root, 'public/api/hire-developers.php'), entry)
  await fs.copyFile(path.join(root, 'server/lead-delivery/handler.php'), handler)
  const socket = net.createServer()
  socket.listen(0, '127.0.0.1')
  await once(socket, 'listening')
  const port = socket.address().port
  await new Promise(resolve => socket.close(resolve))
  const php = spawn(process.env.PHP_BINARY, ['-n', '-S', `127.0.0.1:${port}`, entry], {
    cwd: fixture,
    env: { SystemRoot: process.env.SystemRoot, PATH: process.env.PATH, TEMP: os.tmpdir(), TMP: os.tmpdir() },
    windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'],
  })
  let failure = ''
  php.stderr.on('data', bytes => { failure += bytes.toString() })
  php.on('error', error => { failure += error.message })
  const url = `http://127.0.0.1:${port}/api/hire-developers`
  try {
    let ready = false
    for (let i = 0; i < 60; i++) {
      try { await fetch(url); ready = true; break } catch { await new Promise(resolve => setTimeout(resolve, 50)) }
    }
    assert.ok(ready, `PHP HTTP fixture did not start: ${failure}`)
    const get = await fetch(url)
    assert.equal(get.status, 405)
    assert.equal(get.headers.get('allow'), 'POST')
    assert.match(get.headers.get('content-type'), /application\/json/)
    assert.equal(get.headers.get('cache-control'), 'no-store')
    assert.equal((await get.json()).message, 'Method not allowed.')
    for (const route of routes) {
      const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://www.ethingsolutions.com' }, body: JSON.stringify({ name: 'Test', email: 'visitor@example.invalid', phone: '1234567890', company: 'Example', hiringNeed: 'Developer', landingPage: `/${route}/` }) })
      assert.equal(response.status, 503, route)
      const result = await response.json()
      assert.ok(result.message.includes('support@ething.in'))
      assert.notEqual(result.success, true)
    }
    const bad = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })
    assert.equal(bad.status, 400)
    const crossSite = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://evil.example' }, body: '{}' })
    assert.equal(crossSite.status, 403)
  } finally {
    if (php.exitCode === null) { const exited = once(php, 'exit'); php.kill(); await exited }
    // Remove only the two known fixture files and their now-empty directories.
    await fs.unlink(entry)
    await fs.unlink(handler)
    for (const dir of ['public_html/api', 'public_html', 'server/lead-delivery', 'server', '']) await fs.rmdir(path.join(fixture, dir))
  }
})
