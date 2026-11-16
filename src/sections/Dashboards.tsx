import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { DashboardCategory, dashboardTabs, getDashboardShots } from '../config/dashboards'
import { BrowserFrame } from '../components/BrowserFrame'
import { Lightbox } from '../components/Lightbox'
import { Reveal } from '../components/Reveal'
import { gsap, reducedMotion } from '../lib/gsap'

export function Dashboards() {
  const [tab, setTab] = useState<DashboardCategory>('lead')
  const [lb, setLb] = useState<number | null>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })
  const [cur, setCur] = useState(0)
  const shots = useMemo(() => getDashboardShots(tab), [tab])
  const isPlaceholder = shots[0]?.src === null

  const measure = useCallback(() => {
    const el = scroller.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 })
    const first = el.querySelector<HTMLElement>('[data-slide]')
    if (first) setCur(Math.round(el.scrollLeft / (first.offsetWidth + 20)))
  }, [])

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    el.scrollTo({ left: 0 })
    measure()
    if (!reducedMotion()) {
      gsap.fromTo(el.querySelectorAll('[data-slide]'), { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', clearProps: 'transform,opacity,visibility' })
    }
  }, [tab, measure])

  const slide = (dir: 1 | -1) => {
    const el = scroller.current
    const first = el?.querySelector<HTMLElement>('[data-slide]')
    if (!el || !first) return
    el.scrollBy({ left: dir * (first.offsetWidth + 20), behavior: reducedMotion() ? 'auto' : 'smooth' })
  }

  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const i = dashboardTabs.findIndex((t) => t.id === tab)
    const next = dashboardTabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + dashboardTabs.length) % dashboardTabs.length]
    setTab(next.id)
    document.getElementById(`tab-${next.id}`)?.focus()
  }

  return (
    <section aria-labelledby="dash-h" className="section-y overflow-hidden">
      <div className="container-x">
        <Reveal className="mb-10 max-w-3xl">
          <p className="eyebrow mb-4">Dashboards</p>
          <h2 id="dash-h" className="h2">
            Real Campaigns. Real Data. <span className="text-accent">Real Performance.</span>
          </h2>
          <p className="lead mt-5">
            Screenshots from the ad accounts and dashboards I work in. Tap any frame to view it full size. Sensitive client
            identifiers are blurred where needed.
          </p>
        </Reveal>

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div role="tablist" aria-label="Dashboard category" className="inline-flex w-full rounded-full border border-line bg-surface p-1 sm:w-auto" onKeyDown={onTabKey}>
            {dashboardTabs.map((t) => (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={tab === t.id}
                aria-controls="dash-panel"
                tabIndex={tab === t.id ? 0 : -1}
                onClick={() => setTab(t.id)}
                className={`flex-1 rounded-full px-4 py-2.5 text-[0.82rem] font-semibold transition-colors duration-300 sm:flex-none sm:px-6 sm:text-sm ${
                  tab === t.id ? 'bg-accent text-ink' : 'text-paper/75 hover:text-paper'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-wider text-mute">
              {String(Math.min(cur + 1, shots.length)).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              aria-label="Previous dashboards"
              disabled={edge.start}
              onClick={() => slide(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next dashboards"
              disabled={edge.end}
              onClick={() => slide(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        id="dash-panel"
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        ref={scroller}
        onScroll={measure}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-6 [scroll-padding-inline:max(1rem,calc((100vw-80rem)/2))] [padding-inline:max(1rem,calc((100vw-80rem)/2))]"
      >
        {shots.map((s, i) => (
          <figure
            key={s.id}
            data-slide
            className="group w-[86%] shrink-0 snap-start sm:w-[62%] lg:w-[42rem]"
          >
            <button
              type="button"
              onClick={() => setLb(i)}
              aria-label={`View ${s.title} full size`}
              className="relative block w-full text-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
            >
              <BrowserFrame
                src={s.src}
                title={s.title}
                redact={s.redact}
                placeholderHint={`Drop an image in src/assets/dashboards/${tab}/ — it appears here automatically.`}
              />
              <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-ink/80 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                <Maximize2 size={16} />
              </span>
            </button>
            <figcaption className="mt-4 px-1">
              <p className="font-display text-lg font-bold tracking-tight">{s.title}</p>
              {s.caption && <p className="mt-1 text-sm text-mute">{s.caption}</p>}
            </figcaption>
          </figure>
        ))}
        <div aria-hidden="true" className="w-1 shrink-0" />
      </div>

      <div className="container-x">
        {isPlaceholder && (
          <p className="mt-2 rounded-xl border border-dashed border-line px-4 py-3 text-center text-sm text-mute">
            Placeholders shown — your real dashboard screenshots will replace these automatically once added to{' '}
            <code className="font-mono text-paper/80">src/assets/dashboards/{tab}/</code>.
          </p>
        )}
      </div>

      <Lightbox items={shots} index={lb} onIndex={setLb} onClose={() => setLb(null)} />
    </section>
  )
}
