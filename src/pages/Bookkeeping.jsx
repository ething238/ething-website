import Seo from '../components/Seo.jsx';
import '../styles/about-us.css';
import { useEffect, useRef, useState } from 'react';
import SiteHeader from '../components/SiteHeader.jsx';
import RelatedServices from '../components/RelatedServices.jsx';
import { CopyBackToTop } from '../components/website-development/Chrome.jsx';
import BookkeepingEnquiryForm from '../components/BookkeepingEnquiryForm.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import { bookkeepingFAQs, bookkeepingSEO, bookkeepingServices, bookkeepingSteps } from '../data/bookkeepingContent.js';
import styles from '../styles/bookkeeping.module.css';

function Icon({ kind, size = 24 }) {
  const paths = {
    book: <><path d="M4 4h7a3 3 0 0 1 3 3v14a4 4 0 0 0-4-2H4V4ZM14 7a3 3 0 0 1 3-3h4v15h-3a4 4 0 0 0-4 2M7 8h3M7 12h3M17 8h1M17 12h1"/></>,
    refresh: <><path d="M20 4v6h-6M4 20v-6h6M19 9A8 8 0 0 0 5 6M5 15a8 8 0 0 0 14 3"/></>,
    invoice: <><path d="M5 3h14v19l-3-2-4 2-4-2-3 2V3ZM8 7h8M8 11h5M8 15h8"/></>,
    layers: <><path d="m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 17l10 5 10-5"/></>,
    chart: <><path d="M4 3v18h17M8 16v-5m5 5V7m5 9V4"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    arrow: <path d="M5 19 19 5M5 5h14v14"/>,
    shield: <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="m8 12 3 3 5-6"/></>,
    connect: <><rect x="8" y="8" width="8" height="8" rx="2"/><path d="M12 2v6m0 8v6M2 12h6m8 0h6M4 4l4 4m8 8 4 4M20 4l-4 4M8 16l-4 4"/></>,
    folder: <><path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v10H3V6Z"/><path d="M8 13h8m-8 3h5"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind] || paths.book}</svg>;
}

function BooksDashboard() {
  return <div className="bk-dashboard-wrap" data-seo-ignore>
    <div className="bk-art-orbit" aria-hidden="true"/>
    <div className="bk-dashboard bk-operations">
      <div className="bk-dash-top"><span className="bk-dash-brand"><Icon kind="book" size={18}/> BOOKKEEPING OPERATIONS</span><span className="bk-demo-badge">MONTH-END CLOSE</span></div>
      <div className="bk-dash-heading"><div><small>FROM SOURCE RECORDS TO REPORTING</small><p className="bk-dash-title">Every record, connected.</p></div><Icon kind="connect" size={23}/></div>
      <div className="bk-dash-stats"><div><span>Transactions</span><strong>Organise</strong><small>Record & categorise</small></div><div><span>Accounts</span><strong>Reconcile</strong><small>Match & review</small></div><div><span>Reporting</span><strong>Prepare</strong><small>Explain & hand over</small></div></div>
      <div className="bk-workspace-flow" aria-label="Invoices, bank statements and receipts are organised into reviewed books and monthly reports">
        <div className="bk-source-docs">{[['invoice','Invoices & bills'],['folder','Bank statements'],['book','Receipts & records']].map(([icon,label],index)=><div key={label} style={{'--bk-delay':`${index*130}ms`}}><span><Icon kind={icon} size={20}/></span><strong>{label}</strong><Icon kind="check" size={15}/></div>)}</div>
        <div className="bk-flow-connector" aria-hidden="true"><span/><Icon kind="arrow" size={20}/></div>
        <div className="bk-close-pack"><span><Icon kind="chart" size={28}/></span><strong>Your monthly<br/>reporting pack</strong><small>Reports · balances · review notes</small></div>
      </div>
      <div className="bk-dash-bottom"><span><i/>A clear trail from entry to report</span><Icon kind="shield" size={17}/></div>
    </div>
    <div className="bk-floating-note"><span><Icon kind="check" size={22}/></span><div><strong>Clarity at every stage.</strong><small>Organised records. Useful reports.</small></div></div>
  </div>;
}

function ServiceDiagram({ kind }) {
  const rows = kind === 'invoices' ? [['Customer invoices', 'Record', 'good'], ['Supplier bills', 'Review', 'pending'], ['Ageing summary', 'Prepare', 'pending']] : kind === 'cleanup' ? [['Uncategorised entries', 'Reviewed', 'good'], ['Duplicate records', 'Checked', 'good'], ['Opening balances', 'In review', 'pending']] : kind === 'reconcile' ? [['Bank statement', 'Matched', 'good'], ['Card account', 'Matched', 'good'], ['Open items', 'For review', 'pending']] : kind === 'reports' ? [['Profit & loss', 'Prepared', 'good'], ['Balance sheet', 'Prepared', 'good'], ['Review notes', 'Included', 'good']] : [['Customer payment', 'Income', 'good'], ['Software subscription', 'Expense', 'neutral'], ['Supplier payment', 'Expense', 'neutral']];
  return <div className="bk-service-diagram" data-seo-ignore aria-label="Bookkeeping workflow"><div className="bk-diagram-top"><span><Icon kind={kind === 'reports' ? 'chart' : 'folder'} size={19}/> {kind === 'reconcile' ? 'ACCOUNT REVIEW' : kind === 'reports' ? 'MONTH-END PACK' : kind === 'cleanup' ? 'CLEAN-UP CHECKLIST' : kind === 'invoices' ? 'INVOICES & BILLS' : 'YOUR GENERAL LEDGER'}</span><i/></div><div className="bk-diagram-rows">{rows.map(([label, status, tone], index) => <div className="bk-ledger-row" style={{ '--bk-delay': `${index * 130}ms` }} key={label}><span className="bk-row-mark"><Icon kind={tone === 'pending' ? 'invoice' : 'check'} size={16}/></span><strong>{label}</strong><span className={`bk-status bk-status-${tone}`}>{status}</span></div>)}</div><div className="bk-diagram-end"><span className="bk-diagram-line"/><span><Icon kind="shield" size={16}/> Clear records. Clear next steps.</span></div></div>;
}

function ServiceExplorer() {
  const [active, setActive] = useState(0);
  function keydown(event, index) {
    const next = ['ArrowDown', 'ArrowRight'].includes(event.key) ? (index + 1) % bookkeepingServices.length : ['ArrowUp', 'ArrowLeft'].includes(event.key) ? (index - 1 + bookkeepingServices.length) % bookkeepingServices.length : event.key === 'Home' ? 0 : event.key === 'End' ? bookkeepingServices.length - 1 : null;
    if (next === null) return;
    event.preventDefault(); setActive(next); document.getElementById(`bk-tab-${next}`)?.focus();
  }
  return <div className="bk-explorer"><div className="bk-service-tabs" role="tablist" aria-label="Bookkeeping services" aria-orientation="vertical">{bookkeepingServices.map((item, index) => <button type="button" key={item.id} id={`bk-tab-${index}`} role="tab" aria-selected={index === active} aria-controls={`bk-panel-${index}`} tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => keydown(event, index)}><Icon kind={item.icon} size={22}/><span>{item.label}</span><span aria-hidden="true">↗</span></button>)}</div><div className="bk-service-panels">{bookkeepingServices.map((item, index) => <div role="tabpanel" id={`bk-panel-${index}`} aria-labelledby={`bk-tab-${index}`} hidden={index !== active} tabIndex={0} key={item.id}><div className="bk-service-content"><span className="bk-eyebrow">0{index + 1} / BOOKKEEPING SUPPORT</span><p className="bk-item-title">{item.title}</p><p>{item.description}</p><ul>{item.items.map(text => <li key={text}><Icon kind="check" size={17}/>{text}</li>)}</ul><a href="#bookkeeping-enquiry" className="bk-text-link">Discuss your requirements <Icon kind="arrow" size={16}/></a></div><ServiceDiagram kind={item.visual}/><div className="bk-service-output"><span>THE OUTCOME</span><strong>{item.output}</strong><Icon kind="arrow" size={18}/></div></div>)}</div><noscript><div className="bk-noscript">{bookkeepingServices.slice(1).map(item => <article key={item.id}><p className="bk-item-title">{item.label}</p><p>{item.description}</p><ul>{item.items.map(text => <li key={text}>{text}</li>)}</ul></article>)}</div></noscript></div>;
}

