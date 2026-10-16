import { serviceImageSources } from '../../data/websiteMedia.js';

/* Code-based diagrams stay sharp, readable and lightweight on every screen. */
export function DiagramIcon({ kind = 'website', size = 24 }) {
  const shapes = {
    website: <><rect x="3" y="4" width="26" height="24" rx="4"/><path d="M3 11h26M8 7.5h.01M12 7.5h.01M8 16h8M8 21h16"/></>,
    plan: <><rect x="7" y="5" width="20" height="24" rx="3"/><path d="M12 5V3h10v5H12V5Zm0 10h10m-10 5h10m-10 5h6"/></>,
    design: <><path d="m22 3 7 7-16 16-10 3 3-10L22 3ZM7 19l6 7M19 6l7 7"/><path d="M3 7h8M7 3v8"/></>,
    code: <><path d="m10 8-8 8 8 8m12-16 8 8-8 8M19 4l-6 24"/></>,
    launch: <><path d="M17 21c8-3 12-9 12-18-9 0-15 4-18 12l6 6ZM11 15l-6-1-3 8 9-1m6 0 1 9 8-3-1-6"/><circle cx="22" cy="10" r="3"/><path d="m9 24-5 5"/></>,
    support: <><path d="M5 19v-3a11 11 0 0 1 22 0v3M5 16H3v9h5v-9H5Zm22 0h2v9h-5v-9h3Zm0 9c0 4-4 4-8 4"/></>,
    person: <><circle cx="16" cy="9" r="5"/><path d="M5 29v-4a11 11 0 0 1 22 0v4M11 25h10"/></>,
    team: <><circle cx="16" cy="8" r="4"/><circle cx="5" cy="14" r="3"/><circle cx="27" cy="14" r="3"/><path d="M8 28v-6a8 8 0 0 1 16 0v6M1 28v-5a5 5 0 0 1 5-5m25 10v-5a5 5 0 0 0-5-5"/></>,
    search: <><circle cx="13" cy="13" r="9"/><path d="m20 20 9 9M9 13h8m-8 4h4"/></>,
    data: <><ellipse cx="16" cy="7" rx="11" ry="4"/><path d="M5 7v18c0 5 22 5 22 0V7M5 15c0 5 22 5 22 0M5 23c0 5 22 5 22 0"/></>,
    cloud: <><path d="M8 25a7 7 0 1 1 0-14 10 10 0 0 1 19 3 6 6 0 0 1-1 12H8Z"/><path d="m12 19 4-4 4 4m-4-4v11"/></>,
    check: <><path d="m16 2 12 5v9c0 8-12 14-12 14S4 24 4 16V7l12-5Z"/><path d="m10 16 4 4 8-9"/></>,
    link: <><path d="m12 20 8-8M12 12l3-3a7 7 0 0 1 10 10l-3 3M20 20l-3 3A7 7 0 0 1 7 13l3-3"/></>,
    chart: <><path d="M4 3v25h25M10 23v-6m7 6V11m7 12V6"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[kind] || shapes.website}</svg>;
}

const serviceImages = {
  business: { file: 'business-website.webp', alt: 'Business website with company information, services and a contact enquiry.', parts: ['Your business', 'Your services', 'New enquiries'], tone: 'blue' },
  commerce: { file: 'ecommerce-website.webp', alt: 'Online store with product pages, a shopping bag and a connected checkout.', parts: ['Products', 'Checkout', 'Orders'], tone: 'blue' },
  integrations: { file: 'website-integrations.webp', alt: 'Website connected to customer records, a booking calendar and email.', parts: ['CRM', 'Bookings', 'Payments'], tone: 'teal' },
  content: { file: 'content-management.webp', alt: 'Content website with an editing pencil, image library and publishing tools.', parts: ['Edit pages', 'Add content', 'Publish'], tone: 'sky' },
  seo: { file: 'seo-analytics.webp', alt: 'Website with a search magnifier, sitemap and analytics report.', parts: ['SEO', 'Search Console', 'Analytics'], tone: 'teal' },
  redesign: { file: 'website-redesign.webp', alt: 'An old website layout transforming into a polished, modern website.', parts: ['Review', 'Redesign', 'Relaunch'], tone: 'blue' },
  web3: { file: 'web3-website-connections.webp', alt: 'Web3 website connected to a digital wallet, a smart contract document and a network of blockchain nodes.', parts: ['Wallet connections', 'Smart contracts', 'Blockchain data'], tone: 'blue' },
  support: { file: 'website-support.webp', alt: 'Website protected by a shield, with maintenance tools, backups and software updates.', parts: ['Updates', 'Backups', 'Support'], tone: 'teal' },
};

