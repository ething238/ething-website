import { Helmet as Head } from 'react-helmet-async';
import '../styles/about-us.css';
import '../styles/footer-brand.css';
import '../styles/ai-staff-augmentation.css';
import { useEffect, useRef, useState } from 'react';
import SiteHeader from '../components/SiteHeader.jsx';
import { CopyFooter, CopyBackToTop } from '../components/website-development/Chrome.jsx';
import AIConsultationForm from '../components/ai-staff/AIConsultationForm.jsx';
import { aiSkills, aiReasons, aiFaqs, aiIndustries } from '../data/aiStaffContent.js';

const canonical = 'https://www.ethingsolutions.com/ai_staff_augmentation';

function Icon({ kind }) {
  const paths = {
    spark: <><path d="m12 3 2.7 6.3L21 12l-6.3 2.7L12 21l-2.7-6.3L3 12l6.3-2.7L12 3Z"/><path d="m20 2 .8 2.2L23 5l-2.2.8L20 8l-.8-2.2L17 5l2.2-.8Z"/></>,
    nodes: <><circle cx="12" cy="12" r="3"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="20" r="2"/><path d="m6 6 4 4m4 4 4 4m-4-8 4-4M6 18l4-4"/></>,
    message: <><path d="M21 11a9 9 0 0 1-9 9H3v-9a9 9 0 0 1 18 0Z"/><path d="M7 9h10M7 13h7"/></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/></>,
    cloud: <><path d="M6 18a5 5 0 0 1-1-10 7 7 0 0 1 13-1 5.5 5.5 0 0 1 0 11h-2M12 22V12m-4 4 4-4 4 4"/></>,
  };
  return <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind]}</svg>;
}
function CTA({ children = 'Find your AI expertise', secondary = false }) { return <a className={`ais-button${secondary ? ' ais-button-outline' : ''}`} href="#consultation">{children}<span aria-hidden="true">↗</span></a>; }
function ReasonGraphic({ index }) {
  const artwork = [
    <><g className="ais-graphic-source"><rect x="5" y="10" width="28" height="37" rx="4" fill="#edf5f2"/><path d="M12 20h14M12 27h10M12 34h8"/></g><path d="M37 28h17m-5-5 5 5-5 5"/><g className="ais-graphic-target"><rect x="60" y="10" width="39" height="37" rx="5" fill="#e6eff8"/><path d="m69 24-4 4 4 4m20-8 4 4-4 4m-13 7 7-22"/></g><circle className="ais-reason-packet" cx="37" cy="28" r="3" fill="#15977f" stroke="#fff"/></>,
    <><g className="ais-graphic-source"><circle cx="22" cy="19" r="8" fill="#edf5f2"/><path d="M7 47v-5a15 15 0 0 1 30 0v5"/></g><g className="ais-graphic-target"><circle cx="82" cy="19" r="8" fill="#e6eff8"/><path d="M67 47v-5a15 15 0 0 1 30 0v5"/></g><path d="M41 25h23M41 32h17"/><g className="ais-graphic-check"><circle cx="53" cy="45" r="9" fill="#c7eddd"/><path d="m49 45 3 3 5-6"/></g><circle className="ais-reason-packet" cx="41" cy="25" r="3" fill="#15977f" stroke="#fff"/></>,
    <><g className="ais-graphic-source"><rect x="5" y="12" width="29" height="34" rx="4" fill="#e6eff8"/><path d="M12 22h14M12 29h10M12 36h7"/></g><path d="M38 29h18m-5-5 5 5-5 5"/><rect x="63" y="8" width="37" height="42" rx="4" fill="#edf5f2"/><path d="M63 19h37M75 19v31M87 19v31M68 26h3M79 26h4M91 26h4M79 33h4M91 33h4M91 40h4"/><rect className="ais-workflow-task" x="77" y="30" width="8" height="6" rx="2" fill="#15977f" stroke="none"/><circle className="ais-reason-packet" cx="38" cy="29" r="3" fill="#15977f" stroke="#fff"/></>,
    <><g className="ais-graphic-source"><rect x="6" y="21" width="21" height="21" rx="4" fill="#edf5f2"/></g><path d="M34 31h19m-5-5 5 5-5 5"/><g className="ais-scale-tile"><rect x="61" y="8" width="16" height="16" rx="3" fill="#e6eff8"/></g><g className="ais-scale-tile"><rect x="83" y="8" width="16" height="16" rx="3" fill="#edf5f2"/></g><g className="ais-scale-tile"><rect x="61" y="30" width="16" height="16" rx="3" fill="#edf5f2"/></g><g className="ais-scale-tile"><rect x="83" y="30" width="16" height="16" rx="3" fill="#e6eff8"/></g><circle className="ais-reason-packet" cx="34" cy="31" r="3" fill="#15977f" stroke="#fff"/></>,
  ];
  const labels = ['Match product requirements with engineering skills', 'Meet and assess the engineers joining your team', 'Connect engineering work with your existing delivery workflow', 'Scale from one specialist to a complementary team'];
  return <svg className="ais-reason-graphic" width="104" height="58" viewBox="0 0 104 58" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={labels[index]}>{artwork[index]}</svg>;
}
function ApplicationMap() {
  return <div className="ais-application-map" role="img" aria-label="Animated flow connecting documents and data to an AI model and then to a useful application">
    <svg viewBox="0 0 470 320" fill="none" aria-hidden="true">
      <defs><linearGradient id="ais-map-shade" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e8f4ee"/><stop offset="1" stopColor="#ecf1fa"/></linearGradient></defs>
      <rect x="1" y="1" width="468" height="318" rx="12" fill="url(#ais-map-shade)" stroke="#d6e3df"/>
      <g stroke="#4d8c80" strokeWidth="1.5">
        <path className="ais-flow-line" d="M104 75h46c40 0 5 82 45 82M104 247h46c40 0 5-90 45-90M285 157h55"/>
        <g className="ais-map-documents"><rect x="20" y="38" width="84" height="74" rx="9" fill="#fff"/><path d="M36 59h50M36 74h42M36 89h34"/></g>
        <g className="ais-map-data"><rect x="20" y="210" width="84" height="74" rx="9" fill="#fff"/><ellipse cx="62" cy="230" rx="23" ry="8"/><path d="M39 230v32c0 10 46 10 46 0v-32M39 246c0 10 46 10 46 0"/></g>
        <circle className="ais-model-ring" cx="240" cy="157" r="49" stroke="#15977f" strokeWidth="2"/>
        <rect x="195" y="112" width="90" height="90" rx="20" fill="#fff"/>
        <path className="ais-model-spark" d="m240 127 10 20 20 10-20 10-10 20-10-20-20-10 20-10Z" fill="#d2eee4"/>
        <g className="ais-map-output"><rect x="340" y="112" width="110" height="90" rx="10" fill="#fff"/><path d="M340 134h110M355 123h3m7 0h3m-12 27h25m-25 14h69m-69 14h42"/><path className="ais-output-check" d="m416 178 6 6 12-15" stroke="#15977f" strokeWidth="3"/></g>
        <path d="m330 151 10 6-10 6"/>
      </g>
      <g fill="#15977f" stroke="#fff" strokeWidth="2">
        <circle className="ais-map-packet ais-map-packet-docs" r="5" cx="104" cy="75"/>
        <circle className="ais-map-packet ais-map-packet-data" r="5" cx="104" cy="247"/>
        <circle className="ais-map-packet ais-map-packet-output" r="5" cx="285" cy="157"/>
      </g>
      <g fill="#466b69" fontFamily="Arial,sans-serif" fontSize="16" textAnchor="middle"><text x="62" y="138">Documents</text><text x="62" y="308">Data</text><text x="240" y="238">AI model</text><text x="395" y="238">Application</text></g>
    </svg>
  </div>;
}
function SectionHead({ title, body, id }) { return <div className="ais-section-head"><div><h2 id={id}>{title}</h2></div>{body && <p>{body}</p>}</div>; }

