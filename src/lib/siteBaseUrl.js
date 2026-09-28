/**
 * Canonical site origin for meta tags and JSON-LD.
 * Set `VITE_SITE_URL` in `.env` to override the production origin.
 */
export function getSiteBaseUrl() {
  const raw = import.meta.env.VITE_SITE_URL
  if (raw && typeof raw === 'string') {
    try {
      const url = new URL(raw)
      if (url.hostname !== 'ethingsolutions.com' && url.hostname !== 'www.ethingsolutions.com') {
        return url.origin
      }
    } catch {
      // Fall through to the canonical production origin.
    }
  }
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    return window.location.origin
  }
  return 'https://www.ethingsolutions.com'
}
