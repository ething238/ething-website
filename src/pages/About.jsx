import { Helmet as Head } from 'react-helmet-async';
import '../styles/about-us.css';
import { useEffect, useRef, useState } from 'react';
import originalCopy from '../data/aboutUsCopy.json';
import seo from '../data/aboutUsSeoContent.js';
import AboutUsEnquiryForm from '../components/AboutUsEnquiryForm.jsx';
import BrandLogo from '../components/AboutBrandLogo.jsx';
import { brandLogo } from '../data/aboutBrand.js';

const copy = {
  ...originalCopy, title: seo.title, description: seo.description, siteName: 'eThing',
  about: { ...originalCopy.about, heroTitle: seo.heroTitle, heroParagraphs: seo.heroParagraphs, mission: { ...originalCopy.about.mission, body: originalCopy.about.mission.body.replace('cutting edge', 'cutting-edge') } },
  brand: { ...originalCopy.brand, name: 'eThing', logoSrc: brandLogo.src, logoAlt: brandLogo.alt },
  cta: { label: 'Contact us', path: '#about-enquiry' },
  footer: { ...originalCopy.footer, aboutTitle: 'eThing', aboutBody: 'eThing provides software and AI engineering talent for staff augmentation, along with consulting and delivery support, so enterprises can scale their teams with credible, experienced practitioners.', copyright: `© ${new Date().getFullYear()} eThing` },
};

// Keep the copied page editable here. Its original wording is in the JSON file.
const siteUrl = 'https://www.ethingsolutions.com';
const localRoutes = new Set([
  '/about_us', '/healthcare_industry', '/other-services', '/staff-augmentation', '/hire-developers',
  '/hire-ai-developers', '/hire-python-developers', '/hire-full-stack-developers',
  '/hire-react-developers', '/hire-devops-engineers', '/hire-top-talent',
]);

function destination(path) {
  if (!path || !path.startsWith('/')) return path;
  return localRoutes.has(path.replace(/\/$/, '')) ? path : `${siteUrl}${path}`;
}

function Icon({ kind, className }) {
  const paths = {
    chevron: <path d="m6 9 6 6 6-6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    arrow: <path d="m6 12 6-6 6 6M12 6v12" />,
    check: <path d="m6 12 4 4 8-8" />,
    map: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2.2Z" />,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>,
  };
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind]}</svg>;
}

function Logo() {
  return <BrandLogo href={`${siteUrl}/`} className="about-copy-logo brand-logo" />;
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);
  useEffect(() => {
    const closeDropdowns = (event) => {
      if (event.type === 'keydown' && event.key !== 'Escape') return;
      headerRef.current?.querySelectorAll('details[open]').forEach((detail) => {
        if (event.type === 'keydown' || !detail.contains(event.target)) detail.open = false;
      });
      if (event.type === 'keydown') setMobileOpen(false);
    };
    document.addEventListener('click', closeDropdowns);
    document.addEventListener('keydown', closeDropdowns);
    return () => {
      document.removeEventListener('click', closeDropdowns);
      document.removeEventListener('keydown', closeDropdowns);
    };
  }, []);
  return <header className="about-copy-header" ref={headerRef}>
    <div className="about-copy-header-inner">
      <div className="about-copy-header-brand"><Logo /></div>
      <nav className="about-copy-nav" aria-label="Main navigation">
        {copy.navigation.map((item) => item.children?.length ? (
          <details className="about-copy-nav-dropdown" key={item.id}>
            <summary className="about-copy-nav-link">{item.label}<Icon kind="chevron" /></summary>
            <div className="about-copy-dropdown-menu">
              {item.children.map((child) => <a key={child.path} href={destination(child.path)}>{child.label}</a>)}
            </div>
          </details>
        ) : <a className="about-copy-nav-link" href={destination(item.path)} aria-current={item.path === '/about_us' ? 'page' : undefined} key={item.id}>{item.label}</a>)}
      </nav>
      <a href={destination(copy.cta.path)} className="about-copy-contact-button">{copy.cta.label}</a>
      <button className="about-copy-mobile-toggle" type="button" aria-label="Toggle menu" aria-expanded={mobileOpen} aria-controls="about-copy-mobile-nav" onClick={() => setMobileOpen(!mobileOpen)}><Icon kind={mobileOpen ? 'close' : 'menu'} /></button>
    </div>
    {mobileOpen && <nav id="about-copy-mobile-nav" className="about-copy-mobile-nav" aria-label="Mobile navigation">
      {copy.navigation.map((item) => <div key={item.id}>
        {item.path ? <a href={destination(item.path)} onClick={() => setMobileOpen(false)}>{item.label}</a> : <span>{item.label}</span>}
        {item.children?.map((child) => <a key={child.path} href={destination(child.path)} onClick={() => setMobileOpen(false)}>{child.label}</a>)}
      </div>)}
      <a href={destination(copy.cta.path)} className="about-copy-contact-button">{copy.cta.label}</a>
    </nav>}
  </header>;
}

