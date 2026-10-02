import { keywordPageContent } from '../data/keywordPageContent.js'

export default function KeywordPageContent({ pathname }) {
  const copy = keywordPageContent[pathname]
  if (!copy) return null
  return (
    <section aria-labelledby="hiring-requirements-heading" className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 id="hiring-requirements-heading" className="text-2xl font-semibold text-ething-ink">{copy.heading}</h2>
        {copy.paragraphs.map((text) => <p key={text} className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600">{text}</p>)}
      </div>
    </section>
  )
}
