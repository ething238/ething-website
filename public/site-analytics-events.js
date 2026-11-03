/* Contact intent is separate from a confirmed enquiry. Never collect field values. */
(() => {
  if (window.ethingContactTrackingReady) return;
  window.ethingContactTrackingReady = true;
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const contact_method = href.startsWith('mailto:') ? 'email' : href.startsWith('tel:') ? 'phone' : null;
    if (!contact_method) return;
    const details = {
      contact_method,
      link_location: link.closest('footer') ? 'footer' : link.closest('header') ? 'header' : 'content',
      landing_page: window.location.pathname,
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'contact_click', ...details });
    if (typeof window.gtag === 'function') window.gtag('event', 'contact_click', { ...details, send_to: 'G-2W7W1TB2H4' });
  });
})();
