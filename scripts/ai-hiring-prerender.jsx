import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import HireAiDevelopers from '../src/pages/HireAiDevelopers.jsx';

export function renderAiHiring() {
  return renderToString(<HelmetProvider><HireAiDevelopers staticChrome/></HelmetProvider>);
}
