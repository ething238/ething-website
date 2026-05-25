import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
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
    seoStaticFilesPlugin(),
    mediumRssProxyPlugin(),
  ],
})
