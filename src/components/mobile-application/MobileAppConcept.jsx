import { useId } from 'react';

function AppIcon({ name, size = 16 }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-7h6v7"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 2v6m10-6v6M3 11h18m-12 4h3"/></>,
    bag: <><path d="M4 8h16l1 13H3L4 8Z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 22v-2a8 8 0 0 1 16 0v2"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>,
    arrow: <path d="M4 12h15m-6-6 6 6-6 6"/>,
    chevron: <path d="m9 5 7 7-7 7"/>,
    heart: <path d="M20 4c-3-3-7-1-8 2-1-3-5-5-8-2-6 6 8 16 8 16S26 10 20 4Z"/>,
    bell: <><path d="M5 16h14l-2-4V8a5 5 0 0 0-10 0v4l-2 4Zm5 4h4"/></>,
    jobs: <><rect x="3" y="6" width="18" height="15" rx="2"/><path d="M8 6V3h8v3M3 12h18m-12 0v3h6v-3"/></>,
    chart: <><path d="M4 3v18h18M8 16v-5m5 5V6m5 10V9"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
    search: <><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/></>,
    shield: <><path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z"/><path d="m8 12 3 3 5-6"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name] || paths.home}</svg>;
}

function Headphones({ prefix }) {
  return <svg className="mc-product-render" viewBox="0 0 240 160" fill="none">
    <defs>
      <linearGradient id={`${prefix}-band`} x1="63" y1="25" x2="170" y2="115" gradientUnits="userSpaceOnUse"><stop stopColor="#16375c"/><stop offset=".4" stopColor="#6484a8"/><stop offset=".6" stopColor="#b7c6d8"/><stop offset="1" stopColor="#284769"/></linearGradient>
      <linearGradient id={`${prefix}-cup`} x1="0" y1="0" x2="40" y2="60" gradientUnits="userSpaceOnUse"><stop stopColor="#6689af"/><stop offset=".45" stopColor="#254a75"/><stop offset="1" stopColor="#102a4c"/></linearGradient>
      <linearGradient id={`${prefix}-metal`} x1="0" y1="0" x2="10" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#54718d"/><stop offset=".5" stopColor="#e4ebf3"/><stop offset="1" stopColor="#68819b"/></linearGradient>
      <radialGradient id={`${prefix}-shadow`}><stop stopColor="#122746" stopOpacity=".19"/><stop offset="1" stopColor="#122746" stopOpacity="0"/></radialGradient>
    </defs>
    <ellipse cx="122" cy="143" rx="76" ry="12" fill={`url(#${prefix}-shadow)`}/>
    <g transform="rotate(-12 120 82)">
      <path d="M65 103V76C65 7 175 7 175 76v27" stroke={`url(#${prefix}-band)`} strokeWidth="16" strokeLinecap="round"/>
      <path d="M71 73C71 18 169 18 169 73" stroke="#102942" strokeWidth="8" strokeLinecap="round"/>
      <path d="M62 63C69 13 162 6 177 61" stroke="#dae4f0" strokeOpacity=".65" strokeWidth="2" strokeLinecap="round"/>
      <path d="M61 84v32m114-32v32" stroke={`url(#${prefix}-metal)`} strokeWidth="8" strokeLinecap="round"/>
      {[{ x: 46, rotate: 10 }, { x: 157, rotate: -10 }].map(({x,rotate}) => <g key={x} transform={`translate(${x} 87) rotate(${rotate} 18 26)`}>
        <rect x="-3" y="4" width="33" height="55" rx="15" fill="#0e243e"/>
        <rect x="2" y="0" width="34" height="58" rx="16" fill={`url(#${prefix}-cup)`} stroke="#718ca9" strokeWidth="1"/>
        <rect x="7" y="5" width="24" height="47" rx="12" stroke="#8fa9c7" strokeOpacity=".4"/>
        <path d="M14 7c-5 2-6 6-6 11" stroke="#dce8f4" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round"/>
        <path d="M15 46h8m-6 4h4" stroke="#132e4c" strokeWidth="1.5" strokeLinecap="round"/>
      </g>)}
      <circle cx="181" cy="111" r="2" fill="#a8bfd7"/><path d="M180 119v8" stroke="#8ba8c5" strokeWidth="2" strokeLinecap="round"/>
    </g>
  </svg>;
}

