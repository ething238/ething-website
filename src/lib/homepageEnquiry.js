import { sendWeb3FormsEmail } from './web3forms.js'
import { trackEvent } from './tracking.js'

const context = { landing_page: '/', page_category: 'homepage', form_name: 'homepage_enquiry' }
const required = ['name', 'email', 'message']

export async function submitHomepageEnquiry(lead) {
  if (!lead || required.some(key => typeof lead[key] !== 'string' || !lead[key].trim()) || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(lead.email.trim())) {
    trackEvent('lead_form_error', { ...context, reason: 'validation' })
    return { ok: false, error: 'validation' }
  }
  trackEvent('lead_form_submit', context)
  const engagement = typeof lead.engagement === 'string' ? lead.engagement : 'Help me choose'
  const specialty = typeof lead.specialty === 'string' ? lead.specialty : 'Help me choose'
  const message = ['New eThing homepage enquiry', '', `Name: ${lead.name.trim()}`, `Work email: ${lead.email.trim()}`, `Engagement: ${engagement}`, `Area of interest: ${specialty}`, '', 'Project requirements:', lead.message.trim(), '', 'Source page: /'].join('\n')
  let result
  try {
    result = await sendWeb3FormsEmail({ subject: `Homepage enquiry: ${engagement.replace(/[\r\n]/g, ' ').slice(0, 100)} · ${specialty.replace(/[\r\n]/g, ' ').slice(0, 100)}`, name: lead.name.trim(), email: lead.email.trim(), message })
  } catch {
    result = { ok: false, error: 'network_error' }
  }
  if (!result?.ok) {
    trackEvent('lead_form_error', { ...context, reason: result?.error || 'delivery' })
    return { ok: false, error: result?.error || 'submission_failed' }
  }
  trackEvent('lead_form_success', context)
  trackEvent('generate_lead', context)
  return { ok: true }
}
