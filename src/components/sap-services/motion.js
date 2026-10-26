/** Page-scoped native motion with cleanup for route changes and StrictMode. */
export function enhanceSapMotion(root) {
  if (!root) return;
  const listeners = [];
  const observers = [];
  const on = (node, event, handler) => {
    node.addEventListener(event, handler);
    listeners.push(() => node.removeEventListener(event, handler));
  };
  const steps = [...root.querySelectorAll('.sap-process-grid li')];
  const clear = step => {
    step.classList.remove('sap-step-active');
    step.querySelector('.sap-card-heading').setAttribute('aria-pressed', 'false');
  };
  const activate = selected => {
    const active = !selected.classList.contains('sap-step-active');
    steps.forEach(step => {
      const selectedStep = step === selected && active;
      step.classList.toggle('sap-step-active', selectedStep);
      step.querySelector('.sap-card-heading').setAttribute('aria-pressed', String(selectedStep));
    });
  };
  steps.forEach((step, index) => {
    const heading = step.querySelector('.sap-card-heading');
    heading.setAttribute('role', 'button');
    heading.setAttribute('tabindex', '0');
    heading.setAttribute('aria-pressed', 'false');
    heading.setAttribute('aria-label', `Highlight step ${index + 1}: ${heading.querySelector('h3').textContent}`);
    on(step, 'click', () => activate(step));
    on(step, 'pointerleave', () => clear(step));
    on(heading, 'blur', () => clear(step));
    on(heading, 'keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate(step);
      }
    });
  });
  const photos = root.querySelectorAll('#sap-services,#sap-process');
  if ('IntersectionObserver' in window) {
    const photoObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('sap-photo-visible');
      photoObserver.unobserve(entry.target);
    }), { rootMargin: '300px' });
    photos.forEach(node => photoObserver.observe(node));
    observers.push(photoObserver);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const motionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        entry.target.classList.toggle('sap-motion-active', entry.isIntersecting);
      }), { threshold: 0.12 });
      const nodes = root.querySelectorAll('.sap-situations article,.sap-service-card,.sap-roles-grid article,.sap-process-grid li,.sap-landscape,.sap-team-figure');
      nodes.forEach((node, index) => {
        node.style.setProperty('--sap-delay', `${index % 4 * 85}ms`);
        motionObserver.observe(node);
      });
      observers.push(motionObserver);
    }
  } else photos.forEach(node => node.classList.add('sap-photo-visible'));
  const pause = () => root.classList.toggle('sap-motion-paused', document.hidden);
  on(document, 'visibilitychange', pause);
  on(window, 'pageshow', pause);
  pause();
  return () => {
    observers.forEach(observer => observer.disconnect());
    listeners.forEach(remove => remove());
    steps.forEach(clear);
  };
}
