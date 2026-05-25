import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { pageTitles } from '../data/siteContent.js'

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
}

export default function AiStaffAugmentation({ content }) {
  const p = content.pages.aiStaffAugmentation

  useEffect(() => {
    document.title = pageTitles['/ai_staff_augmentation']
  }, [])

  return (
    <div className="bg-zinc-50">
      <section className="relative overflow-hidden border-b border-zinc-200/80 bg-white">
        <div
          className="pointer-events-none absolute -left-28 top-0 h-[380px] w-[380px] rounded-full bg-violet-400/18 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-12 h-[300px] w-[300px] rounded-full bg-sky-400/14 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="mx-auto max-w-3xl text-center lg:max-w-[52rem]"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
              {p.heroKicker}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 font-[family:var(--font-display)] text-[1.65rem] font-bold leading-[1.2] tracking-tight text-ething-ink sm:text-3xl md:text-4xl"
            >
              {p.heroTitle}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">
              {p.heroIntro}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to={p.primaryCta.path}
                className="inline-flex items-center gap-2 rounded-full bg-ething-navy px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-ething-navy/20 transition hover:bg-ething-navy/90"
              >
                {p.primaryCta.label}
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Link>
              <Link
                to={p.secondaryCta.path}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300/90 bg-white px-6 py-3 text-sm font-semibold text-ething-ink transition hover:border-violet-300/80"
              >
                {p.secondaryCta.label}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">{p.rolesKicker}</p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-2xl font-bold text-ething-ink sm:text-3xl">
              {p.rolesTitle}
            </h2>
            <p className="mt-4 text-zinc-600">{p.rolesIntro}</p>
          </div>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {p.roles.map((role, idx) => (
              <li
                key={role}
                className="flex items-start gap-3 rounded-2xl border border-zinc-200/90 bg-white px-4 py-4 shadow-sm"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-800">
                  <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                </span>
                <span className="text-sm font-medium leading-relaxed text-zinc-800">
                  <span className="mr-2 font-mono text-[10px] text-zinc-400">{String(idx + 1).padStart(2, '0')}</span>
                  {role}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">{p.fitKicker}</p>
              <h2 className="mt-3 font-[family:var(--font-display)] text-2xl font-bold text-ething-ink sm:text-[1.65rem]">
                {p.fitTitle}
              </h2>
              <p className="mt-4 text-zinc-600 leading-relaxed">{p.fitBody}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">{p.processKicker}</p>
              <h2 className="mt-3 font-[family:var(--font-display)] text-2xl font-bold text-ething-ink sm:text-[1.65rem]">
                {p.processTitle}
              </h2>
              <ol className="mt-6 space-y-4">
                {p.processSteps.map((step, i) => (
                  <li key={step.title} className="flex gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/80 p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ething-navy text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-zinc-900">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-600">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-200/90 bg-white px-6 py-10 text-center shadow-sm sm:px-10">
          <h2 className="font-[family:var(--font-display)] text-xl font-bold text-ething-ink sm:text-2xl">
            {p.closing.title}
          </h2>
          <p className="mt-3 text-zinc-600">{p.closing.body}</p>
          <Link
            to={p.closing.cta.path}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ething-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-ething-navy/90"
          >
            {p.closing.cta.label}
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  )
}
