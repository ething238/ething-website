import { Helmet as Head } from 'react-helmet-async';
import '../styles/about-us.css';
import '../styles/footer-brand.css';
import '../styles/salesforce-staff-augmentation.css';
import '../styles/salesforce-design-refresh.css';
import { useEffect, useRef, useState } from 'react';
import CopyHeader from '../components/SiteHeader.jsx';
import { CopyBackToTop, CopyFooter } from '../components/website-development/Chrome.jsx';
import SalesforceEnquiryForm from '../components/salesforce/SalesforceEnquiryForm.jsx';
import {
  salesforceRoles, salesforceSituations, salesforceClouds,
  salesforceAssessment, salesforceAssessmentFocus, salesforceModels, salesforceSteps,
  salesforceFaqs, salesforceTechnicalSkills,
} from '../data/salesforceStaffContent.js';

const route = '/salesforce-staff-augmentation';
const canonical = 'https://www.ethingsolutions.com' + route;
const title = 'Salesforce Staff Augmentation Services | eThing';
const description = 'Salesforce staff augmentation services for your team. Explore developers, administrators, cloud expertise and flexible contracts with eThing.';
const faqMidpoint = Math.ceil(salesforceFaqs.length / 2);
const faqPages = [salesforceFaqs.slice(0, faqMidpoint), salesforceFaqs.slice(faqMidpoint)];

function Icon({ kind, size = 24 }) {
  const paths = {
    code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20"/>,
    settings: <><path d="m9 3-1 3-3 1-2 5 2 5 3 1 1 3h6l1-3 3-1 2-5-2-5-3-1-1-3Z"/><circle cx="12" cy="12" r="3"/></>,
    layers: <><path d="m12 3 10 6-10 6L2 9l10-6Zm-9 12 9 5 9-5M3 12l9 5 9-5"/></>,
    workflow: <><rect x="8" y="2" width="8" height="5" rx="1"/><rect x="2" y="17" width="7" height="5" rx="1"/><rect x="15" y="17" width="7" height="5" rx="1"/><path d="M12 7v5H5v5m7-5h7v5"/></>,
    shield: <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="m8 12 3 3 5-6"/></>,
    people: <><circle cx="9" cy="7" r="4"/><path d="M2 21v-3a7 7 0 0 1 14 0v3M17 4a4 4 0 0 1 0 8m2 3a6 6 0 0 1 3 5v1"/></>,
    person: <><circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/></>,
    chart: <><path d="M3 3v18h18M7 16v-5m5 5V7m5 9V4"/></>,
    message: <><path d="M21 11a9 9 0 0 1-9 9H3v-9a9 9 0 0 1 18 0Z"/><path d="M7 9h10M7 13h7"/></>,
    globe: <><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20M4 6h16M4 18h16"/></>,
    nodes: <><rect x="9" y="9" width="6" height="6" rx="1"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="20" r="2"/><path d="m6 6 3 3m6 6 3 3m-3-9 3-3M6 18l3-3"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6"/>,
    plus: <path d="M5 12h14M12 5v14"/>,
    clock: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 3"/></>,
    document: <><path d="M14 2H5v20h14V7l-5-5ZM14 2v6h5M8 12h8M8 16h6"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind] || paths.layers}</svg>;
}

function CTA({ children = 'Discuss Your Requirement', role, onChoose, secondary = false }) {
  return <a href="#salesforce-enquiry" className={'sf-button' + (secondary ? ' sf-button-outline' : '')} onClick={() => { if (role && onChoose) onChoose(role); }}>{children}<Icon kind="arrow" size={18}/></a>;
}

function SectionHeading({ id, children, description: copy }) {
  return <div className="sf-section-heading" data-sf-reveal>
    <div><h2 id={id}>{children}</h2></div>
    {copy && <p>{copy}</p>}
  </div>;
}

function TeamIllustration() {
  return <figure className="sf-cloud-scene">
    <div className="sf-cloud-glow" aria-hidden="true"/>
    <img className="sf-cloud-art" src="/salesforce/cloud-talent-v4.webp" width="1200" height="900" alt="Illustration of a blue Salesforce cloud connected to three technology specialists" loading="lazy"/>
    <div className="sf-orbit-label sf-orbit-label-one" aria-hidden="true"><span className="sf-orbit-dot"/>Developer<Icon kind="code" size={15}/></div>
    <div className="sf-orbit-label sf-orbit-label-two" aria-hidden="true"><span className="sf-orbit-dot"/>Administrator<Icon kind="settings" size={15}/></div>
    <div className="sf-orbit-label sf-orbit-label-three" aria-hidden="true"><span className="sf-orbit-dot"/>Architect<Icon kind="layers" size={15}/></div>
  </figure>;
}

