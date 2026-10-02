import { Link } from 'react-router-dom'
import { relatedPages, pageLabels } from '../data/relatedPages.js'

export default function RelatedServices({ pathname }) {
  const paths = relatedPages[pathname]
  if (!paths) return null
  return (
    <section aria-labelledby="related-services-heading" className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 id="related-services-heading" className="text-xl font-semibold text-ething-ink">Explore related services</h2>
        <p className="mt-2 text-sm text-zinc-600">Find the engineering service or hiring option that fits your requirements.</p>
        <ul className="mt-5 flex flex-wrap gap-3">
          {paths.map((path) => (
            <li key={path}><Link className="inline-block rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-ething-navy hover:underline" to={path}>{pageLabels[path]}</Link></li>
          ))}
        </ul>
      </div>
    </section>
  )
}