function WorkingTogether() {
  const handover = [
    { title: 'The records', client: 'Provide bank and card statements, invoices, receipts and the agreed source documents.', team: 'Record and categorise the agreed transactions, keeping questions together for review.' },
    { title: 'The review', client: 'Explain unusual entries and confirm business decisions or changes to your accounts.', team: 'Reconcile accounts, review differences and flag entries that need your input.' },
    { title: 'The close', client: 'Review the reports and resolve outstanding questions with your nominated contact.', team: 'Prepare the agreed reporting pack, reconciliation notes and a clear handover.' },
  ];
  return <section className="bk-section bk-working-together" id="bookkeeping-scope"><div className="bk-container"><div className="bk-section-head bk-reveal"><div><p className="bk-eyebrow">KNOW WHO DOES WHAT</p><h2>Clear responsibilities. Smoother handovers.</h2></div><p>Our bookkeeping services work alongside your team. Agree the information, review dates and responsibilities before the first month, so everyone knows what happens next. Your contact shares information and resolves open questions.</p></div><div className="bk-responsibilities bk-reveal"><table><caption className="bk-sr-only">Monthly bookkeeping responsibilities for your team and eThing</caption><thead><tr><th scope="col">Each month</th><th scope="col"><span>01 / YOUR TEAM</span>You provide the context.</th><th scope="col"><span>02 / eThing</span>We organise the records.</th></tr></thead><tbody>{handover.map(row => <tr key={row.title}><th scope="row">{row.title}</th><td>{row.client}</td><td>{row.team}</td></tr>)}</tbody></table></div><div className="bk-access-note bk-reveal"><Icon kind="shield" size={21}/><p><strong>Your systems. Agreed permissions.</strong> Before sharing records, we agree access, the document-sharing method and your approval process. Your team retains control of payments.</p></div></div></section>;
}

