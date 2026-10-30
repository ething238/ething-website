import './styles/ai-hiring-base.css';
import './styles/about-us.css';
import './styles/site-header.css';
import './styles/footer-brand.css';
import './styles/related-services.css';
import './styles/ai-hiring.css';
import './styles/ai-hiring-shared-type.css';
import './styles/ai-hiring-readability.css';
import './styles/ai-hiring-motion.css';
import { startAiHiringMotion } from './lib/aiHiringMotion.js';
import { submitLeadRequest, leadDeliveryError } from './components/website-development/leadDelivery.js';

const root = document.querySelector('.ai-hiring-shell');
const route = '/hire-ai-developers';
const bookingUrl = 'https://calendly.com/anuj-ething/30min';
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const track = (event, details = {}) => {
  const data = { landing_page: route, page_category: 'ai', ...details };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
  if (typeof window.gtag === 'function') window.gtag('event', event, data);
};

if (root) {
  startAiHiringMotion(root);
  track('landing_page_view');
  // Preserve the website's existing first-party visit analytics without React.
  const visitBody = JSON.stringify({
    path: location.pathname + location.search + location.hash,
    referrer: document.referrer || 'direct',
    screen: `${screen.width}x${screen.height}`,
    language: navigator.language || 'unknown',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown',
  });
  if (typeof navigator.sendBeacon === 'function') navigator.sendBeacon('/api/visit', new Blob([visitBody], { type: 'application/json' }));
  else void fetch('/api/visit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: visitBody, keepalive: true }).catch(() => {});

  const header = root.querySelector('.ething-header');
  const menu = header.querySelector('#about-copy-mobile-nav');
  const menuButton = header.querySelector('.about-copy-mobile-toggle');
  function closeMenu() {
    if (menu) menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  }
  menuButton.addEventListener('click', () => {
    if (!menu) return;
    menu.hidden = !menu.hidden;
    menuButton.setAttribute('aria-expanded', String(!menu.hidden));
    menuButton.setAttribute('aria-label', menu.hidden ? 'Open menu' : 'Close menu');
  });
  menu?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  function closeDropdowns() { header.querySelectorAll('details[open]').forEach(item => { item.open = false; }); }
  document.addEventListener('click', event => {
    header.querySelectorAll('details[open]').forEach(item => { if (!item.contains(event.target)) item.open = false; });
    if (!header.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeDropdowns(); closeMenu(); } });

  const tabs = [...root.querySelectorAll('.ai-example-tabs [role="tab"]')];
  const panels = [...root.querySelectorAll('.ai-example-panel')];
  function selectTab(index, focus = false) {
    tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
    panels.forEach((panel, i) => { panel.hidden = i !== index; });
    if (focus) tabs[index].focus();
    track('ai_example_tab_click', { tab: tabs[index].textContent.trim() });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(index));
    tab.addEventListener('keydown', event => {
      const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
      if (next !== null) { event.preventDefault(); selectTab(next, true); }
    });
  });
  root.querySelectorAll('.ai-faq details').forEach(item => item.addEventListener('toggle', () => {
    if (item.open) track('faq_open', { question: item.querySelector('summary>span:nth-child(2)').textContent });
  }));

  root.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.closest('.lead-form,.success,.ething-header,.ai-example-tabs') || button.classList.contains('about-copy-scroll-top')) return;
    const location = button.closest('.ai-hero') ? 'hero' : button.closest('.ai-final') ? 'final' : button.closest('.ai-mobile-cta') ? 'mobile' : button.closest('.ai-engagement-grid') ? 'engagement' : 'applications';
    if (/Book.*call/i.test(button.textContent)) {
      track('book_consultation_click', { cta: 'calendly', cta_location: location });
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    } else if (button.matches('.ai-text-button,.ai-engagement-grid button,.ai-final-actions button,.ai-mobile-cta button')) {
      track('landing_cta_click', { cta_location: location });
      document.getElementById('lead-form').scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
    }
  });

  const topButton = root.querySelector('.about-copy-scroll-top');
  topButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' }));
  const marks = new Set();
  let scrollFrame = 0;
  function scroll() {
    scrollFrame = 0;
    if (topButton) topButton.hidden = window.scrollY <= 400;
    const maximum = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maximum > 0 ? window.scrollY / maximum * 100 : 100;
    [25, 50, 75, 100].forEach(mark => {
      if (progress >= mark && !marks.has(mark)) { marks.add(mark); track('landing_scroll_depth', { percent: mark }); }
    });
  }
  window.addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(scroll); }, { passive: true });
  scroll();

  const form = root.querySelector('.lead-form');
  const fields = [...form.querySelectorAll('input[name],select[name]')];
  form.noValidate = true;
  fields.forEach(field => { field.required = true; });
  let started = false;
  let submitting = false;
  let submitted = false;
  track('lead_form_view');
  form.addEventListener('focusin', () => { if (!started) { started = true; track('lead_form_start'); } });
  function clearError(field) {
    field.setAttribute('aria-invalid', 'false');
    field.removeAttribute('aria-describedby');
    field.closest('label').querySelector('em')?.remove();
  }
  fields.forEach(field => field.addEventListener('input', () => clearError(field)));
  function showResult(preview) {
    const result = document.createElement('div');
    result.className = 'success'; result.setAttribute('role', 'status');
    const tick = document.createElement('span'); tick.textContent = '✓'; result.append(tick);
    const title = document.createElement('p'); title.className = 'ai-form-title';
    title.textContent = preview ? 'Your preview form works.' : 'We’ve received your request.'; result.append(title);
    const body = document.createElement('p');
    body.textContent = preview ? 'No enquiry was sent. The live form uses your existing delivery service.' : 'Our team will review your requirements and share relevant profiles.'; result.append(body);
    if (preview) {
      const back = document.createElement('button'); back.type = 'button'; back.textContent = 'Back to the form';
      back.addEventListener('click', () => { result.remove(); form.hidden = false; }); result.append(back);
    }
    form.hidden = true; form.after(result);
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting || submitted) return;
    form.querySelector('.form-error')?.remove();
    let firstInvalid;
    fields.forEach(field => {
      clearError(field);
      if (!field.value.trim() || !field.checkValidity()) {
        const error = document.createElement('em'); error.id = field.id + '-error';
        error.textContent = !field.value.trim() ? 'This field is required.' : field.validationMessage;
        field.setAttribute('aria-invalid', 'true'); field.setAttribute('aria-describedby', error.id);
        field.closest('label').append(error); firstInvalid ||= field;
      }
    });
    if (firstInvalid) { track('lead_form_error', { reason: 'validation' }); firstInvalid.focus(); return; }
    const values = Object.fromEntries(fields.map(field => [field.name, field.value.trim()]));
    const params = new URLSearchParams(location.search);
    const attribution = Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'].map(key => [key, params.get(key) || '']));
    const button = form.querySelector('button'); const label = button.textContent;
    submitting = true; button.disabled = true; button.textContent = 'Sending your request…';
    track('lead_form_submit', { hiring_need: values.hiringNeed });
    try {
      if (['localhost','127.0.0.1','[::1]'].includes(location.hostname)) { showResult(true); return; }
      await submitLeadRequest({ ...values, ...attribution, landingPage: route });
      submitted = true; showResult(false);
      const details = { hiring_need: values.hiringNeed, form_name: 'hire_developers' };
      track('lead_form_success', details); track('generate_lead', details);
    } catch (error) {
      const message = document.createElement('p'); message.className = 'form-error'; message.setAttribute('role', 'alert');
      message.textContent = error.message || leadDeliveryError; form.querySelector('.form-grid').before(message);
      track('lead_form_error', { reason: 'server' });
    } finally { submitting = false; button.disabled = false; button.textContent = label; }
  });
}
