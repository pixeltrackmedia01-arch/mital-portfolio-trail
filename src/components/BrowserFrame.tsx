import { ImageIcon } from 'lucide-react'
import { RedactRegion } from '../config/dashboards'
import { useRef } from 'react'
import { useInView } from '../hooks/motion'

interface Props {
  src: string | null
  title: string
  redact?: RedactRegion[]
  /** Lazy-load below-the-fold screenshots. */
  lazy?: boolean
  /** Reveal-on-scroll animation (disable inside the lightbox). */
  reveal?: boolean
  className?: string
  fit?: 'cover' | 'contain'
  placeholderHint?: string
}

/** A browser-style frame around a dashboard screenshot — or a clearly-labelled placeholder. */
export function BrowserFrame({ src, title, redact = [], lazy = true, reveal = true, className = '', fit = 'contain', placeholderHint }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref)
  const on = !reveal || seen
  return (
    <div ref={ref} className={`overflow-hidden rounded-xl border border-line bg-surface-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] ${className}`}>
      <div className="flex items-center gap-3 border-b border-line bg-ink/60 px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-paper/20" />
          <i className="h-2.5 w-2.5 rounded-full bg-paper/20" />
          <i className="h-2.5 w-2.5 rounded-full bg-paper/20" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-md bg-paper/[0.06] px-3 py-1 text-center font-mono text-[0.68rem] text-mute">{title}</span>
      </div>
      <div className={`relative aspect-[16/10] w-full overflow-hidden bg-[#101012] ${reveal ? `img-reveal ${on ? 'in' : ''}` : ''}`}>
        {src ? (
          <>
            <img
              src={src}
              alt={title}
              loading={lazy ? 'lazy' : 'eager'}
              decoding="async"
              draggable={false}
              className={`h-full w-full ${fit === 'cover' ? 'object-cover object-top' : 'object-contain'}`}
            />
            {redact.map((r, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="absolute rounded-sm bg-ink/30 backdrop-blur-md [backdrop-filter:blur(10px)]"
                style={{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%` }}
              />
            ))}
          </>
        ) : (
          <div className="absolute inset-3 grid place-items-center rounded-lg border border-dashed border-paper/20 p-4 text-center">
            <div>
              <ImageIcon className="mx-auto mb-3 text-accent" size={30} />
              <p className="font-display text-lg font-bold tracking-tight">Dashboard screenshot placeholder</p>
              <p className="mx-auto mt-1.5 max-w-xs text-xs text-mute">{placeholderHint ?? 'Add your real screenshot here.'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
