import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../../lib/tracking.js';
import { leadDeliveryError, submitLeadRequest } from '../website-development/leadDelivery.js';

function track(event) {
  trackEvent(event, { landing_page: '/mobile_application', form_name: 'mobile_project_enquiry' });
}

export default function MobileProjectForm() {
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
    const values = Object.fromEntries([...new FormData(event.currentTarget)].map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]));
    if (values.botcheck) return;
    if (!values.name || !values.email || !values.projectDetails) { setStatus('error'); setError('Please enter your name, email and project requirements.'); return; }
    sending.current = true; setStatus('loading'); setError(''); track('lead_form_submit');
    try {
      const query = new URLSearchParams(window.location.search);
      const attribution = Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].map(key => [key, query.get(key) || '']));
      const message = 'New eThing mobile application enquiry\n\n' + [
        ['Name', values.name], ['Work email', values.email], ['Phone', values.phone],
        ['Project brief', values.projectDetails], ['Source page', '/mobile_application'],
        ...Object.entries(attribution)
      ].filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`).join('\n');
      await submitLeadRequest({ ...values, ...attribution, message, hiringNeed: 'Mobile application development', landingPage: '/mobile_application' });
      setStatus('success'); track('lead_form_success'); track('generate_lead');
    } catch (failure) { setStatus('error'); setError(failure.message || leadDeliveryError); track('lead_form_error'); }
    finally { sending.current = false; }
  }
  return <div className="ma-form-card" ref={card}>
    {status === 'success' ? <div role="status" className="ma-form-success"><span aria-hidden="true">✓</span><h3>Your enquiry has been sent.</h3><p>Thank you. Our team will get in touch to discuss your application and next steps.</p></div> : <form aria-label="Mobile application project enquiry" onSubmit={submit} onInput={() => { if (!started.current) { started.current = true; track('lead_form_start'); } }}>
      <p>Share a few details and we will get in touch.</p>
      <fieldset disabled={status === 'loading'}><legend className="ma-sr-only">Contact details and project requirements</legend>
        <div className="ma-form-grid">
          <label htmlFor="ma-name">Your name <span aria-hidden="true">*</span><input id="ma-name" name="name" autoComplete="name" required pattern=".*\S.*" maxLength={100} placeholder="Full name" /></label>
          <label htmlFor="ma-email">Work email <span aria-hidden="true">*</span><input id="ma-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></label>
          <label className="ma-form-wide" htmlFor="ma-phone">Phone number <span className="ma-optional">(optional)</span><input id="ma-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Including country code" /></label>
          <label className="ma-form-wide" htmlFor="ma-project">What do you want to build? <span aria-hidden="true">*</span><textarea id="ma-project" name="projectDetails" required rows={4} maxLength={2048} placeholder="Your goals, users, features and any planned launch date…" /></label>
        </div>
        <div className="ma-honeypot" aria-hidden="true"><label htmlFor="ma-botcheck">Leave empty<input id="ma-botcheck" name="botcheck" tabIndex={-1} autoComplete="off" /></label></div>
        {error && <p className="ma-error" role="alert">{error}</p>}
        <button className="ma-button" type="submit">{status === 'loading' ? 'Sending enquiry…' : 'Discuss your app'} <span aria-hidden="true">↗</span></button>
      </fieldset>
      <p className="ma-privacy">We use your details to respond to your enquiry. Read our <a href="https://www.ethingsolutions.com/privacy-policy">Privacy Policy</a>.</p>
    </form>}
  </div>;
}
