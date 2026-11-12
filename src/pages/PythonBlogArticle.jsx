import { useEffect, useRef } from 'react'
import articleHtml from './python-blog-article.html?raw'
import './python-blog.css'

export const pythonBlogPath = '/blogs/hire-python-developers'
const cover = '/blog/hire-python-developers-cover.webp'
export const pythonBlogPost = {
  title: 'How to Hire Python Developers for Backend Projects',
  excerpt: 'Define the role, choose between Django, FastAPI and Flask, and use a practical coding exercise and scorecard to evaluate candidates. Then compare hiring costs and plan the first month.',
  author: 'Ething Solutions Pvt. Ltd.',
  publishedAt: '2026-11-12T12:00:00+05:30',
  imageUrl: cover,
  link: pythonBlogPath,
}

const articleMarkup = {
  __html: articleHtml.replace('python-backend-cover.webp', cover),
}

export default function PythonBlogArticle() {
  const page = useRef(null)
  useEffect(() => {
    const links = Array.from(page.current.querySelectorAll('.rail .toc-list a'))
    const sections = links.map((link) => document.getElementById(link.hash.slice(1)))
    const mobileContents = page.current.querySelector('.mobile-toc')
    function highlight() {
      const current = sections.findLast((section) => section.getBoundingClientRect().top <= 145)?.id
      for (const link of links) {
        if (link.hash.slice(1) === current) link.setAttribute('aria-current', 'location')
        else link.removeAttribute('aria-current')
      }
    }
    function collapse(event) {
      if (event.target.closest('a[href^="#"]')) mobileContents.open = false
    }
    highlight()
    window.addEventListener('scroll', highlight, { passive: true })
    mobileContents.addEventListener('click', collapse)
    return () => {
      window.removeEventListener('scroll', highlight)
      mobileContents.removeEventListener('click', collapse)
    }
  }, [])
  return <div className="python-blog-preview python-blog-page" ref={page} dangerouslySetInnerHTML={articleMarkup} />
}
