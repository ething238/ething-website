import { useEffect } from 'react'
import ContactForm from '../components/ContactForm.jsx'
import { pageTitles } from '../data/siteContent.js'

export default function Contact({ content }) {
  const p = content.pages.contact
  useEffect(() => {
    document.title = pageTitles['/contact']
  }, [])

  return (
    <section id={content.contactSection.id} className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <ContactForm
        content={content}
        title={p.pageTitle}
        showTitle
        className="py-2"
      />
    </section>
  )
}
