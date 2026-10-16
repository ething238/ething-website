import { Helmet as Head } from 'react-helmet-async';
import '../styles/about-us.css';
import '../styles/website-development.css';
import RelatedServices from '../components/RelatedServices.jsx';
import SiteHeader from '../components/SiteHeader.jsx';
import { useEffect, useRef, useState } from 'react';
import { CopyBackToTop, CopyFooter } from '../components/website-development/Chrome.jsx';
import WebsiteProjectForm from '../components/website-development/WebsiteProjectForm.jsx';
import WebsiteCoverPreview from '../components/website-development/WebsiteCoverPreview.jsx';
import { WebsiteEngagementModels, WebsitePartnerChecklist } from '../components/website-development/WebsiteBuyerGuide.jsx';
import { websiteServices, websiteSearchServices, developmentSteps, websiteFAQs } from '../data/websiteDevelopmentContent.js';
import { brandLogoUrl } from '../data/aboutBrand.js';
import { ServiceArtworkPalette, DiagramIcon, SearchServiceDiagram, WebsiteServiceDiagram, warmServiceImage } from '../components/website-development/WebsiteInfographics.jsx';

const canonical = 'https://www.ethingsolutions.com/website-development';
const organizationId = 'https://www.ethingsolutions.com/#organization';

function Icon({ kind, size = 24 }) {
  const paths = {
    window: <><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h5M7 16h8"/></>,
    bag: <><path d="M5 8h14l2 13H3L5 8Z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/></>,
    code: <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20"/></>,
    edit: <><path d="M12 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7M16 3l5 5-10 10-5 1 1-5L17 3Z"/></>,
    refresh: <><path d="M20 7v5h-5M4 17v-5h5"/><path d="M6 6a8 8 0 0 1 13 2M18 18a8 8 0 0 1-13-2"/></>,
    shield: <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="m8 12 3 3 5-6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    arrow: <path d="M5 19 19 5M5 5h14v14"/>,
    layers: <><path d="m12 3 10 6-10 6L2 9l10-6Z"/><path d="m3 14 9 5 9-5"/><path d="m3 18 9 5 9-5"/></>,
    speed: <><path d="M4 19a9 9 0 1 1 16 0M12 13l5-5"/><circle cx="12" cy="13" r="2"/></>,
    link: <><path d="m10 13 4-4m-5 6-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 2 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0"/></>,
    search: <><circle cx="10.5" cy="10.5" r="7"/><path d="m16 16 5 5"/></>,
    chart: <><path d="M4 3v18h17M8 16v-5m5 5V7m5 9V4"/></>,
    mobile: <><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind] || paths.window}</svg>;
}

function BrowserConcept({ compact = false }) {
  return <div className={`wd-browser ${compact ? 'wd-browser-compact' : ''}`} aria-hidden="true">
    <div className="wd-browser-toolbar"><span/><span/><span/><div>your-business.com</div><Icon kind="shield" size={14}/></div>
    <div className="wd-concept-nav"><b><i/>YOUR BRAND</b><span>About&nbsp;&nbsp; Services&nbsp;&nbsp; Contact</span><i className="wd-concept-menu"/></div>
    <div className="wd-concept-body"><div className="wd-concept-copy"><small>BUILT AROUND YOU</small><strong>Your next<br/>chapter.<br/><em>Online.</em></strong><p>A clearer experience.<br/>A stronger digital presence.</p><span className="wd-concept-cta">Let’s get started ↗</span></div><div className="wd-concept-art"><div className="wd-art-ring"/><div className="wd-art-cube"><Icon kind="layers" size={62}/></div><div className="wd-art-orbit"/><span className="wd-art-dot"/></div></div>
    <div className="wd-concept-bottom"><span>DESIGNED TO CONNECT</span><div><i/><i/><i/></div></div>
  </div>;
}

