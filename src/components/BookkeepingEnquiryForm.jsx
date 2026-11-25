import { useRef, useState } from 'react';
import { leadDeliveryError, submitLeadRequest } from './website-development/leadDelivery.js';

export default function BookkeepingEnquiryForm() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const sending = useRef(false);

  async function submit(event) {
    event.preventDefault();
    if (sending.current || status === 'success') return;
    const values = Object.fromEntries([...new FormData(event.currentTarget)].map(([key, value]) => [key, String(value).trim()]));
    if (values.botcheck) return;
    if (!values.name || !values.email || !values.company || !values.phone || !values.projectDetails) {
      setError('Please add your name, email, company, phone number and the support you need.');
      return;
    }
    sending.current = true;
    setStatus('loading');
    setError('');
    try {
      const query = new URLSearchParams(window.location.search);
      const attribution = Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].map(key => [key, query.get(key) || '']));
      const message = 'New eThing bookkeeping enquiry\n\n' + [['Name', values.name], ['Email', values.email], ['Company', values.company], ['Phone', values.phone], ['Accounting software', values.accountingSoftware], ['Monthly transaction volume', values.transactionVolume], ['Support needed', values.projectDetails], ['Source page', '/bookkeeping']].map(([key, value]) => `${key}: ${value || 'Not provided'}`).join('\n');
      await submitLeadRequest({ ...values, ...attribution, hiringNeed: 'Bookkeeping services', landingPage: '/bookkeeping', message });
      setStatus('success');
    } catch (failure) {
      setStatus('error');
      setError(failure.message || leadDeliveryError);
    } finally {
      sending.current = false;
    }
  }

  return <div className="bk-form-card" data-seo-ignore>
    {status === 'success' ? <div className="bk-form-success" role="status"><span aria-hidden="true">✓</span><p className="bk-form-title">Your enquiry has been sent.</p><p>Thank you for sharing your requirements. Our team will use these details to discuss the next steps.</p><a href="mailto:support@ething.in">Contact us by email ↗</a></div> : <form onSubmit={submit} aria-label="Bookkeeping enquiry">
      <p className="bk-form-title">Tell us about your books.</p><p className="bk-form-intro">Share a few details to start the conversation.</p>
      <fieldset disabled={status === 'loading'}><legend className="bk-sr-only">Your contact details and bookkeeping requirements</legend><div className="bk-form-grid">
        <label htmlFor="bk-name">Your name <span aria-hidden="true">*</span><input id="bk-name" name="name" autoComplete="name" required maxLength={100} pattern=".*\S.*" placeholder="Full name"/></label>
        <label htmlFor="bk-email">Work email <span aria-hidden="true">*</span><input id="bk-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com"/></label>
        <label htmlFor="bk-company">Company <span aria-hidden="true">*</span><input id="bk-company" name="company" autoComplete="organization" required pattern=".*\S.*" maxLength={150} placeholder="Your business name"/></label>
        <label htmlFor="bk-phone">Phone number <span aria-hidden="true">*</span><input id="bk-phone" name="phone" type="tel" autoComplete="tel" required pattern=".*\S.*" maxLength={40} placeholder="Country code + number"/></label>
        <label htmlFor="bk-software">Accounting software <span className="bk-optional">(optional)</span><select id="bk-software" name="accountingSoftware" defaultValue=""><option value="">Choose your platform</option><option>QuickBooks Online</option><option>Xero</option><option>Zoho Books</option><option>Tally</option><option>Excel / spreadsheets</option><option>Other / not decided</option></select></label>
        <label htmlFor="bk-volume">Transactions per month <span className="bk-optional">(optional)</span><select id="bk-volume" name="transactionVolume" defaultValue=""><option value="">Choose an estimate</option><option>Under 100</option><option>100–500</option><option>501–1,000</option><option>More than 1,000</option><option>Not sure yet</option></select></label>
        <p className="bk-wide bk-software-help">We confirm platform compatibility and the required access before agreeing the work.</p>
        <label className="bk-wide" htmlFor="bk-details">How can we help? <span aria-hidden="true">*</span><textarea id="bk-details" name="projectDetails" rows={4} required maxLength={2048} placeholder="Your accounting software, monthly transactions and the support you need…"/></label>
      </div><div className="bk-botcheck" aria-hidden="true"><label htmlFor="bk-botcheck">Leave this empty<input id="bk-botcheck" name="botcheck" tabIndex={-1} autoComplete="off"/></label></div>
      {error && <p className="bk-form-error" role="alert">{error}</p>}
      <button className="bk-button" type="submit">{status === 'loading' ? 'Sending enquiry…' : 'Discuss your bookkeeping'}<span aria-hidden="true">↗</span></button></fieldset>
      <p className="bk-form-privacy">We use your details to respond to your enquiry. Read our <a href="https://www.ethingsolutions.com/privacy-policy">Privacy Policy</a>.</p>
    </form>}
  </div>;
}
