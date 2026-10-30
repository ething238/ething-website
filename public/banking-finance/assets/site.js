(() => {
  const menu = document.querySelector('.menu');
  const nav = document.getElementById('about-copy-mobile-nav');
  const close = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Open menu'); };
  menu.addEventListener('click', () => {
    const open=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (nav.contains(document.activeElement) && nav.classList.contains('open')) menu.focus();
    close(); document.querySelectorAll('.nav-dropdown').forEach(item => item.open = false);
  });
  const dropdowns = [...document.querySelectorAll('.nav-dropdown')];
  dropdowns.forEach(item => item.addEventListener('toggle', () => {
    if (item.open) dropdowns.forEach(other => { if (other !== item) other.open = false; });
  }));
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-dropdown')) dropdowns.forEach(item => item.open = false);
    if (!event.target.closest('.ething-header')) close();
  });
  matchMedia('(min-width:1100px)').addEventListener('change',close);
  document.querySelectorAll('a[href="https://www.ethingsolutions.com/contact"]').forEach(link => link.addEventListener('click', () => {
    const cta_location = link.closest('.talent-card') ? 'role' : link.closest('header') ? 'header' : link.closest('.hero') ? 'hero' : link.closest('.solution-card') ? 'solution' : 'section';
    window.ethingTrack?.('landing_cta_click', { cta_location });
  }));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const blocks = [...document.querySelectorAll('.talent-card,.solution-card,.hiring-needs-grid article,.step,.partnership-card,.client-proof')];
  let observer;
  function reveal() {
    observer?.disconnect();
    blocks.forEach(block => block.classList.remove('scroll-enter','scroll-in','scroll-from-right'));
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('scroll-in'); observer.unobserve(entry.target); }
    }), { rootMargin: '0px 0px 40px 0px', threshold: 0 });
    blocks.forEach(block => { block.classList.add('scroll-enter'); observer.observe(block); });
  }
  reduced.addEventListener('change', reveal); reveal();
})();
