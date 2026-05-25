import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { pageTitles } from '../data/siteContent.js'

function useActiveSection(sectionIds, rootMargin = '-12% 0px -55% 0px') {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')
  useEffect(() => {
    if (!sectionIds.length) return
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
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

export default function Privacy({ content }) {
  const p = content.pages.privacy
  const { cta } = content
  const sectionIds = useMemo(() => p.sections.map((s) => s.id), [p.sections])
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    document.title = pageTitles['/privacy-policy']
  }, [])

  return (
    <div className="bg-white">
      <motion.header
        className="border-b border-zinc-200/90 bg-white"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-600">
            {p.heroEyebrow}
          </p>
          <h1 className="mt-3 font-[family:var(--font-display)] text-3xl font-bold tracking-tight text-ething-ink text-balance md:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {p.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
            {p.description}
          </p>
          <Link
            to={cta.path}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-ething-navy px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-ething-navy/90"
          >
            {cta.label}
          </Link>
        </div>
      </motion.header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Policies
                </p>
                <div className="mt-3">
                  <span className="flex items-center gap-2 rounded-lg border border-violet-200/80 bg-violet-50/80 px-3 py-2 text-sm font-semibold text-ething-navy">
                    <span
                      className="h-8 w-1 shrink-0 rounded-full bg-violet-500"
                      aria-hidden
                    />
                    Privacy Policy
                  </span>
                </div>
              </div>

              <div className="mt-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  On this page
                </p>
                <nav aria-label="Policy section navigation" className="mt-4">
                  <ul className="space-y-0.5">
                    {p.sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className={`block border-l-2 py-2 pl-4 text-sm leading-snug transition ${
                            activeId === section.id
                              ? 'border-violet-600 font-semibold text-ething-navy'
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
            </div>
          </aside>

          <motion.div
            className="lg:col-span-9"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
              <Clock className="h-4 w-4 text-zinc-400" strokeWidth={1.75} aria-hidden />
              <span>Last updated {p.lastUpdated}</span>
            </div>

            <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8">
              <h2 className="text-sm font-semibold text-ething-ink">Contents</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 marker:font-medium marker:text-zinc-400">
                {p.sections.map((section) => (
                  <li key={section.id} className="pl-1 text-sm">
                    <a
                      href={`#${section.id}`}
                      className="text-violet-700 underline decoration-violet-300 underline-offset-2 transition hover:text-violet-900"
                    >
                      {section.navLabel}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-12 space-y-0">
              {p.sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 border-b border-zinc-200/90 py-12 first:pt-2 last:border-b-0 sm:scroll-mt-32 sm:py-14"
                >
                  <h2 className="font-[family:var(--font-display)] text-2xl font-bold tracking-tight text-ething-ink md:text-[1.65rem]">
                    {section.index}. {section.title}
                  </h2>

                  {section.contactEmail ? (
                    <p className="mt-4 text-base leading-relaxed text-zinc-600">
                      {section.intro}{' '}
                      <a
                        href={`mailto:${section.contactEmail}`}
                        className="font-medium text-violet-700 underline decoration-violet-300 underline-offset-2 transition hover:text-violet-900"
                      >
                        {section.contactEmail}
                      </a>
                    </p>
                  ) : section.intro ? (
                    <p className="mt-4 text-base leading-relaxed text-zinc-600">{section.intro}</p>
                  ) : null}

                  {section.listItems?.length ? (
                    <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-zinc-300">
                      {section.listItems.map((item, idx) => (
                        <li key={idx} className="text-base leading-relaxed text-zinc-600">
                          {item.emphasis ? (
                            <>
                              <strong className="font-semibold text-ething-ink">
                                {item.emphasis}
                              </strong>{' '}
                              {item.body}
                            </>
                          ) : (
                            item.body
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.paragraphs?.length
                    ? section.paragraphs.map((para, idx) => (
                        <p key={idx} className="mt-4 text-base leading-relaxed text-zinc-600">
                          {para}
                        </p>
                      ))
                    : null}
                </article>
              ))}

              <p className="pt-10 text-sm leading-relaxed text-zinc-500">{p.footerNote}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
