import { useEffect } from 'react'
import ContactForm from '../components/ContactForm.jsx'
import { pageTitles } from '../data/siteContent.js'

export default function Contact({ content }) {
  const p = content.pages.contact
  useEffect(() => {
    document.title = pageTitles['/contact']
  }, [])

  return (
    <section id={content.contactSection.id} className="mx-auto max-w-6xl px-4 pb-11 pt-6 sm:px-6 sm:pb-16 sm:pt-9 lg:px-8">
      <ContactForm
        content={content}
        title={p.pageTitle}
        titleAs="h1"
        showTitle
        className="py-2"
      />
    </section>
  )
}
