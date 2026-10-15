import { useState } from 'react'
import { ArrowRight, ArrowUpRight, BrainCircuit, Building2, Car, Check, ChevronDown, Cloud, Code2, Cpu, HeartPulse, Layers3, Mail, Network, Plane, ShieldCheck, Smartphone, Sparkles, TrainFront, BookOpen } from 'lucide-react'
import ContactForm from '../components/HomepageEnquiryForm.jsx'
import '../styles/homepage.css'
const homepageHref = (path = '/') => path === '/contact' || path === '/contact#reach-out' ? '#reach-out' : path
import { expertiseAreas, faqs, industries } from '../data/homepageExperience.js'
import { hiringRoles, homepageReviews, deliveryProof } from '../data/homepageHiring.js'

const areaIcons = { code: Code2, brain: BrainCircuit, cloud: Cloud, mobile: Smartphone, shield: ShieldCheck, cpu: Cpu }
const industryIcons = { heart: HeartPulse, bank: Building2, car: Car, plane: Plane, train: TrainFront, book: BookOpen }

function TeamVisual() {
  return <div className="hero-visual" role="img" aria-label="eThing software developers, AI and data engineers, and cloud specialists joining your existing team">
    <div className="visual-top"><span className="visual-dot" /><span>Extend your team with eThing</span><Network size={20} aria-hidden="true" /></div>
    <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="visual-cross cross-one" /><div className="visual-cross cross-two" />
    <div className="roadmap-node"><span className="roadmap-icon"><Layers3 size={29} aria-hidden="true" /></span><span>Your project, one team<strong>Your team + eThing</strong></span><span className="node-dot" /></div>
    <div className="team-connector" aria-hidden="true"><span /><span /><span /></div>
    <div className="talent-nodes"><div><Code2 size={26} aria-hidden="true" /><span>Software</span><small>Developers</small></div><div><BrainCircuit size={26} aria-hidden="true" /><span>AI &amp; data</span><small>Engineers</small></div><div><Cloud size={26} aria-hidden="true" /><span>Cloud</span><small>Specialists</small></div></div>
    <div className="visual-bottom"><span>Specialists who work alongside your team.</span></div>
    <div className="visual-caption"><strong>One team. More expertise.</strong></div>
  </div>
}

