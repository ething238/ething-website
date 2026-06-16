import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import { LogoLight } from '../Logo.jsx'

export default function LandingFooter() {
  return (
    <footer className="border-t border-ething-navy/10 bg-ething-ink pb-24 text-zinc-300 md:pb-12">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <LogoLight
              name="ETHING"
              logoSrc="/images/ething-logo.png"
              logoAlt="Ething"
              className="mb-4"
            />
            <p className="text-sm leading-relaxed text-zinc-400">
              Ething Solutions helps global companies (20-300 employees) hire vetted remote engineering
              talent from India - staff augmentation, dedicated teams, and managed offshore development.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about_us" className="transition hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/staffing_services" className="transition hover:text-white">
                  Staffing Services
                </Link>
              </li>
              <li>
                <Link to="/engineering-services" className="transition hover:text-white">
                  Engineering Services
                </Link>
              </li>
              <li>
                <Link to="/careers" className="transition hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/privacy-policy" className="transition hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="mailto:support@ething.in" className="transition hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <span>
                  Building Number 145, Sector 44 Rd,
                  <br />
                  Gurugram, Haryana, 122003
                </span>
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <span>
                  USA: +1-929-557-4560
                  <br />
                  India: +91-7011956780
                </span>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                <a href="mailto:support@ething.in" className="hover:text-white">
                  support@ething.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-zinc-500">© {new Date().getFullYear()} Ething Solutions. All rights reserved.</p>
          <p className="text-xs text-zinc-500">
            Global remote developers from India · 20-300 employee companies · Staff augmentation
          </p>
        </div>
      </div>
    </footer>
  )
}
