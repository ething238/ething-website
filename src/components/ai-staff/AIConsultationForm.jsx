import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../../lib/tracking.js';
import { leadDeliveryError, submitLeadRequest } from '../website-development/leadDelivery.js';

function track(event) {
  trackEvent(event, { landing_page: '/ai_staff_augmentation', form_name: 'ai_consultation' });
}

export default function AIConsultationForm() {
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
    if (!values.name || !values.email || !values.company || !values.projectDetails) {
      setError('Please complete your name, email, company and requirements.'); return;
    }
    sending.current = true; setStatus('loading'); setError(''); track('lead_form_submit');
    try {
      const query = new URLSearchParams(window.location.search);
      const attribution = Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].map(key => [key, query.get(key) || '']));
      const message = 'AI staff augmentation consultation\n\n' + [
        ['Name', values.name], ['Work email', values.email], ['Company', values.company],
        ['Phone', values.phone], ['Expertise', values.hiringNeed], ['Requirements', values.projectDetails],
        ['Source page', '/ai_staff_augmentation'], ...Object.entries(attribution)
      ].filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`).join('\n');
      await submitLeadRequest({ ...values, ...attribution, message, hiringNeed: 'AI staff augmentation: ' + values.hiringNeed, landingPage: '/ai_staff_augmentation' });
      setStatus('success'); track('lead_form_success'); track('generate_lead');
    } catch (failure) { setStatus('error'); setError(failure.message || leadDeliveryError); track('lead_form_error'); }
    finally { sending.current = false; }
  }
  return <div className="ais-form-card" ref={card}>
    {status === 'success' ? <div role="status" className="ais-form-success"><span aria-hidden="true">✓</span><p className="ais-form-title">Your request has been sent.</p><p>Our team will contact you to discuss your requirements and arrange a conversation.</p><button type="button" className="ais-button ais-button-dark" onClick={() => setStatus('idle')}>Send another enquiry</button></div> : <form onSubmit={submit} onInput={() => { if (!started.current) { started.current = true; track('lead_form_start'); } }} aria-label="Book a free consultation">
      <p className="ais-form-intro">Tell us a little about the expertise you need.</p>
      <fieldset disabled={status === 'loading'}><legend className="ais-sr-only">Your contact details and requirements</legend>
        <div className="ais-form-grid">
          <label htmlFor="ais-name">Full name *<input id="ais-name" name="name" autoComplete="name" placeholder="Your name" required pattern=".*\S.*" maxLength={100}/></label>
          <label htmlFor="ais-email">Work email *<input id="ais-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254}/></label>
          <label htmlFor="ais-company">Company *<input id="ais-company" name="company" autoComplete="organization" placeholder="Company name" required pattern=".*\S.*" maxLength={150}/></label>
          <label htmlFor="ais-phone">Phone <span>(optional)</span><input id="ais-phone" name="phone" type="tel" autoComplete="tel" placeholder="Include country code" maxLength={40}/></label>
          <label className="ais-form-wide" htmlFor="ais-role">Expertise you need<select id="ais-role" name="hiringNeed" defaultValue="Help me define the role">{['Help me define the role', 'Generative AI engineer', 'Machine learning engineer', 'Data engineer', 'MLOps engineer', 'NLP or computer vision engineer', 'A dedicated AI team'].map(role => <option key={role}>{role}</option>)}</select></label>
          <label className="ais-form-wide" htmlFor="ais-brief">What are you working on? *<textarea id="ais-brief" name="projectDetails" rows={3} required maxLength={2048} placeholder="Your goals, skills, timeline and team size"/></label>
        </div>
        <div className="ais-honeypot" aria-hidden="true"><label htmlFor="ais-bot">Leave empty<input id="ais-bot" name="botcheck" tabIndex={-1} autoComplete="off"/></label></div>
        <label className="ais-consent"><input name="consent" type="checkbox" required value="agreed"/><span>I agree to be contacted about my enquiry and have read the <a href="https://www.ethingsolutions.com/privacy-policy">Privacy Policy</a>.</span></label>
        {error && <p className="ais-form-error" role="alert">{error}</p>}
        <button type="submit" className="ais-button ais-button-dark">{status === 'loading' ? 'Sending your request...' : 'Book a free consultation'}<span aria-hidden="true">↗</span></button>
      </fieldset>
      <p className="ais-form-note">No obligation. A conversation about what comes next.</p>
    </form>}
  </div>;
}
