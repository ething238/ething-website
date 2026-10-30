import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SiteHeader from '../components/SiteHeader.jsx';
import RelatedServices from '../components/NativeRelatedServices.jsx';
import { CopyFooter, CopyBackToTop } from '../components/website-development/Chrome.jsx';
import { LeadForm, event } from '../components/AiHiringLeadForm.jsx';
import { aiExpertise, aiApplications, aiReasons, aiProcess, aiEngagements, aiProfiles, aiFaqs } from '../data/aiHiringContent.js';
import useAiHiringMotion from '../lib/useAiHiringMotion.js';
import '../styles/ai-hiring.css';
import '../styles/ai-hiring-shared-type.css';
import '../styles/ai-hiring-readability.css';
import '../styles/ai-hiring-motion.css';

const canonical = 'https://www.ethingsolutions.com/hire-ai-developers';
const bookingUrl = 'https://calendly.com/anuj-ething/30min';
const page = {
  route: '/hire-ai-developers', category: 'ai', defaultNeed: 'AI / ML Engineer',
  cta: 'Get AI Developer Profiles', formTitle: 'Find Vetted AI Engineers',
  formCopy: 'Tell us what you’re building. We’ll match you with relevant AI engineering profiles.',
  hiringNeeds: ['AI / ML Engineer', 'Generative AI / LLM Engineer', 'NLP Engineer', 'Computer Vision Engineer', 'Data Engineer', 'MLOps Engineer', 'Dedicated AI Team', 'Other'],
};

function Icon({ kind = 'spark' }) {
  const paths = {
    spark: <><path d="m12 3 2.7 6.3L21 12l-6.3 2.7L12 21l-2.7-6.3L3 12l6.3-2.7L12 3Z"/></>,
    nodes: <><circle cx="12" cy="12" r="3"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="20" r="2"/><path d="m6 6 4 4m4 4 4 4m-4-8 4-4M6 18l4-4"/></>,
    message: <><path d="M21 11a9 9 0 0 1-9 9H3v-9a9 9 0 0 1 18 0Z"/><path d="M7 9h10M7 13h7"/></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/></>,
    cloud: <><path d="M6 18a5 5 0 0 1-1-10 7 7 0 0 1 13-1 5.5 5.5 0 0 1 0 11h-2M12 22V12m-4 4 4-4 4 4"/></>,
  };
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind]}</svg>;
}

function SectionTitle({ title, body, id }) {
  return <div className="ai-section-title"><h2 id={id}>{title}</h2>{body && <p>{body}</p>}</div>;
}