function BookingScreen() {
  return <>
    <div className="mc-app-head"><span className="mc-logo mc-home-logo"><AppIcon name="home" size={15}/>homecare<span>+</span></span><span className="mc-avatar">AS</span></div>
    <div className="mc-content mc-booking-content">
      <div className="mc-confirmed-title"><div><span className="mc-eyebrow">BOOKING #HC1048</span><strong>You’re all set, Aditi.</strong></div><span className="mc-success-icon"><AppIcon name="check" size={22}/></span></div>
      <span className="mc-subtitle">Your home service visit is confirmed.</span>
      <div className="mc-booking-service"><span className="mc-service-art"><svg width="37" height="30" viewBox="0 0 42 32" fill="none"><rect x="2" y="3" width="38" height="17" rx="4" fill="white" stroke="currentColor"/><path d="M6 15h30M8 18h26M9 25c-3 1 3 3 0 5m12-5c-3 1 3 3 0 5m12-5c-3 1 3 3 0 5" stroke="currentColor" strokeLinecap="round"/><circle cx="34" cy="7" r="1" fill="currentColor"/></svg></span><div><strong>AC service & clean</strong><small>1 unit · 60–75 minutes</small><span className="mc-small-tag">Deep cleaning included</span></div></div>
      <div className="mc-booking-details"><div><AppIcon name="calendar"/><span><small>DATE</small><strong>Mon, 19 October</strong></span></div><div><AppIcon name="clock"/><span><small>ARRIVAL TIME</small><strong>10:30–11:00 AM</strong></span></div><div className="mc-detail-address"><AppIcon name="pin"/><span><small>SERVICE ADDRESS</small><strong>Home · Sector 44, Gurugram</strong><em>Flat 204, Tower B</em></span></div></div>
      <div className="mc-specialist"><span className="mc-specialist-avatar">RK</span><span><strong>Rahul K.</strong><small>Your assigned service specialist</small></span><span className="mc-verified"><AppIcon name="shield" size={13}/></span></div>
      <div className="mc-receipt"><div><span>Service amount</span><span>₹850</span></div><div><span>Visit fee</span><span>₹49</span></div><div className="mc-receipt-total"><strong>Total paid</strong><strong>₹899</strong></div></div>
      <div className="mc-paid"><AppIcon name="check" size={12}/>Paid securely with UPI<span>View receipt ↗</span></div>
      <div className="mc-screen-cta">Manage booking<AppIcon name="arrow" size={14}/></div>
    </div>
  </>;
}

function CommerceScreen({ prefix }) {
  return <>
    <div className="mc-app-head"><span className="mc-logo mc-store-logo">NORTH<span> /</span></span><span className="mc-bag-count"><AppIcon name="bag" size={17}/><i>1</i></span></div>
    <div className="mc-content mc-commerce-content">
      <div className="mc-store-heading"><span className="mc-eyebrow">AUDIO / WIRELESS HEADPHONES</span><strong>Meet your everyday escape.</strong></div>
      <div className="mc-product-scene"><span className="mc-product-edition">STUDIO<br/><b>ONE</b></span><span className="mc-favourite"><AppIcon name="heart" size={15}/></span><Headphones prefix={prefix}/><span className="mc-product-dots"><i/><i/><i/></span></div>
      <div className="mc-product-title"><div><strong>Studio One</strong><small>Wireless noise-cancelling headphones</small></div><span>₹3,499<small>incl. taxes</small></span></div>
      <div className="mc-product-features"><span>40h battery</span><i/>Active noise control<i/><span>Bluetooth 5.3</span></div>
      <div className="mc-color-choice"><span>Colour: <strong>Midnight blue</strong></span><div><i className="selected"/><i/><i/></div></div>
      <div className="mc-delivery"><AppIcon name="pin" size={15}/><div><strong>Delivery to Gurugram · 122003</strong><small>Arrives Wed, 21 Oct · Free delivery</small></div><AppIcon name="chevron" size={13}/></div>
      <div className="mc-purchase-row"><span className="mc-quantity">−<strong>1</strong>+</span><div className="mc-screen-cta"><AppIcon name="bag" size={14}/>Add to bag<span>₹3,499</span></div></div>
      <div className="mc-shop-assurance"><AppIcon name="shield" size={11}/>Secure checkout<span>·</span>7-day returns</div>
    </div>
  </>;
}

