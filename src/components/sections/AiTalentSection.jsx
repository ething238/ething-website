import { motion } from 'framer-motion'

export default function AiTalentSection({ data }) {
  if (!data?.roles?.length) return null
  const { id, kicker, title, intro } = data

  return (
    <section id={id} className="border-t border-zinc-200/60 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          {kicker ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">{kicker}</p>
          ) : null}
          <h2
            className="mt-3 text-balance font-[family:var(--font-serif)] text-[1.65rem] font-semibold leading-tight tracking-tight text-zinc-900 sm:text-3xl md:text-[2.15rem]"
            style={{ fontFeatureSettings: '"lnum", "pnum"' }}
          >
            {title}
          </h2>
          {intro ? <p className="mt-4 text-balance text-zinc-600 leading-relaxed">{intro}</p> : null}
        </motion.div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.roles.map((role, idx) => (
            <motion.li
              key={role}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 rounded-2xl border border-zinc-200/90 bg-zinc-50/80 px-4 py-3.5 text-left text-sm font-medium text-zinc-800 shadow-sm"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 text-orange-700 text-xs font-bold">
                {String(idx + 1).padStart(2, '0')}
              </span>
              {role}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
