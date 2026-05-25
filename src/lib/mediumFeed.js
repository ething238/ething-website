const RSS2JSON = 'https://api.rss2json.com/v1/api.json'
const CONTENT_NS = 'http://purl.org/rss/1.0/modules/content/'
const DC_NS = 'http://purl.org/dc/elements/1.1/'

/** rss2json keys are long; placeholders in .env often trigger 422 — only send key when it looks real. */
const MIN_RSS2JSON_KEY_LEN = 28

const CACHE_MS = 10 * 60 * 1000
const CACHE_STORAGE_KEY = 'ething.medium.posts'

/** Default RSS for Ething on Medium (`VITE_MEDIUM_FEED_URL` overrides when set). */
const DEFAULT_MEDIUM_FEED_URL = 'https://medium.com/feed/@EthingSolutions'

function normalizeMediumFeedUrl(url) {
  const s = (url || '').trim()
  if (!s) return ''
  try {
    const u = new URL(s)
    const host = u.hostname.replace(/^www\./, '')
    if (host !== 'medium.com') return s
    if (u.pathname.startsWith('/feed/')) return s
    const m = u.pathname.match(/^\/@([\w.-]+)/i)
    if (m) return `https://medium.com/feed/@${m[1]}`
  } catch {
    return s
  }
  return s
}

/** Local Vite middleware only runs in dev — `/api/medium-rss` is not available on static production hosts. */
function shouldTryLocalRssProxy() {
  return !import.meta.env.PROD
}

/** Base path-aware URL for `/medium-rss.php` shipped in `public/` (Hostinger / PHP hosts). */
function hostingRssProxyRequestUrl(feedUrl) {
  const base = import.meta.env.BASE_URL ?? '/'
  const root = base === '/' ? '' : base.replace(/\/$/, '')
  return `${root}/medium-rss.php?url=${encodeURIComponent(feedUrl)}`
}

/**
 * Production: fetch RSS via same-origin PHP proxy (public/medium-rss.php → dist/).
 * Avoids rss2json rate limits & broken public CORS proxies.
 */
async function fetchPostsViaHostingRssProxy(feedUrl) {
  if (!import.meta.env.PROD) return []
  try {
    const res = await fetch(hostingRssProxyRequestUrl(feedUrl), {
      signal: abortAfter(18_000),
    })
    if (!res.ok) return []
    const text = await res.text()
    const sample = text.slice(0, 1400).toLowerCase()
    if (
      !sample.includes('<rss') &&
      !sample.includes('<feed') &&
      !sample.includes('<rdf:rdf')
    )
      return []
    try {
      return parseRssXml(text)
    } catch {
      return []
    }
  } catch {
    return []
  }
}

function abortAfter(ms) {
  try {
    return AbortSignal.timeout(ms)
  } catch {
    const c = new AbortController()
    setTimeout(() => c.abort(), ms)
    return c.signal
  }
}

function stripHtml(html) {
  if (!html) return ''
  if (typeof window === 'undefined') {
    return html
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }
  const doc = document.implementation.createHTMLDocument()
  const el = doc.createElement('div')
  el.innerHTML = html
  return (el.textContent || el.innerText || '').replace(/\s+/g, ' ').trim()
}

function firstImgFromHtml(html) {
  if (!html) return null
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return m?.[1]?.replace(/&amp;/g, '&') ?? null
}

function getChildText(parent, localName) {
  const nodes = parent.getElementsByTagName(localName)
  return nodes[0]?.textContent?.trim() ?? ''
}

function truncateExcerpt(text, max = 176) {
  const t = stripHtml(text)
  if (t.length <= max) return t || 'Read the full article on Medium.'
  return `${t.slice(0, max).trim()}…`
}

