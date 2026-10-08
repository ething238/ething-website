import { brandLogo } from '../data/aboutBrand.js';

export default function BrandLogo({ href = '/', className = 'logo brand-logo' }) {
  return <a href={href} className={className} aria-label="eThing home"><img src={brandLogo.src} alt={brandLogo.alt} width={brandLogo.width} height={brandLogo.height} /></a>;
}
