import { useEffect } from 'react'
import HeroSection from '../components/sections/HeroSection.jsx'
import WhatWeOfferSection from '../components/sections/WhatWeOfferSection.jsx'
import AiTalentSection from '../components/sections/AiTalentSection.jsx'
import WhyUsHomeSection from '../components/sections/WhyUsHomeSection.jsx'
import TestimonialSection from '../components/sections/TestimonialSection.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { pageTitles } from '../data/siteContent.js'

export default function Home({ content }) {
  useEffect(() => {
    document.title = pageTitles['/']
  }, [])

  return (
    <>
      <HeroSection data={content.home} />
      <WhatWeOfferSection data={content.home} />
      <AiTalentSection data={content.home.aiTalent} />
      <WhyUsHomeSection data={content.home.whyUsSnippet} />
      <TestimonialSection data={content.testimonials} />
      <section
        id={content.contactSection.id}
        className="border-t border-ething-navy/5 bg-white py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ContactForm content={content} showTitle className="" />
        </div>
      </section>
    </>
  )
}
