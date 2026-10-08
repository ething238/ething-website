import { sendWeb3FormsEmail } from './web3forms.js'
import { trackEvent } from './tracking.js'

const context = { landing_page: '/about_us', page_category: 'about', form_name: 'about_enquiry' }
const required = ['name', 'email', 'phone', 'company', 'hiringNeed']

export async function submitAboutEnquiry(lead) {
  if (required.some(key => typeof lead[key] !== 'string' || !lead[key].trim()) || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(lead.email.trim())) {
    trackEvent('lead_form_error', { ...context, reason: 'validation' })
    return { ok: false, error: 'validation' }
  }
  trackEvent('lead_form_submit', context)
  const message = [
    'New eThing About Us enquiry', '',
    `Name: ${lead.name.trim()}`, `Work email: ${lead.email.trim()}`,
    `Phone: ${lead.phone.trim()}`, `Company: ${lead.company.trim()}`,
    `Hiring need: ${lead.hiringNeed.trim()}`, 'Source page: /about_us',
    ...Object.entries(lead.attribution || {}).filter(([,value]) => value).map(([key,value]) => `${key}: ${value}`),
  ].join('\n')
  let result
  try {
    // The existing Web3Forms key must belong to the support@ething.in recipient.
    result = await sendWeb3FormsEmail({ subject: `New engineering enquiry: ${lead.hiringNeed.replace(/[\r\n]/g, ' ').slice(0,100)}`, name: lead.name.trim(), email: lead.email.trim(), message })
  } catch {
    result = { ok: false, error: 'network_error' }
  }
  if (!result.ok) {
    trackEvent('lead_form_error', { ...context, reason: result.error || 'delivery' })
    return result
  }
  trackEvent('lead_form_success', context)
  trackEvent('generate_lead', context)
  return { ok: true }
}
