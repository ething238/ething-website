import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Check } from 'lucide-react'
import { LogoLight } from './Logo.jsx'
import { motion } from 'framer-motion'

export default function Footer({ content }) {
  const { brand, footer } = content

  return (
    <footer className="border-t border-ething-navy/10 bg-zinc-100/90">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <LogoLight
              name={brand.name}
              logoSrc={brand.logoSrc}
              logoAlt={brand.logoAlt}
              className="mb-4"
            />
            <p className="text-sm leading-relaxed text-zinc-600">{footer.aboutBody}</p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ething-ink">
              {footer.quickLinksTitle}
            </h3>
            <ul className="space-y-2.5">
              {footer.quickLinks.map((l) => (
                <li key={`${l.label}-${l.path}`}>
                  <Link
                    to={l.path}
                    className="group flex items-center gap-2 text-sm text-zinc-600 transition hover:text-ething-ink"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/15 text-[10px] text-orange-600">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ething-ink">
              {footer.industriesTitle}
            </h3>
            <ul className="space-y-2.5">
              {footer.industries.map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="group flex items-center gap-2 text-sm text-zinc-600 transition hover:text-ething-ink"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/15 text-[10px] text-orange-600">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ething-ink">
              {footer.contactTitle}
            </h3>
            <ul className="space-y-4 text-sm text-zinc-600">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <span>
                  {footer.address.line1}
                  <br />
                  {footer.address.line2}
                </span>
              </li>
              <li>
                {footer.phones.map((p) => (
                  <div key={p.value} className="flex items-start gap-2">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                    <span>
                      {p.label}: {p.value}
                    </span>
                  </div>
                ))}
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <a href={`mailto:${footer.email}`} className="hover:text-ething-ink">
                  {footer.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ething-navy/10 pt-8 sm:flex-row">
          <p className="text-sm text-zinc-500">{footer.copyright}</p>
          <motion.a
            href={content.cta.path}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-sm font-medium text-ething-navy hover:underline"
          >
            {content.cta.label} →
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
