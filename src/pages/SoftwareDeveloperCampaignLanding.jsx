import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, Check, ChevronDown, Clock, Shield, Star, Users } from 'lucide-react'
import LeadForm from '../components/landing/LeadForm.jsx'
import CalendlyButton, { openCalendly } from '../components/landing/CalendlyButton.jsx'
import { trackEvent } from '../lib/tracking.js'

const bookingLabel = 'Book a 15-minute call'
const companyLogos = [
  ['PostHog', '/clients/posthug.svg'],
  ['Plausible', '/clients/plausible.svg'],
  ['Buffer', '/clients/buffer.svg'],
  ['ConvertKit', '/clients/convertkit.svg'],
  ['Toggl', '/clients/toggl.svg'],
  ['Hotjar', '/clients/hotjar.svg'],
  ['Typeform', '/clients/typeform.svg'],
  ['Ghost', '/clients/ghost.svg'],
  ['Mercer', '/clients/mercer.svg'],
  ['Aionos', '/clients/aionos.png'],
  ['SalisPay', '/clients/salispay.svg'],
  ['Credopay', '/clients/credopay.svg'],
]

const proofCards = [
  ['48 hours', 'Shortlist target', 'We focus the search around your stack, seniority and product context before sharing profiles.'],
  ['React · Node · Python', 'Modern product stacks', 'Support for frontend, backend, platform, cloud and data-adjacent software delivery.'],
  ['Interview first', 'Validate fit early', 'Meet shortlisted developers before choosing an engagement model or start date.'],
]

const capabilities = [
  ['Product engineering', 'React, Next.js, TypeScript and design-system delivery for polished customer experiences.'],
  ['Backend & integrations', 'Node.js, Python, Java, APIs, databases and scalable services that support the product.'],
  ['Cloud-ready delivery', 'AWS, Azure, CI/CD and observability awareness for teams shipping reliably at pace.'],
  ['Flexible team extension', 'Add one specialist or a small pod while retaining product direction and delivery control.'],
]

const comparison = [
  ['Time to shortlist', 'Relevant profiles in as little as 48 hours', 'Often weeks before interviews begin'],
  ['Technical vetting', 'Pre-screened against your required stack', 'Screening is led entirely by your internal team'],
  ['Flexibility', 'Add capacity for the work and timeline you have', 'Permanent headcount decision from day one'],
  ['Replacement support', 'A clear replacement process when fit is not right', 'Restart sourcing and interviewing internally'],
  ['Cost control', 'Engagement shaped around the delivery need', 'Recruitment and idle-capacity risk sit with you'],
]

const testimonials = [
  ['Global fintech', '85 employees', 'The shortlist was focused, technically credible and easy for our team to assess. We moved from requirement to interviews without dragging out the process.', 'VP Engineering · 2 senior engineers selected'],
  ['Healthtech scale-up', '65 employees', 'The developers integrated into stand-ups and delivery rituals quickly. The key difference was the quality of the match, not simply the speed.', 'CTO · Product delivery team extended'],
  ['E-commerce platform', '220 employees', 'We could add product capacity around a critical launch without losing ownership of the roadmap or introducing a long recruitment delay.', 'Head of Product · Flexible engagement'],
]

const faqs = [
  ['How quickly can I receive developer profiles?', 'Matched profiles can be shared within 48 hours after requirements are understood.'],
  ['How are developers vetted?', 'Profiles are technically and professionally screened before they are shared.'],
  ['Can I interview developers before hiring?', 'Yes. You can interview shortlisted developers before committing.'],
  ['Can I hire developers for short-term projects?', 'Flexible engagement models can support changing project requirements.'],
  ['Do you provide onsite, hybrid and remote developers?', 'Ething supports onsite, hybrid and remote engagement models.'],
  ['Can I scale the team up or down?', 'Yes. Flexible hiring is designed to adapt as requirements change.'],
  ['Which technologies do you support?', 'The page highlights AI, web, cloud, data, mobile and core engineering technologies.'],
  ["What happens if a developer isn't the right fit?", 'A replacement guarantee is available; confirm applicable terms with Ething.'],
]

function trackCta(location) {
  trackEvent('landing_cta_click', {
    landing_page: '/hire-developers',
    page_category: 'developers',
    cta_location: location,
  })
}

