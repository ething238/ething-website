/**
 * Canonical site origin for meta tags and JSON-LD.
 * Set `VITE_SITE_URL` in `.env` to override the production origin.
 */
export function getSiteBaseUrl() {
  const raw = import.meta.env.VITE_SITE_URL
  if (raw && typeof raw === 'string') {
    return raw.replace(/\/$/, '')
  }
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    return window.location.origin
  }
  return 'https://www.ethingsolutions.com'
}
