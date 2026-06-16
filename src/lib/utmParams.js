const STORAGE_KEY = 'ething_utm_params'

const TRACKED_KEYS = [
  'gclid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
]

/** Read UTM / GCLID from URL and persist for the session. */
export function captureUtmParams() {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  const incoming = {}

  for (const key of TRACKED_KEYS) {
    const value = params.get(key)
    if (value) incoming[key] = value
  }

  if (Object.keys(incoming).length === 0) {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(incoming))
  } catch {
    /* ignore quota errors */
  }

  return incoming
}

export function getStoredUtmParams() {
  if (typeof window === 'undefined') return {}
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export function utmParamsForForm() {
  const p = getStoredUtmParams()
  return {
    gclid: p.gclid ?? '',
    utm_source: p.utm_source ?? '',
    utm_medium: p.utm_medium ?? '',
    utm_campaign: p.utm_campaign ?? '',
    utm_term: p.utm_term ?? '',
    utm_content: p.utm_content ?? '',
  }
}
