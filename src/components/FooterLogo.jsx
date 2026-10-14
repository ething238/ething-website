import BrandLogo from './AboutBrandLogo.jsx'
import '../styles/footer-brand.css'

export default function FooterLogo({ href = '/', className = '' }) {
  return <BrandLogo href={href} className={`site-footer-logo ${className}`.trim()} />
}
