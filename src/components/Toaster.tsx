import { useEffect, useState } from 'react'
import { AlertTriangle, Check, Info, X } from 'lucide-react'
import { onToast, ToastMsg } from '../lib/toast'

export function Toaster() {
  const [items, setItems] = useState<ToastMsg[]>([])
  useEffect(
    () =>
      onToast((t) => {
        setItems((p) => [...p.slice(-2), t])
        window.setTimeout(() => setItems((p) => p.filter((x) => x.id !== t.id)), 7000)
      }),
    [],
  )
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] flex flex-col items-center gap-2 px-4"
      role="status"
      aria-live="polite"
    >
      {items.map((t) => (
        <div
          key={t.id}
          className="panel-in pointer-events-auto flex max-w-md items-start gap-3 rounded-2xl border border-line bg-surface-2/95 px-4 py-3 text-sm shadow-2xl backdrop-blur"
          role={t.kind === 'error' ? 'alert' : undefined}
        >
          <span className={`mt-0.5 ${t.kind === 'error' ? 'text-accent' : t.kind === 'success' ? 'text-emerald-400' : 'text-mute'}`}>
            {t.kind === 'error' ? <AlertTriangle size={18} /> : t.kind === 'success' ? <Check size={18} /> : <Info size={18} />}
          </span>
          <p className="flex-1 text-paper/90">{t.text}</p>
          <button
            type="button"
            aria-label="Dismiss message"
            className="text-mute hover:text-paper"
            onClick={() => setItems((p) => p.filter((x) => x.id !== t.id))}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
