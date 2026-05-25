import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const transition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] }

function useSwipeOnElement(onLeft, onRight) {
  const start = useRef({ x: 0, y: 0 })

  return {
    onTouchStart: (e) => {
      const p = e.touches[0]
      start.current = { x: p.clientX, y: p.clientY }
    },
    onTouchEnd: (e) => {
      const p = e.changedTouches[0]
      const dx = p.clientX - start.current.x
      const dy = p.clientY - start.current.y
      if (Math.abs(dx) < 56) return
      if (Math.abs(dx) < Math.abs(dy) * 1.2) return
      if (dx < 0) onLeft()
      else onRight()
    },
  }
}

const DEFAULT_AUTO_MS = 8000

export default function TestimonialSection({ data }) {
  const { kicker, title, titleUnderline, items = [], autoPlayMs: autoPlayMsFromConfig } = data
  const n = items.length
  const [i, setI] = useState(0)
  const t = n ? items[i] : null
  const reduceMotion = useReducedMotion()
  const idBase = useId()
  const regionId = `${idBase}-testimonials`
  const labelId = `${idBase}-heading`
  const autoPlayMs = autoPlayMsFromConfig ?? DEFAULT_AUTO_MS
  /** When true, automatic advance is skipped (hovering the testimonial area). */
  const pauseAutoplay = useRef(false)

  const goPrev = useCallback(() => {
    if (n < 2) return
    setI((v) => (v - 1 + n) % n)
  }, [n])
  const goNext = useCallback(() => {
    if (n < 2) return
    setI((v) => (v + 1) % n)
  }, [n])

  useEffect(() => {
    if (n < 2) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [n, goPrev, goNext])

  useEffect(() => {
    if (n < 2 || !autoPlayMs || reduceMotion) return
    const id = window.setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return
      if (pauseAutoplay.current) return
      goNext()
    }, autoPlayMs)
    return () => clearInterval(id)
  }, [n, autoPlayMs, goNext, reduceMotion])

  const touchHandlers = useSwipeOnElement(goNext, goPrev)

  const titleBefore = title.split(titleUnderline)[0]
  const titleAfter = title.split(titleUnderline)[1] ?? ''

  if (!t) return null

  const canNav = n > 1
  const visTrans = reduceMotion ? { duration: 0.15 } : transition

  return (
    <section
      id="testimonials"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      className="relative overflow-hidden border-t border-white/5 bg-[#0a0f1a] py-20 text-white sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ething-ink/80 via-[#0d1424] to-ething-ink" />
        <div className="absolute -left-1/4 top-0 h-[420px] w-[80%] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[380px] w-[70%] rounded-full bg-indigo-900/30 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v64H0V0zm63 0h1v64h-1V0z' fill='%23fff' fill-opacity='0.04' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div
        id={regionId}
        className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
        tabIndex={0}
        onMouseEnter={() => {
          pauseAutoplay.current = true
        }}
        onMouseLeave={() => {
          pauseAutoplay.current = false
        }}
        {...touchHandlers}
      >
        <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2, margin: '-20px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-0"
          >
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 p-0.5 shadow-2xl shadow-black/50 ring-1 ring-inset ring-white/5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={t.id}
                    className="absolute inset-0"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0, scale: 1.01 }}
                    transition={visTrans}
                  >
                    <img
                      src={t.image}
                      alt={n === 1 && t.imageAlt ? t.imageAlt : ''}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                      width={800}
                      height={600}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/80 via-[#0a0f1a]/10 to-transparent" />
                    <div
                      className="pointer-events-none absolute inset-0 border border-white/5"
                      style={{ borderRadius: '22px' }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400" />
            </div>
            <p className="sr-only" id={`${regionId}-live`} aria-live="polite" aria-atomic>
              Slide {i + 1} of {n}
            </p>
          </motion.div>

          <div className="flex min-h-0 flex-col justify-center">
            {kicker && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/90">{kicker}</p>
            )}
            <h2
              id={labelId}
              className="mt-2 font-[family:var(--font-serif)] text-2xl font-semibold leading-tight sm:text-3xl md:text-[1.75rem] md:leading-tight"
            >
              {titleBefore}
              <span className="relative inline-block">
                {titleUnderline}
                <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-white/30 to-white/70" />
              </span>
              {titleAfter}
            </h2>

            <div className="relative mt-8 min-h-[12rem] sm:min-h-[10rem]">
              <Quote className="absolute -left-0.5 -top-1 h-16 w-16 text-violet-500/15" strokeWidth={1} />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={t.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={visTrans}
                >
                  <blockquote className="relative border-l-2 border-orange-400/40 pl-5 text-base leading-[1.7] text-zinc-200 sm:text-lg">
                    {t.quote}
                  </blockquote>
                  <p className="mt-6 text-sm font-semibold text-white/90">{t.organization}</p>
                  <p className="text-sm text-zinc-500">{t.role}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {canNav && (
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2" aria-label="Testimonial controls">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="rounded-full border border-white/15 bg-white/5 p-2.5 text-white/90 backdrop-blur transition hover:border-white/35 hover:bg-white/10"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-full border border-white/15 bg-white/5 p-2.5 text-white/90 backdrop-blur transition hover:border-white/35 hover:bg-white/10"
                    aria-label="Next review"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-zinc-500 tabular-nums sm:ml-1" aria-hidden>
                  {i + 1} / {n}
                </p>
                <nav
                  className="flex w-full max-w-md flex-1 flex-wrap items-center justify-start gap-1.5 pl-0 sm:pl-2 lg:ml-auto lg:w-auto"
                  aria-label="Testimonial slides"
                >
                  {items.map((it, idx) => (
                    <button
                      key={it.id}
                      type="button"
                      aria-current={idx === i ? 'true' : undefined}
                      aria-label={`Show testimonial ${idx + 1} of ${n}`}
                      onClick={() => setI(idx)}
                      className={`h-1.5 rounded-full transition ${
                        idx === i ? 'w-6 bg-orange-400' : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </nav>
              </div>
            )}

            {canNav && (
              <p className="mt-2 text-xs text-zinc-600 sm:hidden">Swipe to change the story.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
