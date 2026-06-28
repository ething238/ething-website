/** Analytics & conversion helpers - IDs from Vite env. */

const GTM_ID = import.meta.env.VITE_GTM_ID
const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID
const ADS_ID = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID
const ADS_LABEL = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID
const CLARITY_ID = import.meta.env.VITE_CLARITY_PROJECT_ID

let initialized = false

function injectScript(id, src, async = true) {
  if (document.getElementById(id)) return
  const s = document.createElement('script')
  s.id = id
  s.src = src
  if (async) s.async = true
  document.head.appendChild(s)
}

function injectInlineScript(id, content) {
  if (document.getElementById(id)) return
  const s = document.createElement('script')
  s.id = id
  s.textContent = content
  document.head.appendChild(s)
}

/** Bootstrap GTM, GA4, Meta Pixel, and Microsoft Clarity once per session. */
export function initTracking() {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  const gtmAlreadyLoaded = document.querySelector('script[src*="googletagmanager.com/gtm.js"]')
  if (GTM_ID && !gtmAlreadyLoaded) {
    injectInlineScript(
      'ething-gtm-init',
      `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
    )
    if (!document.getElementById('ething-gtm-noscript')) {
      const noscript = document.createElement('noscript')
      noscript.id = 'ething-gtm-noscript'
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
      document.body.prepend(noscript)
    }
  }

  const ga4AlreadyLoaded =
    typeof window.gtag === 'function' ||
    document.querySelector('script[src*="googletagmanager.com/gtag/js"]')
  if (GA4_ID && !ga4AlreadyLoaded) {
    injectScript('ething-ga4', `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`)
    injectInlineScript(
      'ething-ga4-init',
      `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');${ADS_ID ? `gtag('config','${ADS_ID}');` : ''}`,
    )
  }

  if (META_PIXEL_ID) {
    injectInlineScript(
      'ething-meta-pixel',
      `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
    )
  }

  if (CLARITY_ID) {
    injectInlineScript(
      'ething-clarity',
      `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`,
    )
  }
}

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: name, ...params })
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', name, params)
  }
}

export function trackLeadConversion(formName = 'lead_form') {
  trackEvent('generate_lead', { form_name: formName })

  if (ADS_ID && ADS_LABEL && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: `${ADS_ID}/${ADS_LABEL}`,
    })
  }

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead')
  }
}

export function trackCalendlyOpen() {
  trackEvent('book_consultation_click', { cta: 'calendly' })
}

export const calendlyUrl =
  import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/ankgupta79/introduction-meeting'
