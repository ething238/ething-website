import { useEffect, useRef, useState } from 'react';
import originalCopy from '../data/aboutUsCopy.json';
import BrandLogo from './AboutBrandLogo.jsx';

const siteUrl = 'https://www.ethingsolutions.com';
const localRoutes = new Set([
  '/about_us', '/healthcare_industry', '/aerospace_industry', '/other-services', '/staff-augmentation',
  '/hire-developers', '/hire-ai-developers', '/hire-python-developers',
  '/hire-full-stack-developers', '/hire-react-developers', '/hire-devops-engineers',
  '/hire-top-talent', '/hire-qa-engineers', '/hire-nodejs-developers',
  '/hire-mobile-developers', '/hire-data-engineers',
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

function CopyLogo() {
  return <BrandLogo href={`${siteUrl}/`} className="about-copy-logo brand-logo" />;
}

export function CopyHeader({ activePath = '', contactHref = `${siteUrl}/contact` }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);
  const isActive = (path) => path?.replace(/\/$/, '') === activePath.replace(/\/$/, '');

  useEffect(() => {
    const closeDropdowns = (event) => {
      if (event.type === 'keydown' && event.key !== 'Escape') return;
      headerRef.current?.querySelectorAll('details[open]').forEach((detail) => {
        if (event.type === 'keydown' || !detail.contains(event.target)) detail.open = false;
      });
      if (event.type === 'keydown' || !headerRef.current?.contains(event.target)) setMobileOpen(false);
    };
    document.addEventListener('click', closeDropdowns);
    document.addEventListener('keydown', closeDropdowns);
    return () => {
      document.removeEventListener('click', closeDropdowns);
      document.removeEventListener('keydown', closeDropdowns);
    };
  }, []);

  return <header className="about-copy-header" ref={headerRef}>
    <div className="about-copy-header-inner">
      <div className="about-copy-header-brand"><CopyLogo /></div>
      <nav className="about-copy-nav" aria-label="Main navigation">
        {originalCopy.navigation.map((item) => item.children?.length ? (
          <details className="about-copy-nav-dropdown" key={item.id} data-active={item.children.some(child => isActive(child.path)) || undefined}>
            <summary className="about-copy-nav-link">{item.label}<CopyIcon kind="chevron" /></summary>
            <div className="about-copy-dropdown-menu">
              {item.children.map((child) => <a key={child.path} href={copyDestination(child.path)} aria-current={isActive(child.path) ? 'page' : undefined}>{child.label}</a>)}
            </div>
          </details>
        ) : <a className="about-copy-nav-link" href={copyDestination(item.path)} aria-current={isActive(item.path) ? 'page' : undefined} key={item.id}>{item.label}</a>)}
      </nav>
      <a href={copyDestination(contactHref)} className="about-copy-contact-button">{originalCopy.cta.label}</a>
      <button className="about-copy-mobile-toggle" type="button" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} aria-controls="about-copy-mobile-nav" onClick={() => setMobileOpen(!mobileOpen)}><CopyIcon kind={mobileOpen ? 'close' : 'menu'} /></button>
    </div>
    {mobileOpen && <nav id="about-copy-mobile-nav" className="about-copy-mobile-nav" aria-label="Mobile navigation">
      {originalCopy.navigation.map((item) => item.children?.length ? (
        <details className="about-copy-nav-dropdown" key={item.id} data-active={item.children.some(child => isActive(child.path)) || undefined}>
          <summary className="about-copy-nav-link">{item.label}<CopyIcon kind="chevron" /></summary>
          <div className="about-copy-dropdown-menu">
            {item.path && <a href={copyDestination(item.path)} aria-current={isActive(item.path) ? 'page' : undefined} onClick={() => setMobileOpen(false)}>{item.label}</a>}
            {item.children.map((child) => <a key={child.path} href={copyDestination(child.path)} aria-current={isActive(child.path) ? 'page' : undefined} onClick={() => setMobileOpen(false)}>{child.label}</a>)}
          </div>
        </details>
      ) : <div key={item.id}><a href={copyDestination(item.path)} aria-current={isActive(item.path) ? 'page' : undefined} onClick={() => setMobileOpen(false)}>{item.label}</a></div>)}
      <a href={copyDestination(contactHref)} className="about-copy-contact-button">{originalCopy.cta.label}</a>
    </nav>}
  </header>;
}

export function CopyFooter({ activePath = '', contactHref = `${siteUrl}/contact`, aboutBody }) {
  const footer = originalCopy.footer;
  const isActive = (path) => path?.replace(/\/$/, '') === activePath.replace(/\/$/, '');
  return <footer className="about-copy-footer">
    <div className="about-copy-container">
      <div className="about-copy-footer-grid">
        <div className="about-copy-footer-brand"><CopyLogo /><p className="about-copy-footer-about">{aboutBody ?? footer.aboutBody.replace('Ething Solutions', 'eThing').replace('staff augmentation plus consulting and delivery support so enterprises can scale teams', 'staff augmentation, along with consulting and delivery support, so enterprises can scale their teams')}</p></div>
        {[{ title: footer.quickLinksTitle, links: footer.quickLinks }, { title: footer.industriesTitle, links: footer.industries }].map((group) => <div key={group.title}>
          <h3 className="about-copy-footer-title">{group.title}</h3>
          <ul className="about-copy-footer-links">{group.links.map((link) => <li key={link.path}><a href={copyDestination(link.path === '/contact' ? contactHref : link.path)} aria-current={isActive(link.path) ? 'page' : undefined}><span><CopyIcon kind="check" /></span>{link.label}</a></li>)}</ul>
        </div>)}
        <div>
          <h3 className="about-copy-footer-title">{footer.contactTitle}</h3>
          <ul className="about-copy-footer-contact">
            <li><CopyIcon kind="map" /><span>{footer.address.line1}<br />{footer.address.line2}</span></li>
            <li><div>{footer.phones.map((phone) => <div key={phone.value}><CopyIcon kind="phone" /><span>{phone.label}: {phone.value}</span></div>)}</div></li>
            <li><CopyIcon kind="mail" /><a href={`mailto:${footer.email}`}>{footer.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="about-copy-footer-bottom"><p>© {new Date().getFullYear()} eThing</p><a href={copyDestination(contactHref)}>{originalCopy.cta.label} →</a></div>
    </div>
  </footer>;
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