export default function AIStaffAugmentation() {
  const pageRef = useRef(null);
  const [storyView, setStoryView] = useState(0);
  useEffect(() => {
    const page = pageRef.current;
    const header = page?.querySelector('header');
    if (!page || !header) return undefined;
    const measure = () => page.style.setProperty('--ais-header-offset', `${header.getBoundingClientRect().height}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const root=pageRef.current;
    if (!root || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('ais-in-view');observer.unobserve(entry.target);}}),{threshold:0.12});
    const targets=root.querySelectorAll('.ais-section-head, .ais-partnership-grid, .ais-skills-grid article, .ais-apps-grid>div, .ais-industries-grid article, .ais-process li, .ais-story-editorial, .ais-faq-list, .ais-form-card');
    targets.forEach((target,index)=>{target.classList.add('ais-reveal');target.style.setProperty('--ais-reveal-delay',`${index%3*70}ms`);observer.observe(target);});
    return ()=>observer.disconnect();
  }, []);
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': canonical, url: canonical, name: 'AI Staff Augmentation | Hire AI Engineers | eThing', description: 'Extend your team with AI, ML, data and MLOps specialists from eThing. Explore skills, flexible engagements and a free consultation.', breadcrumb: { '@id': `${canonical}#breadcrumb` } },
    { '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.ethingsolutions.com/' }, { '@type': 'ListItem', position: 2, name: 'AI Staff Augmentation', item: canonical }] },
    { '@type': 'Service', name: 'AI staff augmentation', serviceType: 'AI engineering staff augmentation', url: canonical, provider: { '@type': 'Organization', name: 'eThing', url: 'https://www.ethingsolutions.com/' } },
  ] };
  return <div className="ais-page" ref={pageRef}>
    <Head>
      <title>AI Staff Augmentation | Hire AI Engineers | eThing</title>
      <link rel="icon" type="image/png" href="/ai-staff/optimized/favicon-48.png"/>
      <meta name="description" content="Hire AI engineers, machine learning specialists and data talent with eThing. Build your team through flexible AI staff augmentation. Book a free consultation."/>
      <link rel="canonical" href={canonical}/><meta property="og:type" content="website"/><meta property="og:title" content="AI Staff Augmentation | Your Team, Extended | eThing"/><meta property="og:description" content="Find the AI, machine learning and data expertise your next milestone needs."/><meta property="og:url" content={canonical}/><meta property="og:image" content="https://www.ethingsolutions.com/ai-staff/ai-engineering-people-hero.webp"/><meta name="twitter:card" content="summary_large_image"/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/>
    </Head>
    <a className="ais-skip" href="#ais-main">Skip to content</a>
    <SiteHeader activePath="/ai_staff_augmentation" contactHref="#consultation" optimizeMedia/>
    <main id="ais-main">
      <section className="ais-hero" aria-labelledby="ais-title">
        <img className="ais-hero-image" src="/ai-staff/optimized/hero-1200.webp" srcSet="/ai-staff/optimized/hero-480.webp 480w, /ai-staff/optimized/hero-800.webp 800w, /ai-staff/optimized/hero-1200.webp 1200w, /ai-staff/optimized/hero-1672.webp 1672w" sizes="100vw" alt="" width="1672" height="940" fetchPriority="high" decoding="async"/>
        <div className="ais-container ais-hero-grid">
          <div className="ais-hero-copy">
            <h1 id="ais-title">AI staff <br/><span>augmentation.</span></h1>
            <p className="ais-hero-lede">You have an idea worth building. We bring the AI developers who help you move it forward. Hire AI engineers through staff augmentation to share the challenge, work alongside your team and turn complex ideas into useful software.</p>
            <div className="ais-actions"><CTA>Build your AI team</CTA><a className="ais-text-link" href="#expertise">Explore the expertise <span aria-hidden="true">↓</span></a></div>
            <div className="ais-hero-proof"><span>Interview before you choose</span><span>Flexible engagements</span><span>Your tools & workflow</span></div>
          </div>
          <div className="ais-hero-visual" aria-hidden="true"><img className="ais-hero-mobile-image" src="/ai-staff/optimized/hero-1200.webp" srcSet="/ai-staff/optimized/hero-480.webp 480w, /ai-staff/optimized/hero-800.webp 800w, /ai-staff/optimized/hero-1200.webp 1200w, /ai-staff/optimized/hero-1672.webp 1672w" sizes="100vw" alt="" width="1672" height="940" decoding="async"/></div>
        </div>
      </section>

      <section className="ais-clients" aria-labelledby="ais-clients-title"><div className="ais-container ais-clients-grid"><div><h2 id="ais-clients-title">Companies we have <br/>worked with</h2></div><ul>{[['AIONOS','/ai-staff/optimized/aionos.webp'], ['SalisPay','/ai-staff/clients/salispay.svg'], ['Credopay','/ai-staff/clients/credopay.svg']].map(([name, file]) => <li key={name}><img src={file} alt={name} width="160" height="58" loading="lazy" decoding="async"/></li>)}</ul></div></section>


      <section className="ais-section ais-why" id="why-ething" aria-labelledby="ais-why-title"><div className="ais-container">
        <SectionHead id="ais-why-title" title="Why teams choose eThing" body="The right people make ambitious work feel possible. Our staffing solution brings technical understanding and a shared commitment to your AI product development goals."/>
        <div className="ais-partnership-grid"><figure className="ais-partnership-photo"><img src="/ai-staff/optimized/collaboration-920.webp" srcSet="/ai-staff/optimized/collaboration-600.webp 600w, /ai-staff/optimized/collaboration-920.webp 920w, /ai-staff/optimized/collaboration-1448.webp 1448w" sizes="(max-width: 850px) calc(100vw - 48px), 43vw" alt="Generated photograph of engineering professionals sharing ideas around a laptop" width="1448" height="1086" loading="lazy" decoding="async"/><figcaption>Good work starts with people who understand the challenge.</figcaption></figure><div className="ais-reasons">{aiReasons.map((reason,i) => <article key={reason.title}><ReasonGraphic index={i}/><p className="ais-item-title">{reason.title}</p><p>{reason.body}</p></article>)}</div></div>
        <div className="ais-why-note"><span aria-hidden="true">↗</span><p>Comparing artificial intelligence development companies? Choose an engagement that matches the ownership you need. Our staff augmentation model keeps your team in control of delivery.</p><a href="/about_us">Get to know eThing <span aria-hidden="true">↗</span></a></div>
      </div></section>

      <section className="ais-section ais-skills" id="expertise" aria-labelledby="ais-skills-title"><div className="ais-container">
        <SectionHead id="ais-skills-title" title="Skills our AI engineers bring" body="AI engineers bring more than model knowledge. Build a team that connects data, software and production systems with the right expertise at each stage."/>
        <div className="ais-skills-grid">{aiSkills.map(skill => <article key={skill.title}><div className="ais-card-heading"><div className="ais-skill-icon"><Icon kind={skill.icon}/></div><p className="ais-item-title">{skill.title}</p></div><p>{skill.body}</p><ul aria-label={`${skill.title} technologies`}>{skill.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></article>)}</div>
      </div></section>

      <section className="ais-section ais-applications" aria-labelledby="ais-apps-title"><img className="ais-applications-backdrop" src="/ai-staff/optimized/hardware-1200.webp" srcSet="/ai-staff/optimized/hardware-768.webp 768w, /ai-staff/optimized/hardware-1200.webp 1200w, /ai-staff/optimized/hardware-1672.webp 1672w" sizes="100vw" alt="" width="1672" height="941" loading="lazy" decoding="async"/><div className="ais-container ais-apps-grid"><div className="ais-application-copy"><h2 id="ais-apps-title">Where your ambition <br/>meets application.</h2><p>From an internal tool to a customer-facing feature, building AI products requires clear goals, reliable data and a plan for evaluation. Start with the problem your users need solved.</p><ApplicationMap/></div><div className="ais-usecases">{[
          ['Enterprise knowledge','Grounded search and document assistants that help people find relevant information, with permissions and source references built into the workflow.'],
          ['Financial operations','Document processing, risk signals and analyst tools that support human decisions, with traceability and testing aligned to business requirements.'],
          ['Life sciences research','Discuss machine learning in drug discovery, from research data preparation to reproducible experiments, under your scientific team’s direction and validation.'],
          ['Intelligent products','Recommendations, demand forecasting and vision features integrated into the applications your customers and operations teams use.'],
        ].map(([title,body],i) => <article key={title}><span>0{i+1}</span><div><p className="ais-item-title">{title}</p><p>{body}</p></div></article>)}</div></div></section>

      <section className="ais-section ais-industries" id="industries" aria-labelledby="ais-industries-title"><div className="ais-container">
        <SectionHead id="ais-industries-title" title="Industries we serve through AI talent" body="Bring specialist engineering into the context of your industry. We align roles with your data, operating environment and delivery priorities, with domain requirements reviewed before engagement."/>
        <div className="ais-industries-grid">{aiIndustries.map((industry,index) => <article key={industry.name}><div className="ais-industry-top"><span className="ais-industry-icon"><Icon kind={industry.icon}/></span><p className="ais-item-title">{industry.name}</p><span className="ais-number">0{index+1}</span></div><p>{industry.body}</p><div className="ais-industry-focus">{industry.focus}</div></article>)}</div>
      </div></section>

      <section className="ais-section ais-engagement" id="engagement" aria-labelledby="ais-engage-title"><div className="ais-container">
        <SectionHead id="ais-engage-title" title="How AI staff augmentation works" body="Hire AI developers through a practical process that makes room for technical fit, shared expectations and a considered start."/>
        <ol className="ais-process">{[
          ['Define the work','To hire AI engineers, tell us what you are building, where the skills gap sits and how your team works. We align on the role, stack, seniority and collaboration hours.'],
          ['Meet your shortlist','Review relevant profiles and interview the people you could work with. Assess technical thinking and communication against the actual role.'],
          ['Agree the engagement','Choose the engineer and confirm scope, duration, pricing, confidentiality and ownership terms. Plan access, onboarding and your first priorities.'],
          ['Build together','Bring AI developers into your sprint rhythm and code reviews. Review the engagement as your roadmap evolves, with eThing available for staffing support.'],
        ].map(([title,body],i) => <li key={title}><div className="ais-process-top"><span className="ais-step-number">0{i+1}</span><ReasonGraphic index={i}/></div><p className="ais-item-title">{title}</p><p>{body}</p></li>)}</ol>
        <div className="ais-models"><p className="ais-item-title">Choose how we work together</p><p><strong>Individual specialist</strong> for a defined skill gap. <strong>Dedicated team</strong> for complementary expertise. <strong>Contract staffing</strong> for an agreed project period. We shape the proposal around your needs and candidate availability.</p></div>
      </div></section>

      <section className="ais-section ais-success" id="success-story" aria-labelledby="ais-success-title"><div className="ais-container">
        <SectionHead id="ais-success-title" title="Success Story"/>
        <div className="ais-story-editorial"><div className="ais-story-narrative"><p className="ais-story-title">Helping support teams <br/>find the right answers.</p><p className="ais-story-intro">A simple example of how AI helps a support team use its company guides.</p><div className="ais-story-summary"><div><p className="ais-story-step">The problem</p><p>Support agents search through separate files to answer a customer’s question.</p></div><div><p className="ais-story-step">The solution</p><p>Our AI developers bring those documents into one assistant. Staff ask a question and see an answer with a link to the relevant guide.</p></div><div><p className="ais-story-step">The result</p><p>An answer and its supporting guide appear in one place. Staff know what to do next and when to ask a person for help.</p></div></div></div>
          <div className="ais-story-product"><div className="ais-story-product-top"><span className="ais-product-mark" aria-hidden="true"><Icon kind="spark"/></span><p className="ais-product-heading">Customer support assistant</p><span className="ais-demo-label">Example</span></div><div className="ais-story-controls" role="tablist" aria-label="See how the support assistant works">{['Ask a question', 'See the source', 'Use it at work'].map((label,index) => <button type="button" role="tab" id={`ais-story-tab-${index}`} aria-selected={storyView===index} aria-controls={`ais-story-panel-${index}`} tabIndex={storyView===index?0:-1} key={label} onClick={()=>setStoryView(index)} onKeyDown={event=>{const next=event.key==='ArrowRight'?(index+1)%3:event.key==='ArrowLeft'?(index+2)%3:event.key==='Home'?0:event.key==='End'?2:null;if(next!==null){event.preventDefault();setStoryView(next);document.getElementById(`ais-story-tab-${next}`)?.focus();}}}><span className="ais-story-tab-icon" aria-hidden="true"><Icon kind={["message", "database", "cloud"][index]}/></span><span>{label}</span></button>)}</div>
          {[0,1,2].map(panelIndex => <div key={panelIndex} role="tabpanel" id={`ais-story-panel-${panelIndex}`} aria-labelledby={`ais-story-tab-${panelIndex}`} hidden={storyView!==panelIndex} className="ais-story-panel" tabIndex={0}>
            {panelIndex===0 && <><div className="ais-demo-person"><span aria-hidden="true"><Icon kind="message"/></span><p>How can a customer reset their password?</p></div><div className="ais-demo-answer"><span className="ais-demo-spark" aria-hidden="true">✳</span><div><p className="ais-item-title">Use the password reset guide.</p><p>Ask the customer to choose “Forgot password” on the sign-in page. They can use the email link to set a new password. If they cannot access their email, contact the support team.</p><div className="ais-source-chips"><span>Password reset guide</span><span>Support contact details</span></div></div></div><p className="ais-demo-caption">The answer includes a link to the company document it uses.</p></>}
            {panelIndex===1 && <><p className="ais-demo-panel-label">Show where the answer came from.</p><ul className="ais-evidence-list"><li><span>01</span><div><strong>Use company documents</strong><p>The assistant looks for answers in the guides your team has chosen. Staff can open the original file and read the instructions.</p></div></li><li><span>02</span><div><strong>Keep private files private</strong><p>People only see information they are allowed to access. A support agent does not need access to every company file.</p></div></li><li><span>03</span><div><strong>Ask a person when needed</strong><p>If the documents do not answer the question, the assistant points the user to the right person instead of guessing.</p></div></li></ul></>}
            {panelIndex===2 && <><p className="ais-demo-panel-label">Make it easy for the team to use.</p><ul className="ais-handover-list">{['Ask questions in everyday language','Open the document behind an answer','Send unanswered questions to a person','Keep company guides up to date'].map(item=><li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><p className="ais-demo-caption">The tool supports the team. People still handle questions that need judgement.</p></>}
          </div>)}<div className="ais-story-product-bottom"><span>ASK</span><i/><span>FIND</span><i/><span>CHECK</span></div></div></div>
      </div></section>

      <section className="ais-section ais-faqs" id="faqs" aria-labelledby="ais-faq-title"><div className="ais-container"><SectionHead id="ais-faq-title" title="Frequently Asked Questions" body="Make your next team decision with a clearer picture of the process."/><div className="ais-faq-columns">{[aiFaqs.slice(0,4),aiFaqs.slice(4)].map((column,columnIndex)=><div className="ais-faq-list" key={columnIndex}>{column.map((faq,index)=><details key={faq.question}><summary><span className="ais-faq-number">{String(columnIndex*4+index+1).padStart(2,'0')}</span><span className="ais-faq-question">{faq.question}</span><span className="ais-faq-plus" aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>)}</div></div></section>

      <section className="ais-section ais-consultation" id="consultation" aria-labelledby="ais-consult-title"><div className="ais-container ais-consult-grid"><div><h2 id="ais-consult-title">Book a free <br/><span>consultation.</span></h2><p>Bring your roadmap, your questions or just an idea. We’ll discuss the expertise you need, the way your team works and an engagement that makes sense.</p><ul><li>Discuss the role and technical requirements</li><li>Explore team structure and collaboration</li><li>Understand the next steps and proposal</li></ul></div><AIConsultationForm/></div></section>
      <div className="about-us-copy ais-site-chrome"><section className="about-copy-related" id="other-services" aria-labelledby="ais-related-title"><div className="about-copy-container"><h2 id="ais-related-title" className="about-copy-related-title">Explore related services</h2><p className="about-copy-related-copy">Find the engineering service or hiring option that fits your requirements.</p><ul className="about-copy-related-links"><li><a href="https://www.ethingsolutions.com/website-development">Website development</a></li><li><a href="https://www.ethingsolutions.com/hire-developers">Hire software developers</a></li><li><a href="https://www.ethingsolutions.com/cloud_services">Cloud engineering and migration</a></li></ul></div></section></div>
    </main>
    <div className="about-us-copy ais-site-chrome"><CopyFooter activePath="/ai_staff_augmentation" preferLiveLinks optimizeMedia/></div>
    <CopyBackToTop/>
  </div>;
}
