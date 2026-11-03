import { talentLinks, company, engineering, industries } from '../data/siteFooter.js';
import '../styles/site-footer.css';

function Icon({ kind, size = 20 }) {
  if (kind === 'mail') return <svg width={24} height={20} viewBox="0 0 512 384" aria-hidden="true">
    <path fill="#4285f4" d="M34.91 384h81.45V186.18L0 98.91v250.18C0 368.41 15.65 384 34.91 384Z"/>
    <path fill="#34a853" d="M395.64 384h81.45C496.41 384 512 368.35 512 349.09V98.91l-116.36 87.27Z"/>
    <path fill="#fbbc04" d="M395.64 34.91v151.27L512 98.91V52.36c0-43.17-49.28-67.78-83.78-41.89Z"/>
    <path fill="#ea4335" d="M116.36 186.18V34.91L256 139.64 395.64 34.91v151.27L256 290.91Z"/>
    <path fill="#c5221f" d="M0 52.36v46.55l116.36 87.27V34.91L83.78 10.47C49.22-15.42 0 9.19 0 52.36Z"/>
  </svg>;
  const paths = {
    arrow: <path d="M5 19 19 5M5 5h14v14"/>,
    linkedin: <g fill="currentColor" stroke="none"><circle cx="5" cy="5" r="2"/><path d="M3.2 8.5h3.6V21H3.2zM10 8.5h3.5v1.7c.7-1.3 2-2 3.6-2 3.5 0 4.1 2.2 4.1 5.1V21h-3.6v-6.8c0-1.6-.3-2.9-2-2.9s-2 1.5-2 3V21H10z"/></g>,
    youtube: <><rect x="1" y="4.5" width="22" height="15" rx="4.5" fill="currentColor" stroke="none"/><path d="m10 8.5 6 3.5-6 3.5Z" fill="white" stroke="none"/></>,
    phone: <path d="M8 3H4a1 1 0 0 0-1 1c0 9 8 17 17 17a1 1 0 0 0 1-1v-4l-5-2-2 3c-3-1-6-4-7-7l3-2-2-5Z"/>,
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind]}</svg>;
}

export default function SiteFooter() {
  return <footer className="fs-footer" aria-label="Site footer">
        <div className="fs-container">
          <div className="fs-main">
            <div className="fs-brand">
              <a href="/" className="fs-logo" aria-label="eThing home"><img src="/brand/ething-logo-new-font.png" alt="eThing" width="70" height="70" loading="lazy" decoding="async"/></a>
              <p className="fs-brand-description">eThing provides IT staff augmentation and software development for websites, mobile apps and desktop applications. We help businesses extend their teams and deliver technology projects.</p>
              <p className="fs-brand-description">Our core expertise includes AI engineering, Python development and Oracle EBS services, with flexible support from individual specialists to dedicated delivery teams.</p>
            </div>
            <div className="fs-navigation">
              <nav className="fs-company" aria-labelledby="fs-company-title">
                <h3 id="fs-company-title">Company</h3>
                <ul>{company.map(([label,path]) => <li key={path}><a href={path}>{label}</a></li>)}</ul>
              </nav>
              <nav className="fs-talent" aria-labelledby="fs-talent-title">
                <h3 id="fs-talent-title">Hire Talent</h3>
                <ul>{talentLinks.map(([label,path]) => <li key={path}><a href={path}>{label}</a></li>)}</ul>
              </nav>
              <div className="fs-secondary">
                <nav className="fs-industries" aria-labelledby="fs-industries-title"><h3 id="fs-industries-title">Industries we support</h3><ul>{industries.map(link => <li key={link.path}><a href={link.path}>{link.label}</a></li>)}</ul></nav>
                <nav className="fs-engineering" aria-labelledby="fs-engineering-title"><h3 id="fs-engineering-title">Engineering services</h3><ul>{engineering.map(([label,path]) => <li key={path}><a href={path}>{label}</a></li>)}</ul></nav>
              </div>
            </div>
            <div className="fs-contact">
              <h3>Let’s talk</h3>
              <a href="mailto:support@ething.in" className="fs-email">support@ething.in <Icon kind="arrow" size={16}/></a>
              <div className="fs-contact-line"><Icon kind="phone" size={16}/><div><a href="tel:+917011956780"><small>India</small> +91 70119 56780</a><a href="tel:+19295574560"><small>USA</small> +1 929 557 4560</a></div></div>
              <div className="fs-contact-line"><Icon kind="pin" size={17}/><p>Building Number 145,<br/>Sector 44 Road, Gurugram,<br/>Haryana, India · 122003</p></div>
              <div className="fs-socials" aria-label="Social media">
                <a className="fs-social-linkedin" href="https://www.linkedin.com/company/ething/" target="_blank" rel="noopener noreferrer" aria-label="eThing on LinkedIn (opens in a new tab)" title="LinkedIn"><Icon kind="linkedin"/></a>
                <a className="fs-social-youtube" href="https://www.youtube.com/@ethingsolutions" target="_blank" rel="noopener noreferrer" aria-label="eThing Solutions on YouTube (opens in a new tab)" title="YouTube"><Icon kind="youtube" size={24}/></a>
                <a className="fs-social-email" href="mailto:support@ething.in" aria-label="Email eThing" title="Email"><Icon kind="mail"/></a>
              </div>
            </div>
          </div>
          <div className="fs-bottom"><p>© {new Date().getFullYear()} eThing. All rights reserved.</p></div>
        </div>
      </footer>;
}
