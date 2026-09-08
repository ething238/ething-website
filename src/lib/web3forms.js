const WEB3FORMS_URL = 'https://api.web3forms.com/submit'

function getAccessKey() {
  return import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() || ''
}

export function isWeb3FormsConfigured() {
  return Boolean(getAccessKey())
}

export async function sendWeb3FormsEmail({ subject, name, email, message }) {
  const accessKey = getAccessKey()
  if (!accessKey) {
    return { ok: false, error: 'not_configured' }
  }

  try {
    const res = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        name,
        email,
        message,
      }),
    })

    const data = await res.json().catch(() => ({}))
    if (res.ok && data.success) {
      return { ok: true }
    }

    console.error('[Web3Forms] Submission failed', data)
    return { ok: false, error: 'submission_failed' }
  } catch (error) {
    console.error('[Web3Forms] Network error', error)
    return { ok: false, error: 'network_error' }
  }
}

export function buildLeadFormEmailMessage({
  name,
  email,
  company,
  companySize,
  hiringNeed,
  engineersNeeded,
  utm = {},
}) {
  const lines = [
    'New lead from the Hire Developers landing page',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Company size: ${companySize}`,
    `Hiring need: ${hiringNeed}`,
    `Engineers needed: ${engineersNeeded}`,
  ]

  const utmEntries = Object.entries(utm).filter(([, value]) => value)
  if (utmEntries.length > 0) {
    lines.push('', 'Campaign tracking:')
    for (const [key, value] of utmEntries) {
      lines.push(`${key}: ${value}`)
    }
  }

  if (typeof window !== 'undefined') {
    lines.push('', `Page: ${window.location.href}`)
  }

  return lines.join('\n')
}

export async function sendLeadFormEmailNotification(lead) {
  const subject = `New landing page lead: ${lead.name} (${lead.company})`
  const message = buildLeadFormEmailMessage(lead)

  return sendWeb3FormsEmail({
    subject,
    name: lead.name,
    email: lead.email,
    message,
  })
}
