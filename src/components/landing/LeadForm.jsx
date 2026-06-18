import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { utmParamsForForm } from '../../lib/utmParams.js'
import { isHubSpotConfigured, loadHubSpotConfig, submitLeadToHubSpot } from '../../lib/hubspot.js'
import { trackLeadConversion } from '../../lib/tracking.js'

const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '500+ employees',
]

const HIRING_NEEDS = [
  'Staff Augmentation',
  'Dedicated Development Team',
  'Contract Developers',
  'Offshore Development Team',
  'Not sure yet',
]

const ENGINEER_COUNTS = ['1', '2-3', '4-6', '7-10', '10+']

const fieldClass =
  'w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'

const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500'

function validateWorkEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!re.test(email)) return 'Please enter a valid email address.'
  const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com']
  const domain = email.split('@')[1]?.toLowerCase()
  if (freeDomains.includes(domain)) return 'Please use your work email address.'
  return null
}

export default function LeadForm({
  cta = 'Send Me Profiles',
  compact = false,
  formId = 'lead-form',
  onSuccess,
  className = '',
}) {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [utm, setUtm] = useState({})

  useEffect(() => {
    setUtm(utmParamsForForm())
    loadHubSpotConfig()
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    const formEl = e.currentTarget
    const fd = new FormData(formEl)

    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const company = String(fd.get('company') ?? '').trim()
    const companySize = String(fd.get('company_size') ?? '').trim()
    const hiringNeed = String(fd.get('hiring_need') ?? '').trim()
    const engineersNeeded = String(fd.get('engineers_needed') ?? '').trim()

    const nextErrors = {}
    if (!name) nextErrors.name = 'Name is required.'
    const emailErr = validateWorkEmail(email)
    if (emailErr) nextErrors.email = emailErr
    if (!company) nextErrors.company = 'Company is required.'
    if (!companySize) nextErrors.company_size = 'Please select company size.'
    if (!hiringNeed) nextErrors.hiring_need = 'Please select a hiring need.'
    if (!engineersNeeded) nextErrors.engineers_needed = 'Please select number of engineers.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setSubmitError('')

    await loadHubSpotConfig()
    if (!isHubSpotConfigured()) {
      setStatus('not_configured')
      return
    }

    setStatus('submitting')

    const result = await submitLeadToHubSpot({
      name,
      email,
      company,
      companySize,
      hiringNeed,
      engineersNeeded,
    })

    if (result.ok) {
      setStatus('success')
      trackLeadConversion(formId)
      formEl.reset()
      onSuccess?.()
    } else {
      setStatus('error')
      if (result.error === 'network_error') {
        setSubmitError('Network error. Check your connection or disable ad blockers, then try again.')
      } else if (result.message) {
        setSubmitError(result.message)
      }
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center ${className}`}
      >
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
        <h3 className="font-[family:var(--font-display)] text-xl font-bold text-ething-ink">
          Profiles on the way!
        </h3>
        <p className="mt-2 text-sm text-zinc-600">
          Our team will send 3 vetted developer profiles within 48 hours. Check your inbox.
        </p>
      </motion.div>
    )
  }

  return (
    <form id={formId} onSubmit={onSubmit} className={`space-y-4 ${className}`} noValidate>
      {/* Hidden UTM / GCLID fields */}
      {Object.entries(utm).map(([key, val]) => (
        <input key={key} type="hidden" name={key} value={val} readOnly />
      ))}

      <div className={compact ? 'grid gap-4 sm:grid-cols-2' : 'grid gap-4 sm:grid-cols-2'}>
        <label className="block text-left">
          <span className={labelClass}>Name *</span>
          <input name="name" className={fieldClass} placeholder="Your full name" />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </label>
        <label className="block text-left">
          <span className={labelClass}>Work Email *</span>
          <input name="email" type="email" className={fieldClass} placeholder="you@company.com" />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </label>
      </div>

      <label className="block text-left">
        <span className={labelClass}>Company *</span>
        <input name="company" className={fieldClass} placeholder="Company name" />
        {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company}</p>}
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-left">
          <span className={labelClass}>Company Size *</span>
          <select name="company_size" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select size
            </option>
            {COMPANY_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.company_size && (
            <p className="mt-1 text-xs text-red-600">{errors.company_size}</p>
          )}
        </label>
        <label className="block text-left">
          <span className={labelClass}>Hiring Need *</span>
          <select name="hiring_need" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select need
            </option>
            {HIRING_NEEDS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.hiring_need && (
            <p className="mt-1 text-xs text-red-600">{errors.hiring_need}</p>
          )}
        </label>
        <label className="block text-left">
          <span className={labelClass}>Engineers Needed *</span>
          <select name="engineers_needed" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select count
            </option>
            {ENGINEER_COUNTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.engineers_needed && (
            <p className="mt-1 text-xs text-red-600">{errors.engineers_needed}</p>
          )}
        </label>
      </div>

      <motion.button
        type="submit"
        disabled={status === 'submitting'}
        whileHover={status === 'submitting' ? undefined : { scale: 1.02 }}
        whileTap={status === 'submitting' ? undefined : { scale: 0.98 }}
        className={`flex w-full items-center justify-center gap-2 rounded-full bg-ething-navy px-10 py-4 text-base font-semibold text-white shadow-lg shadow-ething-navy/25 transition hover:bg-ething-navy/90 disabled:opacity-60`}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting…
          </>
        ) : (
          cta
        )}
      </motion.button>

      {status === 'error' && (
        <p className="text-center text-sm text-red-600">
          {submitError || 'Something went wrong. Please try again or email support@ething.in'}
        </p>
      )}
      {status === 'not_configured' && (
        <p className="text-center text-sm text-red-600">
          Form is not configured. Please contact us directly.
        </p>
      )}

      <p className="text-center text-xs text-zinc-400">
        🔒 NDA protected · No recruiting fees · US & UK clients welcome
      </p>
    </form>
  )
}
