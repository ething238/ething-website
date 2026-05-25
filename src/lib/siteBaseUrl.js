/**
 * Canonical site origin for meta tags and JSON-LD.
 * Set `VITE_SITE_URL` in `.env` for production (e.g. https://www.example.com).
 */
export function getSiteBaseUrl() {
  const raw = import.meta.env.VITE_SITE_URL
  if (raw && typeof raw === 'string') {
    return raw.replace(/\/$/, '')
  }
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    return window.location.origin
  }
  return ''
}
