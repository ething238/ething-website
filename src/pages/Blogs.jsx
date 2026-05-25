import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageShell from '../components/PageShell.jsx'
import { pageTitles } from '../data/siteContent.js'
import {
  fetchMediumPosts,
  peekMediumPostsCache,
  resolveMediumFeedUrl,
} from '../lib/mediumFeed.js'

const fallbackImage = '/images/ething-logo.png'

function blogsBootstrapState(feedUrl) {
  if (!feedUrl) return { posts: [], loading: false }
  const peek = peekMediumPostsCache(feedUrl)
  return {
    posts: peek.posts,
    loading: peek.posts.length === 0,
  }
}

function SkeletonGrid() {
  return (
    <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <li
          key={i}
          className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm"
        >
          <div className="aspect-[16/10] animate-pulse bg-gradient-to-br from-zinc-200 to-zinc-100" />
          <div className="space-y-3 p-5">
            <div className="h-4 animate-pulse rounded bg-zinc-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200" />
            <div className="h-14 animate-pulse rounded bg-zinc-100" />
            <div className="h-10 w-28 animate-pulse rounded-full bg-zinc-200" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function Blogs({ content }) {
  const p = content.pages.blogs
  const feedUrl = resolveMediumFeedUrl()
  const bootstrap = blogsBootstrapState(feedUrl)

  const [posts, setPosts] = useState(bootstrap.posts)
  const [loading, setLoading] = useState(bootstrap.loading)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = pageTitles['/blogs']
  }, [])

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!feedUrl) {
        setPosts([])
        setError(null)
        setLoading(false)
        return
      }

      const peek = peekMediumPostsCache(feedUrl)
      if (peek.isFresh && peek.posts.length) {
        setPosts(peek.posts)
        setError(null)
        setLoading(false)
        return
      }

      if (!peek.posts.length) setLoading(true)
      else {
        setPosts(peek.posts)
        setLoading(false)
      }
      setError(null)

      const res = await fetchMediumPosts(feedUrl)
      if (cancelled) return
      setPosts(res.posts)
      setError(res.error)
      setLoading(false)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [feedUrl])

  return (
    <PageShell title={p.title} kicker={p.kicker}>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600 leading-relaxed">{p.intro}</p>

      {!feedUrl && (
        <div
          role="note"
          className="mt-8 rounded-2xl border border-violet-200 bg-violet-50/70 px-4 py-4 text-sm text-violet-900 sm:px-5"
        >
          <p className="font-semibold">{p.feedMissingTitle}</p>
          <p className="mt-1 leading-relaxed text-violet-800/95">{p.feedMissingHint}</p>
        </div>
      )}

      {feedUrl && error && posts.length === 0 && (
        <div
          role="alert"
          className="mt-8 rounded-2xl border border-rose-200 bg-rose-50/80 px-4 py-4 text-sm text-rose-950 sm:px-5"
        >
          <p className="font-semibold">{p.errorTitle}</p>
          <p className="mt-1 opacity-95">{error}</p>
        </div>
      )}

      {loading && <SkeletonGrid />}

      {!loading && posts.length > 0 && (
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.li
                key={post.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.25), ease: [0.22, 1, 0.36, 1] }}
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition hover:border-violet-200/90 hover:shadow-md">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block aspect-[16/10] shrink-0 overflow-hidden bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                  >
                    <img
                      src={post.imageUrl || fallbackImage}
                      alt=""
                      decoding="async"
                      className={`h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03] ${!post.imageUrl ? 'bg-white object-contain p-8 opacity-70' : ''}`}
                      onError={(e) => {
                        e.currentTarget.src = fallbackImage
                        e.currentTarget.classList.add('bg-white', 'object-contain', 'p-8')
                      }}
                    />
                  </a>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    {(post.author || post.publishedAt) && (
                      <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                        {[post.author, post.publishedAt ? formatPublished(post.publishedAt) : null]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                    )}
                    <h2 className="mt-2 font-[family:var(--font-display)] text-lg font-semibold leading-snug tracking-tight text-ething-ink sm:text-xl">
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-balance underline-offset-2 transition hover:text-violet-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                      >
                        {post.title}
                      </a>
                    </h2>
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-600">
                      {post.excerpt}
                    </p>
                    <div className="mt-5">
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-violet-600/25 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-800 transition hover:bg-violet-100 hover:border-violet-600/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                      >
                        Read more on Medium
                        <ArrowUpRight className="h-4 w-4 opacity-85" aria-hidden />
                      </a>
                    </div>
                  </div>
                </article>
              </motion.li>
            ))}
          </ul>
        )}
    </PageShell>
  )
}

function formatPublished(isoLike) {
  try {
    const d = new Date(isoLike)
    if (Number.isNaN(d.getTime())) return String(isoLike)
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return String(isoLike)
  }
}
