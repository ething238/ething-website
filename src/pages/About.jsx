import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { pageTitles } from '../data/siteContent.js'

function LinkedInGlyph({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function WavyRule({ className = '' }) {
  return (
    <svg
      className={`mx-auto h-3 w-16 text-violet-500 ${className}`}
      viewBox="0 0 64 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 6c4-4 8 4 12 0s8 4 12 0 8 4 12 0 8 4 12 0 8 4 10 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function About({ content }) {
  const p = content.pages.about
  useEffect(() => {
    document.title = pageTitles['/about_us']
  }, [])

  return (
    <div className="about-grid-bg">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              {p.heroKicker}
            </p>
            <h1 className="mt-2 font-[family:var(--font-display)] text-3xl font-bold tracking-tight text-ething-ink md:text-4xl lg:text-[2.5rem]">
              {p.heroTitle}
            </h1>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-700 md:text-lg">
              {p.heroParagraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="absolute -right-4 -top-4 z-0 h-24 w-32 rounded-2xl bg-violet-500/90 shadow-lg shadow-violet-500/20 sm:h-28 sm:w-40"
              aria-hidden
            />
            <div
              className="absolute -bottom-3 -left-3 z-0 h-20 w-20 rounded-xl bg-sky-500 shadow-lg shadow-sky-500/25 sm:h-24 sm:w-24"
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative z-10 overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-200 shadow-xl"
            >
              <img
                src={p.heroImage.src}
                alt={p.heroImage.alt}
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
                width={640}
                height={800}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="border-t border-zinc-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  {p.vision.eyebrow}
                </p>
                <p className="mt-3 font-[family:var(--font-display)] text-xl font-semibold leading-snug text-zinc-800 md:text-2xl">
                  {p.vision.body}
                </p>
              </div>
              <hr className="my-10 border-zinc-200" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  {p.mission.eyebrow}
                </p>
                <p className="mt-3 text-base leading-relaxed text-zinc-600 md:text-lg">
                  {p.mission.body}
                </p>
              </div>
            </div>
            <div className="relative">
              <div
                className="absolute -right-1 top-8 z-0 hidden h-40 w-2 rounded-full bg-sky-500 sm:block"
                aria-hidden
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-100 shadow-lg"
              >
                <img
                  src={p.visionImage.src}
                  alt={p.visionImage.alt}
                  className="aspect-[4/3] w-full object-cover"
                  width={720}
                  height={540}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="border-t border-zinc-200/80 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[family:var(--font-display)] text-2xl font-bold text-ething-ink md:text-3xl">
            {p.valuesHeading}
          </h2>
          <WavyRule className="mt-3" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.values.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col rounded-2xl bg-ething-navy px-5 py-8 text-center shadow-lg shadow-ething-navy/20"
              >
                <h3 className="font-[family:var(--font-display)] text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-300">{item.body}</p>
                <span
                  className="mx-auto mt-6 block h-0.5 w-12 rounded-full bg-gradient-to-r from-orange-400 to-violet-500"
                  aria-hidden
                />
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our Leaders */}
      <section className="border-t border-zinc-200/80 bg-white pb-20 pt-16 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-[family:var(--font-display)] text-2xl font-bold text-ething-ink md:text-3xl">
            {p.leadersHeading}
          </h2>
          <WavyRule className="mt-3" />
          <ul className="mx-auto mt-12 flex flex-wrap justify-center gap-8 md:gap-10 lg:gap-12">
            {p.leaders.map((person, i) => (
              <motion.li
                key={person.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="w-full max-w-[20rem] overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-50/80 shadow-md"
              >
                <div className="aspect-[640/960] w-full overflow-hidden bg-zinc-200">
                  <img
                    src={person.image.src}
                    alt={person.image.alt}
                    className="h-full w-full object-cover object-center"
                    width={640}
                    height={960}
                  />
                </div>
                <div className="border-t border-zinc-100 bg-white px-5 py-6 text-center shadow-[0_-4px_24px_-12px_rgba(0,0,0,0.08)]">
                  <h3 className="font-[family:var(--font-display)] text-xl font-bold text-ething-ink">
                    {person.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-zinc-600">{person.role}</p>
                  {person.note ? (
                    <p className="mt-3 text-xs text-zinc-500">{person.note}</p>
                  ) : null}
                  {person.linkedInUrl ? (
                    <a
                      href={person.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-ething-navy transition hover:border-ething-navy/30 hover:bg-zinc-50"
                    >
                      <LinkedInGlyph className="h-4 w-4" />
                      LinkedIn
                    </a>
                  ) : null}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
