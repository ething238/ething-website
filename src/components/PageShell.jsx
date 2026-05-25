export default function PageShell({ title, kicker, children, className = '' }) {
  return (
    <div className={`mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 ${className}`}>
      {kicker && (
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-600">{kicker}</p>
      )}
      <h1 className="mt-1 font-[family:var(--font-display)] text-3xl font-bold tracking-tight text-ething-ink md:text-4xl">
        {title}
      </h1>
      {children}
    </div>
  )
}