function SupportExample() {
  const [tab, setTab] = useState(0);
  const tabs = useRef([]);
  const labels = ['Ask a question', 'See the source', 'Use it at work'];
  function onKeyDown(e, index) {
    const next = e.key === 'ArrowRight' ? (index + 1) % 3 : e.key === 'ArrowLeft' ? (index + 2) % 3 : e.key === 'Home' ? 0 : e.key === 'End' ? 2 : null;
    if (next === null) return;
    e.preventDefault(); setTab(next); tabs.current[next]?.focus();
  }
  return <div className="ai-example-product">
    <div className="ai-example-top"><span className="ai-icon"><Icon/></span><strong>Customer support assistant</strong><span className="ai-example-label">Example</span></div>
    <div className="ai-example-tabs" role="tablist" aria-label="Explore the example support assistant">{labels.map((label, i) => <button type="button" key={label} ref={el => { tabs.current[i] = el; }} id={`ai-example-tab-${i}`} role="tab" aria-selected={tab === i} aria-controls={`ai-example-panel-${i}`} tabIndex={tab === i ? 0 : -1} onClick={() => { setTab(i); event('ai_example_tab_click', { landing_page: page.route, tab: label }); }} onKeyDown={e => onKeyDown(e, i)}>{label}</button>)}</div>
    {labels.map((label, i) => <div className="ai-example-panel" key={label} role="tabpanel" id={`ai-example-panel-${i}`} aria-labelledby={`ai-example-tab-${i}`} hidden={tab !== i} tabIndex={0}>
      {i === 0 && <><div className="ai-example-question"><Icon kind="message"/><p>How can a customer reset their password?</p></div><div className="ai-example-answer"><span className="ai-answer-spark">✳</span><div><p className="ai-card-title">Use the password reset guide.</p><p>Ask the customer to choose “Forgot password” on the sign-in page. They can use the email link to set a new password. If they cannot access their email, contact the support team.</p><div className="ai-source-tags"><span>Password reset guide</span><span>Support contact details</span></div></div></div></>}
      {i === 1 && <><p className="ai-card-title">Make the answer reviewable.</p><ul className="ai-example-list"><li><b>01</b><div><strong>Use company documents</strong><p>Staff can open the selected source guide and check the original instructions.</p></div></li><li><b>02</b><div><strong>Respect access permissions</strong><p>People see information they are allowed to access in the underlying system.</p></div></li><li><b>03</b><div><strong>Ask a person when needed</strong><p>Questions that the documents cannot answer are routed to the appropriate team.</p></div></li></ul></>}
      {i === 2 && <><p className="ai-card-title">Build around the way people work.</p><ul className="ai-work-checks">{['Ask questions in everyday language', 'Open the document behind an answer', 'Send unresolved questions to a person', 'Keep company guides up to date'].map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></>}
    </div>)}

  </div>;
}

export default function HireAiDevelopers({ staticChrome = false } = {}) {
  const rootRef = useRef(null);
  useAiHiringMotion(rootRef);
  function scrollToLead(location) {
    event('landing_cta_click', { landing_page: page.route, page_category: 'ai', cta_location: location });
    document.getElementById('lead-form')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }
  function bookCall(location) {
    event('book_consultation_click', { landing_page: page.route, page_category: 'ai', cta: 'calendly', cta_location: location });
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  }
  useEffect(() => {
    const marks = new Set();
    const onScroll = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maximum > 0 ? window.scrollY / maximum * 100 : 100;
      [25, 50, 75, 100].forEach(mark => { if (progress >= mark && !marks.has(mark)) { marks.add(mark); event('landing_scroll_depth', { landing_page: page.route, page_category: 'ai', percent: mark }); } });
    };
    event('landing_page_view', { landing_page: page.route, page_category: 'ai' });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': canonical, url: canonical, name: 'Hire AI Developers in India | eThing', description: 'Hire AI developers and engineers for generative AI, ML, NLP, computer vision, data and MLOps. Explore expertise, flexible engagements and relevant profiles.', breadcrumb: { '@id': `${canonical}#breadcrumb` } },
    { '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.ethingsolutions.com/' }, { '@type': 'ListItem', position: 2, name: 'Hire AI Developers', item: canonical }] },
    { '@type': 'Service', name: 'AI engineering talent', serviceType: 'AI engineering staffing', provider: { '@type': 'Organization', name: 'eThing', url: 'https://www.ethingsolutions.com/' }, url: canonical },
    { '@type': 'FAQPage', mainEntity: aiFaqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ] };
  return <div className="ai-hiring-shell" ref={rootRef}>
    <Helmet><title>Hire AI Developers in India | eThing</title><meta name="description" content="Hire AI developers and engineers for generative AI, ML, NLP, computer vision, data and MLOps. Explore expertise, flexible engagements and relevant profiles."/><link rel="canonical" href={canonical}/><link rel="preload" as="image" href="/ai-hiring-assets/ai-hero-f183a8ed6806.webp" fetchPriority="high"/><meta property="og:type" content="website"/><meta property="og:title" content="Hire AI Developers in India | eThing"/><meta property="og:description" content="Find AI engineers matched to your product, data and workflow."/><meta property="og:url" content={canonical}/><meta property="og:image" content="https://www.ethingsolutions.com/ai-hero-network-background.jpg"/><meta name="twitter:card" content="summary_large_image"/></Helmet>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/>
    <SiteHeader activePath="/hire-ai-developers" contactHref="#lead-form" optimizeMedia staticMarkup={staticChrome}/>
    <div className="paid-page ai campaign-one-developers campaign-one-ai ai-hiring-page">
    <main id="main-content">
      <section className="ai-hero" aria-labelledby="ai-hero-title"><div className="ai-hero-atmosphere" aria-hidden="true"/><div className="ai-container ai-hero-grid"><div className="ai-hero-copy"><h1 id="ai-hero-title">Hire AI Developers in India</h1><p className="ai-lede">Tell us the model, data, platform and product outcome you need. We’ll help you hire AI developers who fit the work your team needs next.</p><div className="ai-hero-rating"><span className="ai-rating-stars" aria-hidden="true">★★★★★</span><strong aria-label="Rated 4.8 out of 5">4.8/5</strong><span>Based on 25+ reviews</span></div><ul className="ai-hero-trust"><li><span aria-hidden="true">◈</span>NDA protected</li><li><span aria-hidden="true">◷</span>Global timezone overlap</li><li><span aria-hidden="true">↗</span>Flexible engagement</li></ul><button type="button" className="ai-button ai-button-call" onClick={() => bookCall('hero')}>Book a 30-minute call <span aria-hidden="true">↗</span></button></div><div id="lead-form" className="ai-lead-card"><LeadForm page={page} campaignForm/></div></div></section>

      <section className="ai-client-strip" aria-label="Companies we have worked with"><div className="ai-container ai-client-row"><h2>Companies we have worked with</h2><ul>{[['AIONOS', '/ai-staff/optimized/aionos.webp'], ['SalisPay', '/about-us/clients/salispay.svg'], ['Credopay', '/about-us/clients/credopay.svg']].map(([name, src]) => <li key={name}><img src={src} alt={name} width="160" height="58" loading="lazy"/></li>)}</ul></div></section>
      <div className="ai-container ai-proof-row" aria-label="Hiring at a glance"><p><strong>48-hour shortlist target</strong><span>After requirements are understood, subject to availability.</span></p><p><strong>Interview first</strong><span>Assess technical fit before choosing an engineer.</span></p><p><strong>One specialist or a team</strong><span>Shape the engagement around your roadmap.</span></p></div>

      <section className="ai-section" id="expertise" aria-labelledby="ai-expertise-title"><div className="ai-container"><SectionTitle id="ai-expertise-title" title="Skills our AI engineers bring" body="From the first data pipeline to production deployment, bring the right engineering expertise into your team."/><div className="ai-expertise-grid">{aiExpertise.map(skill => <article className="ai-expertise-card" key={skill.title}><div className="ai-card-heading"><span className="ai-icon"><Icon kind={skill.icon}/></span><p className="ai-card-title">{skill.title}</p></div><p>{skill.body}</p><ul className="ai-tags" aria-label={`${skill.title} technologies`}>{skill.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></article>)}</div></div></section>

      <section className="ai-section ai-applications" id="applications" aria-labelledby="ai-applications-title"><div className="ai-container"><SectionTitle id="ai-applications-title" title="What your AI team can build" body="Start with the problem your users need solved. Match the engineering skills to your data, industry and operating environment."/><div className="ai-application-grid">{aiApplications.map(item => <article key={item.title}><div className="ai-application-heading"><span className="ai-app-icon"><Icon kind={item.icon}/></span><p className="ai-card-title">{item.title}</p></div><p className="ai-sector">{item.sector}</p><p>{item.body}</p></article>)}</div><button className="ai-text-button" type="button" onClick={() => scrollToLead('applications')}>Discuss your AI use case <span aria-hidden="true">↗</span></button></div></section>

      <section className="ai-section ai-example" id="example" aria-labelledby="ai-example-title"><div className="ai-container"><SectionTitle id="ai-example-title" title="Help support teams find the right answers." body="See how AI devs could connect company guides to the questions people ask at work."/><div className="ai-example-grid"><div><div className="ai-example-story"><div><span>01 / The problem</span><p>Support agents search through separate documents to answer a customer’s question.</p></div><div><span>02 / The approach</span><p>Bring selected guides into an assistant that retrieves relevant information and shows its source.</p></div><div><span>03 / The intended outcome</span><p>Put the answer and the supporting guide in one place, with a clear route to a person when needed.</p></div></div></div><SupportExample/></div></div></section>

      <section className="ai-section ai-why" id="why-ething" aria-labelledby="ai-why-title"><div className="ai-container"><SectionTitle id="ai-why-title" title="Engineers who work as part of your team." body="Technical fit matters. So do the way people collaborate, the ownership you retain and the support around the engagement."/><div className="ai-why-grid"><figure><img src="/ai-staff/optimized/collaboration-920.webp" srcSet="/ai-staff/optimized/collaboration-600.webp 600w, /ai-staff/optimized/collaboration-920.webp 920w, /ai-staff/optimized/collaboration-1448.webp 1448w" sizes="(max-width: 850px) 100vw, 40vw" alt="Illustration of engineering professionals collaborating around a laptop" width="1448" height="1086" loading="lazy"/></figure><div className="ai-reasons">{aiReasons.map(([title, body], i) => <article key={title}><span className="ai-reason-number">0{i + 1}</span><div><p className="ai-card-title">{title}</p><p>{body}</p></div></article>)}</div></div></div></section>

      <section className="ai-section ai-process-section" id="hiring-process" aria-labelledby="ai-process-title"><div className="ai-container"><SectionTitle id="ai-process-title" title="A clear path from requirement to teammate." body="Make room for technical fit, shared expectations and a considered start."/><ol className="ai-process-grid">{aiProcess.map(([title, body], i) => <li key={title}><span>0{i + 1}</span><p className="ai-card-title">{title}</p><p>{body}</p></li>)}</ol></div></section>

      <section className="ai-section ai-engagement-section" id="engagement-options" aria-labelledby="ai-engagement-title"><div className="ai-container"><SectionTitle id="ai-engagement-title" title="Choose how we work together" body="Match the team structure to the work ahead."/><div className="ai-engagement-grid">{aiEngagements.map(model => <article key={model.title}><p className="ai-card-title">{model.title}</p><p>{model.body}</p><button type="button" onClick={() => scrollToLead(`engagement-${model.title}`)}>Discuss this option <span aria-hidden="true">↗</span></button></article>)}</div></div></section>

      <section className="ai-section ai-profiles" aria-labelledby="ai-profiles-title"><div className="ai-container"><SectionTitle id="ai-profiles-title" title="Examples of AI talent we can help you find." body="We shape the shortlist around your requirements. These profiles illustrate the types of expertise you can discuss."/><div className="ai-profile-grid">{aiProfiles.map(([title, detail]) => <article key={title}><span className="ai-profile-label">Example profile</span><p className="ai-card-title">{title}</p><p>{detail}</p></article>)}</div></div></section>

      <section className="ai-section ai-faq" id="faqs" aria-labelledby="ai-faq-title"><div className="ai-container ai-faq-grid"><SectionTitle id="ai-faq-title" title="Plan your next AI hire with confidence." body="The process, engagement and ownership details to discuss before you start."/><div className="ai-faq-list">{aiFaqs.map(([question, answer], i) => <details key={question} onToggle={e => { if (e.currentTarget.open) event('faq_open', { landing_page: page.route, page_category: 'ai', question }); }}><summary><span className="ai-faq-number">{String(i + 1).padStart(2, '0')}</span><span>{question}</span><span className="ai-faq-toggle" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="ai-final" aria-labelledby="ai-final-title"><div className="ai-container"><h2 id="ai-final-title">Tell us what you want to build.<br/>We’ll help you find the AI talent.</h2><p>Bring your roadmap, your requirements or your next engineering challenge.</p><div className="ai-final-actions"><button type="button" className="ai-button" onClick={() => scrollToLead('final-get-profiles')}>Get AI Developer Profiles <span aria-hidden="true">↗</span></button><button type="button" className="ai-button ai-button-outline" onClick={() => bookCall('final')}>Book a 30-minute call</button></div></div></section>
      <RelatedServices pathname="/hire-ai-developers" nativeLinks/>
    </main>
    </div>
    <div className="about-us-copy ai-site-footer"><CopyFooter activePath="/hire-ai-developers" optimizeMedia/></div>{staticChrome ? <button className="about-copy-scroll-top" type="button" aria-label="Back to top" hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 12 6-6 6 6M12 6v12"/></svg></button> : <CopyBackToTop/>}
    <div className="ai-mobile-cta"><button type="button" onClick={() => scrollToLead('mobile-get-profiles')}>Get AI profiles</button><button type="button" onClick={() => bookCall('mobile')}>Book a call <span aria-hidden="true">↗</span></button></div>
  </div>;
}
