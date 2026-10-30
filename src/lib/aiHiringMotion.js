const revealSelector = [
  '.ai-client-row > *', '.ai-proof-row > p', '.ai-section-title',
  '.ai-expertise-card', '.ai-application-grid > article',
  '.ai-example-story > div', '.ai-example-product', '.ai-why figure',
  '.ai-reasons > article', '.ai-process-grid > li',
  '.ai-engagement-grid > article', '.ai-profile-grid > article', '.ai-faq details',
  '.ai-final .ai-container > *', '.related-services-strip__inner > *',
  '.about-copy-footer-grid > div', '.about-copy-footer-bottom',
].join(',');

const cardSelector = [
  '.ai-expertise-card', '.ai-application-grid > article', '.ai-example-product',
  '.ai-reasons > article', '.ai-process-grid > li',
  '.ai-engagement-grid > article', '.ai-profile-grid > article',
].join(',');

export function startAiHiringMotion(root) {
  if (!root) return () => {};
const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
let dispose = () => {};

function configure() {
  dispose();
  root.dataset.aiMotionReduced = String(preference.matches);
  if (preference.matches) return;

  root.classList.add('ai-motion-enabled');
  const reveals = [...root.querySelectorAll(revealSelector)];
  const cards = [...root.querySelectorAll(cardSelector)];
  cards.forEach(card => { card.dataset.aiCard = 'true'; });

  const show = element => {
    element.dataset.aiReveal = 'shown';
    revealObserver?.unobserve(element);
  };
  let revealObserver;
  let heroObserver;
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) show(entry.target); });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    const groups = new Map();
    reveals.forEach(element => {
      // Keep the initial viewport and anything already passed fully visible.
      if (element.getBoundingClientRect().top < window.innerHeight * 0.96) {
        element.dataset.aiReveal = 'shown';
        return;
      }
      const parent = element.parentElement;
      if (!groups.has(parent)) {
        const style = getComputedStyle(parent);
        const columns = style.display === 'grid' ? style.gridTemplateColumns.split(' ').length : 3;
        groups.set(parent, { index: 0, columns: Math.max(1, Math.min(columns, 4)) });
      }
      const group = groups.get(parent);
      element.style.setProperty('--ai-reveal-delay', `${group.index++ % group.columns * 70}ms`);
      element.dataset.aiReveal = 'pending';
      revealObserver.observe(element);
    });

    const hero = root.querySelector('.ai-hero');
    if (hero) {
      heroObserver = new IntersectionObserver(([entry]) => {
        root.dataset.aiHeroVisible = String(entry.isIntersecting);
      });
      heroObserver.observe(hero);
    }
  }

  let frame = 0;
  let pointer;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  function move(event) {
    pointer = { x: event.clientX, y: event.clientY, target: event.target };
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const card = pointer.target.closest?.('[data-ai-card]');
      if (card && root.contains(card)) {
        const bounds = card.getBoundingClientRect();
        card.style.setProperty('--ai-pointer-x', `${pointer.x - bounds.left}px`);
        card.style.setProperty('--ai-pointer-y', `${pointer.y - bounds.top}px`);
      }
      const hero = pointer.target.closest?.('.ai-hero');
      if (hero) {
        const bounds = hero.getBoundingClientRect();
        hero.style.setProperty('--ai-hero-x', `${pointer.x - bounds.left}px`);
        hero.style.setProperty('--ai-hero-y', `${pointer.y - bounds.top}px`);
      }
    });
  }

  function focus(event) {
    const pending = event.target.closest?.('[data-ai-reveal="pending"]');
    if (pending) show(pending);
  }
  function visibility() { root.dataset.aiPageHidden = String(document.hidden); }
  visibility();
  root.addEventListener('focusin', focus);
  if (finePointer) root.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('visibilitychange', visibility);

  dispose = () => {
    revealObserver?.disconnect();
    heroObserver?.disconnect();
    if (frame) cancelAnimationFrame(frame);
    root.removeEventListener('focusin', focus);
    root.removeEventListener('pointermove', move);
    document.removeEventListener('visibilitychange', visibility);
    root.classList.remove('ai-motion-enabled');
    delete root.dataset.aiHeroVisible;
    delete root.dataset.aiPageHidden;
    reveals.forEach(element => {
      delete element.dataset.aiReveal;
      element.style.removeProperty('--ai-reveal-delay');
    });
    cards.forEach(card => {
      delete card.dataset.aiCard;
      card.style.removeProperty('--ai-pointer-x');
      card.style.removeProperty('--ai-pointer-y');
    });
    root.querySelector('.ai-hero')?.style.removeProperty('--ai-hero-x');
    root.querySelector('.ai-hero')?.style.removeProperty('--ai-hero-y');
  };
}

configure();
preference.addEventListener('change', configure);
return () => {
  dispose();
  preference.removeEventListener('change', configure);
  delete root.dataset.aiMotionReduced;
};

}
