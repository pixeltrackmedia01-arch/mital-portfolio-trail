import { useRef } from 'react'
import { Download, ExternalLink, X } from 'lucide-react'
import { RESUME_PDF, person } from '../config/site'
import { useModal } from '../hooks/useModal'

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useModal(ref, open, onClose)
  if (!open) return null
  return (
    <div
      className="panel-in fixed inset-0 z-[100] grid place-items-center bg-black/75 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Resume quick view"
        className="flex h-[min(92svh,60rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
          <p className="font-display text-lg font-bold tracking-tight">Resume · {person.name}</p>
          <div className="flex items-center gap-2">
            <a
              href={RESUME_PDF}
              download={person.resumeFileName}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-ink hover:bg-paper"
            >
              <Download size={16} /> <span className="hidden sm:inline">Download</span>
            </a>
            <a
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium hover:border-accent sm:inline-flex"
            >
              <ExternalLink size={16} /> New tab
            </a>
            <button
              type="button"
              aria-label="Close resume preview"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-full border border-line hover:border-accent"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="relative flex-1 bg-[#2a2a2d]">
          <object data={`${RESUME_PDF}#view=FitH&toolbar=0`} type="application/pdf" className="h-full w-full" aria-label="Resume PDF">
            <div className="grid h-full place-items-center p-8 text-center">
              <div>
                <p className="mb-4 text-paper/80">Your browser can’t preview PDFs inline.</p>
                <a
                  href={RESUME_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-ink"
                >
                  <ExternalLink size={16} /> Open resume in a new tab
                </a>
              </div>
            </div>
          </object>
        </div>
      </div>
    </div>
  )
}
