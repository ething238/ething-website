import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Layers,
  Monitor,
  SlidersHorizontal,
  Sparkles,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'
import ServiceGrid from '../components/ServiceGrid.jsx'
import { pageTitles } from '../data/siteContent.js'

const ADV_ICONS = {
  SlidersHorizontal,
  Layers,
  Wallet,
  Zap,
  Users,
  ClipboardList,
}

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

export default function StaffingServices({ content }) {
  const p = content.pages.staffingServices
  useEffect(() => {
    document.title = pageTitles['/staffing_services']
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
          className="pointer-events-none absolute -right-24 bottom-16 h-[340px] w-[340px] rounded-full bg-sky-400/15 blur-3xl"
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
                {p.heroKicker}
              </p>
              <h1 className="mt-5 font-[family:var(--font-display)] text-[1.65rem] font-bold leading-[1.2] tracking-tight text-ething-ink sm:text-3xl md:text-4xl lg:text-[2.35rem]">
                {p.heroTitle}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">{p.heroIntro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={p.primaryCta.path}
                  className="inline-flex items-center gap-2 rounded-full bg-ething-navy px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-ething-navy/20 transition hover:bg-ething-navy/90"
                >
                  {p.primaryCta.label}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                </Link>
                <a
                  href={p.secondaryCta.hash}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300/90 bg-white/90 px-6 py-3 text-sm font-semibold text-ething-ink backdrop-blur-sm transition hover:border-violet-300/80"
                >
                  {p.secondaryCta.label}
                </a>
              </div>
            </motion.div>

            <motion.div className="lg:col-span-6" variants={fadeUp}>
              <div className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-zinc-100 shadow-[0_24px_60px_-28px_rgba(19,35,71,0.35)]">
                <img
                  src={p.heroImage.src}
                  alt={p.heroImage.alt}
                  className="aspect-[4/3] w-full object-cover lg:aspect-auto lg:min-h-[340px]"
                  width={960}
                  height={720}
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ething-navy/25 via-transparent to-violet-500/10" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Onsite + Remote */}
      <section className="border-b border-zinc-200/80 bg-zinc-50 py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            {p.solutionsKicker}
          </p>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            variants={stagger}
            className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-8"
          >
            <motion.article
              variants={fadeUp}
              className="group relative flex flex-col rounded-3xl border border-zinc-200/90 bg-white p-8 shadow-sm transition duration-300 hover:border-violet-200/80 hover:shadow-md"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <Building2 className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </span>
              <h2 className="mt-6 font-[family:var(--font-display)] text-xl font-bold text-ething-ink">
                {p.onsiteStaffing.title}
              </h2>
              <p className="mt-3 flex-1 text-base leading-relaxed text-zinc-600">
                {p.onsiteStaffing.body}
              </p>
            </motion.article>
            <motion.article
              variants={fadeUp}
              className="group relative flex flex-col rounded-3xl border border-zinc-200/90 bg-white p-8 shadow-sm transition duration-300 hover:border-sky-200/90 hover:shadow-md"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-800">
                <Monitor className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </span>
              <h2 className="mt-6 font-[family:var(--font-display)] text-xl font-bold text-ething-ink">
                {p.remoteStaffing.title}
              </h2>
              <p className="mt-3 flex-1 text-base leading-relaxed text-zinc-600">
                {p.remoteStaffing.body}
              </p>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* Advantages */}
      <section className="border-b border-zinc-200/80 bg-white py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            {p.advantagesKicker}
          </p>
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
            variants={stagger}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          >
            {p.advantages.map((item) => {
              const Icon = ADV_ICONS[item.icon] ?? Sparkles
              return (
                <motion.li
                  key={item.title}
                  variants={fadeUp}
                  className="flex gap-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-5 transition hover:border-zinc-300/90 hover:bg-white"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white text-ething-navy">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ething-ink">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600">{item.body}</p>
                  </div>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </section>

      {/* Partner highlights */}
      <section className="border-b border-zinc-200/80 bg-gradient-to-b from-zinc-50 to-white py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-[family:var(--font-display)] text-2xl font-bold tracking-tight text-ething-ink md:text-3xl"
          >
            {p.partnerTitle}
          </motion.h2>
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            {p.partnerHighlights.map((label) => (
              <motion.li
                key={label}
                variants={fadeUp}
                className="rounded-full border border-violet-200/70 bg-white px-5 py-2.5 text-sm font-medium text-ething-ink shadow-sm"
              >
                {label}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-zinc-200/80 bg-white py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            {p.processKicker}
          </p>
          <div className="relative mt-10 max-w-3xl">
            <div
              className="absolute left-[17px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-300 via-violet-200 to-zinc-200"
              aria-hidden
            />
            <ol className="relative space-y-5">
              {p.processSteps.map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 pl-1"
                >
                  <span className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white shadow-md ring-4 ring-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1 rounded-2xl border border-zinc-200/90 bg-zinc-50/80 p-5">
                    <h3 className="font-semibold text-ething-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">{step.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Unique */}
      <section className="border-b border-zinc-200/80 bg-zinc-50 py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            {p.uniqueKicker}
          </p>
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {p.uniqueItems.map((item) => (
              <motion.li
                key={item.title}
                variants={fadeUp}
                className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-violet-600"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <div>
                    <h3 className="font-[family:var(--font-display)] text-base font-bold text-ething-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.body}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Engagement models */}
      <section
        id="engagement-models"
        className="scroll-mt-28 border-b border-zinc-200/80 bg-white py-14 sm:scroll-mt-32 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            {p.engagementKicker}
          </p>
          <div className="mt-10 space-y-5">
            {p.engagementModels.map((model, idx) => (
              <motion.article
                key={model.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="rounded-3xl border border-zinc-200/90 bg-gradient-to-br from-white via-zinc-50/50 to-violet-50/30 p-6 shadow-sm sm:p-8"
              >
                <h2 className="font-[family:var(--font-display)] text-lg font-bold text-ething-ink sm:text-xl">
                  {model.title}
                </h2>
                {model.type === 'simple' && model.paragraphs ? (
                  <div className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
                    {model.paragraphs.map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                ) : null}
                {model.type === 'managed' && model.modes ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {model.modes.map((mode) => (
                      <div
                        key={mode.label}
                        className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5"
                      >
                        <h3 className="font-semibold text-ething-ink">{mode.label}</h3>
                        <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed text-zinc-600 marker:text-violet-400">
                          {mode.bullets.map((b, j) => (
                            <li key={j}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
                {model.type === 'bullets' && model.bullets ? (
                  <ul className="mt-4 list-disc space-y-2 pl-4 text-sm leading-relaxed text-zinc-600 marker:text-violet-400 sm:text-base">
                    {model.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-ething-navy py-14 sm:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
          <p className="text-base leading-relaxed text-white/85">
            With a commitment to quality and efficiency, Ething&apos;s staff augmentation services
            empower organizations to achieve their goals with confidence.
          </p>
          <Link
            to={p.primaryCta.path}
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ething-navy shadow-lg transition hover:bg-zinc-100"
          >
            {p.primaryCta.label}
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </section>

      {/* Offerings anchor for home / service cards */}
      <section
        id={p.offeringsId}
        className="scroll-mt-28 border-b border-zinc-200/80 bg-zinc-50 py-14 sm:scroll-mt-32 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family:var(--font-display)] text-xl font-bold text-ething-ink md:text-2xl">
            {p.offeringsHeading}
          </h2>
          <div className="mt-10">
            <ServiceGrid cards={content.home.serviceCards} />
          </div>
        </div>
      </section>
    </div>
  )
}
