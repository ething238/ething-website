import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell.jsx'
import { pageTitles } from '../data/siteContent.js'

export default function EngineeringServices({ content }) {
  const p = content.pages.engineeringServices
  const websiteDevelopment = {
    path: '/website-development', title: 'Website Development',
    intro: 'Business websites, online stores, redesigns and Web3 websites, with SEO, analytics and ongoing support.',
  }
  const pages = content.pages.engineeringPages.flatMap(page =>
    page.path === '/software_development' ? [page, websiteDevelopment] : [page])
  useEffect(() => {
    document.title = pageTitles['/engineering-services']
  }, [])

  return (
    <PageShell title={p.title} kicker="Delivery" compact>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600 leading-relaxed">{p.intro}</p>
      <div id={p.capabilitiesId} className="mt-8 scroll-mt-24">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-violet-600">
          Capabilities
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((item) => (
            <motion.li
              key={item.path}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm transition hover:border-violet-200/80"
            >
              <Link
                to={item.path}
                reloadDocument={item.path === '/website-development'}
                className="block text-lg font-semibold text-ething-ink hover:text-violet-700"
              >
                {item.title}
                <span className="ml-1 text-violet-600 opacity-80" aria-hidden>
                  →
                </span>
              </Link>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{item.intro}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </PageShell>
  )
}
