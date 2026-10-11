import { sendWeb3FormsEmail } from './web3forms.js'
import { trackEvent } from './tracking.js'

export const aerospaceEnquiryContext = { landing_page: '/aerospace_industry', page_category: 'aerospace', form_name: 'aerospace_enquiry' }
const required = ['name', 'email', 'phone', 'company', 'hiringNeed']

export async function submitAerospaceEnquiry(lead) {
  if (required.some(key => typeof lead[key] !== 'string' || !lead[key].trim()) || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(lead.email.trim())) {
    trackEvent('lead_form_error', { ...aerospaceEnquiryContext, reason: 'validation' })
    return { ok: false, error: 'validation' }
  }
  trackEvent('lead_form_submit', aerospaceEnquiryContext)
  const message = [
    'New eThing Aerospace enquiry', '',
    `Name: ${lead.name.trim()}`, `Work email: ${lead.email.trim()}`,
    `Phone: ${lead.phone.trim()}`, `Company: ${lead.company.trim()}`,
    `Role needed: ${lead.hiringNeed.trim()}`,
    `Role requirements: ${String(lead.projectDetails || '').trim() || 'Not provided'}`,
    'Source page: /aerospace_industry',
    ...Object.entries(lead.attribution || {}).filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`),
  ].join('\n')
  let result
  try {
    // Reuse the site's existing Web3Forms key registered for support@ething.in.
    result = await sendWeb3FormsEmail({ subject: `New aerospace enquiry: ${lead.hiringNeed.replace(/[\r\n]/g, ' ').slice(0, 100)}`, name: lead.name.trim(), email: lead.email.trim(), message })
  } catch {
    result = { ok: false, error: 'network_error' }
  }
  if (!result.ok) {
    trackEvent('lead_form_error', { ...aerospaceEnquiryContext, reason: result.error || 'delivery' })
    return result
  }
  // Personal details belong only in the enquiry, never in analytics events.
  trackEvent('lead_form_success', aerospaceEnquiryContext)
  trackEvent('generate_lead', aerospaceEnquiryContext)
  return { ok: true }
}