function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState([0]);
  const explorerRef = useRef(null);
  const select = index => {
    setVisited(previous => previous.includes(index) ? previous : [...previous, index]);
    setActive(index);
  };
  useEffect(() => {
    const connection = navigator.connection;
    if (connection?.saveData || /2g/.test(connection?.effectiveType || '')) return;
    let cancelled = false;
    let scheduled;
    let observer;
    const warm = async () => {
      for (const service of websiteServices.slice(1)) {
        if (cancelled || document.hidden) break;
        await warmServiceImage(service.id);
      }
    };
    const schedule = () => {
      observer?.disconnect();
      scheduled = window.requestIdleCallback ? window.requestIdleCallback(warm, { timeout: 2000 }) : window.setTimeout(warm, 600);
    };
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) schedule(); }, { rootMargin: '300px' });
      if (explorerRef.current) observer.observe(explorerRef.current);
    } else schedule();
    return () => {
      cancelled = true;
      observer?.disconnect();
      if (window.cancelIdleCallback) window.cancelIdleCallback(scheduled);
      else window.clearTimeout(scheduled);
    };
  }, []);
  function keydown(event, index) {
    const next = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? (index + 1) % websiteServices.length : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? (index - 1 + websiteServices.length) % websiteServices.length : event.key === 'Home' ? 0 : event.key === 'End' ? websiteServices.length - 1 : null;
    if (next === null) return;
    event.preventDefault(); select(next); document.getElementById(`wd-service-${next}`)?.focus();
  }
  return <div className="wd-explorer" ref={explorerRef}><div className="wd-service-tabs" role="tablist" aria-label="Website development services" aria-orientation="vertical">{websiteServices.map((item, index) => <button key={item.id} id={`wd-service-${index}`} role="tab" aria-selected={index === active} aria-controls={`wd-panel-${index}`} tabIndex={index === active ? 0 : -1} onKeyDown={event => keydown(event, index)} onPointerEnter={() => warmServiceImage(item.id)} onFocus={() => warmServiceImage(item.id)} onClick={() => select(index)}><Icon kind={item.icon} size={21}/><span>{item.label}</span><span aria-hidden="true">↗</span></button>)}</div>
    {websiteServices.map((item,index) => <div className="wd-service-panel" id={`wd-panel-${index}`} role="tabpanel" aria-labelledby={`wd-service-${index}`} hidden={index !== active} tabIndex={0} key={item.id}><div className="wd-service-content"><h3>{item.title}</h3><p>{item.description}</p><ul>{item.deliverables.map(text => <li key={text}><Icon kind="check" size={18}/>{text}</li>)}</ul><a className="wd-text-link" href="#website-enquiry">{item.cta} <span aria-hidden="true">↗</span></a></div><div className={`wd-service-visual wd-visual-${item.id}`}><WebsiteServiceDiagram service={item.id} load={visited.includes(index)} priority={index === 0}/></div></div>)}
    <noscript><div className="wd-noscript-services">{websiteServices.slice(1).map(item => <article key={item.id}><h3>{item.label}</h3><p>{item.description}</p><ul>{item.deliverables.map(text => <li key={text}>{text}</li>)}</ul></article>)}</div></noscript>
  </div>;
}

