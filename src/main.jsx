import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

/** Matches Vite `base` URL so Router links work under a sub-path deploy (e.g. https://cdn.example.com/site/). */
function routerBasename() {
  const base = import.meta.env.BASE_URL
  if (!base || base === '/') return undefined
  const trimmed = base.replace(/\/$/, '')
  return trimmed === '' ? undefined : trimmed
}

const root = document.getElementById('root')
if (!root) {
  throw new Error('Mount point #root not found. Check index.html.')
}

createRoot(root).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={routerBasename()}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
