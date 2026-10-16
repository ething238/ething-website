import { useEffect, useRef, useState } from 'react';
import { leadDeliveryError, submitLeadRequest } from './leadDelivery.js';
import { trackEvent } from '../../lib/tracking.js';

function track(event) {
  trackEvent(event, { landing_page: '/website-development', form_name: 'website_project_enquiry' });
}

export default function WebsiteProjectForm() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const sending = useRef(false);
  const cardRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!cardRef.current || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        track('lead_form_view');
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  async function submit(event) {
    event.preventDefault();
    if (sending.current || status === 'success') return;
    const values = Object.fromEntries([...new FormData(event.currentTarget)].map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]));
    if (values.botcheck) return;
    if (!values.name || !values.email || !values.projectDetails) {
      setStatus('error');
      setError('Please enter your name, work email and what you want to build.');
      return;
    }
    sending.current = true;
    setStatus('loading');
    setError('');
    track('lead_form_submit');
    try {
      const query = new URLSearchParams(window.location.search);
      const attribution = Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].map(key => [key, query.get(key) || '']));
      const message = 'New eThing website development enquiry\n\n' + [
        ['Name', values.name], ['Work email', values.email], ['Phone', values.phone],
        ['Project brief', values.projectDetails], ['Source page', '/website-development'],
        ...Object.entries(attribution)
      ].filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`).join('\n');
      await submitLeadRequest({ ...values, ...attribution, message, landingPage: '/website-development' });
      setStatus('success');
      track('lead_form_success');
      track('generate_lead');
    } catch (failure) {
      setStatus('error');
      setError(failure.message || leadDeliveryError);
      track('lead_form_error');
    } finally {
      sending.current = false;
    }
  }

  return <div className="wd-form-card" ref={cardRef}>
    {status === 'success' ? <div className="wd-form-success" role="status"><span aria-hidden="true">✓</span><h3>Your enquiry has been sent.</h3><p>Thank you for sharing your project. Our team will use these details to discuss the next steps with you.</p><a href="mailto:support@ething.in">Contact us by email →</a></div> : <form onSubmit={submit} onInput={() => { if (!started.current) { started.current = true; track('lead_form_start'); } }} aria-label="Website project enquiry">
      <p className="wd-form-intro">Share a few details and we will get in touch.</p>
      <fieldset disabled={status === 'loading'}><legend className="wd-sr-only">Your contact details and website requirements</legend>
        <div className="wd-form-grid">
          <label htmlFor="wd-name">Your name <span aria-hidden="true">*</span><input id="wd-name" name="name" autoComplete="name" required maxLength={100} pattern=".*\S.*" placeholder="Full name" /></label>
          <label htmlFor="wd-email">Work email <span aria-hidden="true">*</span><input id="wd-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></label>
          <label className="wd-wide" htmlFor="wd-phone">Phone number <span className="wd-optional">(optional)</span><input id="wd-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Including country code" /></label>
          <label className="wd-wide" htmlFor="wd-details">What do you want to build? <span aria-hidden="true">*</span><textarea id="wd-details" name="projectDetails" rows={3} required maxLength={2048} placeholder="Your goals, current website, features, budget and launch date…" /></label>
        </div>
        <input type="hidden" name="hiringNeed" value="Website development" readOnly />
        <div className="wd-botcheck" aria-hidden="true"><label htmlFor="wd-botcheck">Leave this field empty<input id="wd-botcheck" name="botcheck" tabIndex={-1} autoComplete="off" /></label></div>
        {error && <p className="wd-form-error" role="alert">{error}</p>}
        <button className="wd-button wd-button-primary" type="submit">{status === 'loading' ? 'Sending enquiry…' : 'Discuss your website'}<span aria-hidden="true">↗</span></button>
      </fieldset>
      <p className="wd-form-privacy">We use your details to respond to your enquiry. Read our <a href="https://www.ethingsolutions.com/privacy-policy">Privacy Policy</a>.</p>
    </form>}
  </div>;
}
