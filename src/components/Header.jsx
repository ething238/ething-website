import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import Logo, { LogoLight } from './Logo.jsx'

const navItemBase =
  'whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium tracking-tight transition xl:px-3 xl:text-sm'

export default function Header({ content }) {
  const { brand, navigation, cta } = content
  const location = useLocation()
  const [open, setOpen] = useState(null)
  const [mobile, setMobile] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(null)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const isHome = location.pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    if (!isHome) {
      setScrolled(false)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const transparentOnHero = isHome && !scrolled

  const dark = transparentOnHero
  const navText = dark
    ? 'text-zinc-200 hover:text-white'
    : 'text-zinc-600 hover:text-ething-ink'
  const navTextActiveBg = dark ? 'bg-white/10 text-white' : 'bg-ething-navy/8 text-ething-ink'
  const glass = dark
    ? 'border-white/20 bg-zinc-900/85 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl'
    : 'border-ething-navy/10 bg-white/95 shadow-md backdrop-blur-md'

  const headerClassName = (() => {
    if (isHome) {
      return transparentOnHero
        ? 'fixed top-0 left-0 right-0 z-50 border-b border-transparent bg-transparent transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-out'
        : 'fixed top-0 left-0 right-0 z-50 border-b border-ething-navy/10 bg-white/98 shadow-[0_1px_0_rgba(0,0,0,0.06),0_8px_24px_rgba(12,18,34,0.08)] transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-out'
    }
    return 'sticky top-0 z-50 border-ething-navy/8 bg-zinc-50/95 shadow-sm backdrop-blur-md'
  })()

  return (
    <header className={headerClassName}>
      <div className="mx-auto flex min-w-0 max-w-[90rem] items-center gap-3 px-4 py-2.5 sm:px-6 sm:gap-4 lg:gap-5 lg:px-8 xl:py-3">
        <div className="shrink-0">
          {dark ? (
            <Logo name={brand.name} logoSrc={brand.logoSrc} logoAlt={brand.logoAlt} />
          ) : (
            <LogoLight name={brand.name} logoSrc={brand.logoSrc} logoAlt={brand.logoAlt} />
          )}
        </div>

        {/* overflow must stay visible - overflow-x-auto on nav clips dropdown menus vertically */}
        <div ref={ref} className="relative z-[60] hidden min-w-0 flex-1 overflow-visible lg:block">
          <nav className="mx-auto flex flex-nowrap justify-center gap-1 overflow-visible py-px xl:gap-1.5">
            {navigation.map((item) => {
              const hasChild = item.children?.length
              const active =
                (item.path != null && location.pathname === item.path) ||
                item.children?.some((c) => c.path === location.pathname) === true
              return (
                <div key={item.id} className="relative shrink-0">
                  {hasChild ? (
                    <button
                      type="button"
                      onClick={() => setOpen(open === item.id ? null : item.id)}
                      className={`inline-flex items-center gap-1 ${navItemBase} ${navText} ${
                        active ? navTextActiveBg : ''
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="h-3 w-3 shrink-0 opacity-60" aria-hidden />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`inline-flex items-center justify-center ${navItemBase} ${navText} ${
                        active ? navTextActiveBg : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                  <AnimatePresence>
                    {hasChild && open === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute left-0 top-full z-[70] mt-2 min-w-[220px] overflow-hidden rounded-2xl border p-1.5 shadow-lg ${glass}`}
                      >
                        {item.children.map((c) => (
                          <Link
                            key={c.path + c.label}
                            to={c.path}
                            onClick={() => setOpen(null)}
                            className={`block whitespace-normal rounded-xl px-3 py-2.5 text-sm leading-snug transition ${
                              dark
                                ? 'text-zinc-100 hover:bg-white/12 hover:text-white'
                                : 'text-zinc-700 hover:bg-ething-navy/5 hover:text-ething-ink'
                            }`}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </nav>
        </div>

        <div className="hidden shrink-0 lg:block">
          <Link
            to={cta.path}
            className={`inline-flex whitespace-nowrap items-center justify-center rounded-full px-4 py-2 text-sm font-semibold shadow transition xl:px-5 ${
              dark
                ? 'bg-white text-ething-ink hover:bg-zinc-100'
                : 'bg-ething-navy text-white hover:bg-ething-navy/90'
            }`}
          >
            {cta.label}
          </Link>
        </div>

        <button
          type="button"
          className={`ms-auto shrink-0 rounded-full p-2 lg:hidden ${dark ? 'text-white' : 'text-ething-ink'}`}
          aria-label="Toggle menu"
          onClick={() => setMobile((v) => !v)}
        >
          {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-ething-navy/10 bg-zinc-50/95 px-4 py-3 lg:hidden"
          >
            <div className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto">
              {navigation.map((item) => (
                <div key={item.id} className="py-0.5">
                  {item.path ? (
                    <Link
                      to={item.path}
                      onClick={() => setMobile(false)}
                      className="block rounded-lg px-2 py-2 text-sm font-medium text-ething-ink"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div className="block rounded-lg px-2 py-2 text-sm font-medium text-ething-ink">
                      {item.label}
                    </div>
                  )}
                  {item.children?.map((c) => (
                    <Link
                      key={c.label}
                      to={c.path}
                      onClick={() => setMobile(false)}
                      className="ml-2 block rounded-lg px-2 py-1.5 text-sm text-zinc-600"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              ))}
              <Link
                to={cta.path}
                onClick={() => setMobile(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-ething-navy px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                {cta.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
