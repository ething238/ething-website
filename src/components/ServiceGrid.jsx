import {
  ArrowUpRight,
  Banknote,
  Brain,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Users,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ICONS = { Users, UserPlus, ShieldCheck, MapPin, Clock, Banknote, Sparkles, Brain }

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function ServiceGrid({ cards }) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
      className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
    >
      {cards.map((c) => {
        const Icon = ICONS[c.icon] ?? Sparkles
        const href = c.to || '/contact'
        const description = c.description || ''
        const detailLead = c.detailLead
        const bullets = c.bullets
        const detailClosing = c.detailClosing
        const category = c.category || 'Service'
        const featured = Boolean(c.featured)
        return (
          <motion.li key={c.id} variants={item} className="h-full">
            <Link
              to={href}
              className={[
                'group relative flex h-full min-h-[220px] flex-col rounded-2xl border p-6 text-left transition duration-300 sm:p-7',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500',
                featured
                  ? 'border-amber-200/80 bg-amber-50/50 shadow-sm'
                  : 'border-zinc-200/90 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:border-zinc-300/90',
                'hover:-translate-y-1 hover:shadow-md',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={[
                    'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-900',
                    'transition group-hover:border-zinc-300',
                  ].join(' ')}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.25} />
                </span>
                <ArrowUpRight
                  className="mt-1 h-4 w-4 shrink-0 text-orange-500/90 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>

              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-orange-600">
                {category}
              </p>
              <h3 className="mt-1.5 font-[family:var(--font-display)] text-lg font-semibold leading-snug tracking-tight text-zinc-900 sm:text-[1.125rem]">
                {c.title}
              </h3>
              {description ? (
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{description}</p>
              ) : null}
              {detailLead && bullets?.length ? (
                <div className="mt-3 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-700">{detailLead}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-zinc-600">
                    {bullets.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  {detailClosing ? (
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">{detailClosing}</p>
                  ) : null}
                </div>
              ) : null}
            </Link>
          </motion.li>
        )
      })}
    </motion.ul>
  )
}
