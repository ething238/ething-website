const portalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID
const formGuid = import.meta.env.VITE_HUBSPOT_FORM_GUID

const HUBSPOT_SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`

export function isHubSpotConfigured() {
  return Boolean(portalId && formGuid)
}

export function splitName(fullName) {
  const parts = fullName.trim().split(/\s+/)
  return {
    firstname: parts[0] || '',
    lastname: parts.slice(1).join(' ') || '',
  }
}

function hubspotField(objectTypeId, name, value) {
  if (value == null || value === '') return null
  return { objectTypeId, name, value: String(value) }
}

function contactField(name, value) {
  return hubspotField('0-1', name, value)
}

function companyField(name, value) {
  return hubspotField('0-2', name, value)
}

function getHubSpotTrackingCookie() {
  if (typeof document === 'undefined') return undefined
  return document.cookie.match(/hubspotutk=([^;]*)/)?.[1]
}

export async function submitLeadToHubSpot({
  name,
  email,
  company,
  companySize,
  hiringNeed,
  engineersNeeded,
  pageName = 'Hire Developers India',
}) {
  if (!isHubSpotConfigured()) {
    return { ok: false, error: 'not_configured' }
  }

  const { firstname, lastname } = splitName(name)
  const fields = [
    contactField('firstname', firstname),
    contactField('lastname', lastname),
    contactField('email', email),
    contactField('company_name', company),
    contactField('engineers_needed', engineersNeeded),
    companyField('company_size', companySize),
    companyField('hiring_need', hiringNeed),
  ].filter(Boolean)

  const context = {
    pageUri: typeof window !== 'undefined' ? window.location.href : undefined,
    pageName,
  }

  const hutk = getHubSpotTrackingCookie()
  if (hutk) context.hutk = hutk

  try {
    const res = await fetch(HUBSPOT_SUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields, context }),
    })

    if (res.ok) {
      return { ok: true }
    }

    const data = await res.json().catch(() => ({}))
    return { ok: false, error: 'submission_failed', details: data }
  } catch {
    return { ok: false, error: 'network_error' }
  }
}
