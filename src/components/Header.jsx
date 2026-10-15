import { useLocation } from 'react-router-dom'
import SiteHeader from './SiteHeader.jsx'

export default function Header({ content }) {
  const { pathname } = useLocation()
  return <SiteHeader activePath={pathname} contactHref={content?.cta?.path || '/contact'} darkAtTop={pathname === '/'} />
}