function EngagementGraphic({ number }) {
  if (number === '03') return <svg className="sf-model-graphic" viewBox="0 0 300 120" fill="none" aria-hidden="true"><path className="sf-model-connection" d="M80 60h140" stroke="currentColor" strokeOpacity=".3" strokeDasharray="4 6"/>{[60,150,240].map(x => <g key={x}><rect x={x-34} y="22" width="68" height="76" rx="12" fill="#fff" stroke="currentColor" strokeOpacity=".2"/><circle cx={x} cy="47" r="10" stroke="currentColor" strokeWidth="1.5"/><path d={`M${x-17} 79v-3a17 17 0 0 1 34 0v3`} stroke="currentColor" strokeWidth="1.5"/></g>)}</svg>;
  return <svg className="sf-model-graphic" viewBox="0 0 300 120" fill="none" aria-hidden="true">
    <path className="sf-model-connection" d="M72 62h155M150 25v73" stroke="currentColor" strokeOpacity=".24" strokeDasharray="4 6"/>
    {number === '01' ? <><rect x="24" y="22" width="84" height="76" rx="12" fill="#fff" stroke="currentColor" strokeOpacity=".18"/><circle cx="66" cy="48" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M48 78v-3a18 18 0 0 1 36 0v3" stroke="currentColor" strokeWidth="1.5"/><rect x="175" y="15" width="100" height="90" rx="12" fill="#e9e0fa" stroke="currentColor" strokeOpacity=".22"/><path d="M194 38h60M194 50h45M194 69h60M194 81h34" stroke="currentColor" strokeWidth="1.5"/><path d="m132 56 8 8 17-18" stroke="currentColor" strokeWidth="2"/></> : <><rect x="21" y="23" width="93" height="74" rx="12" fill="#fff" stroke="currentColor" strokeOpacity=".18"/><path d="M43 47h48M43 60h34M43 73h41" stroke="currentColor" strokeWidth="1.5"/><circle cx="224" cy="60" r="43" fill="#e8edf7" stroke="currentColor" strokeOpacity=".22"/><circle cx="224" cy="60" r="30" stroke="currentColor" strokeWidth="1.5"/><path d="M224 39v22l16 10" stroke="currentColor" strokeWidth="1.5"/><circle cx="148" cy="61" r="7" fill="#d2bfef"/></>}
  </svg>;
}

function RoleExplorer({ selectedRole }) {
  return <>
    <div className="sf-role-grid">{salesforceRoles.map((role, index) => <article className={'sf-role-card sf-motion-card' + (selectedRole === role.label ? ' sf-role-chosen' : '')} key={role.id} data-sf-reveal style={{ '--sf-delay': (index % 3) * 70 + 'ms' }}>
      <div className="sf-card-top"><span className="sf-icon-tile"><Icon kind={role.icon}/></span><span className="sf-label">0{index + 1}</span></div>
      <h3>{role.label}</h3><p>{role.description}</p><ul className="sf-tags">{role.skills.map(skill => <li key={skill}>{skill}</li>)}</ul><p className="sf-role-work">{role.work}</p>
    </article>)}</div>
  </>;
}

export default function SalesforceStaffAugmentation() {
  const [selectedRole, setSelectedRole] = useState('Help me decide');
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const header = root.querySelector('header');
    const measureHeader = () => root.style.setProperty('--sf-header-height', (header?.offsetHeight || 90) + 'px');
    measureHeader();
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measureHeader) : null;
    if (header) resizeObserver?.observe(header);
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        entry.target.classList.toggle('sf-in-view', entry.isIntersecting);
        if (entry.isIntersecting) entry.target.classList.add('sf-entered');
      }), { threshold: 0.06 });
      root.querySelectorAll('[data-sf-reveal], [data-sf-animate]').forEach(node => observer.observe(node));
    }
    return () => { resizeObserver?.disconnect(); observer?.disconnect(); };
  }, []);
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', '@id': canonical + '#service', name: 'Salesforce Staff Augmentation Services', description, url: canonical, provider: { '@type': 'Organization', name: 'eThing', url: 'https://www.ethingsolutions.com' } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.ethingsolutions.com' },
      { '@type': 'ListItem', position: 2, name: 'Hire Talent', item: 'https://www.ethingsolutions.com/other-services' },
      { '@type': 'ListItem', position: 3, name: 'Salesforce Staff Augmentation Services', item: canonical },
    ] },
  ] };
  return <div className="about-us-copy sf-page sf-reference-design sf-vivid-design" ref={rootRef}>
    <Head>
      <title>{title}</title><meta name="robots" content="index,follow"/><meta name="description" content={description}/><link rel="canonical" href={canonical}/>
      <meta property="og:title" content={title}/><meta property="og:description" content={description}/><meta property="og:url" content={canonical}/><meta property="og:type" content="website"/>
      <meta property="og:image" content="https://www.ethingsolutions.com/salesforce/cloud-talent-v4.webp"/><meta name="twitter:card" content="summary_large_image"/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/>
    </Head>
    <a className="sf-skip" href="#salesforce-main">Skip to content</a>
    <CopyHeader activePath={route} contactHref="#salesforce-enquiry" optimizeMedia/>
    <main id="salesforce-main">
      <section className="sf-hero" aria-labelledby="sf-title">
        <div className="sf-container">
          <div className="sf-hero-grid">
            <div className="sf-hero-copy">
              <h1 id="sf-title"><span>Salesforce</span> Staff Augmentation Services</h1>
              <p className="sf-hero-description">eThing is a Salesforce staff augmentation company in Gurugram, India. Our Salesforce staff augmentation services add developers, administrators and architects to your team, while you retain control of the work.</p>
              <div className="sf-hero-actions"><a href="#salesforce-roles" className="sf-button">Explore the roles<Icon kind="arrow" size={18}/></a></div>
            </div>
            <div className="sf-hero-enquiry" id="salesforce-enquiry"><SalesforceEnquiryForm selectedRole={selectedRole} onRoleChange={setSelectedRole}/></div>
          </div>
        </div>
      </section>

      <div className="sf-company-strip"><div className="sf-container">
        <a href="/about_us"><strong>eThing · founded 2023</strong><span>Gurugram, India · meet our company</span><Icon kind="arrow" size={17}/></a>
      </div></div>


      <section className="sf-section sf-situations" aria-labelledby="sf-situations-heading"><div className="sf-container">
        <SectionHeading id="sf-situations-heading" description="Start with the gap in your team and the work that needs to move forward.">When your roadmap needs more capacity</SectionHeading>
        <div className="sf-situation-grid">{salesforceSituations.map(([icon,heading,body],index) => <article className="sf-motion-card" key={heading} data-sf-reveal style={{ '--sf-delay': (index % 4) * 70 + 'ms' }}><div className="sf-card-heading"><Icon kind={icon} size={28}/><h3>{heading}</h3></div><p>{body}</p></article>)}</div>
      </div></section>

      <section className="sf-section sf-developers" id="salesforce-developers" aria-labelledby="sf-developers-heading"><div className="sf-container">
        <SectionHeading id="sf-developers-heading" description="Hire dedicated Salesforce developers for ongoing delivery, or hire a Salesforce programmer to support a defined application, integration or release requirement. Our Salesforce staffing services cover role matching, selection coordination and onboarding support for an agreed engagement.">Hire Salesforce Developers</SectionHeading>
        <div className="sf-development-stage">
        <figure className="sf-development-photo" data-sf-reveal><img src="/salesforce/engineering-team-v4.webp" alt="Illustrative image of two engineers collaborating on a CRM application" width="1200" height="800" loading="lazy"/><figcaption>EXPERTISE. EMBEDDED IN YOUR TEAM.</figcaption></figure>
        <div>
        <div className="sf-developer-grid">
          <article data-sf-reveal><Icon kind="globe" size={25}/><h3>Developers from India</h3><p>Hire Salesforce developers from India with experience matched to your organisation, product requirements and review standards. Start with the responsibilities, seniority and overlap your team needs.</p></article>
          <article data-sf-reveal><Icon kind="people" size={25}/><h3>Remote and offshore working</h3><p>Hire a remote Salesforce developer for an agreed working arrangement. For offshore Salesforce developers, confirm collaboration tools, time-zone overlap and ownership before onboarding.</p></article>
          <article data-sf-reveal><Icon kind="document" size={25}/><h3>Contract development</h3><p>Hire Salesforce developers on contract for an agreed scope, allocation and duration. Discuss the billing, notice and handover terms before choosing the engagement.</p></article>
        </div>
        <div className="sf-developer-cta"><CTA role="Developer" onChoose={setSelectedRole}>Discuss a developer requirement</CTA></div>
        </div></div>
      </div></section>

      <section className="sf-section sf-roles" id="salesforce-roles" aria-labelledby="sf-roles-heading"><div className="sf-container">
        <SectionHeading id="sf-roles-heading" description="Hire Salesforce professionals for the work your team needs to deliver. Explore each role, then discuss the product experience and allocation required.">Salesforce Professionals You Can Hire</SectionHeading>
        <RoleExplorer selectedRole={selectedRole}/>
      </div></section>

      <section className="sf-section sf-expertise" id="salesforce-expertise" aria-labelledby="sf-expertise-heading"><div className="sf-container">
        <SectionHeading id="sf-expertise-heading" description="Discuss Sales Cloud, Service Cloud, Experience Cloud, Commerce Cloud, Marketing Cloud, Account Engagement, CPQ and AppExchange requirements. Confirm the exact product and edition before matching.">Salesforce Clouds and Specialisations</SectionHeading>
        <div className="sf-product-list sf-cloud-list">{salesforceClouds.map(cloud => <details key={cloud.name}><summary><Icon kind={cloud.icon}/><div><h3>{cloud.name}</h3><small>{cloud.description}</small></div><span className="sf-cloud-toggle" aria-hidden="true"><Icon kind="plus" size={14}/></span></summary><div>{cloud.intro && <p>{cloud.intro}</p>}<p><strong>Roles to discuss:</strong> {cloud.roles}</p><ul className="sf-checklist">{cloud.tasks.map(task => <li key={task}><Icon kind="check" size={17}/>{task}</li>)}</ul></div></details>)}</div>
      </div></section>

      <section className="sf-section sf-technical" id="salesforce-technical" aria-labelledby="sf-technical-heading"><div className="sf-container">
        <SectionHeading id="sf-technical-heading" description="Match the technical capabilities of your professionals to the code, automation, interfaces and release practices your team uses.">Technical Skills Available</SectionHeading>
        <div className="sf-technical-grid">{salesforceTechnicalSkills.map((skill,index) => <article className="sf-motion-card" key={skill.title} data-sf-reveal style={{ '--sf-delay': (index % 3) * 70 + 'ms' }}><div className="sf-card-heading"><Icon kind={skill.icon} size={28}/><h3>{skill.title}</h3></div><p>{skill.description}</p></article>)}</div>
      </div></section>

      <section className="sf-section sf-assessment" aria-labelledby="sf-assessment-heading"><div className="sf-container">
        <SectionHeading id="sf-assessment-heading" description="eThing screens for the agreed role, relevant experience and communication. We agree the role-specific checks and your interview stages before sourcing.">How we evaluate Salesforce talent</SectionHeading>
        <div className="sf-assessment-grid"><ol className="sf-assessment-steps">{salesforceAssessment.map(([heading,body],index) => <li key={heading} data-sf-reveal><span>0{index + 1}</span><div><h3>{heading}</h3><p>{body}</p></div></li>)}</ol><aside className="sf-assessment-focus" data-sf-reveal><h3>Specific to the work.</h3><p>Agree checks that match the role and your backlog.</p><dl>{salesforceAssessmentFocus.map(([role,focus]) => <div key={role}><dt>{role}</dt><dd>{focus}</dd></div>)}</dl><div className="sf-assessment-output"><Icon kind="document"/><p><strong>The useful output</strong>Role fit, evidence reviewed and follow-up points for your interview.</p></div></aside></div>
      </div></section>

      <section className="sf-section sf-engagements" id="salesforce-engagements" aria-labelledby="sf-engagements-heading"><div className="sf-container">
        <SectionHeading id="sf-engagements-heading" description="Salesforce contract staffing gives your team an agreed allocation and working period. Our Salesforce staffing services support selection, onboarding and engagement coordination. As your Salesforce staffing agency, eThing coordinates the people and working arrangement while your team manages priorities and delivery. Confirm availability, responsibilities and terms before starting.">Flexible Engagement Models</SectionHeading>
        <div className="sf-model-grid">{salesforceModels.map((model,index) => <article className="sf-motion-card" key={model.number} data-sf-reveal style={{ '--sf-delay': index * 70 + 'ms' }}><div className="sf-model-top"><span className="sf-model-number">{model.number}</span><EngagementGraphic number={model.number}/></div><h3>{model.title}</h3><p>{model.fit}</p><ul className="sf-checklist">{model.points.map(item => <li key={item}><Icon kind="check" size={17}/>{item}</li>)}</ul></article>)}</div>
        <div className="sf-quote-panel" data-sf-reveal><div><h3>What affects your quote?</h3><p>We scope the requirement, check sourcing fit and discuss a proposal before the engagement begins.</p></div><div><ul className="sf-tags">{['Seniority','Specialisation','Hours & overlap','Working location','Duration'].map(item => <li key={item}>{item}</li>)}</ul><p>The proposal sets out the role, allocation, working arrangement, rate, billing, included support and any applicable charges.</p></div></div>
      </div></section>

      <section className="sf-section sf-process" id="salesforce-process" aria-labelledby="sf-process-heading"><div className="sf-container">
        <SectionHeading id="sf-process-heading" description="Know what your team owns and what eThing coordinates at each stage.">From your requirement to your team</SectionHeading>
        <table className="sf-process-table">
          <caption className="sf-sr-only">Who does what at each hiring stage</caption>
          <colgroup><col className="sf-process-stage-column"/><col/><col/></colgroup>
          <thead><tr><th scope="col">Stage</th><th scope="col">You</th><th scope="col">eThing</th></tr></thead>
          <tbody>{salesforceSteps.map((step,index) => <tr key={step.title}>
            <th scope="row"><div className="sf-process-stage"><span className="sf-step-number">0{index + 1}</span><h3>{step.title}</h3></div></th>
            <td>{step.client}</td><td>{step.ething}</td>
          </tr>)}</tbody>
        </table>
      </div></section>

      <section className="sf-section sf-faq" id="salesforce-faqs" aria-labelledby="sf-faq-heading"><div className="sf-container">
        <SectionHeading id="sf-faq-heading" description="Hiring, day-to-day working and the terms to clarify before starting.">Frequently Asked Questions</SectionHeading>
        <div className="sf-faq-notebook">{faqPages.map((questions,index) => <div className="sf-faq-page sf-faq-list" key={index}>{questions.map(([question,answer]) => <details key={question}><summary><span>{question}</span><span className="sf-faq-toggle" aria-hidden="true"><Icon kind="plus" size={14}/></span></summary><p>{answer}</p></details>)}</div>)}</div>
      </div></section>

      <section className="sf-section sf-enquiry" id="salesforce-next-steps" aria-labelledby="sf-enquiry-heading"><div className="sf-container sf-enquiry-grid"><div data-sf-reveal><h2 id="sf-enquiry-heading">Tell us which Salesforce skills you need</h2><p>Use the form above to share the role and a short description of the work. Here is how we take the conversation forward.</p><ol className="sf-next-steps">{[['Clarify the requirement','Understand the skills, scope, hours and preferred start.'],['Check sourcing feasibility','Discuss the experience and availability the role needs.'],['Discuss profiles and terms','Agree the next step, shortlist approach and proposed arrangement.']].map(([heading,body],index) => <li key={heading}><span>0{index + 1}</span><div><strong>{heading}</strong><p>{body}</p></div></li>)}</ol><div className="sf-next-step-cta"><CTA>Share your requirement</CTA></div></div><div className="sf-next-step-visual"><TeamIllustration/></div></div></section>

      <section className="about-copy-related" id="salesforce-related" aria-labelledby="sf-related-heading"><div className="about-copy-container" data-sf-reveal><h2 id="sf-related-heading" className="about-copy-related-title">Explore related services</h2><p className="about-copy-related-copy">Find the engineering service or hiring option that fits your requirements.</p><ul className="about-copy-related-links"><li><a href="/website-development">Website development</a></li><li><a href="/mobile_application">Mobile app development</a></li><li><a href="/hire-ai-developers">Hire AI developers</a></li></ul></div></section>
    </main>
    <CopyFooter activePath={route} optimizeMedia websiteStyle/>
    <CopyBackToTop/>
  </div>;
}
