import { useRef, useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { submitHomepageEnquiry } from '../lib/homepageEnquiry.js'

export default function HomepageEnquiryForm({ intent, onIntentChange, specialty }) {
  const [status, setStatus] = useState('idle')
  const form = useRef(null)
  const inFlight = useRef(false)
  const name = useRef(null)
  async function submit(formEl) {
    if (inFlight.current || !formEl.reportValidity()) return
    const lead = Object.fromEntries(new FormData(formEl))
    inFlight.current = true
    setStatus('sending')
    try {
      const result = await submitHomepageEnquiry(lead)
      setStatus(result.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    } finally {
      inFlight.current = false
    }
  }
  function startAgain() { setStatus('idle'); requestAnimationFrame(() => name.current?.focus()) }
  const sending = status === 'sending'
  return <div className="enquiry-card" aria-busy={sending}>
    {status === 'success' ? <div className="enquiry-review" role="status">
      <span className="review-icon"><Check size={25} aria-hidden="true" /></span>
      <h3>Enquiry sent</h3><p>Thank you. Your enquiry has been sent to our team. We will respond within 24 hours.</p>
      <button className="button button-blue form-submit" type="button" onClick={startAgain}>Send another enquiry</button>
    </div> : <form ref={form} aria-label="Homepage enquiry" onSubmit={e => e.preventDefault()} onKeyDown={e => { if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); void submit(e.currentTarget) } }}>
      <div className="form-row"><label>Your name<input ref={name} name="name" autoComplete="name" required pattern={'.*\\S.*'} maxLength="100" placeholder="Your full name" disabled={sending} /></label><label>Work email<input name="email" type="email" autoComplete="email" required maxLength="200" placeholder="you@company.com" disabled={sending} /></label></div>
      <div className="form-row"><label>I'd like to<select name="engagement" value={intent} onChange={e => onIntentChange(e.target.value)} disabled={sending}><option>Team extension</option><option>Dedicated team</option><option>Project delivery</option><option>Help me choose</option></select></label><label>Area of interest<select name="specialty" key={specialty} defaultValue={specialty || 'Help me choose'} disabled={sending}><option>Help me choose</option><option>Software engineering</option><option>AI &amp; data</option><option>Cloud &amp; DevOps</option><option>Mobile development</option><option>Quality &amp; security</option><option>Embedded engineering</option><option>Multiple disciplines</option></select></label></div>
      <label>What are you working on?<textarea name="message" rows="4" required maxLength="2200" placeholder="Tell us about your project, the skills you need and your start date." disabled={sending} /></label>
      {status === 'error' && <p className="form-note form-error" role="alert">Your enquiry could not be sent. Please try again.</p>}
      {/* Record a lead after delivery instead of triggering GTM's native form-submit conversion on an attempt. */}
      <button className="button button-blue form-submit" type="button" disabled={sending} onClick={() => { void submit(form.current) }}>{sending ? 'Sending...' : 'Send enquiry'}<ArrowUpRight size={18} aria-hidden="true" /></button>
    </form>}
  </div>
}
