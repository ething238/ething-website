import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { FadeInSection, SectionHeading } from './AnimatedCounter.jsx'

export default function ClientsSection({ clients, testimonials }) {
  return (
    <section id="clients" aria-labelledby="clients-heading" className="border-b border-zinc-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading
            titleId="clients-heading"
            eyebrow="Trusted Worldwide"
            title="Companies We Have Worked With"
            subtitle="Small and mid-size product companies across the globe trust Ething to build and scale engineering teams from India."
          />
        </FadeInSection>

        {/* Logo / company strip - Uplers-style */}
        <FadeInSection className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {clients.map((client, i) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-center shadow-sm transition hover:border-teal-200 hover:shadow-md sm:min-w-[140px]"
              >
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-8 w-auto max-w-[120px] object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="font-[family:var(--font-display)] text-lg font-bold tracking-tight text-ething-ink">
                    {client.name}
                  </span>
                )}
                <span className="mt-2 text-[11px] font-medium text-zinc-500">{client.industry}</span>
                {client.size ? (
                  <span className="mt-0.5 text-[10px] text-zinc-400">{client.size}</span>
                ) : null}
              </motion.div>
            ))}
          </div>
        </FadeInSection>

        {/* Featured feedback - Uplers testimonial cards */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeInSection key={t.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-7 shadow-[0_4px_24px_rgba(12,18,34,0.06)]"
              >
                <div className="mb-4 rounded-xl bg-gradient-to-r from-teal-50 to-sky-50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-teal-800">
                    {t.companyDescriptor}
                  </p>
                  <p className="mt-0.5 text-[11px] text-zinc-500">{t.company}</p>
                </div>
                <Quote className="mb-3 h-7 w-7 text-teal-500/25" />
                <div className="mb-4 flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-zinc-600">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 border-t border-zinc-100 pt-4">
                  <p className="font-semibold text-ething-ink">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.title}</p>
                </footer>
              </motion.article>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
