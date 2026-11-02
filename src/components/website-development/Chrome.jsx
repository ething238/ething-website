import SiteFooter from '../SiteFooter.jsx';
import { useEffect, useState } from 'react';

const siteUrl = 'https://www.ethingsolutions.com';
const localRoutes = new Set([
  '/about_us', '/healthcare_industry', '/aerospace_industry', '/website-development', '/other-services', '/staff-augmentation',
  '/hire-developers', '/hire-ai-developers', '/hire-python-developers',
  '/hire-full-stack-developers', '/hire-react-developers', '/hire-devops-engineers',
  '/hire-top-talent', '/hire-qa-engineers', '/hire-nodejs-developers',
  '/hire-mobile-developers', '/hire-data-engineers', '/mobile_application',
]);

export function copyDestination(path) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path;
  const route = path.split(/[?#]/, 1)[0].replace(/\/$/, '');
  return localRoutes.has(route) ? path : `${siteUrl}${path}`;
}

export function CopyIcon({ kind, className }) {
  const paths = {
    chevron: <path d="m6 9 6 6 6-6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    arrow: <path d="m6 12 6-6 6 6M12 6v12" />,
    check: <path d="m6 12 4 4 8-8" />,
    map: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2.2Z" />,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>,
  };
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind]}</svg>;
}

export function CopyFooter() {
  return <SiteFooter />;
}

export function CopyBackToTop() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!showTop) return null;
  return <button className="about-copy-scroll-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}><CopyIcon kind="arrow" /></button>;
}
