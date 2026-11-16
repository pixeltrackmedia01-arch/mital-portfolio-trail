import { useRef, useState } from 'react'
import { Lightbulb, Search, Compass, Rocket, FlaskConical, LineChart, TrendingUp } from 'lucide-react'
import { insights, processSteps } from '../config/content'
import { Reveal } from '../components/Reveal'

const stepIcons = [Search, Compass, Rocket, FlaskConical, LineChart, TrendingUp]

function Journey() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const s = processSteps[active]
  const Icon = stepIcons[active]

  const onKey = (e: React.KeyboardEvent) => {
    const k = e.key
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(k)) return
    e.preventDefault()
    const n = processSteps.length
    const next = k === 'Home' ? 0 : k === 'End' ? n - 1 : (active + (k === 'ArrowRight' || k === 'ArrowDown' ? 1 : -1) + n) % n
    setActive(next)
    refs.current[next]?.focus()
  }

  return (
    <div>
      <div role="tablist" aria-label="Marketing process steps" onKeyDown={onKey} className="relative grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0">
        {/* connecting track (desktop) */}
        <span aria-hidden="true" className="absolute left-[8%] right-[8%] top-[1.65rem] hidden h-px bg-line lg:block" />
        <span
          aria-hidden="true"
          className="absolute left-[8%] top-[1.65rem] hidden h-px bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block"
          style={{ width: `${(active / (processSteps.length - 1)) * 84}%` }}
        />
        {processSteps.map((p, i) => (
          <button
            key={p.n}
            ref={(el) => {
              refs.current[i] = el
            }}
            role="tab"
            id={`step-${i}`}
            type="button"
            aria-selected={active === i}
            aria-controls="step-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onMouseEnter={(e) => e.currentTarget.matches('(hover:hover)') && setActive(i)}
            className={`group relative flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-colors duration-300 lg:items-center lg:border-transparent lg:bg-transparent lg:text-center ${
              active === i ? 'border-accent/60 bg-accent-soft' : 'border-line hover:border-paper/30'
            }`}
          >
            <span
              className={`relative z-10 grid h-11 w-11 place-items-center rounded-full border font-mono text-sm font-medium transition-all duration-500 ${
                i <= active ? 'border-accent bg-accent text-ink' : 'border-line bg-ink text-mute group-hover:border-paper/40'
              } ${active === i ? 'scale-110' : ''}`}
            >
              {p.n}
            </span>
            <span className={`font-display text-base font-bold leading-tight tracking-tight lg:text-[1.02rem] ${active === i ? 'text-paper' : 'text-paper/75'}`}>
              {p.title}
            </span>
          </button>
        ))}
      </div>

      <div
        id="step-panel"
        role="tabpanel"
        aria-labelledby={`step-${active}`}
        key={active}
        className="panel-in card mt-6 grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_1.1fr]"
      >
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent">
              <Icon size={22} />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-mute">Step {s.n} of 06</span>
          </div>
          <h3 className="display text-[clamp(1.9rem,3.5vw,2.8rem)]">{s.title}</h3>
          <p className="mt-4 text-lg text-paper/80">{s.short}</p>
        </div>
        <ul className="grid gap-2.5 self-center">
          {s.points.map((p, i) => (
            <li key={p} className="flex gap-3 rounded-xl border border-line bg-ink/40 px-4 py-3 text-[0.95rem]" style={{ animation: `panel-in .5s ${0.08 * i + 0.1}s both var(--ease-out-expo)` }}>
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Insights() {
  const [id, setId] = useState<(typeof insights)[number]['id']>('roas')
  const cur = insights.find((i) => i.id === id)!
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const idx = insights.findIndex((i) => i.id === id)
    const next = insights[(idx + (e.key === 'ArrowRight' ? 1 : -1) + insights.length) % insights.length]
    setId(next.id)
    document.getElementById(`ins-${next.id}`)?.focus()
  }
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-line p-6 sm:p-9">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-accent">
            <Lightbulb size={15} /> Campaign insights
          </p>
          <span className="rounded-full border border-line px-3 py-1 text-xs text-mute">My optimization approach — not client results</span>
        </div>
        <h3 className="display text-[clamp(1.7rem,3vw,2.5rem)]">What’s wrong with the numbers? Here’s where I look first.</h3>
        <div role="tablist" aria-label="Select a campaign problem" onKeyDown={onKey} className="mt-6 flex flex-wrap gap-2">
          {insights.map((i) => (
            <button
              key={i.id}
              id={`ins-${i.id}`}
              role="tab"
              type="button"
              aria-selected={id === i.id}
              aria-controls="ins-panel"
              tabIndex={id === i.id ? 0 : -1}
              onClick={() => setId(i.id)}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                id === i.id ? 'border-accent bg-accent text-ink' : 'border-line text-paper/80 hover:border-paper/40'
              }`}
            >
              {i.label}
            </button>
          ))}
        </div>
      </div>
      <div id="ins-panel" role="tabpanel" aria-labelledby={`ins-${id}`} key={id} className="panel-in p-6 sm:p-9">
        <p className="mb-6 max-w-2xl text-lg text-paper/85">{cur.summary}</p>
        <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {cur.checks.map(([t, d], i) => (
            <li key={t} className="rounded-2xl border border-line bg-ink/40 p-4" style={{ animation: `panel-in .5s ${0.07 * i}s both var(--ease-out-expo)` }}>
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <p className="mt-2 font-display text-[1.02rem] font-bold leading-tight tracking-tight">{t}</p>
              <p className="mt-1.5 text-sm text-mute">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function Process() {
  return (
    <section aria-labelledby="process-h" className="section-y">
      <div className="container-x">
        <Reveal className="mb-12 max-w-3xl">
          <p className="eyebrow mb-4">My process</p>
          <h2 id="process-h" className="h2">
            How I Turn Marketing <span className="text-accent">Into Growth.</span>
          </h2>
          <p className="lead mt-5">Six steps, repeated. Hover or tap a step to see what it involves.</p>
        </Reveal>
        <Reveal delay={0.05}>
          <Journey />
        </Reveal>
        <Reveal className="mt-20 sm:mt-28">
          <Insights />
        </Reveal>
      </div>
    </section>
  )
}
