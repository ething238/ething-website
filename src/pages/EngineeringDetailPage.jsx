import { useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Accessibility,
  AppWindow,
  ArrowRight,
  BellRing,
  Bug,
  Building2,
  Cable,
  ClipboardList,
  Cloud,
  CloudUpload,
  Code2,
  Cpu,
  Database,
  FileSearch,
  FileText,
  Gauge,
  GitBranch,
  GraduationCap,
  Headphones,
  Import,
  Kanban,
  Layers,
  ListChecks,
  MonitorSmartphone,
  MousePointer2,
  Palette,
  RefreshCw,
  Rocket,
  Route,
  Scale,
  Server,
  Shield,
  Smartphone,
  Sparkles,
  Target,
  TestTube,
  Timer,
  Workflow,
} from 'lucide-react'
import PageShell from '../components/PageShell.jsx'
import { pageTitles } from '../data/siteContent.js'

const SECTION_ICONS = {
  ClipboardList,
  Kanban,
  Layers,
  Palette,
  TestTube,
  Rocket,
  Headphones,
  Smartphone,
  CloudUpload,
  RefreshCw,
  Cpu,
  Timer,
  Cable,
  Shield,
  FileSearch,
  Route,
  Cloud,
  Import,
  AppWindow,
  Database,
  Server,
  ListChecks,
  MousePointer2,
  Workflow,
  GitBranch,
  Gauge,
  Accessibility,
  MonitorSmartphone,
  FileText,
  Target,
  Code2,
  Bug,
  BellRing,
  Scale,
  GraduationCap,
  Building2,
}

const DEFAULT_CTA_LEAD =
  'Partner with us today and transform your ideas into reality.'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
}

function sectionParagraphs(section) {
  if (section.paragraphs?.length) return section.paragraphs
  if (section.body) return [section.body]
  return []
}

function isFrameworkItemRich(item) {
  return item != null && typeof item === 'object' && 'name' in item
}

function RichEngineeringServicePage({ page }) {
  const frameworksId = page.frameworksAnchorId ?? 'frameworks-technologies'
  const ctaLead = page.engineeringCtaLead ?? DEFAULT_CTA_LEAD

  return (
    <div className="bg-zinc-50">
      <section className="relative overflow-hidden border-b border-zinc-200/80 bg-white">
        <div
          className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-violet-400/18 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-12 h-[360px] w-[360px] rounded-full bg-teal-400/12 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14"
          >
            <motion.div className="lg:col-span-6" variants={fadeUp}>
              <p className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-800">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" aria-hidden />
                {page.heroKicker}
              </p>
              <h1 className="mt-5 font-[family:var(--font-display)] text-3xl font-bold leading-[1.15] tracking-tight text-ething-ink md:text-4xl lg:text-[2.5rem]">
                {page.heroHeading}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">{page.heroLead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={page.engineeringCta.path}
                  className="inline-flex items-center gap-2 rounded-full bg-ething-navy px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-ething-navy/20 transition hover:bg-ething-navy/90"
                >
                  {page.engineeringCta.label}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                </Link>
                {page.engineeringSecondaryCta ? (
                  <a
                    href={page.engineeringSecondaryCta.hash}
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-300/90 bg-white/90 px-6 py-3 text-sm font-semibold text-ething-ink backdrop-blur-sm transition hover:border-violet-300/80"
                  >
                    {page.engineeringSecondaryCta.label}
                  </a>
                ) : null}
              </div>
            </motion.div>

            <motion.div className="lg:col-span-6" variants={fadeUp}>
              <div className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-zinc-900 shadow-[0_24px_60px_-28px_rgba(19,35,71,0.45)]">
                <img
                  src={page.heroImage.src}
                  alt={page.heroImage.alt}
                  className="aspect-[4/3] w-full object-cover opacity-95 lg:aspect-auto lg:min-h-[320px]"
                  width={960}
                  height={720}
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ething-navy/50 via-transparent to-violet-600/15" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-zinc-50 py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.06 }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-3"
          >
            {page.serviceSections.map((section) => {
              const Icon = SECTION_ICONS[section.icon] ?? Sparkles
              const paras = sectionParagraphs(section)
              return (
                <motion.li
                  key={section.id}
                  variants={fadeUp}
                  id={section.id}
                  className="scroll-mt-28 rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm transition hover:border-violet-200/80 hover:shadow-md sm:scroll-mt-32 sm:p-7"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-800">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  {section.groupLabel ? (
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-violet-600">
                      {section.groupLabel}
                    </p>
                  ) : null}
                  <h2
                    className={`font-[family:var(--font-display)] text-lg font-bold text-ething-ink ${section.groupLabel ? 'mt-1.5' : 'mt-4'}`}
                  >
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 sm:text-[0.9375rem]">
                    {paras.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </section>

      <section
        id={frameworksId}
        className="scroll-mt-28 border-b border-zinc-200/80 bg-white py-14 sm:scroll-mt-32 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            {page.frameworksTitle}
          </p>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
            variants={stagger}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {page.frameworkGroups.map((group) => {
              const items = group.items ?? []
              const rich = items.some(isFrameworkItemRich)
              return (
                <motion.article
                  key={group.title}
                  variants={fadeUp}
                  className="flex flex-col rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-zinc-50/80 to-white p-6 shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-ething-ink">{group.title}</h3>
                  {group.intro ? (
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600">{group.intro}</p>
                  ) : rich ? (
                    <ul className="mt-4 flex flex-col gap-3">
                      {items.map((item, idx) =>
                        isFrameworkItemRich(item) ? (
                          <li
                            key={item.name}
                            className="rounded-xl border border-zinc-200/90 bg-white/90 px-3 py-2.5"
                          >
                            <span className="text-sm font-semibold text-ething-ink">{item.name}</span>
                            {item.description ? (
                              <p className="mt-1 text-xs leading-relaxed text-zinc-600">
                                {item.description}
                              </p>
                            ) : null}
                          </li>
                        ) : (
                          <li key={typeof item === 'string' ? item : idx}>
                            <span className="inline-block rounded-full border border-zinc-200/90 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm">
                              {String(item)}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  ) : (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {items.map((item) => (
                        <li key={item}>
                          <span className="inline-block rounded-full border border-zinc-200/90 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="bg-ething-navy py-14 sm:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
          <p className="text-base leading-relaxed text-white/88">{ctaLead}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to={page.engineeringCta.path}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ething-navy shadow-lg transition hover:bg-zinc-100"
            >
              {page.engineeringCta.label}
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function EngineeringDetailPage({ content }) {
  const { pathname } = useLocation()
  const page = useMemo(
    () => content.pages.engineeringPages.find((p) => p.path === pathname),
    [content, pathname],
  )

  useEffect(() => {
    document.title = pageTitles[pathname] || `${page?.title ?? 'Engineering'} — Ething`
  }, [pathname, page?.title])

  if (!page) return null

  if (page.serviceSections?.length) {
    return <RichEngineeringServicePage page={page} />
  }

  return (
    <PageShell title={page.title} kicker="Engineering Services">
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