function OperationsScreen() {
  return <>
    <div className="mc-app-head"><span className="mc-logo mc-work-logo"><span className="mc-work-mark">▤</span>FIELDNOTE</span><span className="mc-notification"><AppIcon name="bell" size={17}/><i/></span></div>
    <div className="mc-content mc-operations-content">
      <div className="mc-work-heading"><span className="mc-eyebrow">MONDAY, 19 OCTOBER</span><strong>Good morning, Alex <span>↗</span></strong><small>Here’s your team’s day at a glance.</small></div>
      <div className="mc-work-stats"><div><span>Active jobs</span><strong>12<small>4 due today</small></strong><i><AppIcon name="jobs" size={15}/></i></div><div><span>To review</span><strong>03<small>Ready for you</small></strong><i><AppIcon name="chart" size={15}/></i></div></div>
      <div className="mc-completion"><div><strong>Today’s progress</strong><span>8 of 12 complete</span></div><div className="mc-progress-track"><i/></div><div><small>Team on schedule</small><span className="mc-team-avatars"><i>AK</i><i>RS</i><i>MJ</i></span></div></div>
      <div className="mc-list-heading"><strong>Priority work orders</strong><span>View all ↗</span></div>
      <div className="mc-work-order"><span className="mc-order-icon"><AppIcon name="jobs"/></span><div><span className="mc-order-ref">JOB-2046 · SECTOR 44</span><strong>AC inspection</strong><small>Rahul S. · 10:30 AM</small></div><span className="mc-order-status">In progress</span></div>
      <div className="mc-work-order"><span className="mc-order-icon mc-review-icon"><AppIcon name="check"/></span><div><span className="mc-order-ref">JOB-2042 · WAREHOUSE B</span><strong>Pump maintenance</strong><small>Meera J. · Report uploaded</small></div><span className="mc-order-status mc-review-status">Review</span></div>
      <div className="mc-visit-card"><div><AppIcon name="pin" size={13}/><strong>Next site visit</strong><span>11:45 AM</span></div><div className="mc-map-preview"><svg viewBox="0 0 220 61" fill="none"><path d="m0 11 220 20M0 42l220-17M30 0l19 61M100 0l-7 61M164 0l26 61" stroke="#d9e4eb" strokeWidth="9"/><path d="m0 11 220 20M0 42l220-17M30 0l19 61M100 0l-7 61M164 0l26 61" stroke="#f8fafc" strokeWidth="6"/><path d="m46 43 47-6 5-21 67 6" stroke="#245da8" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 4"/><circle cx="46" cy="43" r="5" fill="#245da8" stroke="white" strokeWidth="2"/><circle cx="165" cy="22" r="7" fill="#287f79" stroke="white" strokeWidth="2"/></svg><span>Site 03 · Commercial hub<small>Sector 48 · 3.2 km away</small></span></div></div>
    </div>
  </>;
}

export default function MobileAppConcept({ kind = 'operations', small = false }) {
  const prefix = `mc-${useId().replace(/:/g, '')}`;
  const navigation = kind === 'booking' ? [['home','Home'],['calendar','Bookings'],['bell','Updates'],['user','Account']] : kind === 'commerce' ? [['home','Discover'],['search','Search'],['bag','Bag'],['user','Account']] : [['home','Overview'],['jobs','Jobs'],['chart','Reports'],['user','Profile']];
  return <div className={`ma-phone ma-phone-${kind}${small ? ' ma-phone-small' : ''} ma-real-phone`} aria-hidden="true"><div className="mc-canvas"><div className="mc-status"><strong>9:41</strong><span className="mc-dynamic-island"/><span className="mc-status-icons"><i/><i/><i/><svg width="14" height="8" viewBox="0 0 14 8"><rect x=".5" y=".5" width="11" height="7" rx="2" fill="none" stroke="currentColor"/><rect x="2" y="2" width="8" height="4" rx="1" fill="currentColor"/><path d="M13 3v2" stroke="currentColor"/></svg></span></div>{kind === 'booking' ? <BookingScreen/> : kind === 'commerce' ? <CommerceScreen prefix={prefix}/> : <OperationsScreen/>}<div className="mc-bottom-nav">{navigation.map(([icon,label],index) => <span className={index === (kind === 'booking' ? 1 : 0) ? 'selected' : ''} key={label}><AppIcon name={icon} size={16}/><small>{label}</small></span>)}</div><div className="mc-home-indicator"><i/></div></div></div>;
}
