import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function StickyMobileCta({ onPrimaryClick, onSecondaryClick, primaryCta, secondaryCtaShort = 'Book Call' }) {
  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white/95 p-3 shadow-[0_-8px_32px_rgba(0,0,0,0.08)] backdrop-blur-lg md:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onPrimaryClick}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ething-navy py-3.5 text-sm font-semibold text-white sm:min-h-[48px] sm:text-base"
        >
          {primaryCta}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={onSecondaryClick}
          className="flex-1 rounded-full border border-ething-navy/20 py-3.5 text-sm font-semibold text-ething-navy sm:min-h-[48px] sm:text-base"
        >
          {secondaryCtaShort}
        </button>
      </div>
    </motion.div>
  )
}