export default function WebsiteDevelopment() {
  useEffect(() => {
    const root = document.querySelector('.website-development-page');
    if (!root) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => { root.dataset.wdMotion = preference.matches ? 'reduced' : 'on'; };
    syncPreference();
    preference.addEventListener('change', syncPreference);
    const syncVisibility = () => { root.dataset.wdDocumentVisible = String(!document.hidden); };
    syncVisibility();
    document.addEventListener('visibilitychange', syncVisibility);
    const hero = root.querySelector('.wd-hero');
    let heroObserver;
    if ('IntersectionObserver' in window && hero) {
      heroObserver = new IntersectionObserver(([entry]) => { hero.dataset.wdInview = String(entry.isIntersecting); });
      heroObserver.observe(hero);
    }
    const targets = root.querySelectorAll('.wd-search-grid>article,.wd-engagement-grid>article,.wd-tech-grid>article,.wd-partnership-points>div,.wd-review,.wd-step-number,.wd-service-panel,.wd-service-tabs>button,.wd-faq-list>details,.wd-form-card');
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.target.dataset.wdInview = String(entry.isIntersecting);
          if (entry.isIntersecting) entry.target.dataset.wdRevealed = 'true';
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
      targets.forEach(target => {
        const position = Array.from(target.parentElement.children).indexOf(target);
        target.style.setProperty('--wd-reveal-delay', `${Math.min(position, 4) * 65}ms`);
        observer.observe(target);
      });
    }
    return () => {
      observer?.disconnect();
      heroObserver?.disconnect();
      document.removeEventListener('visibilitychange', syncVisibility);
      preference.removeEventListener('change', syncPreference);
      delete root.dataset.wdMotion;
      delete root.dataset.wdDocumentVisible;
      if (hero) delete hero.dataset.wdInview;
      targets.forEach(target => {
        delete target.dataset.wdInview;
        delete target.dataset.wdRevealed;
        target.style.removeProperty('--wd-reveal-delay');
      });
    };
  }, []);
  const faqMidpoint = Math.ceil(websiteFAQs.length / 2);
  const structuredData = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Organization', '@id': organizationId, name: 'eThing', url: 'https://www.ethingsolutions.com/', logo: brandLogoUrl, telephone: '+91-7011956780', email: 'support@ething.in', address: { '@type': 'PostalAddress', streetAddress: 'Building Number 145, Sector 44 Rd', addressLocality: 'Gurugram', addressRegion: 'Haryana', postalCode: '122003', addressCountry: 'IN' } },
    { '@type': 'Service', '@id': `${canonical}#service`, name: 'Website Development Services', serviceType: 'Website design and development', url: canonical, description: 'Website design, frontend and backend development, ecommerce, CMS, website integrations, Web3 websites, SEO, Google Search Console, Google Analytics, testing, deployment and maintenance.', provider: { '@id': organizationId }, hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Website development services', itemListElement: websiteServices.map(service => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.label, description: service.description } })) } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.ethingsolutions.com/' }, { '@type': 'ListItem', position: 2, name: 'Engineering Services', item: 'https://www.ethingsolutions.com/engineering-services' }, { '@type': 'ListItem', position: 3, name: 'Website Development', item: canonical }] },
    { '@type': 'FAQPage', mainEntity: websiteFAQs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
  ] };
  return <div className="about-us-copy website-development-page">
    <ServiceArtworkPalette/>
    <Head><title>Website Development Company & SEO Services | eThing</title><link rel="icon" type="image/png" href="/website-development/brand/ething-favicon-48.png" key="favicon"/><meta name="description" content="Website development, SEO, Google Search Console and Google Analytics setup. Business websites, ecommerce, redesigns and ongoing support from eThing."/><link rel="canonical" href={canonical}/><meta property="og:type" content="website"/><meta property="og:title" content="Website Development Company & SEO Services | eThing"/><meta property="og:description" content="Website development services with SEO, Google Search Console and Google Analytics setup. Design, development, launch and ongoing support from eThing."/><meta property="og:url" content={canonical}/><meta property="og:image" content="https://www.ethingsolutions.com/website-development/social-preview.png"/><meta name="twitter:card" content="summary_large_image"/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}/></Head>
    <a className="wd-skip-link" href="#website-main">Skip to content</a><SiteHeader activePath="/website-development" contactHref="#website-enquiry"/>
    <main id="website-main">
      <section className="wd-hero"><div className="wd-container"><div className="wd-hero-grid"><div className="wd-hero-copy"><h1>Website development services</h1><p className="wd-hero-intro">eThing is a website development company for business websites, online stores and Web3 websites. We design, build, test and maintain your website. Choose a complete project or add developers to your team.</p><div className="wd-hero-actions"><a className="wd-button wd-button-primary" href="#website-enquiry">Discuss your website <Icon kind="arrow" size={18}/></a></div></div><div className="wd-hero-visual"><div className="wd-visual-grid"/><BrowserConcept/><div className="wd-floating-card wd-floating-design"><span><Icon kind="layers" size={21}/></span><div><strong>Easy to use</strong><small>On every screen</small></div></div><div className="wd-floating-card wd-floating-build"><span><Icon kind="code" size={21}/></span><div><strong>Built for your business</strong><small>The features you need</small></div></div></div></div></div></section>
      <section id="website-services" className="wd-section"><div className="wd-container"><div className="wd-section-heading"><div><h2>Our services</h2></div><p>Our website development services cover business websites, online stores and improvements to existing sites. Explore each service.</p></div><ServiceExplorer/></div></section>
      <section className="wd-quality wd-section" id="website-preview"><div className="wd-container wd-quality-grid"><div><h2>What your website needs</h2><p className="wd-section-intro">Our website development services make your site easy to use, fast and simple to manage.</p><ul className="wd-quality-list">{[{title:'Works on every screen',text:'Pages that adjust to phones, tablets and computers.'},{title:'Ready for search',text:'Clear HTML, page titles and descriptions to support SEO.'},{title:'Connected to your tools',text:'Connect forms, payments and the systems your team uses.'},{title:'Checked before launch',text:'Test features, loading speed, accessibility and security.'}].map(item => <li key={item.title}><span><Icon kind="check" size={18}/></span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ul></div><WebsiteCoverPreview/></div></section>
      <section className="wd-section wd-search-services" id="website-seo">
        <div className="wd-container">
          <div className="wd-section-heading">
            <h2>SEO and website analytics</h2>
            <p>Our website development services include SEO, Google Search Console (GSC) and Google Analytics 4 (GA4). Help people find your website and understand what visitors do once they arrive.</p>
          </div>
          <div className="wd-search-grid">
            {websiteSearchServices.map(service => (
              <article key={service.id}>
                <SearchServiceDiagram service={service.id}/>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>{service.items.map(item => <li key={item}><Icon kind="check" size={17}/>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="wd-section wd-process" id="website-process"><div className="wd-container"><div className="wd-section-heading"><div><h2>How we build your website</h2></div><p>We agree the work, cost and timeline before starting. You review progress at each stage. When you hire a website developer, your team sets the priorities.</p></div><ol className="wd-process-steps">{developmentSteps.map((step,index) => <li key={step.title}><span className="wd-step-number"><DiagramIcon kind={['plan','design','code','launch','support'][index]} size={28}/></span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></div></section>
      <section className="wd-technology wd-section" id="website-expertise"><div className="wd-container"><div className="wd-tech-heading"><h2>Our technical expertise</h2><p>We choose technology that fits your website, budget and systems. Your website developer explains the options.</p></div><div className="wd-tech-grid">{[{n:'01',title:'Frontend',text:'The pages and screens your visitors use.',tags:['React','Next.js','HTML / CSS']},{n:'02',title:'Backend & APIs',text:'The code and connections behind your website.',tags:['Node.js','Python','Web3 integrations']},{n:'03',title:'Content & commerce',text:'Tools to publish content and sell online.',tags:['CMS integration','Product catalogues','Payment workflows']},{n:'04',title:'Cloud & quality',text:'Hosting, testing and reliable website updates.',tags:['Cloud platforms','QA & testing','CI/CD']}].map(item => <article key={item.n}><span className="wd-tech-icon"><DiagramIcon kind={['website','code','data','cloud'][Number(item.n)-1]} size={27}/></span><h3>{item.title}</h3><p>{item.text}</p><div>{item.tags.map(tag=><span key={tag}>{tag}</span>)}</div></article>)}</div></div></section>
      <WebsiteEngagementModels/>
      <section className="wd-section wd-partnership" id="website-partnership"><div className="wd-container wd-partnership-grid"><div><h2>Why work with eThing</h2><p className="wd-section-intro">As your website development company, we explain the plan, share progress and make the handover clear.</p><div className="wd-partnership-points"><div><DiagramIcon kind="plan" size={30}/><h3>Clear costs and plans</h3><p>Know what is included, what it costs and when it will be ready.</p></div><div><DiagramIcon kind="team" size={30}/><h3>The skills you need</h3><p>Work with people who can design, build and test your website.</p></div><div><DiagramIcon kind="support" size={30}/><h3>Help after launch</h3><p>Get the code, access and guides, with support agreed in advance.</p></div></div><a className="wd-text-link" href="https://www.ethingsolutions.com/hire-developers">Need developers for your team? <span aria-hidden="true">↗</span></a></div><aside className="wd-review"><div className="wd-review-brand"><span><img src="/website-development/clutch.png" width="32" height="36" alt=""/>Clutch</span><small>Client feedback</small></div><span className="wd-quote-mark" aria-hidden="true">“</span><blockquote>I was impressed with their delivery, attention to detail, and commitment to success.</blockquote><div className="wd-review-author"><span>Lead Talent Partner</span><p>Anonymous fintech client · Engineering support</p></div><a className="wd-text-link" href="https://clutch.co/profile/ething-solutions#review-490643" target="_blank" rel="noopener noreferrer">Read the project review on Clutch <Icon kind="arrow" size={16}/></a><p className="wd-review-note">Client review dated 25 September 2026. This review relates to engineering support.</p></aside></div></section>
      <WebsitePartnerChecklist/>
      <section className="wd-section wd-faq" id="website-faq">
        <div className="wd-container">
          <div className="wd-section-heading">
            <h2>Frequently Asked Questions</h2>
            <p>Find answers about pricing, timelines, technology and support before you start.</p>
          </div>
          <div className="wd-faq-columns">
            {[websiteFAQs.slice(0, faqMidpoint), websiteFAQs.slice(faqMidpoint)].map((column, columnIndex) => (
              <div className="wd-faq-list" key={columnIndex}>
                {column.map((faq, index) => (
                  <details key={faq.question} style={{ '--wd-faq-row': index + 1 }}>
                    <summary>
                      <span>{String(columnIndex * faqMidpoint + index + 1).padStart(2, '0')}</span>
                      <h3>{faq.question}</h3>
                      <i aria-hidden="true">+</i>
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="wd-enquiry wd-section" id="website-enquiry"><div className="wd-container wd-enquiry-grid"><div className="wd-enquiry-copy"><h2>Discuss your project</h2><p>Tell us your goals. Our website development services cover your pages, features and integrations. We explain the options and next steps.</p><ul><li><Icon kind="check" size={18}/>Tell us your goals and the features you need.</li><li><Icon kind="check" size={18}/>Get a clear plan for the work and costs.</li><li><Icon kind="check" size={18}/>Agree the details before starting.</li></ul><div className="wd-direct-contact"><small>Or contact us directly</small><a href="mailto:support@ething.in">support@ething.in <span aria-hidden="true">↗</span></a><a href="tel:+917011956780">+91 70119 56780</a></div></div><WebsiteProjectForm/></div></section>
      <div id="website-related"><RelatedServices nativeLinks links={[
        { path: '/software_development', label: 'Custom software development' },
        { path: '/hire-developers', label: 'Hire software developers' },
        { path: '/cloud_services', label: 'Cloud engineering and migration' },
      ]}/></div>
    </main><CopyFooter preferLiveLinks activePath="/website-development" contactHref="#website-enquiry" optimizeMedia/><CopyBackToTop/>
  </div>;
}
