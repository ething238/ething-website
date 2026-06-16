import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Phone } from 'lucide-react'
import Logo from '../Logo.jsx'

import { lpCtaPrimaryOrange } from './lpCtaStyles.js'

export default function LandingHeader({ onGetProfiles, onBookCall, primaryCta, secondaryCta }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ething-navy/10 bg-white/95 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo
          name="ETHING"
          logoSrc="/images/ething-logo.png"
          logoAlt="Ething"
          variant={scrolled ? 'on-light' : 'on-dark'}
          className="shrink-0"
        />

        <div className="hidden items-center gap-2 sm:flex">
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Shield className="h-3.5 w-3.5 text-teal-600" />
            NDA Protected
          </span>
          <span className="hidden items-center gap-1.5 text-xs text-zinc-500 md:flex">
            <Phone className="h-3.5 w-3.5 text-teal-600" />
            +1-929-557-4560
          </span>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBookCall}
            className={`hidden min-h-[44px] rounded-full px-5 py-2.5 text-sm font-semibold sm:inline-flex sm:min-h-[48px] sm:px-6 sm:text-base ${
              scrolled
                ? 'border border-ething-navy/15 text-ething-navy hover:bg-zinc-50'
                : 'border border-white/25 text-white hover:bg-white/10'
            }`}
          >
            <span className="md:hidden">Book Call</span>
            <span className="hidden md:inline">{secondaryCta}</span>
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGetProfiles}
            className={`${lpCtaPrimaryOrange} px-5 sm:px-7`}
          >
            {primaryCta}
          </motion.button>
        </div>
      </div>
    </header>
  )
}
