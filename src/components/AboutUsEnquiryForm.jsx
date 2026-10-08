import { useEffect, useRef, useState } from 'react'
import { trackEvent } from '../lib/tracking.js'
import { submitAboutEnquiry } from '../lib/aboutEnquiry.js'

const fields = [
  { name: 'name', label: 'Name', autoComplete: 'name' },
  { name: 'email', label: 'Work Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone Number', type: 'tel', autoComplete: 'tel' },
  { name: 'company', label: 'Company', autoComplete: 'organization' },
  { name: 'hiringNeed', label: 'Hiring Need', options: ['Software Engineering', 'AI / ML Engineering', 'Frontend Development', 'Backend Development', 'Full Stack Development', 'DevOps / Cloud', 'Data Engineering', 'Multiple Skills', 'Other'] },
]
const attributionKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid']
const context = { landing_page: '/about_us', page_category: 'about', form_name: 'about_enquiry' }

export default function AboutUsEnquiryForm() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const started = useRef(false)
  const viewed = useRef(false)
  useEffect(() => {
    if (!viewed.current) { viewed.current = true; trackEvent('lead_form_view', context) }
  }, [])
  async function submit(event) {
    event.preventDefault()
    if (status === 'loading') return
    const lead = Object.fromEntries(new FormData(event.currentTarget))
    const query = new URLSearchParams(window.location.search)
    lead.attribution = Object.fromEntries(attributionKeys.map(key => [key, query.get(key) || '']))
    setStatus('loading')
    setError('')
    const result = await submitAboutEnquiry(lead)
    if (result.ok) setStatus('success')
    else { setStatus('error'); setError('Your request could not be sent. Please try again or email support@ething.in.') }
  }
  return <div className="about-copy-form-card">
    <h3>Tell us what your team needs</h3>
    {status === 'success' ? <p className="about-copy-form-success" role="status">Thank you. Your request has been sent to our team.</p> : <form onSubmit={submit} onFocus={() => { if (!started.current) { started.current = true; trackEvent('lead_form_start', context) } }} aria-label="Engineering enquiry">
      <div className="about-copy-form-grid">{fields.map(field => <label className={field.options ? 'about-copy-form-wide' : undefined} htmlFor={`about-enquiry-${field.name}`} key={field.name}>{field.label} <span aria-hidden="true">*</span>
        {field.options ? <select id={`about-enquiry-${field.name}`} name={field.name} required defaultValue="Software Engineering" disabled={status === 'loading'}>{field.options.map(option => <option key={option}>{option}</option>)}</select> : <input id={`about-enquiry-${field.name}`} name={field.name} type={field.type || 'text'} autoComplete={field.autoComplete} required maxLength={254} pattern={field.type === 'email' ? '[^\\s<>@]+@[^\\s<>@]+\\.[^\\s<>@]+' : '.*\\S.*'} disabled={status === 'loading'} />}
      </label>)}</div>
      {error && <p className="about-copy-form-error" role="alert">{error}</p>}
      <button type="submit" className="about-copy-contact-button" disabled={status === 'loading'}>{status === 'loading' ? 'Sending…' : 'Send enquiry'}<span aria-hidden="true"> →</span></button>
      <p className="about-copy-form-privacy">We use these details to discuss your requirements. Read our <a href="https://www.ethingsolutions.com/privacy-policy">Privacy Policy</a>.</p>
    </form>}
  </div>
}
