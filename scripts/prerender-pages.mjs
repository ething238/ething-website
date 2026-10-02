import fs from 'node:fs/promises'
import path from 'node:path'
import { createServer } from 'vite'

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { renderPage } = await server.ssrLoadModule('/src/prerender-entry.jsx')
  const { pageTitles } = await server.ssrLoadModule('/src/data/pageTitles.js')
  const template = (await fs.readFile('dist/index.html', 'utf8'))
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*name="(?:description|robots)"[^>]*>/gi, '')
    .replace('</head>', '<noscript><style>[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}</style></noscript>\n</head>')

  for (const route of [...Object.keys(pageTitles), '/visitor-dashboard', '/404']) {
    const pathname = route === '/' ? '/' : route.replace(/\/$/, '')
    const output = pathname === '/' ? 'dist/index.html'
      : pathname === '/404' ? 'dist/404.html'
        : path.join('dist', pathname.slice(1), 'index.html')
    const canonical = `https://www.ethingsolutions.com${pathname}`
    const staticSource = path.join('public', pathname.slice(1), 'index.html')
    const isStatic = pathname !== '/' && await fs.access(staticSource).then(() => true, () => false)

    // These independent landing pages have their own design, scripts and forms.
    if (isStatic) {
      let html = await fs.readFile(output, 'utf8')
      const originalCanonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1]
      if (originalCanonical) html = html.replaceAll(originalCanonical, canonical)
      html = html.replace(/(<link\b[^>]*rel="canonical"[^>]*href=")[^"]+("[^>]*>)/, `$1${canonical}$2`)
        .replace(/(<meta\b[^>]*property="og:url"[^>]*content=")[^"]+("[^>]*>)/, `$1${canonical}$2`)
      await fs.writeFile(output, html)
      console.log(`Preserved static page: ${pathname}`)
      continue
    }

    let { markup } = renderPage(pathname)
    // React 19 renders Helmet metadata inline in renderToString. Move it into
    // the document head, using the exact same Seo components as the browser.
    const head = []
    markup = markup.replace(/<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*rel="(?:canonical|alternate)"[^>]*>|<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, (tag) => {
      head.push(tag)
      return ''
    })
    if (!head.some((tag) => tag.startsWith('<title'))) {
      throw new Error(`Missing SEO metadata for ${pathname}`)
    }
    const html = template.replace('</head>', `${head.join('\n')}\n</head>`)
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    await fs.mkdir(path.dirname(output), { recursive: true })
    await fs.writeFile(output, html)
    console.log(`Prerendered: ${pathname}`)
  }
  // Keep the legacy artifact for existing deployment tooling.
  await fs.copyFile('dist/index.html', 'dist/home.html')
} finally {
  await server.close()
}
