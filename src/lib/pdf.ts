import { toast } from './toast'

const okCache = new Set<string>()

/**
 * Verifies that `url` really serves a PDF (and not an SPA fallback page or a 404).
 * Reads only the first few bytes so large portfolios are not downloaded twice.
 */
export async function pdfExists(url: string): Promise<boolean> {
  if (okCache.has(url)) return true
  const ctrl = new AbortController()
  const timer = window.setTimeout(() => ctrl.abort(), 8000)
  try {
    const res = await fetch(url, { headers: { Range: 'bytes=0-15' }, cache: 'no-store', signal: ctrl.signal })
    if (!res.ok || !res.body) return false
    const reader = res.body.getReader()
    const { value } = await reader.read()
    reader.cancel().catch(() => undefined)
    const head = value ? new TextDecoder().decode(value.slice(0, 5)) : ''
    const ok = head.startsWith('%PDF')
    if (ok) okCache.add(url)
    return ok
  } catch {
    return false
  } finally {
    window.clearTimeout(timer)
  }
}

const loadingDoc = (label: string) =>
  `<!doctype html><meta charset="utf-8"><title>Opening ${label}…</title><body style="margin:0;display:grid;place-items:center;min-height:100vh;background:#0e0e0f;color:#f3efe6;font:500 15px system-ui,sans-serif">Opening ${label}…</body>`

/**
 * Opens a PDF in a NEW tab (never downloads, never navigates the current page).
 * The tab is opened synchronously on click so pop-up blockers allow it, then
 * pointed at the PDF once we have confirmed the file exists. If the file is
 * missing the tab is closed again and a helpful message is shown.
 */
export async function openPdfInNewTab(url: string, label: string): Promise<boolean> {
  const abs = new URL(url, window.location.href).href
  const win = window.open('', '_blank')
  if (win) {
    try {
      win.opener = null
      win.document.write(loadingDoc(label))
      win.document.close()
    } catch {
      /* cross-origin timing — safe to ignore */
    }
  }
  const ok = await pdfExists(abs)
  if (!ok) {
    win?.close()
    toast(`The ${label} PDF could not be found yet. Add the file at ${url} and try again.`, 'error')
    return false
  }
  if (win) {
    win.location.replace(abs)
    return true
  }
  const retry = window.open(abs, '_blank', 'noopener')
  if (!retry) {
    toast('Your browser blocked the new tab. Please allow pop-ups for this site, or right-click the card and choose “Open link in new tab”.', 'error')
    return false
  }
  return true
}
