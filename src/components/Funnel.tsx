import { useRef } from 'react'
import { funnelStages } from '../config/content'
import { useInView } from '../hooks/motion'

const widths = [100, 80, 62, 45, 30]

/** Illustrative marketing funnel — a concept diagram, NOT campaign data. */
export function Funnel() {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref)
  return (
    <figure ref={ref} className="grid items-center gap-8 md:grid-cols-[1fr_0.9fr]">
      <div className="relative mx-auto w-full max-w-[34rem]" aria-hidden="true">
        {/* flowing dots */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {[-34, -12, 14, 30, -22, 22].map((x, i) => (
            <span
              key={i}
              className="funnel-dot absolute left-1/2 h-1.5 w-1.5 rounded-full bg-paper"
              style={{ ['--x' as string]: `${x}%`, animationDelay: `${i * 0.55}s`, display: seen ? undefined : 'none' }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          {funnelStages.map((s, i) => {
            const w = widths[i]
            const next = widths[i + 1] ?? w - 14
            const inset = ((w - next) / 2 / w) * 100
            return (
              <div
                key={s.label}
                className="mx-auto flex h-14 items-center justify-center text-center font-display text-[0.95rem] font-bold tracking-tight transition-[width,opacity] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:h-16 sm:text-base"
                style={{
                  width: seen ? `${w}%` : '30%',
                  opacity: seen ? 1 : 0,
                  transitionDelay: `${i * 0.12}s`,
                  clipPath: `polygon(0 0, 100% 0, ${100 - inset}% 100%, ${inset}% 100%)`,
                  background: i === funnelStages.length - 1 ? 'var(--color-accent)' : `rgb(243 239 230 / ${0.16 - i * 0.025})`,
                  color: i === funnelStages.length - 1 ? 'var(--color-ink)' : 'var(--color-paper)',
                }}
              >
                <span className="px-4 leading-tight">{s.label}</span>
              </div>
            )
          })}
        </div>
      </div>
      <figcaption>
        <ol className="space-y-3">
          {funnelStages.map((s, i) => (
            <li key={s.label} className="flex items-baseline gap-3 border-b border-line pb-3">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <span className="font-semibold">{s.label}</span>
              <span className="ml-auto text-right text-sm text-mute">{s.note}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mute">
          Illustrative concept — not campaign data
        </p>
      </figcaption>
    </figure>
  )
}
