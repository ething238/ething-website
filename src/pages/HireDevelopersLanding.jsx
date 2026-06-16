import { useCallback, useEffect, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Globe2,
  Users,
  Zap,
  Shield,
  Clock,
  Layers,
  Landmark,
  HeartPulse,
  Brain,
  Box,
  ShoppingCart,
  Sparkles,
} from 'lucide-react'
import { landingPageContent } from '../data/landingPageContent.js'
import { captureUtmParams } from '../lib/utmParams.js'
import { initTracking } from '../lib/tracking.js'
import LandingSeo from '../components/landing/LandingSeo.jsx'
import LandingHeader from '../components/landing/LandingHeader.jsx'
import LandingFooter from '../components/landing/LandingFooter.jsx'
import LeadForm from '../components/landing/LeadForm.jsx'
import LeadCaptureModal from '../components/landing/LeadCaptureModal.jsx'
import ExitIntentPopup from '../components/landing/ExitIntentPopup.jsx'
import StickyMobileCta from '../components/landing/StickyMobileCta.jsx'
import CalendlyButton, { openCalendly } from '../components/landing/CalendlyButton.jsx'
import HeroIllustration from '../components/landing/HeroIllustration.jsx'
import ClientsSection from '../components/landing/ClientsSection.jsx'
import IcpSection from '../components/landing/IcpSection.jsx'
import AnimatedCounter, { FadeInSection, SectionHeading } from '../components/landing/AnimatedCounter.jsx'
import { lpCtaPrimaryDark, lpCtaPrimaryNavy, lpCtaSecondary } from '../components/landing/lpCtaStyles.js'

const ICON_MAP = {
  Layers,
  Landmark,
  HeartPulse,
  Brain,
  Box,
  ShoppingCart,
}

const easeOut = [0.22, 1, 0.36, 1]

function InlineCta({ hero, onGetProfiles, className = '' }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onGetProfiles}
        className={`${lpCtaPrimaryNavy} gap-2 shadow-ething-navy/20`}
      >
        {hero.primaryCta}
        <ArrowRight className="h-4 w-4" />
      </motion.button>
      <CalendlyButton variant="secondary">{hero.secondaryCta}</CalendlyButton>
    </div>
  )
}

function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(faqs[0]?.id ?? null)

  return (
    <div
      className="mx-auto max-w-3xl divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {faqs.map((faq) => {
        const isOpen = open === faq.id
        return (
          <article
            key={faq.id}
            id={faq.id}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : faq.id)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-zinc-50"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${faq.id}`}
            >
              <span
                itemProp="name"
                className="font-[family:var(--font-display)] text-base font-semibold text-ething-ink sm:text-lg"
              >
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${faq.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p itemProp="text" className="px-6 pb-5 text-sm leading-relaxed text-zinc-600">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        )
      })}
    </div>
  )
}

