import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell.jsx'

export default function NotFound({ content }) {
  return (
    <PageShell title="Page not found" kicker="404">
      <p className="mt-4 text-zinc-600">The page you are looking for does not exist.</p>
      <p className="mt-6">
        <Link
          to="/"
          className="font-medium text-ething-navy hover:underline"
        >
          Back to {content.brand.name} home
        </Link>
      </p>
    </PageShell>
  )
}
