import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'

export function renderHome() {
  const context = {}
  const markup = renderToString(
    <HelmetProvider context={context}>
      <StaticRouter location="/"><App /></StaticRouter>
    </HelmetProvider>,
  )
  return { markup, helmet: context.helmet }
}
