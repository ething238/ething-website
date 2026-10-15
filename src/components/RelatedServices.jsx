import { Link } from 'react-router-dom'
import { relatedPages, pageLabels } from '../data/relatedPages.js'
import { technologyLandingPagePaths } from '../data/technologyLandingPages.js'
import '../styles/related-services.css'

export default function RelatedServices({
  pathname,
  links,
  title = 'Explore related services',
  description = 'Find the engineering service or hiring option that fits your requirements.',
  nativeLinks = false,
}) {
  const items = links ?? relatedPages[pathname]?.map(path => ({ path, label: pageLabels[path] }))
  if (!items?.length) return null
  return (
    <section data-ething-related-services="true" aria-labelledby="related-services-heading" className="related-services-strip">
      <div className="related-services-strip__inner">
        <h2 id="related-services-heading" className="related-services-strip__title">{title}</h2>
        <p className="related-services-strip__description">{description}</p>
        <ul className="related-services-strip__links">
          {items.map(({ path, label }) => (
            <li key={path}>{nativeLinks ? <a href={path}>{label}</a> : <Link to={path} reloadDocument={technologyLandingPagePaths.includes(path.split(/[?#]/)[0].replace(/\/$/, ''))}>{label}</Link>}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