function normalizeRss2JsonItem(item, i) {
  if (!item?.link) return null
  const desc = item.description || item.content || ''
  return {
    id: String(item.guid || item.link || i),
    title: item.title?.trim() || 'Untitled',
    link: item.link,
    excerpt: truncateExcerpt(desc),
    imageUrl: item.thumbnail || firstImgFromHtml(desc) || null,
    publishedAt: item.pubDate || null,
    author: item.author || null,
  }
}

/** @param {string} xmlText */
function parseRssXml(xmlText) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlText, 'text/xml')
  const pe = doc.querySelector('parsererror')
  if (pe) throw new Error('RSS parse failed')

  const posts = []
  const items = doc.getElementsByTagName('item')
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const title = getChildText(item, 'title')
    const link = getChildText(item, 'link')
    if (!link) continue

    const encoded = item.getElementsByTagNameNS(CONTENT_NS, 'encoded')[0]
    let htmlSnippet = encoded?.textContent || getChildText(item, 'description')
    htmlSnippet = htmlSnippet || ''

    const creator = item.getElementsByTagNameNS(DC_NS, 'creator')[0]

    posts.push({
      id: `${link}-${i}`,
      title: title || 'Untitled',
      link,
      excerpt: truncateExcerpt(htmlSnippet),
      imageUrl: firstImgFromHtml(htmlSnippet),
      publishedAt: getChildText(item, 'pubDate') || null,
      author: creator?.textContent?.trim() || null,
    })
  }

  return posts
}

function cacheStorageKey(feedUrl) {
  return `${CACHE_STORAGE_KEY}:${feedUrl}`
}

/** For instant paint on repeat visits — read synchronously. */
export function peekMediumPostsCache(feedUrl) {
  const url = feedUrl?.trim()
  if (!url || typeof sessionStorage === 'undefined')
    return { posts: [], isFresh: false, hasStale: false }
  try {
    const raw = sessionStorage.getItem(cacheStorageKey(url))
    if (!raw) return { posts: [], isFresh: false, hasStale: false }
    const { ts, posts } = JSON.parse(raw)
    if (!Array.isArray(posts)) return { posts: [], isFresh: false, hasStale: false }
    const age = Date.now() - Number(ts || 0)
    return {
      posts,
      isFresh: age >= 0 && age < CACHE_MS && posts.length > 0,
      hasStale: posts.length > 0,
    }
  } catch {
    return { posts: [], isFresh: false, hasStale: false }
  }
}

function writePostsCache(feedUrl, posts) {
  const url = feedUrl?.trim()
  if (!url || typeof sessionStorage === 'undefined') return
  try {
    sessionStorage.setItem(
      cacheStorageKey(url),
      JSON.stringify({ ts: Date.now(), posts }),
    )
  } catch {
    /* quota / privacy mode */
  }
}

/**
 * @param {string} feedUrl
 * @param {{ useApiKey: boolean }} opts
 */
async function fetchPostsViaRss2Json(feedUrl, { useApiKey }) {
  try {
    let jsonUrl = `${RSS2JSON}?rss_url=${encodeURIComponent(feedUrl)}`
    const key = (import.meta.env.VITE_RSS2JSON_API_KEY || '').trim()
    if (useApiKey && key.length >= MIN_RSS2JSON_KEY_LEN)
      jsonUrl += `&api_key=${encodeURIComponent(key)}`

    const res = await fetch(jsonUrl, { signal: abortAfter(12_000) })
    const data = await res.json()
    if (data.status !== 'ok' || !Array.isArray(data.items)) return []
    return data.items.map(normalizeRss2JsonItem).filter(Boolean)
  } catch {
    return []
  }
}

/**
 * Fetch RSS via Vite `/api/medium-rss` (dev only — avoids browser CORS to Medium).
 *
 * @param {string} feedUrl
 */
