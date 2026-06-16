import { trackCalendlyOpen, calendlyUrl } from '../../lib/tracking.js'
import {
  lpCtaPrimaryNavy,
  lpCtaOutline,
  lpCtaSecondary,
} from './lpCtaStyles.js'

export function openCalendly() {
  trackCalendlyOpen()
  window.open(calendlyUrl, '_blank', 'noopener,noreferrer')
}

export default function CalendlyButton({
  children,
  className = '',
  variant = 'primary',
  onClick,
  ...props
}) {
  const base =
    variant === 'primary'
      ? lpCtaPrimaryNavy
      : variant === 'outline'
        ? lpCtaOutline
        : variant === 'secondary'
          ? lpCtaSecondary
          : lpCtaSecondary

  function handleClick(e) {
    onClick?.(e)
    openCalendly()
  }

  return (
    <button type="button" className={`${base} ${className}`} onClick={handleClick} {...props}>
      {children}
    </button>
  )
}
