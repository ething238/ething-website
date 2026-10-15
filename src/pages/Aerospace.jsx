import { Helmet as Head } from 'react-helmet-async';
import '../styles/about-us.css';
import '../styles/aerospace.css';
import { useEffect, useRef } from 'react';
import content from '../data/aerospaceSeoContent.js';
import relatedServices from '../data/aerospaceRelatedServices.json';
import AerospaceEnquiryForm from '../components/AerospaceEnquiryForm.jsx';
import { CopyHeader, CopyFooter, CopyBackToTop, copyDestination } from '../components/HealthcareSiteChrome.jsx';
import { brandLogoUrl } from '../data/aboutBrand.js';
import RelatedServices from '../components/RelatedServices.jsx';

const siteUrl = 'https://www.ethingsolutions.com';
const pageUrl = `${siteUrl}/aerospace_industry`;
const enquiry = '#aerospace-enquiry';
const hero = { src: '/aerospace/aerospace-defence-it-hero.png', alt: 'Concept illustration of aerospace and defence aircraft, satellite communications and connected software engineering systems', width: 1672, height: 941 };

function ServiceIcon({ kind, className = '' }) {
  const paths = {
    software: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="m9 8-3 3 3 3m6-6 3 3-3 3M8 22h8m-4-4v4" /></>,
    embedded: <><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" /></>,
    integration: <><path d="M8 3v5m8-5v5M5 8h14v3a7 7 0 0 1-14 0Zm7 10v4" /><path d="m10 10-2 2 2 2m4-4 2 2-2 2" /></>,
    control: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4M5 12h3l2-5 4 7 2-3h3" /></>,
    testing: <><path d="M9 3H5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4" /><rect x="9" y="1" width="6" height="4" rx="1" /><path d="m8 13 3 3 5-6" /></>,
  };
  return <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind]}</svg>;
}

function TechnologyCards({ cards }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18 });
    gridRef.current.querySelectorAll('.aerospace-technology-card').forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return <div className="aerospace-technology-grid" ref={gridRef}>
    {cards.map((card, index) => <article className="aerospace-technology-card" key={card.title} style={{ '--aerospace-card-delay': `${index * 75}ms` }}>
      <div className="aerospace-technology-heading">
        <span className="aerospace-technology-symbol" aria-hidden="true"><ServiceIcon kind={['software', 'control', 'embedded', 'integration', 'embedded'][index]} className="aerospace-technology-icon" /></span>
        <h3>{card.title}</h3>
      </div>
      <p>{card.body}</p>
    </article>)}
  </div>;
}

