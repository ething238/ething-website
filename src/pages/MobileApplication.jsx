import { useEffect, useRef, useState } from 'react';
import { Helmet as Head } from 'react-helmet-async';
import '../styles/about-us.css';
import '../styles/mobile-application.css';
import '../styles/footer-brand.css';
import SiteHeader from '../components/SiteHeader.jsx';
import RelatedServices from '../components/RelatedServices.jsx';
import { CopyBackToTop, CopyFooter } from '../components/website-development/Chrome.jsx';
import MobileProjectForm from '../components/mobile-application/MobileProjectForm.jsx';
import MobileAppConcept from '../components/mobile-application/MobileAppConcept.jsx';
import { mobileServices, mobileConcepts, mobileProcess, mobileFAQs } from '../data/mobileDevelopmentContent.js';
import { brandLogoUrl } from '../data/aboutBrand.js';

const canonical = 'https://www.ethingsolutions.com/mobile_application';

function Icon({ kind, size = 24 }) {
  const paths = {
    apple: <><path d="M16 3c-2 0-3 2-3 4 2 0 4-2 3-4ZM12 8c-3-3-8 0-8 4 0 5 3 9 5 9 1 0 2-1 3-1s2 1 3 1c2 0 4-3 5-5-4-2-4-5-1-7-2-2-4-2-7-1Z"/></>,
    android: <><path d="M5 10h14v9H5zM7 10a5 5 0 0 1 10 0M8 5 6 2m10 3 2-3M2 11v6m20-6v6M8 19v3m8-3v3"/><path d="M9 7h.01M15 7h.01"/></>,
    layers: <><path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 17l10 5 10-5"/></>,
    building: <><rect x="4" y="3" width="16" height="19" rx="2"/><path d="M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2m-6 7v-3h4v3"/></>,
    connect: <><rect x="8" y="8" width="8" height="8" rx="2"/><path d="M12 2v6m0 8v6M2 12h6m8 0h6M4 4l4 4m8 8 4 4M20 4l-4 4M8 16l-4 4"/></>,
    refresh: <><path d="M20 3v6h-6M4 21v-6h6M19 8A8 8 0 0 0 5 6M5 16a8 8 0 0 0 14 2"/></>,
    arrow: <path d="M5 19 19 5M5 5h14v14"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    cloud: <path d="M6 18a5 5 0 0 1-1-10 7 7 0 0 1 13-1 5.5 5.5 0 0 1 0 11H6Z"/>,
    shield: <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="m8 12 3 3 5-6"/></>,
    phone: <><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4"/></>,
    code: <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-16-2 20"/>,
    search: <><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/></>,
    palette: <><path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-4c-1-.5-.8-2 1-2h2a4 4 0 0 0 4-4c0-5-4-8-9-8Z"/><path d="M7 9h.01M10 6h.01M15 7h.01M6 13h.01"/></>,
    rocket: <><path d="M14 4c3-2 7-2 7-2s0 4-2 7l-8 8-5-5 8-8ZM6 12H2l5-6h5m-1 11v5l6-5v-5M4 16l-2 6 6-2"/><circle cx="16.5" cy="6.5" r="1.5"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind] || paths.phone}</svg>;
}

function Phone({ kind = 'operations', small = false }) {
  return <MobileAppConcept kind={kind} small={small}/>;
}

function ConceptPreview({ concept }) {
  const [expanded, setExpanded] = useState(false);
  const previewId = `mobile-preview-${concept.kind}`;
  return <article className="ma-preview-card" data-preview-expanded={expanded}>
    <div id={previewId} className={`ma-concept-stage ma-stage-${concept.kind}`}>
      <span className="ma-concept-type">INTERFACE CONCEPT / {concept.number}</span>
      <Phone kind={concept.kind} small/>
    </div>
    <button className="ma-preview-toggle" type="button" aria-expanded={expanded} aria-controls={previewId} onClick={() => setExpanded(value => !value)}>
      {expanded ? 'Hide full preview' : 'View full preview'}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      <span className="ma-sr-only">: {concept.title}</span>
    </button>
    <div className="ma-concept-copy"><h3>{concept.title}</h3><p>{concept.text}</p><small>{concept.tags}</small></div>
  </article>;
}

