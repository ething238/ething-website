import { relatedPages, pageLabels } from '../data/relatedPages.js';
import '../styles/related-services.css';

export default function NativeRelatedServices({ pathname }) {
  const links = relatedPages[pathname] || [];
  return <section data-ething-related-services="true" aria-labelledby="related-services-heading" className="related-services-strip">
    <div className="related-services-strip__inner">
      <h2 id="related-services-heading" className="related-services-strip__title">Explore related services</h2>
      <p className="related-services-strip__description">Find the engineering service or hiring option that fits your requirements.</p>
      <ul className="related-services-strip__links">{links.map(path => <li key={path}><a href={path}>{pageLabels[path]}</a></li>)}</ul>
    </div>
  </section>;
}
