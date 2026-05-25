import { motion } from 'framer-motion'
import ServiceGrid from '../ServiceGrid.jsx'

export default function WhatWeOfferSection({ data }) {
  const { whatWeOffer, serviceCards } = data
  const { kicker, title, subtitle, lead, body } = whatWeOffer

  return (
    <section
      id={whatWeOffer.id}
      className="relative -mt-1 border-t border-zinc-200/60 bg-zinc-100/50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          {kicker && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{kicker}</p>
          )}
          <h2
            className="mt-3 text-balance font-[family:var(--font-serif)] text-[1.75rem] font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl md:text-[2.4rem] md:leading-[1.15]"
            style={{ fontFeatureSettings: '"lnum", "pnum"' }}
          >
            {title}
          </h2>
          <p className="mt-4 text-balance text-lg font-medium text-orange-600 sm:text-xl">
            {subtitle}
          </p>
          {lead ? (
            <p className="mt-[4px] text-balance font-[family:var(--font-serif)] text-lg font-semibold leading-snug tracking-tight text-zinc-800 sm:text-xl">
              {lead}
            </p>
          ) : null}
          <p className="mt-4 text-balance text-zinc-600 leading-relaxed sm:text-base">{body}</p>
        </motion.div>

        <div className="mt-14 sm:mt-16">
          <ServiceGrid cards={serviceCards} />
        </div>
      </div>
    </section>
  )
}
