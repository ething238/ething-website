function trimEnv(value) {
  return typeof value === 'string' ? value.trim() : ''
}

let resolvedWebhookUrl = trimEnv(import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL)
let resolvedSecret = trimEnv(import.meta.env.VITE_GOOGLE_SHEETS_SECRET)
let configPromise = null

/** Resolve webhook URL + secret from build-time env, then /config.json (Hostinger static deploys). */
export async function loadGoogleSheetsConfig() {
  if (resolvedWebhookUrl && resolvedSecret) {
    return { webhookUrl: resolvedWebhookUrl, secret: resolvedSecret }
  }

  if (!configPromise) {
    configPromise = (async () => {
      try {
        const res = await fetch('/config.json', { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          if (!resolvedWebhookUrl) {
            resolvedWebhookUrl = trimEnv(data.googleSheetsWebhookUrl)
          }
          if (!resolvedSecret) {
            resolvedSecret = trimEnv(data.googleSheetsSecret)
          }
        }
      } catch (error) {
        console.error('[GoogleSheets] Failed to load /config.json', error)
      }

      return { webhookUrl: resolvedWebhookUrl, secret: resolvedSecret }
    })()
  }

  return configPromise
}

export function isGoogleSheetsConfigured() {
  return Boolean(resolvedWebhookUrl && resolvedSecret)
}

function buildWebhookUrl(webhookUrl, params) {
  const url = new URL(webhookUrl)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value ?? ''))
  }
  return url.toString()
}

function leadParams(secret, lead) {
  const { name, email, company, companySize, hiringNeed, engineersNeeded, utm = {} } = lead
  return {
    token: secret,
    name,
    email,
    company,
    companySize,
    hiringNeed,
    engineersNeeded,
    utm_source: utm.utm_source || '',
    utm_medium: utm.utm_medium || '',
    utm_campaign: utm.utm_campaign || '',
    gclid: utm.gclid || '',
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
  }
}

/** POST via hidden form — works with Apps Script doPost. */
function appendLeadViaHiddenForm(webhookUrl, params) {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve({ ok: false, error: 'no_document' })
      return
    }

    const iframeName = `gsheet-${Date.now()}`
    const iframe = document.createElement('iframe')
    iframe.name = iframeName
    iframe.setAttribute('aria-hidden', 'true')
    iframe.style.cssText = 'position:absolute;width:0;height:0;border:0;visibility:hidden'
    document.body.appendChild(iframe)

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = webhookUrl
    form.target = iframeName
    form.acceptCharset = 'UTF-8'
    form.style.display = 'none'

    for (const [key, value] of Object.entries(params)) {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = String(value ?? '')
      form.appendChild(input)
    }

    document.body.appendChild(form)

    let settled = false
    function finish(ok) {
      if (settled) return
      settled = true
      form.remove()
      iframe.remove()
      resolve({ ok })
    }

    iframe.addEventListener('load', () => finish(true))
    setTimeout(() => finish(true), 4000)

    form.submit()
  })
}

/** GET via image beacon — works once doGet is added to Apps Script. */
function appendLeadViaGetBeacon(webhookUrl, params) {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve({ ok: false, error: 'no_document' })
      return
    }

    const url = buildWebhookUrl(webhookUrl, params)
    const img = new Image()
    img.referrerPolicy = 'no-referrer'

    let settled = false
    function finish(ok) {
      if (settled) return
      settled = true
      resolve({ ok })
    }

    img.onload = () => finish(true)
    img.onerror = () => finish(true)
    img.src = url
    setTimeout(() => finish(true), 3000)
  })
}

export async function appendLeadToGoogleSheet(lead) {
  const { webhookUrl, secret } = await loadGoogleSheetsConfig()
  if (!webhookUrl || !secret) {
    return { ok: false, error: 'not_configured' }
  }

  const params = leadParams(secret, lead)

  try {
    // Try POST first (doPost). Fall back to GET beacon (doGet) if needed.
    const postResult = await appendLeadViaHiddenForm(webhookUrl, params)
    if (postResult.ok) return postResult
    return await appendLeadViaGetBeacon(webhookUrl, params)
  } catch (error) {
    console.error('[GoogleSheets] Network error', error)
    return { ok: false, error: 'network_error' }
  }
}
