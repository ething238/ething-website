import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const DEFAULT_H = 'h-10 w-auto sm:h-11'
const DARK_H = 'h-9 w-auto sm:h-10'

/**
 * @param {object} p
 * @param {string} p.name - Brand name (used as fallback alt)
 * @param {string} [p.logoSrc] - URL under `public/`
 * @param {string} [p.logoAlt]
 * @param {string} p.to
 * @param {string} p.className
 * @param {'on-dark' | 'on-light'} p.variant - on-dark: chip behind mark for legibility on hero
 */
export default function Logo({ name, logoSrc, logoAlt, to = '/', className = '', variant = 'on-dark' }) {
  const src = logoSrc
  const alt = logoAlt || name
  if (!src) {
    return (
      <Link
        to={to}
        className={`group flex items-center gap-2.5 font-[family:var(--font-display)] text-lg font-bold tracking-tight text-white ${className}`}
      >
        <span className="text-white drop-shadow-sm">{name}</span>
      </Link>
    )
  }

  if (variant === 'on-dark') {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
        <Link to={to} className={`flex items-center ${className}`}>
          <span className="inline-flex items-center justify-center rounded-2xl bg-white/95 px-3 py-2 shadow-sm ring-1 ring-white/25">
            <img src={src} alt={alt} className={`${DARK_H} object-contain object-left`} width={220} height={48} />
          </span>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="inline-block">
      <Link to={to} className={`flex items-center ${className}`}>
        <img src={src} alt={alt} className={`object-contain object-left ${DEFAULT_H}`} width={260} height={56} />
      </Link>
    </motion.div>
  )
}

export function LogoLight({ name, logoSrc, logoAlt, to = '/', className = '' }) {
  return (
    <Logo
      name={name}
      logoSrc={logoSrc}
      logoAlt={logoAlt}
      to={to}
      className={className}
      variant="on-light"
    />
  )
}