export default function Home({ content }) {
  const [areaIndex, setAreaIndex] = useState(0)
  const [intent, setIntent] = useState('Help me choose')
  const [specialty, setSpecialty] = useState('Help me choose')
  const faqMidpoint = Math.ceil(faqs.length / 2)
  function enquire(selectedIntent, selectedSpecialty = 'Help me choose') { setIntent(selectedIntent); setSpecialty(selectedSpecialty) }
  function keyTabs(e, index, items, select) {
    let next
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % items.length
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + items.length) % items.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = items.length - 1
    if (next === undefined) return
    e.preventDefault(); select(next)
    e.currentTarget.parentElement.querySelectorAll('[role="tab"]')[next]?.focus()
  }
  return <div className="homepage-reviewed">
    <section className="hero-section" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1>IT Staff Augmentation Services</h1>
          <p>eThing delivers IT staff augmentation services for teams worldwide, supporting software, AI and cloud projects. Hire programmers who integrate with existing teams and deliver the work your project needs.</p>
          <div className="hero-actions"><a className="button button-blue" href="#reach-out" onClick={() => enquire('Team extension')}>Find your team <ArrowUpRight size={19} aria-hidden="true" /></a></div>
          <div className="hero-proof" aria-label="eThing delivery and hiring experience"><div><strong>20+</strong><span>Projects delivered</span></div><div><strong>48 hrs</strong><span>Average profile sharing time</span></div></div>
        </div>
        <TeamVisual />
      </div>
    </section>

    <section className="section section-expertise" id="expertise">
      <div className="container">
        <div className="section-heading centered-heading"><h2>Skills for your team</h2><p>eThing provides IT augmentation services across software engineering, AI/ML, data, cloud, mobile, testing and embedded systems.</p><p className="shortlist-note">Suitable candidate profiles are shared in <strong>48 hours on average</strong> after requirements are confirmed.</p></div>
        <div className="expertise-layout">
          <div className="expertise-tabs" role="tablist" aria-label="Engineering specialties" aria-orientation="vertical">{expertiseAreas.map((item, i) => { const Icon = areaIcons[item.icon]; return <button key={item.id} id={'area-tab-' + item.id} role="tab" type="button" tabIndex={areaIndex === i ? 0 : -1} aria-selected={areaIndex === i} aria-controls={'area-panel-' + item.id} onKeyDown={e => keyTabs(e, i, expertiseAreas, setAreaIndex)} onClick={() => setAreaIndex(i)}><Icon size={21} aria-hidden="true" /><span>{item.label}</span><ArrowRight size={18} aria-hidden="true" /></button> })}</div>
          <div className="expertise-panels">{expertiseAreas.map((area, i) => { const AreaIcon = areaIcons[area.icon]; const active = areaIndex === i; return <div key={area.id} className="expertise-panel" id={'area-panel-' + area.id} role="tabpanel" aria-labelledby={'area-tab-' + area.id} aria-hidden={!active} inert={!active} tabIndex={active ? 0 : -1}>
            <div className="expertise-panel-top"><span className="area-icon"><AreaIcon size={33} strokeWidth={1.4} aria-hidden="true" /></span><h3>{area.title}</h3><span className="panel-number">{area.number} / 06</span></div><p>{area.description}</p>
            <div className="technology-tags">{area.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className="expertise-columns"><div><h4>Available roles</h4><ul>{area.roles.map(role => <li key={role}><Check size={15} aria-hidden="true" />{role}</li>)}</ul></div><div><h4>What they can do</h4><ul>{area.focus.map(focus => <li key={focus}><span aria-hidden="true">↗</span>{focus}</li>)}</ul></div></div>
            <div className="expertise-actions"><a className="text-link" href="#reach-out" onClick={() => enquire('Team extension', area.label)}>Talk about your needs <ArrowUpRight size={17} aria-hidden="true" /></a><a className="subtle-link" href={homepageHref(area.path)}>{area.link}<ArrowUpRight size={14} aria-hidden="true" /></a></div>
          </div> })}</div>
        </div>
        <div className="hire-links"><span>Looking for a specific skill?</span><a href={homepageHref('/hire-react-developers')}>React <ArrowUpRight size={13} aria-hidden="true" /></a><a href={homepageHref('/hire-python-developers')}>Python <ArrowUpRight size={13} aria-hidden="true" /></a><a href={homepageHref('/hire-full-stack-developers')}>Full stack <ArrowUpRight size={13} aria-hidden="true" /></a><a href={homepageHref('/hire-devops-engineers')}>DevOps <ArrowUpRight size={13} aria-hidden="true" /></a></div>      </div>
    </section>

    <section className="section reviews-section" id="reviews">
      <div className="container">
        <div className="section-heading centered-heading"><h2>Client reviews</h2></div>
        <div className="review-grid">{homepageReviews.map(review => <article className="source-review" key={review.platform}><div className="source-review-top"><h3><img src={review.logo} alt="" width="32" height="32" loading="lazy" />{review.platform}</h3><div className="source-review-rating"><strong>{review.rating}<span> / 5</span></strong><p>{review.count} {review.count === 1 ? 'review' : 'reviews'}</p></div></div><blockquote>“{review.quote}”</blockquote><p className="source-review-author">{review.author}</p><p className="source-review-context">{review.context}</p><a className="text-link" href={review.url} target="_blank" rel="noopener noreferrer">Read the {review.platform} review<ArrowUpRight size={17} aria-hidden="true" /></a></article>)}</div>
        <article className="delivery-proof"><div className="delivery-proof-heading"><Building2 size={27} aria-hidden="true" /><div><h3>{deliveryProof.title}</h3><p>{deliveryProof.sector} · {deliveryProof.period} · Client-reported project</p></div></div><p>{deliveryProof.summary}</p><a className="text-link" href={deliveryProof.url} target="_blank" rel="noopener noreferrer">Read the project details on Clutch <ArrowUpRight size={17} aria-hidden="true" /></a></article>
        <p className="review-checked">Ratings and excerpts checked <time dateTime="2026-10-13">13 October 2026</time>. Review counts and ratings may change.</p>
      </div>
    </section>

    <section className="section hiring-section" id="hire-developers">
      <div className="container">
        <div className="section-heading centered-heading"><h2>Hire software developers</h2><p>Hire dedicated software developers who fit your project, skills and working hours, wherever your team works.</p></div>
        <div className="hiring-grid">{hiringRoles.map(role => <article className="hiring-card" key={role.id}><h3>{role.title}</h3><p>{role.description}</p><a className="text-link" href={homepageHref(role.path)}>{role.cta}<ArrowUpRight size={17} aria-hidden="true" /></a></article>)}</div>
        <p className="hiring-note">Share your project requirements and start date. eThing defines the roles, matches developers to your requirements and coordinates onboarding across locations and time zones.</p>
      </div>
    </section>

    <section className="section ai-section" id="ai">
      <div className="container ai-layout">
        <div className="ai-copy">
          <h2>AI for your business</h2>
          <p>eThing brings AI and data engineers into your team to build practical AI tools, prepare your data and connect new features to your existing software.</p>
          <ul className="section-benefits">
            <li><Check size={19} aria-hidden="true" /><div><strong>Start with a clear goal</strong><p>Choose the task AI should improve for your team.</p></div></li>
            <li><Check size={19} aria-hidden="true" /><div><strong>Connect your data and tools</strong><p>Build around your existing apps and data sources.</p></div></li>
            <li><Check size={19} aria-hidden="true" /><div><strong>Test, launch and improve</strong><p>Check models, track results and support updates.</p></div></li>
          </ul>
          <a className="button button-white" href="#reach-out" onClick={() => enquire('Team extension', 'AI & data')}>Build your AI team <ArrowUpRight size={18} aria-hidden="true" /></a>
          <div className="ai-signal"><Sparkles size={18} aria-hidden="true" /><span>AI tools built for your work.</span></div>
        </div>
        <div className="ai-workstreams"><article><span>01</span><div><h3>AI tools</h3><p>Build chatbots, search tools and apps that help people find and use information.</p><small>Generative AI · NLP · Python</small></div><BrainCircuit size={27} strokeWidth={1.3} aria-hidden="true" /></article><article><span>02</span><div><h3>Data and models</h3><p>Organise your data, build models and check how well they meet your needs.</p><small>Data engineering · ML · Data science</small></div><Layers3 size={27} strokeWidth={1.3} aria-hidden="true" /></article><article><span>03</span><div><h3>Launch and support</h3><p>Connect AI to your apps, launch it and track how it works.</p><small>MLOps · Cloud · Integration</small></div><Cloud size={27} strokeWidth={1.3} aria-hidden="true" /></article></div>
      </div>
    </section>

    <section className="section industry-section" id="industries">
      <div className="container industry-layout">
        <div className="industry-copy">
          <h2>Industries we support</h2>
          <p>eThing provides engineering talent for the systems your industry relies on. We match technical skills to your business needs, project goals and existing tools.</p>
          <ul className="section-benefits">
            <li><Check size={19} aria-hidden="true" /><div><strong>Skills for your systems</strong><p>Developers who work with your platforms and tools.</p></div></li>
            <li><Check size={19} aria-hidden="true" /><div><strong>Work built around your business</strong><p>Match development to your users and daily workflows.</p></div></li>
            <li><Check size={19} aria-hidden="true" /><div><strong>A team that fits your needs</strong><p>Add specialists with support for onboarding and changes.</p></div></li>
          </ul>
        </div>
        <div className="industry-grid">{industries.map(item => { const Icon = industryIcons[item.icon]; return <a key={item.name} href={homepageHref(item.path)}><div className="industry-card-title"><Icon size={24} strokeWidth={1.4} aria-hidden="true" /><h3>{item.name}</h3><ArrowUpRight size={17} aria-hidden="true" /></div><p>{item.detail}</p></a> })}</div>
      </div>
    </section>

    <section className="section faq-section" id="faq">
      <div className="container faq-layout">
        <div className="section-heading centered-heading faq-intro"><h2>Frequently asked questions</h2><p>Learn how we find developers, plan the work and help your team get started.</p></div>
        <div className="faq-columns">
          {[faqs.slice(0, faqMidpoint), faqs.slice(faqMidpoint)].map((column, columnIndex) => <div className="faq-list" key={columnIndex}>{column.map((item, i) => <details key={item.question}><summary><span className="faq-number">{String(columnIndex * faqMidpoint + i + 1).padStart(2, '0')}</span><span>{item.question}</span><ChevronDown size={19} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>)}
        </div>
      </div>
    </section>

    <section className="section contact-section" id="reach-out">
      <div className="container contact-layout">
        <div className="contact-copy">
          <h2>Book a free consultation</h2>
          <p>Share your IT staff augmentation needs, skills and start date. eThing matches developers to your project and sets out clear roles, costs and next steps.</p>
          <ul className="contact-benefits">
            <li><Check size={20} aria-hidden="true" /><span>Developers matched to project requirements.</span></li>
            <li><Check size={20} aria-hidden="true" /><span>Clear roles, working hours and costs.</span></li>
            <li><Check size={20} aria-hidden="true" /><span>Support with selection, onboarding and team changes.</span></li>
          </ul>
          <a className="contact-email" href={'mailto:' + content.footer.email}><span><Mail size={20} aria-hidden="true" /></span><div><small>Prefer email?</small>{content.footer.email}</div><ArrowUpRight size={19} aria-hidden="true" /></a>
          <p className="response-note">We respond within <strong>24 hours.</strong></p>
        </div>
        <ContactForm intent={intent} onIntentChange={setIntent} specialty={specialty} email={content.footer.email} />
      </div>
    </section>
  </div>
}