export default function HireDevelopersLanding() {
  const c = landingPageContent
  const reduceMotion = useReducedMotion()
  const [modalOpen, setModalOpen] = useState(false)

  const openFormModal = useCallback(() => setModalOpen(true), [])

  useEffect(() => {
    captureUtmParams()
    initTracking()
  }, [])

  return (
    <>
      <LandingSeo />

      <LandingHeader
        onGetProfiles={openFormModal}
        onBookCall={openCalendly}
        primaryCta={c.hero.primaryCta}
        secondaryCta={c.hero.secondaryCta}
      />

      <main id="main-content">
      {/* SECTION 1 - HERO */}
      <section
        id="hero"
        aria-label="Hire remote developers from India for global companies"
        className={`relative overflow-hidden pt-20 ${reduceMotion ? 'mesh-bg' : 'hero-mesh-animated'}`}
      >
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
        {!reduceMotion && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-500/15 blur-3xl"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        )}

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 lg:px-8 lg:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-medium text-zinc-200 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-teal-300" />
                {c.hero.badge}
              </div>

              <h1 className="text-balance font-[family:var(--font-display)] text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
                {c.hero.headline}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                {c.hero.subheadline}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openFormModal}
                  className={lpCtaPrimaryDark}
                >
                  {c.hero.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
                <CalendlyButton variant="outline">{c.hero.secondaryCta}</CalendlyButton>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {c.hero.trustBar.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-zinc-300"
                  >
                    <Check className="h-3 w-3 text-teal-400" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
            >
              <HeroIllustration reduceMotion={reduceMotion} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CLIENTS & TESTIMONIALS - Uplers-style */}
      <ClientsSection clients={c.clients} testimonials={c.testimonials} />

      {/* ICP - 20-300 companies, CEO/CTO/CFO/VP */}
      <IcpSection icp={c.icp} />

      {/* SECTION 2 - WHY INDIA */}
      <section id="why-india" aria-labelledby="why-india-heading" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <SectionHeading
              titleId="why-india-heading"
              eyebrow="Why India"
              title={c.whyIndia.title}
              subtitle={c.whyIndia.subtitle}
            />
          </FadeInSection>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.whyIndia.stats.map((stat, i) => (
              <FadeInSection key={stat.id} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-teal-500/5 transition group-hover:bg-teal-500/10" />
                  <p className="font-[family:var(--font-display)] text-4xl font-bold text-ething-navy">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix ?? ''}
                    />
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ething-ink">{stat.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{stat.description}</p>
                </motion.div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection className="mt-12">
            <InlineCta hero={c.hero} onGetProfiles={openFormModal} />
          </FadeInSection>
        </div>
      </section>

      {/* SECTION 3 - WHO WE HELP */}
      <section id="who-we-help" aria-labelledby="who-we-help-heading" className="border-t border-zinc-200 bg-zinc-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <SectionHeading titleId="who-we-help-heading" title={c.whoWeHelp.title} subtitle={c.whoWeHelp.subtitle} />
          </FadeInSection>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.whoWeHelp.industries.map((ind, i) => {
              const Icon = ICON_MAP[ind.icon] ?? Layers
              return (
                <FadeInSection key={ind.id} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10">
                      <Icon className="h-5 w-5 text-teal-600" />
                    </div>
                    <h3 className="font-[family:var(--font-display)] text-lg font-bold text-ething-ink">
                      {ind.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                      <span className="font-medium text-zinc-700">Challenge: </span>
                      {ind.challenge}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                      <span className="font-medium text-teal-700">How Ething helps: </span>
                      {ind.solution}
                    </p>
                  </motion.div>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4 - SERVICES */}
      <section id="services" aria-labelledby="services-heading" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <SectionHeading titleId="services-heading" title={c.services.title} subtitle={c.services.subtitle} />
          </FadeInSection>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.services.items.map((svc, i) => (
              <FadeInSection key={svc.id} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative h-full cursor-default overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-sky-500/0 transition group-hover:from-teal-500/[0.04] group-hover:to-sky-500/[0.06]" />
                  <div className="relative">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-600">
                      {svc.keywords}
                    </span>
                    <h3 className="mt-2 font-[family:var(--font-display)] text-xl font-bold text-ething-ink">
                      {svc.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">{svc.description}</p>
                    <button
                      type="button"
                      onClick={openFormModal}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ething-navy opacity-0 transition group-hover:opacity-100"
                    >
                      Get started <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection className="mt-12">
            <InlineCta hero={c.hero} onGetProfiles={openFormModal} />
          </FadeInSection>
        </div>
      </section>

      {/* SECTION 5 - TALENT */}
      <section id="talent" aria-labelledby="talent-heading" className="border-t border-zinc-200 bg-ething-ink py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <SectionHeading
              titleId="talent-heading"
              title={c.talent.title}
              subtitle={c.talent.subtitle}
              light
            />
          </FadeInSection>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.talent.categories.map((cat, i) => (
              <FadeInSection key={cat.name} delay={i * 0.04}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
                >
                  <h3 className="font-[family:var(--font-display)] font-bold text-white">
                    {cat.name}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cat.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-teal-400/25 bg-teal-500/10 px-2.5 py-1 text-[11px] font-medium text-teal-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 - HOW IT WORKS */}
      <section id="how-it-works" aria-labelledby="how-it-works-heading" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <SectionHeading titleId="how-it-works-heading" title={c.howItWorks.title} subtitle={c.howItWorks.subtitle} />
          </FadeInSection>

          <div className="relative mt-14 grid gap-8 md:grid-cols-4">
            <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-0.5 bg-gradient-to-r from-teal-200 via-sky-200 to-teal-200 md:block" />
            {c.howItWorks.steps.map((step, i) => (
              <FadeInSection key={step.step} delay={i * 0.1}>
                <div className="relative text-center">
                  <div className="relative z-10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ething-navy text-lg font-bold text-white shadow-lg">
                    {String(step.step).padStart(2, '0')}
                  </div>
                  <h3 className="font-[family:var(--font-display)] text-lg font-bold text-ething-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{step.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection className="mt-10">
            <div className="mx-auto flex max-w-lg items-center justify-center gap-3 rounded-2xl border border-teal-200 bg-teal-50 px-6 py-4">
              <Clock className="h-5 w-5 shrink-0 text-teal-600" />
              <p className="text-sm font-semibold text-teal-800">{c.howItWorks.highlight}</p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* SECTION 7 - WHY ETHING */}
      <section id="why-ething" aria-labelledby="why-ething-heading" className="border-t border-zinc-200 bg-zinc-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <SectionHeading titleId="why-ething-heading" title={c.whyEthing.title} subtitle={c.whyEthing.subtitle} />
          </FadeInSection>

          <FadeInSection className="mt-12 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px] text-left text-sm" aria-label="Ething vs traditional recruiting comparison">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50">
                    <th className="px-6 py-4 font-semibold text-zinc-500">Metric</th>
                    <th className="px-6 py-4 font-semibold text-zinc-500">Traditional Recruiting</th>
                    <th className="px-6 py-4 font-semibold text-teal-700">Ething</th>
                  </tr>
                </thead>
                <tbody>
                  {c.whyEthing.rows.map((row, i) => (
                    <tr key={row.metric} className={i % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'}>
                      <td className="px-6 py-4 font-medium text-ething-ink">{row.metric}</td>
                      <td className="px-6 py-4 text-zinc-500">{row.traditional}</td>
                      <td className="px-6 py-4 font-medium text-teal-700">
                        <span className="inline-flex items-center gap-1.5">
                          <Check className="h-4 w-4 text-teal-500" />
                          {row.ething}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInSection>

          <FadeInSection className="mt-12">
            <InlineCta hero={c.hero} onGetProfiles={openFormModal} />
          </FadeInSection>
        </div>
      </section>

      {/* SECTION 8 - CASE STUDY */}
      <section id="case-study" aria-labelledby="case-study-heading" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-ething-navy to-ething-ink">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 sm:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                    {c.caseStudy.title}
                  </p>
                  <h2 id="case-study-heading" className="mt-3 font-[family:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
                    {c.caseStudy.company}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">{c.caseStudy.industry}</p>

                  <div className="mt-8 space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-300">
                        Challenge
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-300">{c.caseStudy.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-300">
                        Solution
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-300">{c.caseStudy.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center border-t border-white/10 bg-white/[0.03] p-8 sm:p-12 lg:border-l lg:border-t-0">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-teal-300">
                    Outcomes
                  </h3>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {c.caseStudy.outcomes.map((o) => (
                      <div
                        key={o.label}
                        className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center"
                      >
                        <p className="font-[family:var(--font-display)] text-3xl font-bold text-white">
                          {o.value}
                        </p>
                        <p className="mt-1 text-xs text-zinc-400">{o.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* SECTION 9 - FAQ (testimonials moved to Clients section) */}
      <section id="faq" aria-labelledby="faq-heading" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <SectionHeading
              titleId="faq-heading"
              title="Common Questions"
              subtitle="Everything founders and engineering leaders ask before hiring from India."
            />
          </FadeInSection>
          <FadeInSection className="mt-12">
            <FaqAccordion faqs={c.faqs} />
          </FadeInSection>
        </div>
      </section>

      {/* SECTION 11 - LEAD MAGNET */}
      <section id="lead-magnet" aria-labelledby="lead-magnet-heading" className="border-t border-zinc-200 bg-zinc-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <FadeInSection>
              <SectionHeading
                titleId="lead-magnet-heading"
                center={false}
                title={c.leadMagnet.title}
                subtitle={c.leadMagnet.subtitle}
              />
              <ul className="mt-8 space-y-4">
                {[
                  { icon: Users, text: '3 profiles matched to your stack and seniority' },
                  { icon: Zap, text: 'Delivered within 48 hours - no waiting' },
                  { icon: Shield, text: 'NDA protected, no recruiting fees' },
                  { icon: Globe2, text: 'Engineers with global client experience' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-zinc-600">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                    {text}
                  </li>
                ))}
              </ul>
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg sm:p-8">
                <LeadForm cta={c.leadMagnet.cta} formId="lead-magnet-form" />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* SECTION 12 - FINAL CTA */}
      <section id="contact" aria-labelledby="final-cta-heading" className="relative overflow-hidden bg-ething-navy py-20 sm:py-24">
        {!reduceMotion && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-teal-500/10 via-transparent to-sky-500/10"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        )}
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 id="final-cta-heading" className="font-[family:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
              {c.finalCta.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-300">{c.finalCta.subtitle}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CalendlyButton className={`${lpCtaPrimaryDark} !text-ething-navy hover:!bg-zinc-100`}>
                {c.finalCta.cta}
              </CalendlyButton>
              <button
                type="button"
                onClick={openFormModal}
                className={`${lpCtaSecondary} border-white/25 !bg-transparent !text-white hover:!bg-white/10`}
              >
                Or get 3 free profiles →
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>
      </main>

      {/* SECTION 13 - FOOTER */}
      <LandingFooter />

      {/* Conversion components */}
      <StickyMobileCta
        onPrimaryClick={openFormModal}
        onSecondaryClick={openCalendly}
        primaryCta={c.hero.primaryCta}
      />
      <AnimatePresence>
        {modalOpen && (
          <LeadCaptureModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title={c.leadMagnet.modalTitle}
            subtitle={c.leadMagnet.subtitle}
          />
        )}
      </AnimatePresence>
      <ExitIntentPopup onOpenForm={openFormModal} />
    </>
  )
}
