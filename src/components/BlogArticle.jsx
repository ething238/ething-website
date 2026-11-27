import { useEffect, useRef } from 'react'
import '../pages/python-blog.css'

export default function BlogArticle({ markup }) {
  const page = useRef(null)

  useEffect(() => {
    const links = Array.from(page.current.querySelectorAll('.rail .toc-list a'))
    const sections = links.map((link) => page.current.querySelector(link.hash)).filter(Boolean)
    const mobileContents = page.current.querySelector('.mobile-toc')
    let frame = null

    function highlight() {
      frame = null
      const current = sections.findLast((section) => section.getBoundingClientRect().top <= 145)?.id
      for (const link of links) {
        if (link.hash.slice(1) === current) link.setAttribute('aria-current', 'location')
        else link.removeAttribute('aria-current')
      }
    }

    function onScroll() {
      if (frame === null) frame = window.requestAnimationFrame(highlight)
    }

    function collapse(event) {
      if (event.target.closest('a[href^="#"]')) mobileContents.open = false
    }

    highlight()
    window.addEventListener('scroll', onScroll, { passive: true })
    mobileContents?.addEventListener('click', collapse)
    return () => {
      window.removeEventListener('scroll', onScroll)
      mobileContents?.removeEventListener('click', collapse)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [markup])

  return <div className="python-blog-preview python-blog-page" ref={page} dangerouslySetInnerHTML={markup} />
}
