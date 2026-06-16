import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, TrendingUp, Building2, Heart } from 'lucide-react'
import { pageTitles } from '../data/siteContent.js'

const pillarIcons = [TrendingUp, Building2, Heart]

export default function Careers({ content }) {
  const p = content.pages.careers
  useEffect(() => {
    document.title = pageTitles['/careers']
  }, [])

  return (
    <div className="bg-zinc-50">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200/80 bg-white">
        <div
          className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-violet-400/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-0 h-[320px] w-[320px] rounded-full bg-sky-400/15 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-5">
              <p className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-800">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" aria-hidden />
                {p.heroKicker}
              </p>
              <h1 className="mt-6 font-[family:var(--font-display)] text-4xl font-bold tracking-tight text-ething-ink md:text-5xl md:leading-[1.08]">
                {p.heroTitle}
              </h1>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-3xl border border-zinc-200/90 bg-gradient-to-br from-white via-zinc-50/80 to-violet-50/40 p-8 shadow-[0_20px_50px_-24px_rgba(19,35,71,0.25)] sm:p-10">
                <div
                  className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent"
                  aria-hidden
                />
                <p className="text-base leading-relaxed text-zinc-600 md:text-lg">
                  {p.heroIntro}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={p.primaryCta.path}
                    className="inline-flex items-center gap-2 rounded-full bg-ething-navy px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-ething-navy/25 transition hover:bg-ething-navy/90"
                  >
                    {p.primaryCta.label}
                    <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </Link>
                  <a
                    href={p.secondaryCta.hash}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-300/90 bg-white/80 px-6 py-3 text-sm font-semibold text-ething-ink backdrop-blur-sm transition hover:border-violet-300/80 hover:bg-white"
                  >
                    {p.secondaryCta.label}
                    <ChevronDown className="h-4 w-4 text-zinc-500" strokeWidth={2} aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento-style gallery */}
      <section className="border-b border-zinc-200/80 bg-zinc-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12 lg:gap-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sm:col-span-2 lg:col-span-5 lg:row-span-2"
            >
              <div className="group relative h-[min(52vh,420px)] overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-200 shadow-md lg:h-[min(60vh,520px)]">
                <img
                  src={p.gallery[0].src}
                  alt={p.gallery[0].alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  width={800}
                  height={1000}
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ething-navy/35 via-transparent to-transparent opacity-60" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="sm:col-span-1 lg:col-span-7"
            >
              <div className="group relative h-48 overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-200 shadow-md sm:h-56 lg:h-[240px]">
                <img
                  src={p.gallery[1].src}
                  alt={p.gallery[1].alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  width={960}
                  height={480}
                  loading="lazy"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="sm:col-span-1 lg:col-span-7 lg:-mt-2"
            >
              <div className="group relative h-48 overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-200 shadow-md sm:h-56 lg:h-[240px]">
                <img
                  src={p.gallery[2].src}
                  alt={p.gallery[2].alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  width={960}
                  height={480}
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why us - card stack */}
      <section
        id="why-us"
        className="scroll-mt-[calc(4rem+1px)] border-b border-zinc-200/80 bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-600">
              {p.whyUsKicker}
            </p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-3xl font-bold text-ething-ink md:text-4xl">
              {p.whyUsTitleBefore}
              <span className="bg-gradient-to-r from-violet-600 to-ething-navy bg-clip-text text-transparent">
                {p.whyUsTitleAccent.trim()}
              </span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
            {p.whyUsPillars.map((col, i) => {
              const Icon = pillarIcons[i] ?? TrendingUp
              return (
                <motion.article
                  key={col.index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative flex flex-col rounded-3xl border border-zinc-200/80 bg-zinc-50/50 p-8 shadow-sm transition hover:border-violet-200/60 hover:shadow-md hover:shadow-violet-900/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="font-[family:var(--font-display)] text-3xl font-bold tabular-nums text-zinc-200">
                      {col.index}
                    </span>
                  </div>
                  <h3 className="mt-6 font-[family:var(--font-display)] text-xl font-bold text-ething-ink">
                    {col.title}
                  </h3>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600">
                    {col.paragraphs.map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                  <div
                    className="mt-8 h-1 w-12 rounded-full bg-gradient-to-r from-orange-400 to-violet-500"
                    aria-hidden
                  />
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-zinc-50 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] bg-ething-navy px-8 py-12 text-center shadow-xl shadow-ething-navy/20 sm:px-12 sm:py-14 lg:px-16"
          >
            <div
              className="pointer-events-none absolute -right-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-violet-500/20 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-12 bottom-0 h-48 w-48 rounded-full bg-orange-400/10 blur-3xl"
              aria-hidden
            />
            <p className="relative mx-auto max-w-xl text-lg font-medium leading-relaxed text-white/95">
              {p.hiringNote}
            </p>
            <Link
              to={p.primaryCta.path}
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-ething-navy shadow-lg transition hover:bg-zinc-100"
            >
              {p.primaryCta.label}
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