function LinkedInGlyph() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
}

function Footer() {
  const footer = copy.footer;
  return <footer className="about-copy-footer">
    <div className="about-copy-container">
      <div className="about-copy-footer-grid">
        <div className="about-copy-footer-brand"><Logo /><p className="about-copy-footer-about">{footer.aboutBody}</p></div>
        {[{ title: footer.quickLinksTitle, links: footer.quickLinks }, { title: footer.industriesTitle, links: footer.industries }].map((group) => <div key={group.title}>
          <h3 className="about-copy-footer-title">{group.title}</h3>
          <ul className="about-copy-footer-links">{group.links.map((link) => <li key={link.path}><a href={destination(link.path)}><span><Icon kind="check" /></span>{link.label}</a></li>)}</ul>
        </div>)}
        <div>
          <h3 className="about-copy-footer-title">{footer.contactTitle}</h3>
          <ul className="about-copy-footer-contact">
            <li><Icon kind="map" /><span>{footer.address.line1}<br />{footer.address.line2}</span></li>
            <li><div>{footer.phones.map((phone) => <div key={phone.value}><Icon kind="phone" /><span>{phone.label}: {phone.value}</span></div>)}</div></li>
            <li><Icon kind="mail" /><a href={`mailto:${footer.email}`}>{footer.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="about-copy-footer-bottom"><p>{footer.copyright}</p><a href={destination(copy.cta.path)}>{copy.cta.label} →</a></div>
    </div>
  </footer>;
}

export default function AboutUsCopy() {
  const p = copy.about;
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: 'eThing', publisher: { '@id': `${siteUrl}/#organization` } },
      { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'eThing', url: `${siteUrl}/`, logo: `${siteUrl}${copy.brand.logoSrc}`, email: copy.footer.email, telephone: '+91-7011956780', address: { '@type': 'PostalAddress', streetAddress: 'Building Number 145, Sector 44 Rd', addressLocality: 'Gurugram', addressRegion: 'Haryana', postalCode: '122003', addressCountry: 'IN' }, founder: { '@id': `${copy.sourceUrl}#anuj-gupta` }, sameAs: ['https://clutch.co/profile/ething-solutions', seo.reviews[1].url] },
      { '@type': 'Person', '@id': `${copy.sourceUrl}#anuj-gupta`, name: 'Anuj Gupta', jobTitle: 'Founder and CEO', image: `${siteUrl}${seo.founder.image.src}`, sameAs: [p.leaders[0].linkedInUrl], worksFor: { '@id': `${siteUrl}/#organization` } },
      { '@type': 'AboutPage', '@id': `${copy.sourceUrl}#webpage`, url: copy.sourceUrl, name: copy.title, description: copy.description, inLanguage: 'en', mainEntity: { '@id': `${siteUrl}/#organization` }, isPartOf: { '@id': `${siteUrl}/#website` }, breadcrumb: { '@id': `${copy.sourceUrl}#breadcrumb` } },
      { '@type': 'BreadcrumbList', '@id': `${copy.sourceUrl}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: p.heroTitle, item: copy.sourceUrl }] },
    ],
  };
  return <>
    <Head>
      <title>{copy.title}</title>
      <meta name="description" content={copy.description} />
      <link rel="canonical" href={copy.sourceUrl} />
      <link rel="icon" type="image/png" href={brandLogo.src} key="favicon" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <style key="about-copy-fonts">{"@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');"}</style>
      <meta property="og:type" content="website" /><meta property="og:title" content={copy.title} /><meta property="og:description" content={copy.description} /><meta property="og:url" content={copy.sourceUrl} /><meta property="og:image" content={`${siteUrl}${copy.brand.logoSrc}`} /><meta property="og:site_name" content={copy.siteName} />
      <meta name="twitter:card" content="summary" /><meta name="twitter:title" content={copy.title} /><meta name="twitter:description" content={copy.description} /><meta name="twitter:image" content={`${siteUrl}${copy.brand.logoSrc}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    </Head>
    <div className="about-us-copy">
      <Header />
      <main className="about-copy-main">
        <nav aria-label="Breadcrumb" className="about-copy-breadcrumb about-copy-container"><ol><li><a href={`${siteUrl}/`}>Home</a></li><li aria-hidden="true">/</li><li aria-current="page">About us</li></ol></nav>
        <div className="about-copy-grid-bg">
          <section className="about-copy-hero about-copy-container">
            <div className="about-copy-hero-grid">
              <div><h1 className="about-copy-title">{p.heroTitle}</h1><div className="about-copy-hero-copy">{p.heroParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>
              <div className="about-copy-hero-art"><div className="about-copy-hero-decor-violet" aria-hidden="true" /><div className="about-copy-hero-decor-blue" aria-hidden="true" /><img className="about-copy-hero-image" src={p.heroImage.src} alt={p.heroImage.alt} width="640" height="800" /></div>
            </div>
          </section>
          <section className="about-copy-vision"><div className="about-copy-container about-copy-vision-grid">
            <div className="about-copy-vision-copy"><div><p className="about-copy-section-kicker">{p.vision.eyebrow}</p><p className="about-copy-vision-statement">{p.vision.body}</p></div><hr /><div><p className="about-copy-section-kicker">{p.mission.eyebrow}</p><p className="about-copy-mission-statement">{p.mission.body}</p></div></div>
            <div className="about-copy-vision-art"><img className="about-copy-vision-image" src={p.visionImage.src} alt={p.visionImage.alt} width="720" height="540" /></div>
          </div></section>
          <section className="about-copy-values"><div className="about-copy-container"><h2 className="about-copy-section-title">{p.valuesHeading}</h2><ul className="about-copy-values-grid">{p.values.map((value) => <li className="about-copy-value-card" key={value.title}><h3 className="about-copy-value-title">{value.title}</h3><p className="about-copy-value-body">{value.body}</p><span className="about-copy-value-rule" aria-hidden="true" /></li>)}</ul></div></section>
          <section className="about-copy-leaders" aria-labelledby="founder-heading"><div className="about-copy-container"><h2 id="founder-heading" className="about-copy-section-title">{seo.founder.heading}</h2><div className="about-copy-founder-grid"><figure className="about-copy-founder-portrait"><img className="about-copy-founder-image" src={seo.founder.image.src} srcSet={seo.founder.image.srcSet} sizes="(min-width: 768px) 280px, 300px" alt="Anuj Gupta, founder and CEO of eThing" width={seo.founder.image.width} height={seo.founder.image.height} loading="lazy" decoding="async" /><figcaption className="about-copy-founder-caption"><h3>{p.leaders[0].name}</h3><p className="about-copy-founder-role">{p.leaders[0].role}</p></figcaption></figure><div className="about-copy-founder-bio">{seo.founder.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="about-copy-founder-links"><a className="about-copy-linkedin-link" href={p.leaders[0].linkedInUrl} target="_blank" rel="noopener noreferrer"><LinkedInGlyph />View LinkedIn profile</a></div></div></div></div></section>
        </div>
        <section className="about-copy-clients about-copy-section" aria-labelledby="clients-heading"><div className="about-copy-container"><h2 id="clients-heading" className="about-copy-section-title">Companies we have worked with</h2><p className="about-copy-section-intro">A selection of companies from our client portfolio.</p><ul className="about-copy-client-grid">{seo.clients.map((client) => <li key={client.name}><img src={client.image} alt={client.name} width="180" height="64" loading="lazy" /><span>{client.name}</span></li>)}</ul></div></section>
        <section className="about-copy-reviews about-copy-section" aria-labelledby="reviews-heading"><div className="about-copy-container"><h2 id="reviews-heading" className="about-copy-section-title">eThing reviews</h2><p className="about-copy-section-intro">Hear from clients on Clutch and Google. Follow the source links to explore their feedback in full.</p><div className="about-copy-review-grid">{seo.reviews.map((review) => <article className="about-copy-review-card" key={review.platform}><div className="about-copy-review-top"><h3><img src={review.logo} alt="" width="32" height="32" />{review.platform}</h3><div><strong>{review.rating}<span> / 5</span></strong><p>{review.count} {review.count === 1 ? 'review' : 'reviews'}</p></div></div><blockquote><p>“{review.quote}”</p></blockquote><p className="about-copy-review-author">{review.author}</p><p className="about-copy-review-context">{review.context}</p><p className="about-copy-review-note">{review.note}</p><a className="about-copy-source-link" href={review.url} target="_blank" rel="noopener noreferrer">Read reviews on {review.platform} ↗</a></article>)}</div><p className="about-copy-source-date">Ratings checked {seo.reviewChecked}. Ratings and review counts may change.</p></div></section>
        <section className="about-copy-case about-copy-section" aria-labelledby="case-heading"><div className="about-copy-container"><p className="about-copy-kicker">Success stories</p><h2 id="case-heading" className="about-copy-section-title">{seo.caseStudy.title}</h2><p className="about-copy-section-intro">{seo.caseStudy.subtitle}</p><div className="about-copy-case-grid">{seo.caseStudy.sections.map((section, index) => <article key={section.title}><span className="about-copy-case-number">0{index + 1}</span><h3>{section.title}</h3><p>{section.body}</p></article>)}</div><a className="about-copy-source-link" href={seo.caseStudy.url} target="_blank" rel="noopener noreferrer">Read the client’s project account on Clutch ↗</a></div></section>
        <section className="about-copy-related" aria-labelledby="related-services-heading"><div className="about-copy-container"><h2 id="related-services-heading" className="about-copy-related-title">Explore related services</h2><p className="about-copy-related-copy">Find the engineering service or hiring option that fits your requirements.</p><ul className="about-copy-related-links"><li><a href="/staff-augmentation/">Extend your engineering team</a></li><li><a href={destination('/engineering-services')}>Software and product engineering</a></li><li><a href="/hire-ai-developers/">AI and machine learning talent</a></li></ul></div></section>
        <section className="about-copy-faq about-copy-section" aria-labelledby="faq-heading"><div className="about-copy-container"><p className="about-copy-section-title about-copy-faq-label">Frequently Asked Questions</p><h2 id="faq-heading" className="about-copy-section-title">Hiring your next engineer? <span>Start here.</span></h2><p className="about-copy-section-intro">From screening and onboarding to pricing, get clear answers before you build your team.</p><div className="about-copy-faq-list">{seo.faqs.map((faq) => <details key={faq.question}><summary><h3>{faq.question}</h3><span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>
        <section id="about-enquiry" className="about-copy-enquiry about-copy-section" aria-labelledby="enquiry-heading"><div className="about-copy-container about-copy-enquiry-grid"><div><h2 id="enquiry-heading" className="about-copy-section-title">Book a free consultation</h2><p className="about-copy-enquiry-copy">Tell us about your team, the skills you need and the work you are planning. We’ll use your enquiry to understand the scope and start a conversation about how eThing can help.</p><p className="about-copy-enquiry-copy">Prefer to speak directly? Reach our team by email or phone.</p><a href="mailto:support@ething.in">support@ething.in</a><a href="tel:+917011956780">+91 70119 56780</a></div><AboutUsEnquiryForm /></div></section>
      </main>
      <Footer />
      {showTop && <button className="about-copy-scroll-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}><Icon kind="arrow" /></button>}
    </div>
  </>;
}
