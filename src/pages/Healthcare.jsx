import { Helmet as Head } from 'react-helmet-async';
import '../styles/about-us.css';
import '../styles/healthcare.css';
import original from '../data/healthcareCopy.json';
import { CopyHeader, CopyFooter, CopyBackToTop } from '../components/HealthcareSiteChrome.jsx';
import { brandLogo, brandLogoUrl } from '../data/aboutBrand.js';
import seo from '../data/healthcareSeoContent';
import governanceCase from '../data/healthcareAiGovernanceCase';
import delivery from '../data/healthcareDeliveryContent';

const siteUrl = 'https://www.ethingsolutions.com';
const pageUrl = `${siteUrl}/healthcare_industry`;
const { title, description, overview } = seo;
const brand = (text) => text.replace(/\bEthing(?: Solutions)?\b/gi, 'eThing');
const page = {
  ...original.healthcare,
  heading: 'Healthcare Software Development and IT Staffing',
  capabilitiesTitle: 'Service capabilities',
  heroImage: delivery.hero,
  sections: original.healthcare.sections.map(section => {
    const edited = { ...section, ...seo.sectionOverrides[section.id] };
    return { ...edited, paragraphs: [...edited.paragraphs, ...(delivery.sectionExtensions[section.id] || [])] };
  }),
};
const heroImageUrl = `${siteUrl}${page.heroImage.src}`;
export default function HealthcareIndustryCopy() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: 'eThing', publisher: { '@id': `${siteUrl}/#organization` } },
      { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'eThing', url: `${siteUrl}/`, logo: brandLogoUrl, email: 'support@ething.in', telephone: '+91-7011956780', address: { '@type': 'PostalAddress', streetAddress: 'Building Number 145, Sector 44 Rd', addressLocality: 'Gurugram', addressRegion: 'Haryana', postalCode: '122003', addressCountry: 'IN' } },
      { '@type': 'WebPage', '@id': `${pageUrl}#webpage`, url: pageUrl, name: title, description, inLanguage: 'en', isPartOf: { '@id': `${siteUrl}/#website` }, about: { '@id': `${pageUrl}#service` }, hasPart: { '@id': `${pageUrl}#ai-governance-approach` }, breadcrumb: { '@id': `${pageUrl}#breadcrumb` } },
      { '@type': 'Service', '@id': `${pageUrl}#service`, name: 'Healthcare software engineering and IT staffing', serviceType: 'Healthcare software development', url: pageUrl, provider: { '@id': `${siteUrl}/#organization` }, description: 'Engineering support for clinical applications, surgical appliance interfaces, HL7 v2 and FHIR integration, software testing and validation, and healthcare teams.' },
      { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Healthcare', item: pageUrl }] },
      { '@type': 'CreativeWork', '@id': `${pageUrl}#ai-governance-approach`, name: governanceCase.title, genre: 'Service experience and approach', description: governanceCase.intro, author: { '@id': `${siteUrl}/#organization` }, isPartOf: { '@id': `${pageUrl}#webpage` } },
    ],
  };

  return <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />
      <link rel="icon" type="image/png" href={brandLogo.src} key="favicon" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <style key="healthcare-fonts">{"@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');"}</style>
      <meta property="og:type" content="website" /><meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:url" content={pageUrl} /><meta property="og:site_name" content="eThing" /><meta property="og:image" content={heroImageUrl} /><meta property="og:image:alt" content={page.heroImage.alt} />
      <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={title} /><meta name="twitter:description" content={description} /><meta name="twitter:image" content={heroImageUrl} /><meta name="twitter:image:alt" content={page.heroImage.alt} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    </Head>
    <div className="about-us-copy healthcare-copy">
      <a className="healthcare-skip-link" href="#healthcare-main">Skip to content</a>
      <CopyHeader activePath="/healthcare_industry" />
      <main id="healthcare-main">
        <nav aria-label="Breadcrumb" className="about-copy-breadcrumb about-copy-container"><ol><li><a href={`${siteUrl}/`}>Home</a></li><li aria-hidden="true">/</li><li aria-current="page">Healthcare</li></ol></nav>
        <section className="healthcare-hero" aria-labelledby="healthcare-heading">
          <img className="healthcare-hero-image" src={page.heroImage.src} alt={page.heroImage.alt} width={page.heroImage.width || 1920} height={page.heroImage.height || 1080} fetchPriority="high" />
          <div className="healthcare-hero-overlay" aria-hidden="true" />
          <div className="about-copy-container healthcare-hero-inner"><div className="healthcare-hero-copy">
            <h1 id="healthcare-heading">{brand(page.heading || page.title)}</h1>
            <p className="healthcare-hero-subtitle">{delivery.hero.subtitle}</p>
            <a className="healthcare-hero-cta" href="/contact">Contact us <span aria-hidden="true">→</span></a>
          </div></div>
        </section>
        <section className="healthcare-overview" aria-labelledby="healthcare-overview-heading"><div className="about-copy-container healthcare-overview-inner">
          <h2 id="healthcare-overview-heading" className="healthcare-overview-heading">{page.overviewEyebrow || 'Overview'}</h2>
          <p className="healthcare-overview-text">{overview}</p>
        </div></section>
        <section id="healthcare-audiences" className="healthcare-audiences" aria-labelledby="healthcare-audiences-heading"><div className="about-copy-container">
          <h2 id="healthcare-audiences-heading">{delivery.audiences.heading}</h2><p className="healthcare-section-intro">{delivery.audiences.intro}</p>
          <div className="healthcare-audience-grid">{delivery.audiences.cards.map(card => <article key={card.title}><h3>{card.title}</h3><p>{card.body}</p></article>)}</div>
        </div></section>
        <section className="healthcare-capabilities" aria-labelledby="capabilities-heading"><div className="about-copy-container">
          <div className="healthcare-capabilities-heading"><h2 id="capabilities-heading">{page.capabilitiesTitle || 'Service capabilities'}</h2></div>
          <div className="healthcare-sections">{page.sections.map((section) => <article id={section.id} key={section.id} aria-labelledby={`${section.id}-heading`}>
              <h3 id={`${section.id}-heading`}>{brand(section.title)}</h3>
              <div className="healthcare-capability-grid"><div className="healthcare-capability-text">{section.paragraphs.map((paragraph, index) => <p key={index}>{brand(paragraph)}</p>)}</div><img className="healthcare-capability-image" src={section.image.src} alt={brand(section.image.alt)} width="640" height="480" loading="lazy" /></div>
          </article>)}</div>
        </div></section>
        <section id="ai-governance-case" className="healthcare-governance-case" aria-labelledby="governance-case-heading"><div className="about-copy-container">
          <h2 id="governance-case-heading">{governanceCase.title}</h2><p className="healthcare-case-intro">{governanceCase.intro}</p><p className="healthcare-case-scenario">{governanceCase.context}</p>
          <div className="healthcare-case-grid">{governanceCase.sections.map((section, index) => <article key={section.title}><span className="healthcare-case-number" aria-hidden="true">0{index + 1}</span><h3>{section.title}</h3><p>{section.body}</p></article>)}</div>
        </div></section>
        <section id="healthcare-team-support" className="healthcare-team-support" aria-labelledby="team-support-heading"><div className="about-copy-container healthcare-team-support-grid"><div><h2 id="team-support-heading">{seo.teamSupport.heading}</h2></div><div>{seo.teamSupport.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<a className="healthcare-team-link" href="/staff-augmentation">Explore flexible team support <span aria-hidden="true">→</span></a></div></div></section>
        <section className="about-copy-related" aria-labelledby="related-services-heading"><div className="about-copy-container"><h2 id="related-services-heading" className="about-copy-related-title">{original.relatedServices.title}</h2><p className="about-copy-related-copy">{original.relatedServices.description}</p><ul className="about-copy-related-links">{original.relatedServices.links.map((link) => <li key={link.path}><a href={`${siteUrl}${link.path}`}>{link.label}</a></li>)}</ul></div></section>
      </main>
      <CopyFooter activePath="/healthcare_industry" aboutBody={seo.footerAbout} />
      <CopyBackToTop />
    </div>
  </>;
}
