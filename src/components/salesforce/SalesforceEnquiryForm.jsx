import { useEffect, useRef, useState } from 'react';
import { leadDeliveryError, submitLeadRequest } from '../website-development/leadDelivery.js';
const gaMeasurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-2W7W1TB2H4';

const route = '/salesforce-staff-augmentation';
function track(event) {
  window.dataLayer = window.dataLayer || [];
  const details = { landing_page: route, form_name: 'salesforce_enquiry' };
  window.dataLayer.push({ event, ...details });
  const sendToAnalytics = typeof window.gtag === 'function' ? window.gtag : function () {
    window.dataLayer.push(arguments);
  };
  sendToAnalytics('event', event, { ...details, send_to: gaMeasurementId });
}

export default function SalesforceEnquiryForm({ selectedRole, onRoleChange } = {}) {
  const [localRole, setLocalRole] = useState('Help me decide');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const sending = useRef(false);
  const started = useRef(false);
  const card = useRef(null);
  useEffect(() => {
    if (!card.current || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { track('lead_form_view'); observer.disconnect(); }
    }, { threshold: 0.15 });
    observer.observe(card.current);
    return () => observer.disconnect();
  }, []);

  async function submit(event) {
    event.preventDefault();
    if (sending.current || status === 'success') return;
    const values = Object.fromEntries([...new FormData(event.currentTarget)].map(([key, value]) => [key, value.trim()]));
    if (values.botcheck) return;
    if (!values.name || !values.email || !values.phone || !values.projectDetails || values.consent !== 'agreed') {
      setError('Please complete the required fields and agree to be contacted.'); return;
    }
    sending.current = true; setStatus('loading'); setError(''); track('lead_form_submit');
    try {
      const query = new URLSearchParams(window.location.search);
      const attribution = Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].map(key => [key, query.get(key) || '']));
      const message = 'Salesforce team enquiry\n\n' + [
        ['Name', values.name], ['Work email', values.email], ['Company', values.company],
        ['Phone', values.phone], ['Expertise', values.hiringNeed], ['Requirements', values.projectDetails],
        ['Preferred start date', values.startDate], ['Time zone', values.timeZone],
        ['Source page', route], ...Object.entries(attribution),
      ].filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`).join('\n');
      await submitLeadRequest({ ...values, ...attribution, message, hiringNeed: 'Salesforce: ' + values.hiringNeed, landingPage: route });
      setStatus('success'); track('lead_form_success'); track('generate_lead');
    } catch (failure) { setStatus('error'); setError(failure.message || leadDeliveryError); track('lead_form_error'); }
    finally { sending.current = false; }
  }

  return <div className="sf-form-card" ref={card}>
    {status === 'success' ? <div role="status" className="sf-form-success"><span aria-hidden="true">✓</span><p className="sf-form-title">Your enquiry has been sent.</p><p>Thank you for sharing your requirements. Our team will contact you to discuss the next steps.</p><button type="button" className="sf-button" onClick={() => setStatus('idle')}>Send another enquiry <span aria-hidden="true">↗</span></button></div> : <form onSubmit={submit} onInput={() => { if (!started.current) { started.current = true; track('lead_form_start'); } }} aria-label="Salesforce talent enquiry">
      <p className="sf-form-title">Discuss your requirement</p>
      <fieldset disabled={status === 'loading'}><legend className="sf-sr-only">Contact details and requirements</legend>
        <div className="sf-form-grid">
          <label htmlFor="sf-name">Full name *<input id="sf-name" name="name" autoComplete="name" placeholder="Your name" required pattern=".*\S.*" maxLength={100}/></label>
          <label htmlFor="sf-email">Work email *<input id="sf-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254}/></label>
          <label className="sf-wide sf-contact-pair" htmlFor="sf-phone">Phone number *<input id="sf-phone" name="phone" type="tel" autoComplete="tel" placeholder="Country code + number" required pattern=".*\S.*" maxLength={40}/></label>
          <label className="sf-wide sf-contact-pair" htmlFor="sf-role">Required role<select id="sf-role" name="hiringNeed" value={selectedRole || localRole} onChange={event => { setLocalRole(event.target.value); onRoleChange?.(event.target.value); }}>{['Help me decide', 'Developer', 'Administrator', 'Solution architect', 'Functional consultant', 'QA specialist', 'Cloud or integration specialist', 'Multiple professionals'].map(role => <option key={role}>{role}</option>)}</select></label>
          <label className="sf-wide" htmlFor="sf-brief">What does your team need? *<textarea id="sf-brief" name="projectDetails" rows={2} required maxLength={2048} placeholder="Your cloud products, skills, team size and preferred start date"/></label>
        </div>
        <details className="sf-optional-details"><summary>Add optional details <span aria-hidden="true">+</span></summary><div className="sf-form-grid">
          <label className="sf-wide" htmlFor="sf-company">Company <span>(optional)</span><input id="sf-company" name="company" autoComplete="organization" placeholder="Company name" maxLength={150}/></label>
          <label htmlFor="sf-start">Preferred start date <span>(optional)</span><input id="sf-start" name="startDate" type="date"/></label>
          <label htmlFor="sf-timezone">Time zone <span>(optional)</span><input id="sf-timezone" name="timeZone" placeholder="e.g. IST, GMT or US Eastern" maxLength={100}/></label>
        </div></details>
        <div className="sf-honeypot" aria-hidden="true"><label htmlFor="sf-bot">Leave empty<input id="sf-bot" name="botcheck" tabIndex={-1} autoComplete="off"/></label></div>
        <label className="sf-consent"><input name="consent" type="checkbox" required value="agreed"/><span>I agree to be contacted about my enquiry and have read the <a href="https://www.ethingsolutions.com/privacy-policy">Privacy Policy</a>.</span></label>
        {error && <p className="sf-form-error" role="alert">{error}</p>}
        <button type="submit" className="sf-button sf-submit">{status === 'loading' ? 'Sending your enquiry…' : 'Discuss My Salesforce Requirement'}<span aria-hidden="true">↗</span></button>
      </fieldset>
    </form>}
  </div>;
}
