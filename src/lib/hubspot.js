function trimEnv(value) {
  return typeof value === 'string' ? value.trim() : ''
}

let resolvedPortalId = trimEnv(import.meta.env.VITE_HUBSPOT_PORTAL_ID)
let resolvedFormGuid = trimEnv(import.meta.env.VITE_HUBSPOT_FORM_GUID)
let configPromise = null

function buildSubmitUrl(portalId, formGuid) {
  return `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`
}

/** Resolve HubSpot IDs from build-time env, then /config.json (for Hostinger static deploys). */
export async function loadHubSpotConfig() {
  if (resolvedPortalId && resolvedFormGuid) {
    return { portalId: resolvedPortalId, formGuid: resolvedFormGuid }
  }

  if (!configPromise) {
    configPromise = (async () => {
      try {
        const res = await fetch('/config.json', { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          resolvedPortalId = trimEnv(data.hubspotPortalId)
          resolvedFormGuid = trimEnv(data.hubspotFormGuid)
        }
      } catch (error) {
        console.error('[HubSpot] Failed to load /config.json', error)
      }

      return { portalId: resolvedPortalId, formGuid: resolvedFormGuid }
    })()
  }

  return configPromise
}

export function isHubSpotConfigured() {
  return Boolean(resolvedPortalId && resolvedFormGuid)
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

function formatHubSpotError(data) {
  if (!data || typeof data !== 'object') return 'Submission failed.'
  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors.map((err) => err.message).join(' ')
  }
  if (typeof data.message === 'string' && data.message) return data.message
  return 'Submission failed.'
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
  const { portalId, formGuid } = await loadHubSpotConfig()
  if (!portalId || !formGuid) {
    return { ok: false, error: 'not_configured' }
  }

  const { firstname, lastname } = splitName(name)
  const fields = [
    contactField('firstname', firstname),
    contactField('lastname', lastname),
    contactField('email', email),
    contactField('company', company),
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

  const submitUrl = buildSubmitUrl(portalId, formGuid)

  try {
    const res = await fetch(submitUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields, context }),
    })

    if (res.ok) {
      return { ok: true }
    }

    const data = await res.json().catch(() => ({}))
    console.error('[HubSpot] Submission failed', { status: res.status, data, submitUrl })
    return { ok: false, error: 'submission_failed', message: formatHubSpotError(data), details: data }
  } catch (error) {
    console.error('[HubSpot] Network error', error)
    return { ok: false, error: 'network_error' }
  }
}
