import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function WhyUsHomeSection({ data }) {
  if (!data?.points?.length) return null
  const { id, kicker, title, subtitle } = data

  return (
    <section id={id} className="border-t border-zinc-200/60 bg-zinc-100/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          {kicker ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{kicker}</p>
          ) : null}
          <h2
            className="mt-3 font-[family:var(--font-display)] text-2xl font-bold tracking-tight text-ething-ink sm:text-3xl"
          >
            {title}
          </h2>
          {subtitle ? <p className="mt-3 text-balance text-zinc-600">{subtitle}</p> : null}
        </motion.div>

        <ul className="mx-auto mt-10 max-w-xl space-y-4">
          {data.points.map((point, idx) => (
            <motion.li
              key={point}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="flex gap-3 rounded-2xl border border-zinc-200/90 bg-white px-4 py-3.5 text-left shadow-sm"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
              </span>
              <span className="text-sm font-medium leading-relaxed text-zinc-800 sm:text-[0.9375rem]">{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
