import pageHeadings from '../data/pageHeadings.json'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageShell from '../components/PageShell.jsx'
import { blogPosts } from '../data/blogPosts.js'
import fallbackImage from './python-blog-logo.webp'
import bigDataCover from '../assets/blog-covers/big-data-machine-learning-v2.webp'
import devOpsCover from '../assets/blog-covers/devops-ci-cd-practices-v2.webp'
import deploymentCover from '../assets/blog-covers/engineering-ci-cd-deployment-v2.webp'
import globalTalentCover from '../assets/blog-covers/global-talent-acquisition-v2.webp'
import { pageTitles } from '../data/siteContent.js'
import {
  fetchMediumPosts,
  peekMediumPostsCache,
  resolveMediumFeedUrl,
} from '../lib/mediumFeed.js'

const generatedMediumCovers = {
  '5f4341ca2504': bigDataCover,
  '1e7eaac302f8': devOpsCover,
  fc5880dfbca8: deploymentCover,
  '8d4b7c5ebd80': globalTalentCover,
}

function blogsBootstrapState(feedUrl) {
  if (!feedUrl) return { posts: [], loading: false }
  const peek = peekMediumPostsCache(feedUrl)
  return {
    posts: peek.posts,
    loading: peek.posts.length === 0,
  }
}

function LoadingCards() {
  return Array.from({ length: 5 }, (_, index) => (
    <li
      key={index}
      aria-hidden="true"
      className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm"
    >
      <div className="aspect-[16/10] animate-pulse bg-gradient-to-br from-zinc-200 to-zinc-100" />
      <div className="p-5 sm:p-6">
        <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200" />
        <div className="mt-2 h-[3.75em] w-5/6 animate-pulse rounded bg-zinc-200 text-lg leading-snug sm:text-xl" />
        <div className="mt-3 h-[8.125em] animate-pulse rounded bg-zinc-100 text-sm" />
        <div className="mt-5 h-[38px] w-36 animate-pulse rounded-full bg-zinc-200" />
      </div>
    </li>
  ))
}

function BlogPostCard({ post, onMedium = false }) {
  const [failedImages, setFailedImages] = useState([])
  const mediumPostId = onMedium ? post.link.match(/-([\da-f]{12})\/?(?:[?#]|$)/i)?.[1] : undefined
  const cover = [post.imageUrl, generatedMediumCovers[mediumPostId]]
    .find((image) => image && !failedImages.includes(image))
  const externalLink = onMedium ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  const byline = [post.author, post.publishedAt && formatPublished(post.publishedAt)]
    .filter(Boolean)
    .join(' · ')

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition hover:border-violet-200/90 hover:shadow-md">
      <a
        href={post.link}
        {...externalLink}
        aria-label={'Read ' + post.title}
        className="relative block aspect-[16/10] shrink-0 overflow-hidden bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
      >
        <img
          src={cover || fallbackImage}
          alt=""
          decoding="async"
          className={`h-full w-full transition duration-500 ease-out group-hover:scale-[1.03] ${cover ? 'object-cover' : 'bg-white object-contain p-8'}`}
          onError={cover ? () => setFailedImages((images) => [...images, cover]) : undefined}
        />
      </a>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {byline && <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">{byline}</p>}
        <h2 className="mt-2 line-clamp-3 font-[family:var(--font-display)] text-lg font-semibold leading-snug tracking-tight text-ething-ink sm:text-xl">
          <a
            href={post.link}
            {...externalLink}
            className="text-balance underline-offset-2 transition hover:text-violet-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          >
            {post.title}
          </a>
        </h2>
        <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-zinc-600">{post.excerpt}</p>
        <div className="mt-auto pt-5">
          <a
            href={post.link}
            {...externalLink}
            className="inline-flex items-center gap-1.5 rounded-full border border-violet-600/25 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-800 transition hover:bg-violet-100 hover:border-violet-600/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          >
            {onMedium ? 'Read more on Medium' : 'Read the guide'}
            <ArrowUpRight className="h-4 w-4 opacity-85" aria-hidden />
          </a>
        </div>
      </div>
    </article>
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
    <PageShell title={pageHeadings['/blogs']} compact>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600 leading-relaxed">{p.intro}</p>
      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => <li key={post.link}><BlogPostCard post={post} /></li>)}
        {loading && <LoadingCards />}
        {posts.map((post, index) => (
          <motion.li
            key={post.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25), ease: [0.22, 1, 0.36, 1] }}
          >
            <BlogPostCard post={post} onMedium />
          </motion.li>
        ))}
      </ul>

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
          <p className="font-semibold">More posts are temporarily unavailable</p>
          <p className="mt-1 opacity-95">You can still read the hiring guides above.</p>
        </div>
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