async function fetchPostsViaLocalRssProxy(feedUrl) {
  if (!shouldTryLocalRssProxy()) return []
  try {
    const res = await fetch(`/api/medium-rss?url=${encodeURIComponent(feedUrl)}`, {
      signal: abortAfter(12_000),
    })
    if (!res.ok) return []
    const text = await res.text()
    const sample = text.slice(0, 1400).toLowerCase()
    if (
      !sample.includes('<rss') &&
      !sample.includes('<feed') &&
      !sample.includes('<rdf:rdf')
    ) {
      return []
    }
    try {
      return parseRssXml(text)
    } catch {
      return []
    }
  } catch {
    return []
  }
}

/**
 * Fetch raw RSS through public CORS proxies (prod fallback — often slow/unreliable).
 *
 * @param {string} feedUrl
 */
async function fetchPostsViaCorsProxies(feedUrl) {
  const wrappers = [
    (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
    (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`,
  ]

  for (const wrap of wrappers) {
    try {
      const res = await fetch(wrap(feedUrl), { signal: abortAfter(14_000) })
      if (!res.ok) continue
      const text = await res.text()
      const posts = parseRssXml(text)
      if (posts.length) return posts
    } catch {
      continue
    }
  }
  return []
}

/**
 * Loads posts from a Medium RSS URL.
 *
 * **Why loads can feel slow:**
 * - **Production**: same-origin **`/medium-rss.php`** (Hostinger/PHP) when present; else **rss2json** or public CORS proxies.
 * - **Previously**: sequential fallbacks **without timeouts** could wait a long time on dead proxies,
 *   and `/api/medium-rss` on static hosts wasted a full SPA HTML round trip.
 *
 * **Now:** timeouts, cache (see `peekMediumPostsCache`), dev parallel fetch, prod skips useless proxy GET.
 *
 * @param {string} feedUrl
 * @returns {Promise<{ posts: Array<object>, error: string | null }>}
 */
export async function fetchMediumPosts(feedUrl) {
  const url = feedUrl?.trim()
  if (!url) return { posts: [], error: null }

  try {
    let posts = []

    if (shouldTryLocalRssProxy()) {
      /** Dev: Medium + rss2json in parallel — whichever returns posts first avoids waiting twice. */
      const [localPosts, rssPlain] = await Promise.all([
        fetchPostsViaLocalRssProxy(url),
        fetchPostsViaRss2Json(url, { useApiKey: false }),
      ])
      posts = localPosts.length ? localPosts : rssPlain
      if (!posts.length) {
        const key = (import.meta.env.VITE_RSS2JSON_API_KEY || '').trim()
        if (key.length >= MIN_RSS2JSON_KEY_LEN)
          posts = await fetchPostsViaRss2Json(url, { useApiKey: true })
      }
      if (!posts.length) posts = await fetchPostsViaCorsProxies(url)
    } else {
      /** Production: PHP proxy first (see `public/medium-rss.php`), then rss2json, then proxies. */
      posts = await fetchPostsViaHostingRssProxy(url)
      if (!posts.length) posts = await fetchPostsViaRss2Json(url, { useApiKey: false })
      if (!posts.length) {
        const key = (import.meta.env.VITE_RSS2JSON_API_KEY || '').trim()
        if (key.length >= MIN_RSS2JSON_KEY_LEN)
          posts = await fetchPostsViaRss2Json(url, { useApiKey: true })
      }
      if (!posts.length) posts = await fetchPostsViaCorsProxies(url)
    }

    if (posts.length) {
      writePostsCache(url, posts)
      return { posts, error: null }
    }

    return {
      posts: [],
      error:
        'Could not load the feed. On Hostinger, upload `medium-rss.php` from your `dist` folder next to `index.html`, or set a valid VITE_RSS2JSON_API_KEY and rebuild.',
    }
  } catch (e) {
    return {
      posts: [],
      error:
        e instanceof Error ? e.message : 'Unable to load the Medium feed right now.',
    }
  }
}

export function resolveMediumFeedUrl() {
  const raw = (import.meta.env.VITE_MEDIUM_FEED_URL || '').trim()
  return normalizeMediumFeedUrl(raw || DEFAULT_MEDIUM_FEED_URL)
}
