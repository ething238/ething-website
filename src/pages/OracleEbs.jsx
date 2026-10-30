import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// The direct route serves the approved standalone HTML without a React bundle.
// Preserve it when an in-app React link navigates here from another page.
export default function OracleEbs() {
  const { search, hash } = useLocation()
  useEffect(() => { window.location.replace('/oracle-ebs' + search + hash) }, [search, hash])
  return null
}
