import { useLocation } from 'react-router-dom'
import SiteHeader from '../SiteHeader.jsx'

export default function LandingHeader() {
  const { pathname } = useLocation()
  return <SiteHeader activePath={pathname} />
}
