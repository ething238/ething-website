import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { pageTitles } from './src/data/pageTitles.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function cleanText(value, fallback = 'unknown', maxLength = 256) {
  if (typeof value !== 'string') return fallback
  const trimmed = value.trim()
  if (!trimmed) return fallback
  return trimmed.slice(0, maxLength)
}

function parseCookies(header = '') {
  return Object.fromEntries(
    header
      .split(';')
      .map((part) => part.trim().split('='))
      .filter(([key, value]) => key && value)
      .map(([key, value]) => [key, decodeURIComponent(value)]),
  )
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim()
  }
  const socketAddress = req.socket?.remoteAddress
  return socketAddress && socketAddress !== '::1' ? socketAddress : 'unknown'
}

function isPrivateOrLocalIp(ip) {
  return (
    ip === 'unknown' ||
    ip === '::1' ||
    ip.startsWith('127.') ||
    ip.startsWith('10.') ||
    ip.startsWith('192.168.') ||
    ip.startsWith('172.16.') ||
    ip.startsWith('172.17.') ||
    ip.startsWith('172.18.') ||
    ip.startsWith('172.19.') ||
    ip.startsWith('172.2') ||
    ip.startsWith('fd') ||
    ip.startsWith('fe80:')
  )
}

async function lookupGeo(ip) {
  if (isPrivateOrLocalIp(ip)) return {}

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 1500)
    const response = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`, {
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (!response.ok) return {}
    const data = await response.json()
    return {
      country: cleanText(data.country_name, 'unknown', 80),
      region: cleanText(data.region, 'unknown', 80),
      city: cleanText(data.city, 'unknown', 80),
    }
  } catch {
    return {}
  }
}

async function supabaseRequest(env, endpoint, options = {}) {
  const url = env.VITE_SUPABASE_URL?.replace(/\/$/, '')
  const secretKey = env.SUPABASE_SECRET_KEY

  if (!url || !secretKey) {
    throw new Error('Missing VITE_SUPABASE_URL or SUPABASE_SECRET_KEY')
  }

  const authHeaders = {
    apikey: secretKey,
  }

  if (!secretKey.startsWith('sb_')) {
    authHeaders.Authorization = `Bearer ${secretKey}`
  }

  const response = await fetch(`${url}/rest/v1/${endpoint}`, {
    ...options,
    headers: {
      ...authHeaders,
      ...options.headers,
    },
  })

  if (!response.ok) {
    const message = await response.text().catch(() => '')
    throw new Error(`Supabase request failed: ${response.status} ${message}`)
  }

  return response
}

function visitorAnalyticsDevPlugin() {
  let env = {}

  async function visitMiddleware(req, res) {
    const rawBody = await readBody(req)
    let payload = {}
    try {
      payload = JSON.parse(rawBody)
    } catch {
      payload = {}
    }

    const cookies = parseCookies(req.headers.cookie)
    const existingVisitorId = cookies.visitor_id
    const visitorId = existingVisitorId || randomUUID()
    const ip = getClientIp(req)
    const geo = await lookupGeo(ip)

    const visit = {
      id: randomUUID(),
      visitor_id: visitorId,
      visited_at: new Date().toISOString(),
      path: cleanText(payload.path, '/', 200),
      ip,
      user_agent: cleanText(req.headers['user-agent'], 'unknown', 500),
      referrer: cleanText(payload.referrer, 'direct', 400),
      language: cleanText(payload.language || req.headers['accept-language'], 'unknown', 80),
      timezone: cleanText(payload.timezone, 'unknown', 80),
      screen: cleanText(payload.screen, 'unknown', 40),
      country: geo.country || 'unknown',
      region: geo.region || 'unknown',
      city: geo.city || 'unknown',
      source: cleanText(req.headers['sec-ch-ua-platform'] || 'web', 'web', 80),
    }

    await supabaseRequest(env, 'visitor_visits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(visit),
    })

    if (!existingVisitorId) {
      res.setHeader(
        'Set-Cookie',
        `visitor_id=${encodeURIComponent(visitorId)}; Path=/; Max-Age=31536000; SameSite=Lax; HttpOnly`,
      )
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ ok: true }))
  }

  async function visitsMiddleware(req, res) {
    const requestUrl = new URL(req.url || '/', 'http://vite.local')
    const providedKey = requestUrl.searchParams.get('key') || ''

    if (!env.VISITOR_DASHBOARD_KEY || providedKey !== env.VISITOR_DASHBOARD_KEY) {
      res.statusCode = 401
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ error: 'Unauthorized' }))
      return
    }

    const limit = Math.max(1, Math.min(Number(requestUrl.searchParams.get('limit')) || 500, 1000))
    const query = new URLSearchParams({
      select: '*',
      order: 'visited_at.desc',
      limit: String(limit),
    })
    const response = await supabaseRequest(env, `visitor_visits?${query.toString()}`, {
      headers: {
        Accept: 'application/json',
      },
    })
    const rows = await response.json()
    const visits = rows.map((row) => ({
      id: row.id || '',
      visitorId: row.visitor_id || '',
      visitedAt: row.visited_at || '',
      path: row.path || '',
      ip: row.ip || '',
      userAgent: row.user_agent || '',
      referrer: row.referrer || '',
      language: row.language || '',
      timezone: row.timezone || '',
      screen: row.screen || '',
      country: row.country || '',
      region: row.region || '',
      city: row.city || '',
      source: row.source || '',
    }))

    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ visits }))
  }

  return {
    name: 'visitor-analytics-dev-api',
    configResolved(config) {
      env = loadEnv(config.mode, process.cwd(), '')
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          if (req.url?.startsWith('/api/visit') && req.method === 'POST') {
            await visitMiddleware(req, res)
            return
          }
          if (req.url?.startsWith('/api/visits') && req.method === 'GET') {
            await visitsMiddleware(req, res)
            return
          }
        } catch (error) {
          console.error('Visitor analytics dev API error:', error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ error: 'Visitor analytics dev API error' }))
          return
        }
        next()
      })
    },
  }
}

function seoStaticFilesPlugin() {
  let viteConfig
  return {
    name: 'seo-static-files',
    apply: 'build',
    configResolved(config) {
      viteConfig = config
    },
    closeBundle() {
      const env = loadEnv(viteConfig.mode, process.cwd(), '')
      const baseUrl = (env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, '')
      const outDir = viteConfig.build.outDir
      const paths = Object.keys(pageTitles).sort((a, b) => {
        if (a === '/') return -1
        if (b === '/') return 1
        return a.localeCompare(b)
      })
      const urlBlocks = paths
        .map((p) => {
          const loc = p === '/' ? `${baseUrl}/` : `${baseUrl}${p}`
          const priority = p === '/' ? '1.0' : '0.8'
          return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
        })
        .join('\n')
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlBlocks}
</urlset>
`
      const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`
      fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap)
      fs.writeFileSync(path.join(outDir, 'robots.txt'), robots)
    },
  }
}

function mediumRssProxyPlugin() {
  async function rssProxyMiddleware(req, res) {
    const rawUrl = req.url || ''
    if (!rawUrl.startsWith('/api/medium-rss')) return false

    let target
    try {
      target = new URL(rawUrl, 'http://vite.local').searchParams.get('url')
    } catch {
      target = null
    }
    if (!target?.trim()) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end('Missing url query parameter')
      return true
    }

    let parsed
    try {
      parsed = new URL(target)
    } catch {
      res.statusCode = 400
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end('Invalid feed URL')
      return true
    }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      res.statusCode = 400
      res.end('Only http/https URLs allowed')
      return true
    }

    try {
      const r = await fetch(target, {
        headers: {
          Accept:
            'application/rss+xml, application/xml, application/atom+xml, text/xml;q=0.9, */*;q=0.5',
          'User-Agent':
            'Mozilla/5.0 (compatible; EthingSite/1.0; RSS reader; https://ething.in)',
        },
      })
      const body = await r.text()
      const ct =
        r.headers.get('content-type') || 'application/rss+xml; charset=utf-8'
      res.setHeader('Content-Type', ct)
      res.statusCode = r.status
      res.end(body)
    } catch (e) {
      res.statusCode = 502
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end(e instanceof Error ? e.message : 'Upstream fetch failed')
    }
    return true
  }

  return {
    name: 'medium-rss-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          if (await rssProxyMiddleware(req, res)) return
        } catch {
          res.statusCode = 500
          res.end('Proxy error')
          return
        }
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          if (await rssProxyMiddleware(req, res)) return
        } catch {
          res.statusCode = 500
          res.end('Proxy error')
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visitorAnalyticsDevPlugin(),
    seoStaticFilesPlugin(),
    mediumRssProxyPlugin(),
  ],
})
