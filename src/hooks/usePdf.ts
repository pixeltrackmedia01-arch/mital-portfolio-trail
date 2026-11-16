import { useCallback, useRef, useState } from 'react'
import { openPdfInNewTab } from '../lib/pdf'

/** Click handler + loading state for "open this PDF in a new tab" cards. */
export function usePdfOpener(url: string, label: string) {
  const [loading, setLoading] = useState(false)
  const busy = useRef(false)
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Let the browser handle ctrl/cmd/shift/middle-click natively (it opens the real link).
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      e.preventDefault()
      if (busy.current) return
      busy.current = true
      setLoading(true)
      openPdfInNewTab(url, label).finally(() => {
        busy.current = false
        setLoading(false)
      })
    },
    [url, label],
  )
  return { loading, onClick }
}
