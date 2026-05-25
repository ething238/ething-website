import { useMemo, useState } from 'react'
import { Eye, Globe2, KeyRound, Loader2, MapPin, Monitor, RefreshCw } from 'lucide-react'

function formatDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value || 'unknown'
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function sourceLabel(visit) {
  const bits = [visit.city, visit.region, visit.country].filter(
    (item) => item && item !== 'unknown',
  )
  return bits.length ? bits.join(', ') : 'Unknown location'
}

export default function VisitorDashboard() {
  const [key, setKey] = useState('')
  const [visits, setVisits] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  const stats = useMemo(() => {
    const uniqueVisitors = new Set(visits.map((visit) => visit.visitorId)).size
    const countries = new Set(
      visits.map((visit) => visit.country).filter((country) => country && country !== 'unknown'),
    ).size
    return { uniqueVisitors, countries }
  }, [visits])

  async function loadVisits(event) {
    event?.preventDefault()
    if (!key.trim()) {
      setError('Enter the dashboard key.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/visits?key=${encodeURIComponent(key.trim())}`)
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || 'Could not load visits.')
      }

      setVisits(Array.isArray(data.visits) ? data.visits : [])
      setHasLoaded(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load visits.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10 text-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="flex flex-col gap-5 border-b border-zinc-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ething-orange">
              Visitor analytics
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-ething-ink sm:text-4xl">
              Site visits
            </h1>
          </div>

          <form className="flex w-full flex-col gap-3 sm:max-w-xl sm:flex-row" onSubmit={loadVisits}>
            <label className="relative flex-1">
              <KeyRound
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
              />
              <input
                className="h-11 w-full rounded-md border border-zinc-300 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-ething-orange focus:ring-2 focus:ring-orange-100"
                type="password"
                value={key}
                onChange={(event) => setKey(event.target.value)}
                placeholder="Dashboard key"
                autoComplete="current-password"
              />
            </label>
            <button
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-ething-ink px-4 text-sm font-semibold text-white transition hover:bg-ething-navy disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Load
            </button>
          </form>
        </section>

        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-md border border-zinc-200 bg-white p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
              <Eye className="h-4 w-4" />
              Visits
            </div>
            <p className="mt-3 text-3xl font-semibold text-ething-ink">{visits.length}</p>
          </div>
          <div className="rounded-md border border-zinc-200 bg-white p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
              <Monitor className="h-4 w-4" />
              Visitors
            </div>
            <p className="mt-3 text-3xl font-semibold text-ething-ink">{stats.uniqueVisitors}</p>
          </div>
          <div className="rounded-md border border-zinc-200 bg-white p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
              <Globe2 className="h-4 w-4" />
              Countries
            </div>
            <p className="mt-3 text-3xl font-semibold text-ething-ink">{stats.countries}</p>
          </div>
        </section>

        <section className="overflow-hidden rounded-md border border-zinc-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
              <thead className="bg-zinc-100 text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Visited</th>
                  <th className="px-4 py-3 font-semibold">Path</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Device</th>
                  <th className="px-4 py-3 font-semibold">Referrer</th>
                  <th className="px-4 py-3 font-semibold">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {visits.map((visit) => (
                  <tr key={visit.id} className="align-top">
                    <td className="whitespace-nowrap px-4 py-3 text-zinc-600">
                      {formatDate(visit.visitedAt)}
                    </td>
                    <td className="max-w-xs px-4 py-3 font-medium text-ething-ink">
                      <span className="break-words">{visit.path}</span>
                    </td>
                    <td className="px-4 py-3 text-zinc-600">
                      <span className="inline-flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                        {sourceLabel(visit)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-600">
                      <div>{visit.screen}</div>
                      <div className="mt-1 text-xs text-zinc-400">{visit.language}</div>
                    </td>
                    <td className="max-w-sm px-4 py-3 text-zinc-600">
                      <span className="break-words">{visit.referrer}</span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-zinc-500">
                      {visit.ip}
                    </td>
                  </tr>
                ))}
                {!visits.length ? (
                  <tr>
                    <td className="px-4 py-10 text-center text-zinc-500" colSpan="6">
                      {hasLoaded ? 'No visits found.' : 'Enter the dashboard key to load visits.'}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}
