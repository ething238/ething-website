/* Uses the same public Web3Forms integration as the site's existing enquiries. */
(() => {
  const form = document.querySelector('#brief-form');
  if (!form) return;
  const submitButton = form.querySelector('[type="submit"]');
  const status = document.querySelector('#form-status');
  const fallback = document.querySelector('#email-fallback');
  const idleLabel = submitButton.textContent;
  const track = event => window.oracleEbsTrack?.(event);
  let sending = false, sent = false, started = false;
  form.addEventListener('input', () => {
    if (!started) { started = true; track('lead_form_start'); }
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { track('lead_form_view'); observer.disconnect(); }
    }, { threshold: .15 });
    observer.observe(form);
  } else track('lead_form_view');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || sent || !form.reportValidity()) return;
    const values = Object.fromEntries([...new FormData(form)].map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]));
    if (values.botcheck) return;
    if (['name', 'email', 'company', 'phone', 'model', 'requirements'].some(key => !values[key])) {
      status.textContent = 'Please complete all six fields with your contact details and requirements.';
      return;
    }
    sending = true; submitButton.disabled = true;
    submitButton.textContent = 'Sending your enquiry…'; form.setAttribute('aria-busy', 'true');
    status.textContent = ''; fallback.hidden = true; track('lead_form_submit');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, signal: controller.signal,
        body: JSON.stringify({
          access_key: values.access_key, subject: 'New Oracle EBS staffing enquiry',
          name: values.name, email: values.email, company: values.company, phone: values.phone,
          hiringNeed: 'Oracle EBS: ' + values.model, projectDetails: values.requirements,
          landingPage: '/oracle-ebs', botcheck: ''
        })
      });
      let result;
      try { result = await response.json(); } catch { throw new Error('delivery_unconfirmed'); }
      if (!response.ok || result?.success !== true) throw new Error('delivery_failed');
      sent = true; status.textContent = 'Thank you. Your enquiry has been sent. Our team will contact you to discuss the next steps.';
      submitButton.textContent = 'Enquiry sent';
      track('lead_form_success'); track('generate_lead');
    } catch {
      status.textContent = controller.signal.aborted
        ? 'We could not confirm delivery. Please email support@ething.in before trying again.'
        : 'Your enquiry was not sent. Please try again or email support@ething.in.';
      fallback.hidden = false; submitButton.disabled = false; submitButton.textContent = idleLabel;
      track('lead_form_error');
    } finally {
      clearTimeout(timeout); sending = false; form.removeAttribute('aria-busy');
    }
  });
})();
