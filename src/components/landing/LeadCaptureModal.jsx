import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import LeadForm from './LeadForm.jsx'

export default function LeadCaptureModal({ open, onClose, title, subtitle }) {
  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ething-ink/60 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
        <h2
          id="lead-modal-title"
          className="pr-8 font-[family:var(--font-display)] text-2xl font-bold text-ething-ink"
        >
          {title}
        </h2>
        <p className="mt-2 text-sm text-zinc-500">{subtitle}</p>
        <div className="mt-6">
          <LeadForm formId="lead-modal-form" onSuccess={onClose} />
        </div>
      </motion.div>
    </motion.div>
  )
}