function useSectionMotion(rootRef) {
  useEffect(() => {
    if (!rootRef.current || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const targets = rootRef.current.querySelectorAll('.ma-hero-copy, .ma-hero-visual, .ma-hero-foot, .ma-section-head, .ma-services>article, .ma-concept-grid>article, .ma-system-map, .ma-reasons>div, .ma-process-grid>li, .ma-engagement-grid>article, .ma-faq-grid>div:first-child, .ma-faqs details, .ma-enquiry-copy, .ma-form-card, #mobile-related>*, .about-copy-related>.about-copy-container');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.12) entry.target.classList.add('ma-in-view');
        else if (!entry.isIntersecting) entry.target.classList.remove('ma-in-view');
      });
    }, { threshold: [0, 0.12] });
    const syncMotionPreference = () => {
      observer.disconnect();
      targets.forEach(target => {
        target.classList.remove('ma-in-view');
        if (!preference.matches) observer.observe(target);
      });
    };
    syncMotionPreference();
    preference.addEventListener('change', syncMotionPreference);
    return () => { observer.disconnect(); preference.removeEventListener('change', syncMotionPreference); };
  }, [rootRef]);
}

export default function MobileApplication() {
  const rootRef = useRef(null);
  useSectionMotion(rootRef);
  const faqMidpoint = Math.ceil(mobileFAQs.length / 2);
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Organization', '@id': 'https://www.ethingsolutions.com/#organization', name: 'eThing', url: 'https://www.ethingsolutions.com/', logo: brandLogoUrl },
    { '@type': 'Service', '@id': `${canonical}#service`, name: 'Mobile App Development Services', serviceType: 'Mobile application design and development', url: canonical, description: 'iOS, Android, cross-platform and enterprise applications, API integrations, testing and ongoing enhancements.', provider: { '@id': 'https://www.ethingsolutions.com/#organization' }, hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Mobile engineering services', itemListElement: mobileServices.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.text } })) } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.ethingsolutions.com/' }, { '@type': 'ListItem', position: 2, name: 'Engineering Services', item: 'https://www.ethingsolutions.com/engineering-services' }, { '@type': 'ListItem', position: 3, name: 'Mobile Application', item: canonical }] },
    { '@type': 'FAQPage', mainEntity: mobileFAQs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) },
  ] };
  return <div ref={rootRef} className="about-us-copy mobile-application-page">
    <Head><title>Mobile App Development Company | iOS & Android | eThing</title><meta name="description" content="Mobile app development services for iOS, Android and business applications. Plan, design, build and connect your app with eThing. Discuss your project."/><link rel="canonical" href={canonical}/><meta property="og:type" content="website"/><meta property="og:title" content="Mobile App Development Company | eThing"/><meta property="og:description" content="Build your app. Connect your systems. Plan your next mobile product with eThing."/><meta property="og:url" content={canonical}/><meta property="og:image" content="https://www.ethingsolutions.com/mobile-development/social-preview.jpg"/><meta name="twitter:card" content="summary_large_image"/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/></Head>
    <a className="ma-skip" href="#mobile-main">Skip to content</a><SiteHeader activePath="/mobile_application" contactHref="#mobile-enquiry"/>
    <main id="mobile-main">
      <section className="ma-hero"><div className="ma-container ma-hero-grid"><div className="ma-hero-copy"><h1>Mobile app development.<br/><em>Built around<br/>your business.</em></h1><p className="ma-hero-intro">Build your app. Connect your systems. eThing is a mobile app development company helping businesses plan, design and build useful applications for iOS and Android.</p><div className="ma-actions"><a className="ma-button" href="#mobile-enquiry">Discuss your app idea <Icon kind="arrow" size={18}/></a></div></div><div className="ma-hero-visual" role="img" aria-label="Original illustrative mobile interfaces for customer bookings, business reporting and commerce"><div className="ma-orbit ma-orbit-one"/><div className="ma-orbit ma-orbit-two"/><div className="ma-hero-phones"><Phone kind="booking"/><Phone/><Phone kind="commerce"/></div><div className="ma-floating ma-floating-api"><Icon kind="connect" size={20}/><span>Connected to<br/><b>your business</b></span></div><div className="ma-floating ma-floating-ready"><i/>iOS & Android</div></div></div><div className="ma-container ma-hero-foot"><span>ONE CONNECTED APPROACH</span><div><span>Product planning</span><i>→</i><span>UI/UX design</span><i>→</i><span>Engineering</span><i>→</i><span>Release & support</span></div></div></section>

      <section className="ma-section" id="mobile-services"><div className="ma-container"><div className="ma-section-head"><h2>Mobile app development services</h2><p>Start mobile app development with your business needs. Combine platforms, features and connected systems into a reviewable plan.</p></div><div className="ma-services">{mobileServices.map((s,i) => <article key={s.title}><div className="ma-service-top"><span className="ma-icon"><Icon kind={s.icon}/></span><h3>{s.title}</h3><span className="ma-card-index">0{i+1}</span></div><p>{s.text}</p><ul>{s.items.map(t => <li key={t}><Icon kind="check" size={15}/>{t}</li>)}</ul></article>)}</div></div></section>

      <section className="ma-section ma-concepts" id="mobile-solutions"><div className="ma-container"><div className="ma-section-head"><h2>What can we help you build?</h2><p>Explore the kinds of products our app developers can help shape. These original concepts show possible use cases, rather than completed client projects.</p></div><div className="ma-concept-grid">{mobileConcepts.map(c => <ConceptPreview key={c.kind} concept={c}/>)}</div></div></section>

      <section className="ma-section ma-connected"><div className="ma-container"><div className="ma-section-head"><h2>More than a screen. Part of your business.</h2><p>Our mobile app developers look beyond the interface. We consider the systems, people and processes your application needs to work with.</p></div><div className="ma-connected-grid"><div className="ma-system-map" role="img" aria-label="A mobile application connects to web dashboards, cloud services, APIs and databases"><div className="ma-map-lines"/><div className="ma-map-center"><Icon kind="phone" size={45}/><strong>Your application</strong></div>{[['web','code','Web dashboard'],['cloud','cloud','Cloud services'],['api','connect','Backend & APIs'],['data','shield','Data & access']].map(([id,icon,label]) => <div key={id} className={`ma-map-node ma-node-${id}`}><Icon kind={icon} size={25}/><span>{label}</span></div>)}<span className="ma-map-caption">A product that works with your ecosystem.</span></div><div className="ma-connected-copy"><div className="ma-reasons">{[{title:'Business goals before features',text:'Define what users need to accomplish and which outcomes matter before deciding what to build.'},{title:'Engineering that connects',text:'Plan the relationship between your application, website, backend and cloud environment.'},{title:'Visibility at every stage',text:'Agree scope, review working features and keep ownership, dependencies and decisions clear.'},{title:'A plan beyond launch',text:'Clarify documentation, handover, maintenance and future enhancements before the first release.'}].map(r => <div key={r.title}><Icon kind="check" size={19}/><div><h3>{r.title}</h3><p>{r.text}</p></div></div>)}</div></div></div></div></section>

      <section className="ma-section ma-process" id="mobile-process"><div className="ma-container"><div className="ma-section-head"><h2>From first discussion to app launch</h2><p>A clear engineering process with practical deliverables. Review progress and give feedback at agreed milestones. Approve changes before they affect delivery plans. Each review covers completed work, questions, dependencies and decisions needed before the next stage.</p></div><ol className="ma-process-grid">{mobileProcess.map((s,i) => <li key={s.title}><span className="ma-step" aria-hidden="true">{String(i+1).padStart(2, '0')}</span><div className="ma-process-card-head"><span className="ma-process-emblem"><Icon kind={['search','palette','layers','code','shield','rocket'][i]} size={25}/></span><h3>{s.title}</h3></div><p>{s.text}</p><div className="ma-output"><span>DELIVERABLE</span>{s.output}</div><svg className="ma-process-arrow" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12h18m-7-7 7 7-7 7"/></svg></li>)}</ol></div></section>

      <section className="ma-section ma-engagement" id="mobile-team"><div className="ma-container"><div className="ma-section-head"><h2>Work with us your way</h2><p>Whether you need a complete product or support for your existing team, start with the responsibilities and skills your project needs.</p></div><div className="ma-engagement-grid"><article><span className="ma-icon"><Icon kind="layers"/></span><h3>Build a mobile application</h3><p>Work with a mobile application development company across planning, interface design, engineering, testing and release preparation. Agree a defined scope and review milestones with your product stakeholders.</p><a className="ma-text-link" href="#mobile-enquiry">Discuss your app idea <Icon kind="arrow" size={17}/></a></article><article><span className="ma-icon"><Icon kind="code"/></span><h3>Hire mobile developer support</h3><p>Extend your in-house team with engineering support for agreed tasks. Discuss the experience, collaboration hours and delivery responsibilities you need; we confirm the appropriate specialist availability before engagement.</p><a className="ma-text-link" href="#mobile-enquiry">Discuss your team requirements <Icon kind="arrow" size={17}/></a></article></div></div></section>

      <section className="ma-section ma-faq-section" id="mobile-faq"><div className="ma-container ma-faq-grid"><div><h2>Frequently Asked Questions</h2><p>Practical answers about app development, technology choices and working with eThing.</p></div><div className="ma-faq-columns">{[mobileFAQs.slice(0, faqMidpoint), mobileFAQs.slice(faqMidpoint)].map((column, columnIndex) => <div className="ma-faqs" key={columnIndex}>{column.map((f,index) => <details key={f.question} style={{ '--ma-faq-row': index + 1 }}><summary><span className="ma-faq-number" aria-hidden="true">{String(columnIndex * faqMidpoint + index + 1).padStart(2, '0')}</span><h3>{f.question}</h3><i aria-hidden="true">+</i></summary><div><p>{f.answer}</p></div></details>)}</div>)}</div></div></section>

      <section className="ma-section ma-enquiry" id="mobile-enquiry"><div className="ma-container ma-enquiry-grid"><div className="ma-enquiry-copy"><h2>Discuss your project</h2><p>Our mobile app development services cover your application, features and integrations. We will explain the options and agree the next steps.</p><ul className="ma-enquiry-points"><li><Icon kind="check" size={18}/>Tell us your goals and the features you need.</li><li><Icon kind="check" size={18}/>Get a clear plan for the work and costs.</li><li><Icon kind="check" size={18}/>Agree the details before starting.</li></ul><div className="ma-direct-contact"><small>Or contact us directly</small><a className="ma-contact-email" href="mailto:support@ething.in">support@ething.in <Icon kind="arrow" size={17}/></a></div></div><MobileProjectForm/></div></section>
      <div id="mobile-related"><RelatedServices nativeLinks links={[
        { path: '/software_development', label: 'Custom software development' },
        { path: '/hire-developers', label: 'Hire software developers' },
        { path: '/cloud_services', label: 'Cloud engineering and migration' },
      ]}/></div>
    </main><CopyFooter activePath="/mobile_application" contactHref="#mobile-enquiry" preferLiveLinks optimizeMedia/><CopyBackToTop/>
  </div>;
}
