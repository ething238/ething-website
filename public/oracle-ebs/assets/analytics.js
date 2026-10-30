/* Existing production destinations; page-specific events contain no form values. */
(() => {
  if (window.oracleEbsAnalyticsReady) return;
  window.oracleEbsAnalyticsReady = true;
  const measurementId = 'G-2W7W1TB2H4';
  const containerId = 'GTM-TX73DK5H';
  const events = new Set(['lead_form_view', 'lead_form_start', 'lead_form_submit', 'lead_form_success', 'generate_lead', 'lead_form_error']);
  const safePage = location.origin + location.pathname;
  let safeReferrer = '';
  try { const referrer = new URL(document.referrer); safeReferrer = referrer.origin + referrer.pathname; } catch {}
  const local = !['https:', 'http:'].includes(location.protocol) || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.oracleEbsTrack = event => {
    if (!events.has(event)) return;
    const parameters = { landing_page: '/oracle-ebs', form_name: 'oracle_ebs_enquiry' };
    window.dataLayer.push({ event, ...parameters });
    if (!local) window.gtag('event', event, { ...parameters, send_to: measurementId, page_location: safePage, page_referrer: safeReferrer });
  };
  if (local) return;
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_location: safePage, page_referrer: safeReferrer,
    allow_google_signals: false, allow_ad_personalization_signals: false
  });
  const load = (id, src) => {
    if (document.getElementById(id)) return;
    const script = document.createElement('script');
    script.id = id; script.async = true; script.src = src;
    document.head.appendChild(script);
  };
  const start = () => {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    load('oracle-ebs-gtm', 'https://www.googletagmanager.com/gtm.js?id=' + containerId);
    load('oracle-ebs-ga4', 'https://www.googletagmanager.com/gtag/js?id=' + measurementId);
  };
  const schedule = () => window.requestIdleCallback ? window.requestIdleCallback(start, { timeout: 1500 }) : setTimeout(start, 0);
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
})();