export default function AerospaceIndustry() {
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: 'eThing', publisher: { '@id': `${siteUrl}/#organization` } },
    { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'eThing', url: `${siteUrl}/`, logo: brandLogoUrl, email: 'support@ething.in', telephone: '+91-7011956780' },
    { '@type': 'WebPage', '@id': `${pageUrl}#webpage`, url: pageUrl, name: content.title, description: content.description, inLanguage: 'en', isPartOf: { '@id': `${siteUrl}/#website` }, about: { '@id': `${pageUrl}#service` }, breadcrumb: { '@id': `${pageUrl}#breadcrumb` } },
    { '@type': 'Service', '@id': `${pageUrl}#service`, name: content.heading, serviceType: 'Aerospace engineering staffing', url: pageUrl, description: content.intro, provider: { '@id': `${siteUrl}/#organization` }, hasOfferCatalog: { '@type': 'OfferCatalog', name: content.services.heading, itemListElement: content.services.cards.map(service => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${service.title} talent`, description: service.paragraphs[0], url: `${pageUrl}#${service.id}` } })) } },
    { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Aerospace & Defence', item: pageUrl }] },
  ] };
  return <>
    <Head>
      <title>{content.title}</title><meta name="description" content={content.description} /><link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" /><meta property="og:title" content={content.title} /><meta property="og:description" content={content.description} /><meta property="og:url" content={pageUrl} /><meta property="og:site_name" content="eThing" /><meta property="og:image" content={`${siteUrl}${hero.src}`} /><meta property="og:image:alt" content={hero.alt} />
      <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={content.title} /><meta name="twitter:description" content={content.description} /><meta name="twitter:image" content={`${siteUrl}${hero.src}`} /><meta name="twitter:image:alt" content={hero.alt} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    </Head>
    <div className="about-us-copy aerospace-copy">
      <a className="aerospace-skip-link" href="#aerospace-main">Skip to content</a><CopyHeader activePath="/aerospace_industry" contactHref={enquiry} />
      <main id="aerospace-main">
        <section className="aerospace-hero" aria-labelledby="aerospace-heading"><img className="aerospace-hero-image" src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} fetchPriority="high" /><div className="aerospace-hero-overlay" aria-hidden="true" /><div className="about-copy-container aerospace-hero-inner"><div className="aerospace-hero-copy"><h1 id="aerospace-heading">{content.heading}</h1><p className="aerospace-hero-intro">{content.intro}</p><div className="aerospace-hero-actions"><a className="aerospace-primary-button" href={enquiry}>{content.contact.ctaLabel}<span aria-hidden="true">→</span></a></div></div></div></section>
        <section className="aerospace-overview" aria-labelledby="aerospace-overview-heading"><div className="about-copy-container aerospace-overview-grid"><h2 id="aerospace-overview-heading">{content.overview.heading}</h2><div>{content.overview.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></div></section>
        <section className="aerospace-services" aria-labelledby="aerospace-services-heading">
          <div className="about-copy-container">
            <h2 id="aerospace-services-heading">{content.services.heading}</h2>
            <p className="aerospace-section-intro">{content.services.intro}</p>
            <div className="aerospace-service-list">
              {content.services.cards.map(service => <article id={service.id} key={service.id} aria-labelledby={`${service.id}-heading`}>
                <div className="aerospace-service-grid">
                  <div className="aerospace-service-copy">
                    <h3 id={`${service.id}-heading`}><span className="aerospace-service-symbol"><ServiceIcon kind={service.icon} /></span>{service.title}</h3>
                    <div className="aerospace-service-description">{service.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
                  </div>
                  <img className="aerospace-service-image" src={service.image.src} alt={service.image.alt} width={service.image.width || 640} height={service.image.height || 480} loading="lazy" />
                </div>
              </article>)}
            </div>
          </div>
        </section>
        <section className="aerospace-technologies" aria-labelledby="aerospace-technologies-heading"><div className="about-copy-container"><h2 id="aerospace-technologies-heading">{content.technologies.heading}</h2><p className="aerospace-section-intro">{content.technologies.intro}</p><TechnologyCards cards={content.technologies.cards} /></div></section>
        <section className="aerospace-projects" aria-labelledby="aerospace-projects-heading"><div className="about-copy-container"><h2 id="aerospace-projects-heading">{content.projectExamples.heading}</h2><p className="aerospace-section-intro">{content.projectExamples.intro}</p><div className="aerospace-project-grid">{content.projectExamples.cards.map((card,index) => <article key={card.title}><ServiceIcon kind={index ? 'integration':'control'} className="aerospace-project-icon" /><h3>{card.title}</h3><dl>{[['Team need',card.need],['Roles and skills',card.work],['Contribution to your project',card.outputs]].map(([label,body]) => <div key={label}><dt>{label}</dt><dd>{body}</dd></div>)}</dl></article>)}</div><div className="aerospace-success-link"><p>{content.projectExamples.successStoryIntro}</p><a href={content.projectExamples.ctaHref}>{content.projectExamples.ctaLabel}<span aria-hidden="true">→</span></a></div></div></section>
        <section id="aerospace-enquiry" className="aerospace-enquiry" aria-labelledby="aerospace-enquiry-heading"><div className="about-copy-container aerospace-enquiry-grid"><div><h2 id="aerospace-enquiry-heading">{content.contact.heading}</h2><p className="aerospace-section-intro">{content.contact.intro}</p><div className="aerospace-role-summary"><h3>{content.contact.teamHeading}</h3>{content.contact.teamParagraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div><div className="aerospace-direct-contact"><a href="mailto:support@ething.in">support@ething.in</a><a href="tel:+917011956780">India: +91 70119 56780</a><a href="tel:+19295574560">USA: +1 929 557 4560</a></div><a className="aerospace-team-link" href="/staff-augmentation/">{content.contact.engineersLabel}<span aria-hidden="true">→</span></a></div><AerospaceEnquiryForm /></div></section>
        <RelatedServices title="Explore related expertise" description="Find engineers with the technical skills your team needs." nativeLinks links={relatedServices.links.map(link => ({ ...link, path: copyDestination(link.path) }))} />
      </main><CopyFooter activePath="/aerospace_industry" contactHref={enquiry} aboutBody={content.footerAbout} /><CopyBackToTop />
    </div>
  </>;
}
