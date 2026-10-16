import { brandLogo } from '../../data/aboutBrand.js';

export default function BrandLogo({ href = '/', className = 'logo brand-logo', optimized = false, lazy = false }) {
  const sources = optimized ? {
    src: '/website-development/brand/ething-logo-192.webp',
    srcSet: '/website-development/brand/ething-logo-96.webp 96w, /website-development/brand/ething-logo-192.webp 192w, /website-development/brand/ething-logo-256.webp 256w',
    sizes: '(max-width: 639px) 48px, 60px',
    loading: lazy ? 'lazy' : 'eager', decoding: 'async',
  } : { src: brandLogo.src };
  return <a href={href} className={className} aria-label="eThing home"><img {...sources} alt={brandLogo.alt} width={brandLogo.width} height={brandLogo.height} /></a>;
}