function scrollToForm(location) {
  trackCta(location)
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function bookCall(location) {
  trackEvent('book_call_cta_click', {
    landing_page: '/hire-developers',
    page_category: 'developers',
    cta_location: location,
  })
  openCalendly()
}

export default function SoftwareDeveloperCampaignLanding() {
  useEffect(() => {
    const marks = new Set()
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? (window.scrollY / max) * 100 : 100
      ;[25, 50, 75, 100].forEach((mark) => {
        if (progress >= mark && !marks.has(mark)) {
          marks.add(mark)
          trackEvent('landing_scroll_depth', {
            landing_page: '/hire-developers',
            page_category: 'developers',
            percent: mark,
          })
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Helmet>
        <title>Hire Software Developers in India | Ething Solutions</title>
        <meta name="description" content="Find pre-vetted software developers from India. Tell us what you need and receive suitable developer profiles within 48 hours." />
        <link rel="canonical" href="https://www.ethingsolutions.com/hire-developers" />
      </Helmet>
      <main className="bg-white text-zinc-900">
        <section className="relative overflow-hidden bg-[#071a2c] px-4 pb-20 pt-24 text-white sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(27,198,188,.24),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,.22),transparent_30%)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.22em] text-teal-200">eThing Solutions · Software engineering talent</p>
              <h1 className="mt-5 max-w-3xl font-[family:var(--font-display)] text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Find the Right Software Developer, Fast.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-200">Tell us the skills, seniority and delivery context you need. We will share suitable, pre-vetted developer profiles within 48 hours.</p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-200">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> 4.8/5 based on 25+ reviews</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2"><Shield className="h-4 w-4 text-teal-200" /> NDA protected</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2"><Clock className="h-4 w-4 text-teal-200" /> Global timezone overlap</span>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => scrollToForm('hero')} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#071a2c] shadow-lg shadow-black/20 transition hover:bg-zinc-100">Get vetted profiles <ArrowRight className="h-4 w-4" /></button>
                <button type="button" onClick={() => bookCall('hero')} className="inline-flex items-center justify-center rounded-full border border-white/45 px-6 py-3 font-semibold text-white transition hover:bg-white/10">{bookingLabel}</button>
              </div>
              <p className="mt-4 text-sm text-zinc-300">Usually responds within one business hour · 100% compliance-focused process</p>
            </div>
            <div id="lead-form" className="rounded-2xl bg-white p-6 text-zinc-900 shadow-2xl shadow-black/25">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-teal-700">Find vetted developers</p>
              <h2 className="mt-2 font-[family:var(--font-display)] text-2xl font-bold text-zinc-950">Share your needs. We will help you find the right people.</h2>
              <div className="mt-5"><LeadForm cta="Get Developer Profiles" formId="software-developer-campaign-form" /></div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-b border-zinc-200 py-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-zinc-500">Companies we have worked with</p>
          <div className="mx-auto mt-5 flex max-w-6xl flex-wrap justify-center gap-3 px-4">
            {companyLogos.map(([name, logo]) => <span key={name} className="grid h-16 w-36 place-items-center rounded-xl border border-zinc-200 bg-white px-4 shadow-sm"><img src={logo} alt={name} className="max-h-8 max-w-24 object-contain" loading="lazy" /></span>)}
          </div>
        </section>

        <section className="bg-[#effafa] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-teal-700">Software developer proof</p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-3xl font-bold text-zinc-950 sm:text-4xl">Talent aligned to the work you actually need shipped.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {proofCards.map(([metric, title, copy]) => <article key={title} className="rounded-2xl border border-teal-100 bg-white p-6 text-left shadow-sm"><b className="text-2xl text-teal-700">{metric}</b><h3 className="mt-4 text-xl font-bold text-zinc-950">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600">{copy}</p></article>)}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-teal-700">Capabilities</p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-3xl font-bold text-zinc-950 sm:text-4xl">Software delivery capabilities for the work your roadmap needs next.</h2>
            <p className="mx-auto mt-4 max-w-3xl text-zinc-600">Build customer-facing products, core services and reliable delivery infrastructure with engineers matched to your stack and product context.</p>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {capabilities.map(([title, copy]) => <article key={title} className="rounded-2xl border border-zinc-200 bg-white p-6 text-left shadow-sm"><h3 className="text-lg font-bold text-zinc-950">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600">{copy}</p></article>)}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-2">{['React','Next.js','TypeScript','Node.js','Python','Java','AWS','Azure','CI/CD','APIs'].map((tag) => <span key={tag} className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-800">{tag}</span>)}</div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#071a2c] to-[#0b4150] px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-teal-200">Representative hiring outcome</p>
            <h2 className="mt-3 max-w-4xl font-[family:var(--font-display)] text-3xl font-bold sm:text-4xl">A confidential fintech team needed product capacity without a long recruiting cycle.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {['Challenge|Two roadmap-critical features required React and backend experience while the internal team remained focused on core operations.','Approach|Requirements were narrowed around seniority, APIs, React and collaborative delivery; the team interviewed a focused shortlist.','Outcome|3 relevant profiles in 48 hours; 2 engineers selected within 12 days.'].map((item) => { const [title, copy] = item.split('|'); return <article key={title} className="rounded-2xl border border-white/15 bg-white/10 p-6"><span className="text-xs font-bold uppercase tracking-[.16em] text-teal-200">{title}</span><p className="mt-3 leading-7 text-zinc-200">{copy}</p></article> })}
            </div>
          </div>
        </section>

        <section className="bg-zinc-50 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-xs font-bold uppercase tracking-[.18em] text-teal-700">Why eThing vs traditional hiring</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-center font-[family:var(--font-display)] text-3xl font-bold text-zinc-950 sm:text-4xl">Move faster without skipping the decisions that protect quality.</h2>
            <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              {comparison.map(([factor, ours, traditional], index) => <div key={factor} className="grid gap-3 border-t border-zinc-200 p-5 first:border-t-0 md:grid-cols-[.8fr_1.2fr_1.2fr]"><strong>{factor}</strong><span className="text-teal-800">{ours}</span><span className="text-zinc-600">{traditional}</span></div>)}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-teal-700">Confidential client stories</p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-3xl font-bold text-zinc-950 sm:text-4xl">Trusted by teams that need dependable delivery capacity.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {testimonials.map(([company, size, quote, footer]) => <article key={company} className="rounded-2xl border border-zinc-200 bg-white p-6 text-left shadow-sm"><div className="flex justify-between gap-3 text-xs font-bold uppercase tracking-wide text-teal-700"><span>{company}</span><span>{size}</span></div><div className="mt-5 flex gap-1 text-yellow-500"><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /></div><blockquote className="mt-4 leading-7 text-zinc-700">“{quote}”</blockquote><footer className="mt-5 text-sm font-semibold text-teal-700">{footer}</footer></article>)}
            </div>
          </div>
        </section>

        <section className="bg-[#effafa] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-[family:var(--font-display)] text-3xl font-bold text-zinc-950 sm:text-4xl">Our Process</h2>
            <ol className="mt-10 grid gap-5 md:grid-cols-4">
              {['Tell Us What You Need|Share the skills, experience, and technology stack you need.','Receive Vetted Profiles|We screen relevant talent and send a focused shortlist.','Interview Your Shortlist|Meet suitable engineers and select the people who fit.','Start Building|Onboard quickly and begin delivery with your new team.'].map((item, i) => { const [title, copy] = item.split('|'); return <li key={title} className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm"><b className="text-teal-700">{String(i + 1).padStart(2, '0')}</b><h3 className="mt-3 text-lg font-bold text-zinc-950">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-600">{copy}</p></li> })}
            </ol>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-teal-700">Matching preview</p>
            <h2 className="mt-3 font-[family:var(--font-display)] text-3xl font-bold text-zinc-950 sm:text-4xl">Examples of software talent we can help you find.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">{['Senior Product Engineer|React · TypeScript · APIs · product delivery','Backend Engineer|Node.js · Python · services · integrations','Cloud-minded Full Stack Engineer|Modern web · CI/CD · scalable delivery'].map((item) => { const [title, copy] = item.split('|'); return <article key={title} className="rounded-2xl border border-zinc-200 p-6 text-left shadow-sm"><small className="font-bold uppercase tracking-wide text-teal-700">Example profile</small><h3 className="mt-3 text-xl font-bold text-zinc-950">{title}</h3><p className="mt-2 text-zinc-600">{copy}</p><span className="mt-4 inline-flex text-sm font-semibold text-teal-700">Vetting details shared on request</span></article> })}</div>
          </div>
        </section>

        <section className="bg-zinc-50 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-center text-xs font-bold uppercase tracking-[.18em] text-teal-700">FAQs</p>
            <h2 className="mt-3 text-center font-[family:var(--font-display)] text-3xl font-bold text-zinc-950 sm:text-4xl">Questions, answered.</h2>
            <div className="mt-10 divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              {faqs.map(([question, answer]) => <details key={question} className="group"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-zinc-950"><span>{question}</span><ChevronDown className="h-5 w-5 text-zinc-400 transition group-open:rotate-180" /></summary><p className="px-5 pb-5 leading-7 text-zinc-600">{answer}</p></details>)}
            </div>
          </div>
        </section>

        <section className="bg-[#071a2c] px-4 py-20 text-center text-white sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-teal-200">Build with the right team</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-[family:var(--font-display)] text-3xl font-bold sm:text-4xl">Tell us who you need. We will help you find them.</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={() => scrollToForm('final-get-profiles')} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#071a2c]">Get vetted profiles <ArrowRight className="h-4 w-4" /></button><CalendlyButton variant="outline">{bookingLabel}</CalendlyButton></div>
        </section>

        <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-2xl border border-white/20 bg-[#071a2c]/95 p-2 shadow-2xl md:hidden"><button type="button" onClick={() => scrollToForm('mobile-get-profiles')} className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#071a2c]">Get profiles</button><button type="button" onClick={() => bookCall('mobile')} className="rounded-full border border-white/35 px-4 py-3 text-sm font-semibold text-white">Book a call</button></div>
      </main>
    </>
  )
}
