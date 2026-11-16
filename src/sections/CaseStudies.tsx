import { useRef, useState } from 'react'
import { ImageIcon, Maximize2, Target, UserRound } from 'lucide-react'
import { CaseStudy, caseStudies } from '../config/content'
import { getCaseShot } from '../config/dashboards'
import { Lightbox } from '../components/Lightbox'
import { Reveal } from '../components/Reveal'
import { useInView, useTilt } from '../hooks/motion'

/** Before→after bar pair. Only rendered when the resume gives both values. */
function RoasBars({ from, to, active }: { from: number; to: number; active: boolean }) {
  const max = Math.max(from, to)
  const row = (label: string, v: number, hot: boolean, delay: number) => (
    <div className="flex items-center gap-3">
      <span className="w-9 font-mono text-[0.68rem] uppercase tracking-wider text-mute">{label}</span>
      <div className="h-3 flex-1 overflow-hidden rounded-full bg-paper/[0.07]">
        <div
          className={`h-full rounded-full transition-[width] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${hot ? 'bg-accent' : 'bg-paper/45'}`}
          style={{ width: active ? `${(v / max) * 100}%` : '0%', transitionDelay: `${delay}s` }}
        />
      </div>
      <span className="w-12 text-right font-display text-lg font-bold tabular-nums">{v}X</span>
    </div>
  )
  return (
    <div className="space-y-2.5" role="img" aria-label={`ROAS improved from ${from}X to ${to}X`}>
      {row('From', from, false, 0.1)}
      {row('To', to, true, 0.35)}
    </div>
  )
}

function Card({ c, i, onShot }: { c: CaseStudy; i: number; onShot: (src: string, title: string) => void }) {
  const tilt = useRef<HTMLElement>(null)
  const seenRef = useRef<HTMLDivElement>(null)
  const seen = useInView(seenRef)
  useTilt(tilt, 2.5)
  const shot = getCaseShot(c.id)
  return (
    <Reveal delay={(i % 2) * 0.1} className="h-full">
      <article ref={tilt} className="card flex h-full flex-col p-6 sm:p-8">
        <header className="mb-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent-soft px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-accent">
              {c.kind === 'd2c' ? 'D2C eCommerce' : 'Lead generation'}
            </span>
            <span className="font-mono text-[0.68rem] uppercase tracking-wider text-mute">{c.period}</span>
          </div>
          <h3 className="display text-[clamp(1.9rem,3.2vw,2.6rem)]">{c.brand}</h3>
          <p className="mt-1.5 text-sm text-mute">{c.role}</p>
        </header>

        <div ref={seenRef} className="mb-6 rounded-2xl border border-line bg-ink/50 p-5">
          <p className="mb-3 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mute">
            <Target size={14} className="text-accent" /> Business objective
          </p>
          <p className="mb-5 text-sm text-paper/85">{c.objective}</p>
          {c.roasShift ? (
            <>
              <p className="mb-3 font-display text-4xl font-extrabold tracking-tight text-accent sm:text-5xl">
                {c.stats[0].value}
                <span className="ml-2 font-mono text-xs font-medium uppercase tracking-wider text-mute">ROAS</span>
              </p>
              <RoasBars from={c.roasShift.from} to={c.roasShift.to} active={seen} />
            </>
          ) : (
            <dl className="grid gap-4 sm:grid-cols-2">
              {c.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-mute">{s.label}</dt>
                  <dd className="mt-1 font-display text-3xl font-extrabold tracking-tight text-accent sm:text-4xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="mb-6">
          <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mute">Strategy implemented</p>
          <ul className="space-y-2">
            {c.strategy.map((s) => (
              <li key={s} className="flex gap-3 text-sm text-paper/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6 rounded-2xl border border-dashed border-line p-5">
          <p className="mb-2 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mute">
            <UserRound size={14} className="text-accent" /> My contribution
          </p>
          <p className="text-sm text-paper/85">{c.contribution}</p>
        </div>

        <div className="mt-auto">
          {shot ? (
            <button
              type="button"
              onClick={() => onShot(shot, `${c.brand} dashboard`)}
              aria-label={`View ${c.brand} dashboard full size`}
              className="group relative block aspect-[16/8] w-full overflow-hidden rounded-xl border border-line"
            >
              <img src={shot} alt={`${c.brand} campaign dashboard`} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
              <span className="absolute bottom-2 right-2 grid h-9 w-9 place-items-center rounded-full bg-ink/80">
                <Maximize2 size={15} />
              </span>
            </button>
          ) : (
            <div className="grid aspect-[16/6] w-full place-items-center rounded-xl border border-dashed border-paper/20 bg-ink/40 px-4 text-center">
              <p className="flex items-center gap-2 text-xs text-mute">
                <ImageIcon size={16} className="shrink-0 text-accent" />
                Dashboard screenshot placeholder — add <code className="font-mono text-paper/70">cases/{c.id}.png</code>
              </p>
            </div>
          )}
          <ul className="mt-4 flex flex-wrap gap-2">
            {c.tags.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  )
}

export function CaseStudies() {
  const [shot, setShot] = useState<{ src: string; title: string } | null>(null)
  return (
    <section aria-labelledby="cases-h" className="section-y">
      <div className="container-x">
        <Reveal className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Case studies</p>
            <h2 id="cases-h" className="h2">
              Growth That Speaks <span className="text-accent">Through Numbers.</span>
            </h2>
          </div>
          <p className="lead lg:max-w-sm">
            Results shown are brand-level outcomes during my tenure, as stated on my resume. “My contribution” describes what I
            personally owned.
          </p>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-7">
          {caseStudies.map((c, i) => (
            <Card key={c.id} c={c} i={i} onShot={(src, title) => setShot({ src, title })} />
          ))}
        </div>
      </div>
      <Lightbox items={shot ? [{ src: shot.src, title: shot.title }] : []} index={shot ? 0 : null} onIndex={() => undefined} onClose={() => setShot(null)} />
    </section>
  )
}