export default function Bookkeeping() {
  const root = useRef(null);
  const faqMidpoint = Math.ceil(bookkeepingFAQs.length / 2);
  useEffect(() => {
    if (!root.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('bk-in-view'); observer.unobserve(entry.target); } }), { threshold: 0.1 });
    root.current.querySelectorAll('.bk-reveal').forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return <div className={`about-us-copy ${styles.page}`} ref={root}>
    <Seo title={bookkeepingSEO.title} description={bookkeepingSEO.description} pathname="/bookkeeping" ogImage="/bookkeeping/bookkeeping-workspace.webp"/>
    <a className="bk-skip" href="#bookkeeping-main">Skip to content</a>
    <SiteHeader activePath="/bookkeeping" contactHref="#bookkeeping-enquiry"/>
    <main id="bookkeeping-main" data-seo-copy>
      <section className="bk-hero"><div className="bk-container bk-hero-grid"><div className="bk-hero-copy"><h1>Bookkeeping services for small businesses, <br/><em>with your business in focus.</em></h1><p className="bk-hero-intro">Our bookkeeping services bring structure to your daily transactions, reconciliations and monthly financial reports. Get a clear view of the numbers, with a routine built around your business and reporting needs.</p><div className="bk-hero-actions"><a className="bk-button" href="#bookkeeping-enquiry">Discuss bookkeeping services <Icon kind="arrow" size={18}/></a><a className="bk-text-link" href="#bookkeeping-services">Explore bookkeeping services <span aria-hidden="true">↓</span></a></div><p className="bk-hero-note"><Icon kind="check" size={17}/>Monthly bookkeeping services or a fresh start for your books.</p></div><BooksDashboard/></div></section>

      <section className="bk-section" id="bookkeeping-services"><div className="bk-container"><div className="bk-section-head bk-reveal"><div><p className="bk-eyebrow">SUPPORT THAT FITS YOUR BUSINESS</p><h2>Bookkeeping services, built around you.</h2></div><p>Small business bookkeeping starts with the work you need done. Our bookkeeping services cover everyday records, reconciliations and reporting, with catch-up support when your books need a fresh start.</p></div><div className="bk-reveal"><ServiceExplorer/></div></div></section>

      <section className="bk-section bk-process" id="bookkeeping-process"><div className="bk-container"><div className="bk-section-head bk-reveal"><div><p className="bk-eyebrow">A CONSISTENT MONTHLY RHYTHM</p><h2>How our monthly bookkeeping services work.</h2></div><p>Outsourced bookkeeping services work best with a clear rhythm. Know what information to share, when your input is needed and what to expect at the end of each month.</p></div><ol className="bk-process-grid">{bookkeepingSteps.map((step, index) => <li className="bk-reveal" key={step.title}><div className="bk-process-top"><span className="bk-step-icon"><Icon kind={step.icon} size={24}/></span><span className="bk-step-number">0{index + 1}</span><p className="bk-item-title">{step.title}</p><span className="bk-process-arrow" aria-hidden="true">→</span></div><p>{step.text}</p><div className="bk-step-output"><span>YOU GET</span><strong>{step.output}</strong></div></li>)}</ol></div></section>

      <section className="bk-section bk-visibility" id="bookkeeping-reports"><div className="bk-container bk-visibility-grid"><div className="bk-report-art bk-reveal" data-seo-ignore role="img" aria-label="Monthly reporting pack with a profit and loss report, a balance sheet, an ageing summary and review notes"><div className="bk-report-back"/><div className="bk-report-paper"><div className="bk-report-paper-top"><span className="bk-mini-logo"><Icon kind="book" size={22}/></span><span>MONTH-END<br/><strong>REPORTING PACK</strong></span><Icon kind="shield" size={20}/></div><p className="bk-report-title">The bigger picture.<br/><em>In one place.</em></p><div className="bk-report-lines"><div><Icon kind="chart" size={18}/><span>Profit & loss</span><i>01</i></div><div><Icon kind="layers" size={18}/><span>Balance sheet</span><i>02</i></div><div><Icon kind="invoice" size={18}/><span>Ageing summary</span><i>03</i></div><div><Icon kind="book" size={18}/><span>Review notes</span><i>04</i></div></div><div className="bk-report-footer">Prepared for your next conversation. <span>↗</span></div></div><span className="bk-report-tag"><span/>Organised. Reviewed. Ready.</span></div><div className="bk-visibility-copy bk-reveal"><p className="bk-eyebrow">LESS CHASING. MORE VISIBILITY.</p><h2>A clearer picture at month end.</h2><p>Good bookkeeping services give you more than a set of entries. Your monthly reporting pack brings the agreed accounts, reporting period and open questions together, ready for a useful conversation.</p><div className="bk-benefits">{[{ title: 'See the full picture', text: 'Review income, expenses and balances for a consistent reporting period.' }, { title: 'Keep track of what is outstanding', text: 'Understand unpaid invoices, supplier bills and items waiting for clarification.' }, { title: 'Make handover easier', text: 'Give your accountant or internal team organised records and a clear trail of review notes.' }].map(item => <div key={item.title}><span><Icon kind="check" size={18}/></span><div><p className="bk-item-title">{item.title}</p><p>{item.text}</p></div></div>)}</div><a className="bk-text-link" href="#bookkeeping-enquiry">Talk through your reporting needs <Icon kind="arrow" size={17}/></a></div></div></section>

      <section className="bk-section bk-engagement"><div className="bk-container"><div className="bk-section-head bk-reveal"><div><p className="bk-eyebrow">START WHERE YOU ARE</p><h2>Outsourced bookkeeping services, your way.</h2></div><p>Choose bookkeeping services around the condition of your records today. Start with regular monthly support or a focused project to bring overdue periods up to date.</p></div><div className="bk-engagement-grid"><article className="bk-reveal"><span className="bk-model-label">01 / ONGOING</span><p className="bk-item-title">Keep your books in order.</p><p>Choose monthly bookkeeping services for a consistent routine: agreed accounts, recurring tasks and a reporting schedule your team can plan around.</p><ul><li><Icon kind="check" size={17}/>Defined accounts and recurring tasks</li><li><Icon kind="check" size={17}/>Agreed month-end reporting schedule</li><li><Icon kind="check" size={17}/>A clear list of questions and open items</li></ul><a className="bk-text-link" href="#bookkeeping-enquiry">Discuss monthly bookkeeping services <Icon kind="arrow" size={17}/></a></article><article className="bk-reveal"><span className="bk-model-label">02 / CATCH-UP & CLEAN-UP</span><p className="bk-item-title">Bring your records up to date.</p><p>Our catch-up bookkeeping services cover agreed historical periods. Review missing records, corrections and reconciliations before moving into an ongoing routine.</p><ul><li><Icon kind="check" size={17}/>Review of your current records</li><li><Icon kind="check" size={17}/>An agreed backlog and correction scope</li><li><Icon kind="check" size={17}/>A documented handover and next steps</li></ul><a className="bk-text-link" href="#bookkeeping-enquiry">Discuss a fresh start <Icon kind="arrow" size={17}/></a></article></div><div className="bk-software-note bk-reveal"><span><Icon kind="connect" size={28}/></span><div><p className="bk-item-title">Already have an accounting system?</p><p>Bookkeeping services should fit your existing setup. Tell us what you use; we confirm software compatibility and access requirements before starting.</p></div><a href="#bookkeeping-enquiry" className="bk-text-link">Let’s discuss your setup <Icon kind="arrow" size={17}/></a></div></div></section>

      <WorkingTogether/>
      <section className="bk-section bk-faq-section" id="bookkeeping-faq"><div className="bk-container bk-faq-grid"><div className="bk-faq-heading bk-reveal"><h2>Frequently Asked Questions</h2><p>Practical details about our bookkeeping services, the information we need, and getting started.</p></div><div className="bk-faq-columns">{[bookkeepingFAQs.slice(0, faqMidpoint), bookkeepingFAQs.slice(faqMidpoint)].map((column, columnIndex) => <div className="bk-faqs" key={columnIndex}>{column.map((faq, index) => <details className="bk-reveal" style={{ '--bk-faq-row': index + 1 }} key={faq.question}><summary><span className="bk-faq-number" aria-hidden="true">{String(columnIndex * faqMidpoint + index + 1).padStart(2, '0')}</span><span className="bk-faq-question">{faq.question}</span><span className="bk-faq-plus" aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>)}</div></div></section>

      <section className="bk-section bk-enquiry" id="bookkeeping-enquiry"><div className="bk-container bk-enquiry-grid"><div className="bk-enquiry-copy bk-reveal"><p className="bk-eyebrow">A CLEARER ROUTINE STARTS WITH A CONVERSATION</p><h2>Let’s get your books in order.</h2><p>Discuss our bookkeeping services with a few details about your business. Tell us where your records stand today, the support you need and when you would like to start.</p><ol className="bk-enquiry-steps"><li><span>01</span>Share your current setup and requirements.</li><li><span>02</span>Review the work, responsibilities and fees.</li><li><span>03</span>Agree a plan before getting started.</li></ol><div className="bk-direct-contact"><span>Prefer to email us?</span><a href="mailto:support@ething.in">support@ething.in <Icon kind="arrow" size={18}/></a></div></div><div className="bk-reveal"><BookkeepingEnquiryForm/></div></div></section>
      <div id="bookkeeping-related"><RelatedServices pathname="/bookkeeping" nativeLinks links={[
        { path: '/website-development', label: 'Website development' },
        { path: '/software_development', label: 'Custom software development' },
        { path: '/cloud_services', label: 'Cloud engineering and migration' },
      ]}/></div>
    </main>
    <SiteFooter/><CopyBackToTop/>
  </div>;
}
