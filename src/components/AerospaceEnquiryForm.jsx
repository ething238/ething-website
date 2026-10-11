import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../lib/tracking.js';
import { aerospaceEnquiryContext, submitAerospaceEnquiry } from '../lib/aerospaceEnquiry.js';

const fields = [
  { name: 'name', label: 'Name', autoComplete: 'name' },
  { name: 'email', label: 'Work Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone Number', type: 'tel', autoComplete: 'tel' },
  { name: 'company', label: 'Company', autoComplete: 'organization' },
  { name: 'hiringNeed', label: 'Role needed', options: ['Application developers', 'Embedded software engineers', 'Integration engineers', 'Ground control developers', 'Software test engineers', 'Multiple roles'] },
];

export default function AerospaceEnquiryForm() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const formRef = useRef(null);
  const viewed = useRef(false);
  const started = useRef(false);
  const submitting = useRef(false);

  useEffect(() => {
    if (!formRef.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      if (!viewed.current && entries.some(entry => entry.isIntersecting)) {
        viewed.current = true;
        trackEvent('lead_form_view', aerospaceEnquiryContext);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    const lead = Object.fromEntries(new FormData(event.currentTarget));
    setStatus('loading');
    setError('');
    const query = new URLSearchParams(window.location.search);
    lead.attribution = Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].map((key) => [key, query.get(key) || '']));
    const result = await submitAerospaceEnquiry(lead);
    submitting.current = false;
    if (result.ok) setStatus('success');
    else {
      setStatus('error');
      setError('Your request could not be sent. Please try again or email support@ething.in.');
    }
  }

  return <div className="about-copy-form-card aerospace-form-card" ref={formRef}>
    {status === 'success' ? <p className="about-copy-form-success" role="status">Thank you. Your enquiry has been sent to our team.</p> : <form onSubmit={submit} onFocus={() => { if (!started.current) { started.current = true; trackEvent('lead_form_start', aerospaceEnquiryContext); } }} aria-label="Aerospace engineering team enquiry" className="aerospace-form">
      <p className="aerospace-form-intro">Tell us which engineers your team needs.</p>
      <div className="about-copy-form-grid">{fields.map((field) => <label className={field.options ? 'about-copy-form-wide' : undefined} htmlFor={`aerospace-enquiry-${field.name}`} key={field.name}>{field.label} <span aria-hidden="true">*</span>
        {field.options ? <select id={`aerospace-enquiry-${field.name}`} name={field.name} required defaultValue="Application developers" disabled={status === 'loading'}>{field.options.map((option) => <option key={option}>{option}</option>)}</select> : <input id={`aerospace-enquiry-${field.name}`} name={field.name} type={field.type || 'text'} autoComplete={field.autoComplete} required maxLength={254} pattern={field.type === 'email' ? '[^\\s<>@]+@[^\\s<>@]+\\.[^\\s<>@]+' : '.*\\S.*'} disabled={status === 'loading'} />}
      </label>)}
        <label className="about-copy-form-wide" htmlFor="aerospace-enquiry-projectDetails">Role requirements <span className="aerospace-form-optional">(optional)</span>
          <textarea id="aerospace-enquiry-projectDetails" name="projectDetails" rows={4} maxLength={2048} aria-describedby="aerospace-enquiry-projectDetails-help" disabled={status === 'loading'} />
          <span className="aerospace-form-help" id="aerospace-enquiry-projectDetails-help">Include skills, tools, team size, start date and duration.</span>
        </label>
      </div>
      {error && <p className="about-copy-form-error" role="alert">{error}</p>}
      <button type="submit" className="about-copy-contact-button" disabled={status === 'loading'}>{status === 'loading' ? 'Sending…' : 'Discuss Your Aerospace Project'}<span aria-hidden="true"> →</span></button>
      <p className="about-copy-form-privacy">We use these details to discuss your requirements. Read our <a href="https://www.ethingsolutions.com/privacy-policy">Privacy Policy</a>.</p>
    </form>}
  </div>;
}
