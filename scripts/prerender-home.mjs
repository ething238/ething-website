import fs from 'node:fs/promises'
import { createServer } from 'vite'

// Render the same application component used by the browser, so the initial
// response contains real headings, service links and the contact form.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { renderHome } = await server.ssrLoadModule('/src/prerender-entry.jsx')
  const { markup } = renderHome()
  const { pageDescriptions } = await server.ssrLoadModule('/src/data/siteContent.js')
  const { pageTitles } = await server.ssrLoadModule('/src/data/pageTitles.js')
  let html = await fs.readFile('dist/index.html', 'utf8')
  // The source index contains generic SPA metadata for other client routes.
  // Replace it on the homepage with the route-specific Helmet output.
  html = html.replace(/<meta\s+name="description"[\s\S]*?\/>/, '')
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta name="robots"[^>]*\/>/, '')
  const escape = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const title = escape(pageTitles['/'])
  const description = escape(pageDescriptions['/'])
  const url = 'https://www.ethingsolutions.com/'
  const image = `${url}images/ething-logo.png`
  const head = `<title data-rh="true">${title}</title>
    <meta data-rh="true" name="description" content="${description}" />
    <link data-rh="true" rel="canonical" href="${url}" />
    <meta data-rh="true" name="robots" content="index, follow" />
    <meta data-rh="true" property="og:type" content="website" />
    <meta data-rh="true" property="og:title" content="${title}" />
    <meta data-rh="true" property="og:description" content="${description}" />
    <meta data-rh="true" property="og:url" content="${url}" />
    <meta data-rh="true" property="og:image" content="${image}" />
    <meta data-rh="true" property="og:site_name" content="Ething" />
    <meta data-rh="true" name="twitter:card" content="summary_large_image" />
    <meta data-rh="true" name="twitter:title" content="${title}" />
    <meta data-rh="true" name="twitter:description" content="${description}" />
    <meta data-rh="true" name="twitter:image" content="${image}" />`
  html = html.replace('</head>', `${head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
  await fs.writeFile('dist/home.html', html)
} finally {
  await server.close()
}
