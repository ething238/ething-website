/* Keep standalone page hydration and lead capture owned by their original builds. */
(() => {
  const header = document.querySelector('.hire-site-header');
  if (!header) return;
  const toggle = header.querySelector('.hire-site-mobile-toggle');
  const mobileNav = header.querySelector('.hire-site-mobile-nav');
  const topButton = document.querySelector('.hire-site-top');

  function closeMenus() {
    header.querySelectorAll('details[open]').forEach(detail => { detail.open = false; });
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    mobileNav.hidden = true;
  }

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileNav.hidden = !open;
  });
  header.addEventListener('toggle', event => {
    if (event.target.tagName !== 'DETAILS' || !event.target.open) return;
    header.querySelectorAll('details[open]').forEach(detail => {
      if (detail !== event.target) detail.open = false;
    });
  }, true);
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) closeMenus();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const focusedMenu = document.activeElement?.closest('.hire-site-dropdown');
    if (focusedMenu) focusedMenu.querySelector('summary').focus();
    else if (header.contains(document.activeElement)) toggle.focus();
    closeMenus();
  });
  mobileNav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenus();
  });
  function updateTopButton() { topButton.hidden = window.scrollY <= 400; }
  window.addEventListener('scroll', updateTopButton, { passive: true });
  updateTopButton();
  topButton.addEventListener('click', () => window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  }));
})();
