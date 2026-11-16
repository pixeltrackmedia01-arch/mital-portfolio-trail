import { useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { RedactRegion } from '../config/dashboards'
import { useModal } from '../hooks/useModal'
import { BrowserFrame } from './BrowserFrame'

export interface LightboxItem {
  src: string | null
  title: string
  caption?: string
  redact?: RedactRegion[]
}

interface Props {
  items: LightboxItem[]
  index: number | null
  onIndex: (i: number) => void
  onClose: () => void
}

export function Lightbox({ items, index, onIndex, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const open = index !== null
  useModal(ref, open, onClose)
  const n = items.length

  const step = useCallback(
    (d: number) => {
      if (index === null || n < 2) return
      onIndex((index + d + n) % n)
    },
    [index, n, onIndex],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, step])

  // swipe
  const start = useRef<{ x: number; y: number } | null>(null)
  if (index === null) return null
  const item = items[index]

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Dashboard preview: ${item.title}`}
      className="panel-in fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-md"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      onPointerDown={(e) => {
        start.current = { x: e.clientX, y: e.clientY }
      }}
      onPointerUp={(e) => {
        const s = start.current
        start.current = null
        if (!s) return
        const dx = e.clientX - s.x
        const dy = e.clientY - s.y
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1)
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p className="font-mono text-xs tracking-wider text-mute">
          {index + 1} / {n}
        </p>
        <button
          type="button"
          aria-label="Close preview"
          onClick={onClose}
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-ink/70 hover:border-accent"
        >
          <X size={20} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
        {n > 1 && (
          <button
            type="button"
            aria-label="Previous screenshot"
            onClick={() => step(-1)}
            className="absolute left-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/80 hover:border-accent sm:left-6"
          >
            <ChevronLeft size={22} />
          </button>
        )}
        <div key={item.title + index} className="panel-in w-full max-w-[min(72rem,calc((100svh-12rem)*1.6))]">
          <BrowserFrame src={item.src} title={item.title} redact={item.redact} lazy={false} reveal={false} />
        </div>
        {n > 1 && (
          <button
            type="button"
            aria-label="Next screenshot"
            onClick={() => step(1)}
            className="absolute right-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/80 hover:border-accent sm:right-6"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      <div className="px-6 pb-6 pt-4 text-center">
        <p className="font-display text-lg font-bold tracking-tight">{item.title}</p>
        {item.caption && <p className="mx-auto mt-1 max-w-2xl text-sm text-mute">{item.caption}</p>}
      </div>
    </div>
  )
}
