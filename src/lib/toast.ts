export type ToastKind = 'info' | 'error' | 'success'
export interface ToastMsg {
  id: number
  kind: ToastKind
  text: string
}

type Listener = (t: ToastMsg) => void
const listeners = new Set<Listener>()
let seq = 0

export function toast(text: string, kind: ToastKind = 'info') {
  const t = { id: ++seq, kind, text }
  listeners.forEach((l) => l(t))
}
export function onToast(l: Listener) {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}
