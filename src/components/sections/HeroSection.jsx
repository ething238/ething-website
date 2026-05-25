import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'

const easeOut = [0.22, 1, 0.36, 1]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
}

const itemVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
}

export default function HeroSection({ data }) {
  const { hero } = data
  const titleParts = hero.title.split(hero.titleHighlight)
  const reduceMotion = useReducedMotion()
  const itemV = reduceMotion ? itemVariantsReduced : itemVariants
  const containerV = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.25 } } }
    : containerVariants
  const highlights = hero.highlights ?? []
  const highlightsTitle = hero.highlightsTitle ?? 'Where we help'

  return (
    <section
      className={`relative flex min-h-[100dvh] flex-col overflow-hidden ${
        reduceMotion ? 'mesh-bg' : 'hero-mesh-animated'
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-[1] grid-pattern opacity-30" />

      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/3 h-[min(50vh,400px)] w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/18 blur-3xl"
            animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.06, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-1/4 bottom-1/4 h-[40vh] w-[50vw] max-w-xl rounded-full bg-sky-500/14 blur-3xl"
            animate={{ opacity: [0.2, 0.42, 0.2], x: [0, -12, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <div className="relative z-10 flex min-h-[100dvh] w-full flex-1 flex-col">
        <motion.div
          className="flex w-full flex-1 flex-col justify-center px-4 pb-8 pt-[max(5.5rem,env(safe-area-inset-top,0px)+3.5rem)] text-center sm:px-6 sm:pb-10 sm:pt-[max(5rem,env(safe-area-inset-top,0px)+3rem)] lg:px-8"
          variants={containerV}
          initial="hidden"
          animate="show"
        >
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 sm:max-w-4xl sm:gap-10 md:gap-12">
            <motion.div
              variants={itemV}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-medium text-zinc-100 shadow-lg shadow-teal-950/30 ring-1 ring-white/10 backdrop-blur-md"
            >
              <motion.span
                aria-hidden
                animate={reduceMotion ? undefined : { rotate: [0, 10, -10, 0] }}
                transition={reduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex"
              >
                <Sparkles className="h-3.5 w-3.5 text-teal-300" />
              </motion.span>
              {hero.badge}
            </motion.div>

            <motion.h1
              variants={itemV}
              className="text-balance font-[family:var(--font-display)] text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl sm:leading-[1.1] md:text-6xl md:leading-[1.08] lg:text-[3.4rem] lg:leading-tight"
            >
              {titleParts[0]}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-teal-200 via-sky-200 to-amber-200 bg-clip-text text-transparent">
                  {hero.titleHighlight}
                </span>
                {!reduceMotion && (
                  <motion.span
                    className="absolute -inset-1 -z-10 rounded-lg bg-gradient-to-r from-teal-500/25 via-sky-500/15 to-amber-400/12 opacity-0 blur-sm"
                    animate={{ opacity: [0, 0.48, 0.22] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </span>
              {titleParts[1] ?? ''}
            </motion.h1>

            <motion.p
              variants={itemV}
              className="max-w-2xl text-balance text-base leading-[1.75] text-zinc-300 sm:text-lg sm:leading-8"
            >
              {hero.description}
            </motion.p>

            <motion.div variants={itemV} className="flex w-full max-w-md flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:justify-center sm:gap-5">
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to={hero.primaryCta.path}
                  className="inline-flex min-h-[50px] w-full min-w-[180px] items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-ething-ink shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_12px_40px_-12px_rgba(0,0,0,0.5)] transition hover:bg-zinc-100 sm:w-auto"
                >
                  {hero.primaryCta.label}
                </Link>
              </motion.div>
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to={hero.secondaryCta.path}
                  className="inline-flex min-h-[50px] w-full min-w-[180px] items-center justify-center rounded-full border border-white/30 bg-white/[0.07] px-8 py-3.5 text-sm font-semibold text-white shadow-inner shadow-white/5 backdrop-blur-sm transition hover:border-white/50 hover:bg-white/15 sm:w-auto"
                >
                  {hero.secondaryCta.label}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemV}
              className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              aria-hidden
            />
          </div>
        </motion.div>

        {highlights.length > 0 && (
          <div className="mt-auto w-full border-t border-white/10 bg-gradient-to-t from-black/20 to-transparent">
            <motion.div
              className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-4 py-6 sm:py-7 lg:px-8"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">{highlightsTitle}</p>
              <div className="flex w-full max-w-3xl flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                {highlights.map((h, idx) => (
                  <motion.span
                    key={h.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      delay: reduceMotion ? 0 : 0.08 + idx * 0.06,
                      duration: reduceMotion ? 0.2 : 0.45,
                      ease: easeOut,
                    }}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-xs font-medium text-zinc-200 shadow-sm shadow-black/20 backdrop-blur-sm transition hover:border-teal-400/35 hover:bg-teal-500/12"
                  >
                    {h.label}
                  </motion.span>
                ))}
              </div>
              <a
                href={hero.secondaryCta.path}
                className="group mt-1 flex flex-col items-center gap-1 text-zinc-500"
              >
                <span className="text-[10px] font-medium uppercase tracking-widest">Scroll to explore</span>
                <motion.span
                  animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
                  transition={reduceMotion ? undefined : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronDown className="h-5 w-5 text-zinc-400 transition group-hover:text-white" />
                </motion.span>
              </a>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
