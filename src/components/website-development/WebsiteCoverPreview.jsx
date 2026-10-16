import { useEffect, useRef, useState } from 'react';
import { carImageSources } from '../../data/websiteMedia.js';

const scenes = [
  { id: 'city', label: 'City', title: <>Made to<br/>move you.</>, text: 'A new perspective on electric driving.', eyebrow: 'THE CITY, REIMAGINED' },
  { id: 'coast', label: 'Coast', title: <>Take the<br/>scenic route.</>, text: 'Open roads. A little more possibility.', eyebrow: 'FREEDOM IN EVERY DETAIL' },
  { id: 'studio', label: 'Studio', title: <>Good design.<br/>Great drives.</>, text: 'Every line has a purpose. Make it yours.', eyebrow: 'FORM MEETS FEELING' },
];

function DeviceIcon({ mobile = false }) {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{mobile ? <><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4"/></> : <><rect x="2" y="3" width="20" height="15" rx="2"/><path d="M8 22h8m-4-4v4"/></>}</svg>;
}

function MovingWheels() {
  return <svg className="wd-cover-wheel-overlay" viewBox="0 0 1774 887" aria-hidden="true">
    <defs><linearGradient id="wd-rim-metal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f2f7fa"/><stop offset=".35" stopColor="#778b9b"/><stop offset=".6" stopColor="#d9e4eb"/><stop offset="1" stopColor="#4d6276"/></linearGradient></defs>
    {[{name:'rear',x:1008,y:593,rx:82,ry:152,angle:-2},{name:'front',x:1644,y:572,rx:57,ry:126,angle:5}].map(wheel=><g key={wheel.name} data-wheel={wheel.name} transform={`translate(${wheel.x} ${wheel.y}) rotate(${wheel.angle}) scale(${wheel.rx/100} ${wheel.ry/100})`}>
      <circle r="100" fill="#0b1520" stroke="#a7b8c4" strokeWidth="4"/><circle r="90" fill="#172432" stroke="#536777" strokeWidth="2"/>
      <path d="M43-48h13v65H43z" fill="#7c9bad" opacity=".8"/>
      <g className="wd-cover-wheel-spin">{Array.from({length:10},(_,index)=><path key={index} transform={`rotate(${index*36})`} d="M-5-13-15-88-5-96 9-26Z" fill="url(#wd-rim-metal)" stroke="#c5d2dc" strokeWidth=".8"/>)}<circle r="15" fill="#263b4d" stroke="#8fa5b6" strokeWidth="3"/><circle r="5" fill="#bccad4"/></g>
      <circle r="96" fill="none" stroke="#e3ebf2" strokeOpacity=".5" strokeWidth="2"/>
    </g>)}
  </svg>;
}

function DriftSmoke() {
  return <svg className="wd-cover-drift-smoke" viewBox="0 0 1774 887" aria-hidden="true"><defs><radialGradient id="wd-tyre-smoke"><stop stopColor="var(--wd-smoke-core, #e8f0f5)" stopOpacity=".8"/><stop offset=".5" stopColor="var(--wd-smoke-edge, #d5e1e9)" stopOpacity=".45"/><stop offset="1" stopColor="#c2d3df" stopOpacity="0"/></radialGradient></defs>{[0,1].map(axle=><g key={axle}>{Array.from({length:8},(_,index)=><circle key={index} className="wd-cover-smoke-puff" cx={axle ? 205 : 1008} cy={axle ? 704 : 761} r={66+(index%3)*12} fill="url(#wd-tyre-smoke)" style={{animationDelay:`${-index*.33-axle*.17}s`,animationDuration:`${2.5+(index%3)*.18}s`}}/>)}</g>)}</svg>;
}

export default function WebsiteCoverPreview() {
  const [device, setDevice] = useState('desktop');
  const [sceneIndex, setSceneIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [manualScene, setManualScene] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const previewRef = useRef(null);
  const scene = scenes[sceneIndex];

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setInView(true); return; }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.18 });
    if (previewRef.current) observer.observe(previewRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || !inView || manualScene || !pageVisible) return;
    const timer = window.setInterval(() => setSceneIndex(index => (index + 1) % scenes.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, inView, sceneIndex, manualScene, pageVisible]);

  const chooseScene = index => { setSceneIndex(index); setManualScene(true); };
  const nextScene = () => chooseScene((sceneIndex + 1) % scenes.length);

  return <div className="wd-responsive-demo wd-cover-preview" ref={previewRef}>
    <div className="wd-device-controls" role="group" aria-label="Preview responsive design">
      <button type="button" aria-pressed={device === 'desktop'} onClick={() => setDevice('desktop')}><DeviceIcon/>Desktop</button>
      <button type="button" aria-pressed={device === 'mobile'} onClick={() => setDevice('mobile')}><DeviceIcon mobile/>Mobile</button>
    </div>
    <div className={`wd-cover-stage wd-cover-stage-${device}`}>
      <div className={`wd-cover-frame wd-cover-frame-${device}`} data-device={device}>
        <div className="wd-cover-browser-bar" aria-hidden="true"><i/><i/><i/><span>drive-next.example</span><b>⌕</b></div>
        <div className="wd-cover-site" data-scene={scene.id} data-motion={paused || reducedMotion || !inView || !pageVisible ? 'paused' : 'playing'} aria-label={`Sample automotive website, ${device} layout, ${scene.label} scene`}>
          <div className="wd-cover-aura" aria-hidden="true"/>
          <div className="wd-cover-navigation"><strong>DRIVE<span>/</span>NEXT</strong><div><span>Electric</span><span>Design</span><button type="button" onClick={nextScene} aria-label="Explore the next sample website scene">Discover <span aria-hidden="true">↗</span></button></div><span className="wd-cover-nav-menu" aria-hidden="true">☰</span></div>
          <div className="wd-cover-landscape" aria-hidden="true"><div className="wd-cover-mountains"/><div className="wd-cover-cityline"><i/><i/><i/><i/><i/><i/><i/></div><div className="wd-cover-horizon"/></div>
          <div className="wd-cover-copy" key={`copy-${scene.id}`}><small>{scene.eyebrow}</small><strong>{scene.title}</strong><p>{scene.text}</p><button type="button" onClick={nextScene}>Explore the concept <span aria-hidden="true">↗</span></button></div>
          <div className="wd-cover-road" aria-hidden="true"><div className="wd-cover-road-lines"/></div>
          <div className="wd-cover-car-arrive" key={`car-${scene.id}-${inView}`}><div className="wd-cover-car-float"><DriftSmoke/><img {...carImageSources} width="1774" height="887" loading="lazy" decoding="async" alt="Rear three-quarter view of an unbranded navy electric concept car, facing away along the road."/><MovingWheels/></div></div>
          <div className="wd-cover-site-footer"><span><i/>{scene.label} edition</span><span>Designed to move you.</span></div>
        </div>
      </div>
    </div>
    <div className="wd-cover-controls">
      <div role="group" aria-label="Sample website scenes">{scenes.map((item, index) => <button type="button" key={item.id} aria-pressed={index === sceneIndex} onClick={() => chooseScene(index)}><i aria-hidden="true"/>{item.label}</button>)}</div>
      <button className="wd-cover-motion-toggle" type="button" disabled={reducedMotion} aria-pressed={paused || reducedMotion} onClick={() => setPaused(value => !value)} aria-label={reducedMotion ? 'Motion follows your reduced-motion preference' : paused ? 'Play sample animation' : 'Pause sample animation'}>{reducedMotion ? 'Motion reduced' : paused ? '▶ Play' : 'Ⅱ Pause'}</button>
    </div>
    <p className="wd-cover-caption">Sample website concept · Switch layouts and explore the scenes.</p>
  </div>;
}
