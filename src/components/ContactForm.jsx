import { useState } from 'react'
import { motion } from 'framer-motion'

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'

export default function ContactForm({
  content,
  showTitle = true,
  title: titleOverride,
  className = '',
  headingId = 'contact-title',
}) {
  const { contactSection } = content
  const { form, homeTitle, note } = contactSection
  const heading = titleOverride ?? homeTitle
  const [status, setStatus] = useState('idle') // idle | submitting | success | error | not_configured

  async function onSubmit(e) {
    e.preventDefault()
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setStatus('not_configured')
      return
    }

    const formEl = e.currentTarget
    const fd = new FormData(formEl)
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const phone = String(fd.get('phone') ?? '').trim()
    const subjectField = String(fd.get('subject') ?? '').trim()
    const message = String(fd.get('message') ?? '').trim()

    const subject =
      subjectField ||
      `Website contact from ${name || email || 'visitor'}`

    const messageBody =
      message ||
      [
        `Name: ${name}`,
        `Email: ${email}`,
        phone && `Phone: ${phone}`,
        subjectField && `Subject: ${subjectField}`,
      ]
        .filter(Boolean)
        .join('\n')

    setStatus('submitting')

    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject,
          name,
          email,
          phone: phone || undefined,
          message: messageBody,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success) {
        setStatus('success')
        formEl.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const fieldClass =
    'w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20'

  const statusMessage =
    status === 'success'
      ? form.success
      : status === 'error'
        ? form.error
        : status === 'not_configured'
          ? form.notConfigured
          : null

  const showStatus = status === 'success' || status === 'error' || status === 'not_configured'

  return (
    <div className={className}>
      {showTitle && (
        <h2
          id={headingId}
          className="mb-2 text-center font-[family:var(--font-display)] text-3xl font-bold tracking-tight text-ething-ink md:text-4xl"
        >
          {heading}
        </h2>
      )}
      <p className="mb-8 text-center text-sm text-zinc-500">{note}</p>
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-xl space-y-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-left">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              {form.name.label}
            </span>
            <input name="name" required className={fieldClass} placeholder={form.name.placeholder} />
          </label>
          <label className="block text-left">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              {form.email.label}
            </span>
            <input
              name="email"
              type="email"
              required
              className={fieldClass}
              placeholder={form.email.placeholder}
            />
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-left">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              {form.phone.label}
            </span>
            <input name="phone" className={fieldClass} placeholder={form.phone.placeholder} />
          </label>
          <label className="block text-left">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              {form.subject.label}
            </span>
            <input name="subject" className={fieldClass} placeholder={form.subject.placeholder} />
          </label>
        </div>
        <label className="block text-left">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
            {form.message.label}
          </span>
          <textarea
            name="message"
            rows={5}
            className={`${fieldClass} resize-y min-h-[140px]`}
            placeholder={form.message.placeholder}
          />
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <motion.button
            type="submit"
            disabled={status === 'submitting'}
            whileHover={status === 'submitting' ? undefined : { scale: 1.02 }}
            whileTap={status === 'submitting' ? undefined : { scale: 0.98 }}
            className="rounded-full bg-ething-navy px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-ething-navy/20 transition hover:bg-ething-navy/90 disabled:pointer-events-none disabled:opacity-60"
          >
            {status === 'submitting' ? form.sending : form.submit}
          </motion.button>
          {showStatus && (
            <span
              role="status"
              className={`text-sm ${
                status === 'success'
                  ? 'text-emerald-600'
                  : status === 'error' || status === 'not_configured'
                    ? 'text-red-600'
                    : ''
              }`}
            >
              {statusMessage}
            </span>
          )}
        </div>
      </motion.form>
    </div>
  )
}
