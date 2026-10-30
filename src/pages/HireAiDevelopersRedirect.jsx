import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// The canonical route serves the complete, lightweight standalone HTML.
export default function HireAiDevelopersRedirect() {
  const { search, hash } = useLocation();
  useEffect(() => { window.location.replace('/hire-ai-developers' + search + hash); }, [search, hash]);
  return null;
}
