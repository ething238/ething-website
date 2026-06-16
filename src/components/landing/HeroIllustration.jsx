import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Clock, Globe2, Shield, Users, Video } from 'lucide-react'

const TALENT = [
  { initials: 'AK', role: 'Sr. React Dev', stack: 'React · TypeScript', match: '98%' },
  { initials: 'PS', role: 'DevOps Lead', stack: 'AWS · Kubernetes', match: '97%' },
]

const SKILLS = ['React', 'Node.js', 'DevOps', 'Python', 'AI/ML']

function Avatar({ initials, gradient, size = 'md' }) {
  const sizes = {
    sm: 'h-7 w-7 text-[9px]',
    md: 'h-9 w-9 text-[10px]',
  }
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} font-bold text-white ${sizes[size]}`}
    >
      {initials}
    </div>
  )
}

function ConnectorColumn({ reduceMotion }) {
  return (
    <div className="flex flex-col items-center justify-center px-1 py-2 sm:px-2">
      <div className="relative flex w-full items-center justify-center">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-400/50 to-teal-400/70" />
        <motion.div
          animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
          transition={reduceMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-teal-400/40 bg-teal-500/20 sm:h-9 sm:w-9"
        >
          <ArrowRight className="h-4 w-4 text-teal-300" />
        </motion.div>
        <div className="h-px flex-1 bg-gradient-to-r from-teal-400/70 via-teal-400/50 to-transparent" />
      </div>
      <p className="mt-2 text-center text-[8px] font-semibold uppercase leading-tight tracking-wide text-teal-300 sm:text-[9px]">
        Ething matches
        <br />& deploys
      </p>
      <p className="mt-1 text-center text-[8px] text-zinc-500">within 48 hrs</p>
    </div>
  )
}

export default function HeroIllustration({ reduceMotion }) {
  return (
    <div className="hero-illustration relative mx-auto w-full max-w-[520px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-teal-500/20 via-transparent to-sky-500/15 blur-2xl"
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#0a1628]/90 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl"
      >
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-500/[0.06] via-transparent to-sky-500/[0.08]" />

        {/* Header - what this diagram shows */}
        <div className="relative border-b border-white/[0.06] px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-white sm:text-sm">
                Global companies hire engineers from India
              </p>
              <p className="text-[10px] text-zinc-500">via Ething - vetted, onboarded, ready to work</p>
            </div>
            <div className="hidden shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                {!reduceMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[9px] font-medium text-emerald-300">4hr overlap</span>
            </div>
          </div>
        </div>

        {/* Main story: 3 columns - no overlap */}
        <div className="relative grid grid-cols-[1fr_auto_1fr] gap-0 px-3 py-4 sm:px-4 sm:py-5">
          {/* LEFT - Your company */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex flex-col rounded-xl border border-sky-400/20 bg-sky-500/[0.07] p-3 sm:p-3.5"
          >
            <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-sky-300">
              1 · Your Company
            </p>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                <Globe2 className="h-5 w-5 text-sky-300" />
              </div>
            </div>
            <p className="text-xs font-bold text-white sm:text-sm">Your Global Company</p>
            {/* <p className="mt-0.5 text-[10px] leading-snug text-zinc-400">
              20-300 employees · scaling product team
            </p> */}
            {/* <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.04] px-2 py-1.5">
              <Users className="h-3 w-3 shrink-0 text-sky-400" />
              <span className="text-[9px] text-zinc-400">CEO · CTO · CFO · VP</span>
            </div> */}
          </motion.div>

          {/* CENTER - Ething connects */}
          <ConnectorColumn reduceMotion={reduceMotion} />

          {/* RIGHT - Vetted talent */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="flex flex-col rounded-xl border border-teal-400/25 bg-teal-500/[0.08] p-3 sm:p-3.5"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[9px] font-bold uppercase tracking-wider text-teal-300">
                2 · Vetted Engineers
              </p>
              <span className="text-base leading-none">🇮🇳</span>
            </div>
            <p className="text-xs font-bold text-white sm:text-sm">India Talent Pool</p>
            <p className="mt-0.5 text-[10px] leading-snug text-zinc-400">
              Pre-screened engineers join your team in days
            </p>
            <div className="mt-3 space-y-1.5">
              {TALENT.map((t, i) => (
                <motion.div
                  key={t.initials}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.04] px-2 py-1.5"
                >
                  <Avatar initials={t.initials} gradient="from-teal-500/70 to-emerald-600/50" size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-semibold text-white">{t.role}</p>
                    <p className="truncate text-[8px] text-zinc-500">{t.stack}</p>
                  </div>
                  <span className="shrink-0 rounded bg-emerald-500/15 px-1 py-0.5 text-[8px] font-bold text-emerald-300">
                    {t.match}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Step 3 - Collaboration proof (compact, below - doesn't hide anything) */}
        <div className="relative mx-3 mb-3 rounded-xl border border-white/10 bg-white/[0.03] sm:mx-4 sm:mb-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
            <div className="flex items-center gap-2">
              <Video className="h-3.5 w-3.5 text-teal-400" />
              <p className="text-[10px] font-semibold text-white">
                3 · They work as part of your team
              </p>
            </div>
            <span className="text-[8px] text-zinc-500">Daily standup · same timezone overlap</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 sm:gap-3">
            {/* US lead */}
            <div className="flex items-center gap-1.5 rounded-lg border border-sky-400/20 bg-sky-500/[0.06] px-2 py-1.5">
              <Avatar initials="JM" gradient="from-sky-500/50 to-blue-600/40" size="sm" />
              <div>
                <p className="text-[9px] font-semibold text-white">James</p>
                <p className="text-[8px] text-zinc-500">CTO · Global</p>
              </div>
            </div>

            <span className="text-[10px] text-zinc-600">+</span>

            {/* Indian engineers */}
            <div className="flex flex-1 items-center gap-1.5">
              <div className="flex items-center gap-1.5 rounded-lg border border-emerald-400/25 bg-emerald-500/[0.06] px-2 py-1.5">
                <Avatar initials="AK" gradient="from-teal-500/60 to-emerald-600/40" size="sm" />
                <div>
                  <p className="text-[9px] font-semibold text-white">Arjun</p>
                  <p className="text-[8px] text-zinc-500">React Dev</p>
                </div>
              </div>
              <div className="hidden items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-1.5 sm:flex">
                <Avatar initials="PS" gradient="from-violet-500/50 to-purple-600/35" size="sm" />
                <div>
                  <p className="text-[9px] font-semibold text-white">Priya</p>
                  <p className="text-[8px] text-zinc-500">DevOps</p>
                </div>
              </div>
            </div>

            <span className="hidden text-[9px] font-medium text-teal-300 sm:inline">= Your extended team</span>
          </div>
        </div>

        {/* Trust row + skills */}
        <div className="relative border-t border-white/[0.06] px-4 py-3 sm:px-5">
          <div className="mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-1.5 text-[9px] text-zinc-400">
              <Clock className="h-3 w-3 text-sky-400" />
              Profiles in <strong className="text-white">48 hrs</strong>
            </span>
            <span className="flex items-center gap-1.5 text-[9px] text-zinc-400">
              <CheckCircle2 className="h-3 w-3 text-teal-400" />
              <strong className="text-white">Top 3%</strong> vetted
            </span>
            <span className="flex items-center gap-1.5 text-[9px] text-zinc-400">
              <Shield className="h-3 w-3 text-teal-400" />
              NDA & IP protected
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5">
            {SKILLS.map((skill, i) => (
              <motion.span
                key={skill}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[9px] font-medium text-zinc-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
