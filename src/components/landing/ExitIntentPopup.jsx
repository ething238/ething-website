import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, X } from 'lucide-react'

export default function ExitIntentPopup({ onOpenForm }) {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return
    try {
      if (sessionStorage.getItem('ething_exit_dismissed')) {
        setDismissed(true)
        return
      }
    } catch {
      /* ignore */
    }

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    function onMouseLeave(e) {
      if (isTouch) return
      if (e.clientY <= 0 && !dismissed) {
        setShow(true)
      }
    }

    document.addEventListener('mouseleave', onMouseLeave)
    return () => document.removeEventListener('mouseleave', onMouseLeave)
  }, [dismissed])

  function dismiss() {
    setShow(false)
    setDismissed(true)
    try {
      sessionStorage.setItem('ething_exit_dismissed', '1')
    } catch {
      /* ignore */
    }
  }

  function handleCta() {
    dismiss()
    onOpenForm()
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ething-ink/70 backdrop-blur-sm"
            aria-label="Close"
            onClick={dismiss}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-4 top-4 rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10">
              <Gift className="h-7 w-7 text-teal-600" />
            </div>
            <h3 className="font-[family:var(--font-display)] text-2xl font-bold text-ething-ink">
              Wait - get 3 free profiles first
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              Before you go: receive 3 pre-vetted developer profiles matched to your stack - free,
              no commitment, delivered within 48 hours.
            </p>
            <button
              type="button"
              onClick={handleCta}
              className="mt-6 w-full rounded-full bg-ething-navy py-3.5 text-sm font-semibold text-white transition hover:bg-ething-navy/90"
            >
              Get 3 Vetted Profiles Free
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="mt-3 w-full py-2 text-sm text-zinc-400 hover:text-zinc-600"
            >
              No thanks
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
