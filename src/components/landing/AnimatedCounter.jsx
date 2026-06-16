import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.8,
  className = '',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(reduceMotion ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setDisplay(value)
      return
    }

    let start = null
    let raf

    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / (duration * 1000), 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration, reduceMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

export function FadeInSection({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ eyebrow, title, subtitle, light = false, center = true, titleId }) {
  const titleClass = light ? 'text-white' : 'text-ething-ink'
  const subClass = light ? 'text-zinc-300' : 'text-zinc-600'
  const eyebrowClass = light ? 'text-teal-300' : 'text-ething-orange'

  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : ''}>
      {eyebrow && (
        <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${eyebrowClass}`}>
          {eyebrow}
        </p>
      )}
      <h2
        id={titleId}
        className={`text-balance font-[family:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] ${titleClass}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${subClass}`}>{subtitle}</p>
      )}
    </div>
  )
}
