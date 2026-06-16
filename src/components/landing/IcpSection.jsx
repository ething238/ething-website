import { motion } from 'framer-motion'
import { Building2, Briefcase, TrendingUp, Users } from 'lucide-react'
import { FadeInSection, SectionHeading } from './AnimatedCounter.jsx'

const ICON_MAP = { Building2, Briefcase, TrendingUp, Users }

export default function IcpSection({ icp }) {
  return (
    <section id="who-we-serve" aria-labelledby="icp-heading" className="bg-zinc-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <SectionHeading
            titleId="icp-heading"
            eyebrow="Built For You"
            title={icp.title}
            subtitle={icp.subtitle}
          />
        </FadeInSection>

        {/* Decision-maker roles */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {icp.roles.map((role, i) => {
            const Icon = ICON_MAP[role.icon] ?? Users
            return (
              <FadeInSection key={role.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="h-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-ething-navy/8">
                    <Icon className="h-5 w-5 text-ething-navy" />
                  </div>
                  <h3 className="font-[family:var(--font-display)] text-lg font-bold text-ething-ink">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{role.description}</p>
                </motion.div>
              </FadeInSection>
            )
          })}
        </div>

        {/* How we help SMB/mid-market */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {icp.benefits.map((b, i) => (
            <FadeInSection key={b.title} delay={i * 0.08}>
              <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                <span className="text-2xl font-bold text-teal-600/80">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-[family:var(--font-display)] font-bold text-ething-ink">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{b.description}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
