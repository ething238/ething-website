/* Same destinations and enquiry event contract as the existing eThing pages. */
(() => {
  if (window.ethingBankingAnalyticsReady) return;
  window.ethingBankingAnalyticsReady = true;
  const measurementId = 'G-2W7W1TB2H4';
  const containerId = 'GTM-TX73DK5H';
  const local = !['ethingsolutions.com', 'www.ethingsolutions.com'].includes(location.hostname);
  const safePage = location.origin + location.pathname;
  const safeReferrer = (() => {
    try { const url = new URL(document.referrer); return url.origin + url.pathname; }
    catch { return ''; }
  })();
  const allowed = new Set(['landing_cta_click']);
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.ethingTrack = (event, detail = {}) => {
    if (!allowed.has(event)) return;
    // Never include contact fields, free text, or query strings in event parameters.
    const params = { landing_page: '/banking_finance_industry', page_category: 'banking_finance' };
    if (['validation', 'delivery', 'timeout'].includes(detail.reason)) params.reason = detail.reason;
    if (['hero', 'header', 'role', 'solution', 'section'].includes(detail.cta_location)) params.cta_location = detail.cta_location;
    window.dataLayer.push({ event, ...params });
    if (!local) window.gtag('event', event, { ...params, send_to: measurementId, page_location: safePage, page_referrer: safeReferrer });
  };
  // Local QA can inspect the queue without sending synthetic leads to Google.
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
    return script;
  };
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  // The GTM container has Ads tags; load GA4 independently on this page too.
  load('ething-gtm', 'https://www.googletagmanager.com/gtm.js?id=' + containerId);
  load('ething-ga4', 'https://www.googletagmanager.com/gtag/js?id=' + measurementId);
})();
