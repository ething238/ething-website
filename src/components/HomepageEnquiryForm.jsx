import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, Download, Mail, Pencil } from 'lucide-react'

export default function HomepageEnquiryForm({ intent, onIntentChange, specialty, email = 'support@ething.in' }) {
  const [prepared, setPrepared] = useState(null)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const review = useRef(null)
  const form = useRef(null)
  const name = useRef(null)
  useEffect(() => { setPrepared(null); setCopied(false); setCopyError(false) }, [intent, specialty])
  function prepare(formEl) {
    if (!formEl.reportValidity()) return
    const fields = Object.fromEntries(new FormData(formEl))
    const emptyField = ['name', 'message'].find(key => !fields[key].trim())
    if (emptyField) {
      const input = formEl.elements.namedItem(emptyField)
      input.setCustomValidity('Please include some text here.')
      input.reportValidity()
      return
    }
    const body = "Hello eThing,\n\nI'd like to discuss " + fields.engagement.toLowerCase() + ".\n\nName: " + fields.name.trim() + "\nWork email: " + fields.email.trim() + "\nArea of interest: " + fields.specialty + "\n\nWhat we need:\n" + fields.message.trim() + "\n\nThank you,\n" + fields.name.trim()
    setPrepared({ body, subject: 'Enquiry: ' + fields.engagement + ' · ' + fields.specialty })
    setCopied(false); setCopyError(false)
    requestAnimationFrame(() => review.current?.focus())
  }
  async function copy() {
    try { await navigator.clipboard.writeText(prepared.subject + '\n\n' + prepared.body); setCopied(true); setCopyError(false) }
    catch { setCopyError(true) }
  }
  function download() {
    const blob = new Blob([prepared.subject + '\n\n' + prepared.body], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a'); link.href = url; link.download = 'ething-enquiry.txt'; link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  function edit() { setPrepared(null); requestAnimationFrame(() => name.current?.focus()) }
  return <div className="enquiry-card">
    {/* Preparing an email draft is not a lead submission. Avoid the GTM form-submit conversion trigger. */}
    <form ref={form} onSubmit={e => e.preventDefault()} onKeyDown={e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); prepare(e.currentTarget) } }} onInput={e => e.target.setCustomValidity?.('')} hidden={Boolean(prepared)}>
      <div className="form-row"><label>Your name<input ref={name} name="name" autoComplete="name" required maxLength="100" placeholder="Your full name" /></label><label>Work email<input name="email" type="email" autoComplete="email" required maxLength="200" placeholder="you@company.com" /></label></div>
      <div className="form-row"><label>I'd like to<select name="engagement" value={intent} onChange={e => onIntentChange(e.target.value)}><option>Team extension</option><option>Dedicated team</option><option>Project delivery</option><option>Help me choose</option></select></label><label>Area of interest<select name="specialty" key={specialty} defaultValue={specialty || 'Help me choose'}><option>Help me choose</option><option>Software engineering</option><option>AI &amp; data</option><option>Cloud &amp; DevOps</option><option>Mobile development</option><option>Quality &amp; security</option><option>Embedded engineering</option><option>Multiple disciplines</option></select></label></div>
      <label>What are you working on?<textarea name="message" rows="4" required maxLength="2200" placeholder="Tell us about your project, the skills you need and your start date." /></label>
      <button className="button button-blue form-submit" type="button" onClick={() => prepare(form.current)}>Review your request <ArrowUpRight size={18} aria-hidden="true" /></button>
    </form>
    {prepared && <div className="enquiry-review" ref={review} tabIndex="-1">
      <span className="review-icon"><Check size={25} aria-hidden="true" /></span><h3>Review your enquiry</h3><p>Your enquiry is ready. Open the email draft, check it and send it from your email app.</p>
      <details className="brief-preview"><summary>Review your enquiry</summary><pre>{prepared.body}</pre></details>
      <a className="button button-blue form-submit" href={'mailto:' + email + '?subject=' + encodeURIComponent(prepared.subject) + '&body=' + encodeURIComponent(prepared.body)}><Mail size={18} aria-hidden="true" />Open email draft <ArrowUpRight size={18} aria-hidden="true" /></a>
      <div className="review-actions"><button type="button" onClick={copy}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied' : 'Copy enquiry'}</button><button type="button" onClick={download}><Download size={15} />Save enquiry</button><button type="button" onClick={edit}><Pencil size={15} />Edit</button></div>
      <p className="form-note" role="status">{copyError ? 'Copy is unavailable here. Save your enquiry or select the text above.' : copied ? 'Enquiry copied. Paste it into an email to ' + email + '.' : 'No message has been sent yet. No email app? Copy or save your enquiry.'}</p>
    </div>}
  </div>
}
