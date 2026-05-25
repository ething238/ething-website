import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function sendVisit(payload) {
  const body = JSON.stringify(payload)
  const url = '/api/visit'

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([body], { type: 'application/json' })
    navigator.sendBeacon(url, blob)
    return
  }

  void fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    keepalive: true,
  })
}

export default function VisitTracker() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    const payload = {
      path: `${pathname || '/'}${search || ''}${hash || ''}`,
      referrer: document.referrer || 'direct',
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language || 'unknown',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown',
    }

    sendVisit(payload)
  }, [pathname, search, hash])

  return null
}
