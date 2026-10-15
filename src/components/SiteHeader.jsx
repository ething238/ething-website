import { useEffect, useRef, useState } from 'react'
import originalCopy from '../data/aboutUsCopy.json'
import BrandLogo from './AboutBrandLogo.jsx'
import '../styles/site-header.css'

export function HeaderIcon({ kind }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={kind === 'chevron' ? 'm6 9 6 6 6-6' : kind === 'close' ? 'm6 6 12 12M6 18 18 6' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
}

export default function SiteHeader({ activePath = '', contactHref = '/contact', staticMarkup = false, darkAtTop = false }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef(null)
  const isActive = path => path?.replace(/\/$/, '') === activePath.replace(/\/$/, '')
  useEffect(() => {
    if (!darkAtTop) return
    const layout = headerRef.current.parentElement
    const inner = headerRef.current.querySelector('.about-copy-header-inner')
    const updateHeight = () => layout.style.setProperty('--homepage-header-height', `${inner.getBoundingClientRect().height}px`)
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(inner)
    return () => { observer.disconnect(); layout.style.removeProperty('--homepage-header-height') }
  }, [darkAtTop])
  useEffect(() => {
    if (!darkAtTop) return
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [darkAtTop])
  useEffect(() => {
    const closeDropdowns = event => {
      if (event.type === 'keydown' && event.key !== 'Escape') return
      headerRef.current?.querySelectorAll('details[open]').forEach(detail => {
        if (event.type === 'keydown' || !detail.contains(event.target)) detail.open = false
      })
      if (event.type === 'keydown' || !headerRef.current?.contains(event.target)) setMobileOpen(false)
    }
    document.addEventListener('click', closeDropdowns)
    document.addEventListener('keydown', closeDropdowns)
    return () => { document.removeEventListener('click', closeDropdowns); document.removeEventListener('keydown', closeDropdowns) }
  }, [])
  return <header className={'about-copy-header ething-header' + (staticMarkup ? ' hire-site-header' : '')} ref={headerRef} data-home-transition={darkAtTop ? 'true' : undefined} data-surface={darkAtTop ? (scrolled ? 'light' : 'dark') : undefined}>
    <div className="about-copy-header-inner">
      <div className="about-copy-header-brand"><BrandLogo href="/" className="about-copy-logo brand-logo" /></div>
      <nav className="about-copy-nav" aria-label="Main navigation">
        {originalCopy.navigation.map(item => item.children?.length ? <details className="about-copy-nav-dropdown" key={item.id}>
          <summary className="about-copy-nav-link">{item.label}<HeaderIcon kind="chevron" /></summary>
          <div className="about-copy-dropdown-menu">{item.children.map(child => <a key={child.path} href={child.path} aria-current={isActive(child.path) ? 'page' : undefined}>{child.label}</a>)}</div>
        </details> : <a className="about-copy-nav-link" href={item.path} aria-current={isActive(item.path) ? 'page' : undefined} key={item.id}>{item.label}</a>)}
      </nav>
      <a href={contactHref} className="about-copy-contact-button">{originalCopy.cta.label}</a>
      <button className={'about-copy-mobile-toggle' + (staticMarkup ? ' hire-site-mobile-toggle' : '')} type="button" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} aria-controls="about-copy-mobile-nav" onClick={() => setMobileOpen(!mobileOpen)}><HeaderIcon kind={mobileOpen ? 'close' : 'menu'} /></button>
    </div>
    {(mobileOpen || staticMarkup) && <nav id="about-copy-mobile-nav" className={'about-copy-mobile-nav' + (staticMarkup ? ' hire-site-mobile-nav' : '')} aria-label="Mobile navigation" hidden={!mobileOpen}>
      {originalCopy.navigation.map(item => <div key={item.id}>
        {item.path ? <a href={item.path} onClick={() => setMobileOpen(false)}>{item.label}</a> : <span>{item.label}</span>}
        {item.children?.map(child => <a key={child.path} href={child.path} onClick={() => setMobileOpen(false)}>{child.label}</a>)}
      </div>)}
      <a href={contactHref} className="about-copy-contact-button">{originalCopy.cta.label}</a>
    </nav>}
  </header>
}
