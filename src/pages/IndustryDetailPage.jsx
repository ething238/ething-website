import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Layers } from 'lucide-react'
import PageShell from '../components/PageShell.jsx'
import { pageTitles } from '../data/siteContent.js'

function useActiveSection(sectionIds, rootMargin = '-12% 0px -55% 0px') {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')
  useEffect(() => {
    if (!sectionIds.length) return
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!elements.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id)
        }
      },
      { rootMargin, threshold: [0, 0.12, 0.25] },
    )
    elements.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [sectionIds, rootMargin])
  return activeId
}

function RichIndustryPage({ page, content }) {
  const sectionIds = useMemo(() => page.sections.map((s) => s.id), [page.sections])
  const activeId = useActiveSection(sectionIds)

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative isolate min-h-[min(52vh,440px)] overflow-hidden">
        <img
          src={page.heroImage.src}
          alt={page.heroImage.alt}
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={900}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ething-navy/92 via-ething-navy/82 to-ething-navy/65" />
        <div className="relative mx-auto flex min-h-[min(52vh,440px)] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-16 lg:pt-32">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
              <Layers className="h-4 w-4 opacity-90" strokeWidth={1.75} aria-hidden />
              {page.heroKicker ?? 'Industries'}
            </p>
            <h1 className="mt-4 font-[family:var(--font-display)] text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-[3.25rem] lg:leading-tight">
              {page.title}
            </h1>
            <Link
              to={content.cta.path}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ething-navy shadow-lg transition hover:bg-zinc-100"
            >
              {content.cta.label}
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="border-b border-zinc-200/80 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            {page.overviewEyebrow ?? 'Overview'}
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 md:text-lg">{page.overview}</p>
        </div>
      </section>

      {/* Capabilities + sidebar */}
      <section className="border-b border-zinc-100 bg-zinc-50/40 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 lg:mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700/90">
              {page.capabilitiesEyebrow ?? 'Healthcare'}
            </p>
            <h2 className="mt-2 font-[family:var(--font-display)] text-2xl font-bold text-ething-ink md:text-3xl">
              {page.capabilitiesTitle ?? 'Service capabilities'}
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  On this page
                </p>
                <nav aria-label="Section navigation" className="mt-4">
                  <ul className="space-y-0.5">
                    {page.sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className={`block border-l-2 py-2 pl-4 text-sm leading-snug transition ${
                            activeId === section.id
                              ? 'border-teal-600 font-semibold text-ething-navy'
                              : 'border-transparent text-zinc-600 hover:border-zinc-200 hover:text-ething-ink'
                          }`}
                        >
                          {section.navLabel}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            <div className="lg:col-span-9">
              {page.sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 border-b border-zinc-200/80 pb-14 last:border-b-0 last:pb-0 sm:scroll-mt-32 sm:pb-16 lg:pb-20"
                >
                  <p className="text-xs font-medium text-zinc-400">
                    {section.index} — Capability
                  </p>
                  <h3 className="mt-2 font-[family:var(--font-display)] text-xl font-bold text-ething-ink md:text-2xl">
                    {section.title}
                  </h3>
                  <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start md:gap-10 lg:gap-12">
                    <div className="order-2 space-y-4 text-sm leading-relaxed text-zinc-600 md:order-1 md:text-[15px]">
                      {section.paragraphs.map((para, j) => (
                        <p key={j}>{para}</p>
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 }}
                      className="order-1 overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-200 shadow-md shadow-zinc-900/5 md:order-2"
                    >
                      <img
                        src={section.image.src}
                        alt={section.image.alt}
                        className="aspect-[4/3] w-full object-cover md:aspect-square"
                        width={640}
                        height={480}
                        loading="lazy"
                      />
                    </motion.div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function IndustryDetailPage({ content }) {
  const { pathname } = useLocation()
  const page = useMemo(
    () => content.pages.industryPages.find((p) => p.path === pathname),
    [content, pathname],
  )

  useEffect(() => {
    document.title = pageTitles[pathname] || `${page?.title ?? 'Industry'} — Ething`
  }, [pathname, page?.title])

  if (!page) return null

  if (page.sections?.length) {
    return <RichIndustryPage page={page} content={content} />
  }

  return (
    <PageShell title={page.title} kicker="Industries">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 max-w-2xl text-lg text-zinc-600 leading-relaxed"
      >
        {page.intro}
      </motion.p>
    </PageShell>
  )
}