const warmedImages = new Map();
export function warmServiceImage(service) {
  if (typeof window === 'undefined') return Promise.resolve();
  if (navigator.connection?.saveData || /2g/.test(navigator.connection?.effectiveType || '')) return Promise.resolve();
  if (!warmedImages.has(service)) warmedImages.set(service, new Promise(resolve => {
    const image = new window.Image();
    image.onload = image.onerror = resolve;
    image.fetchPriority = 'low';
    const sources = serviceImageSources(serviceImages[service].file);
    image.sizes = sources.sizes;
    image.srcset = sources.srcSet;
    image.src = sources.src;
  }));
  return warmedImages.get(service);
}

export function WebsiteServiceDiagram({ service, load = true, priority = false }) {
  const image = serviceImages[service];
  return <figure className={`wd-service-image wd-service-image-${image.tone}`}>
    <div className="wd-service-image-art">{load && <img {...serviceImageSources(image.file)} width="1254" height="1254" loading="eager" fetchPriority={priority ? 'high' : 'auto'} decoding="async" alt={image.alt}/>}</div>
    <figcaption className="wd-image-feature-labels">{image.parts.map(part => <span key={part}>{part}</span>)}</figcaption>
  </figure>;
}

export function ServiceArtworkPalette() {
  return <svg className="wd-artwork-palette" width="0" height="0" aria-hidden="true" focusable="false"><defs>
    <filter id="wd-service-colour" colorInterpolationFilters="sRGB">
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncR type="table" tableValues="0.04 0.07 0.10 0.13 0.14 0.35 0.67 0.97"/>
        <feFuncG type="table" tableValues="0.10 0.19 0.34 0.48 0.61 0.75 0.87 0.99"/>
        <feFuncB type="table" tableValues="0.23 0.40 0.62 0.80 0.83 0.88 0.96 1"/>
      </feComponentTransfer>
    </filter>
  </defs></svg>;
}

export function SearchServiceDiagram({ service }) {
  const content = {
    seo: { title: 'Search visibility', labels: ['Titles', 'Content', 'Links'], description: 'Illustration of an optimised search result with a clear title, description and useful links' },
    gsc: { title: 'Website indexing', labels: ['Verify', 'Index', 'Review'], description: 'Illustration of verified website pages connected in a sitemap for Google Search Console' },
    ga: { title: 'Visitor activity', labels: ['Visits', 'Pages', 'Enquiries'], description: 'Illustrative Google Analytics dashboard with activity bars and a visitor journey; no actual results are shown' },
  }[service];
  return <div className={`wd-search-art wd-search-art-${service}`} role="img" aria-label={content.description}>
    <div className="wd-search-art-toolbar"><span aria-hidden="true"><i/><i/><i/></span><b>{content.title}</b><DiagramIcon kind={service === 'seo' ? 'search' : service === 'gsc' ? 'website' : 'chart'} size={15}/></div>
    <div className="wd-search-art-scene" aria-hidden="true">
      {service === 'seo' ? <><div className="wd-search-result-card"><span>your-business.com</span><strong>Your business</strong><i/><i/><div><span/><span/><span/></div></div><span className="wd-search-lens"><DiagramIcon kind="search" size={33}/></span></> : service === 'gsc' ? <><div className="wd-index-website"><DiagramIcon kind="website" size={38}/><span><DiagramIcon kind="check" size={17}/></span></div><div className="wd-index-connector"/><div className="wd-index-pages">{['Page 01','Page 02','Page 03'].map(label=><span key={label}><i/><i/><DiagramIcon kind="check" size={13}/></span>)}</div></> : <><div className="wd-activity-chart"><div><i/><i/><i/></div><div className="wd-activity-bars">{[37,62,48,83,68,100].map((height,index)=><span key={index} style={{height:`${height}%`}}/>)}</div></div><div className="wd-activity-donut"><DiagramIcon kind="person" size={27}/></div></>}
    </div>
    <div className="wd-search-art-footer">{content.labels.map(label=><span key={label}><i/>{label}</span>)}</div>
  </div>;
}

export function WebsiteStackDiagram() {
  return <figure className="wd-info-stack" aria-label="Website structure: visitors use the frontend, which connects to backend services, content and data, supported by cloud hosting">{[['person','Visitors'],['website','Frontend'],['code','Backend'],['data','Content & data'],['cloud','Cloud hosting']].map(([icon,label])=><div key={label}><span><DiagramIcon kind={icon} size={26}/></span><b>{label}</b></div>)}</figure>;
}

export function EngagementDiagram({ kind }) {
  const parts = kind === 'project' ? [['plan','Your brief'],['team','eThing'],['website','Website']] : kind === 'developer' ? [['team','Your team'],['person','Developer'],['website','Website']] : [['design','Design'],['code','Build'],['check','Test']];
  return <div className={`wd-info-engagement wd-info-engagement-${kind}`} role="img" aria-label={kind === 'project' ? 'Your brief goes to eThing, who delivers the website' : kind === 'developer' ? 'A developer joins your team to work on your website' : 'Designers, developers and testers work together as your dedicated team'}>{parts.map(([icon,label])=><div key={label}><span><DiagramIcon kind={icon} size={27}/></span><b>{label}</b></div>)}</div>;
}
