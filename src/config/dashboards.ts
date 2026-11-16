/**
 * ─────────────────────────────────────────────────────────────
 *  DASHBOARD SCREENSHOT CONFIGURATION
 * ─────────────────────────────────────────────────────────────
 *  HOW TO ADD YOUR REAL SCREENSHOTS (no code changes needed):
 *
 *   1. Drop image files (png / jpg / webp) into one of these folders:
 *        src/assets/dashboards/lead/   → "Lead Generation Dashboard" tab
 *        src/assets/dashboards/b2c/    → "B2C / D2C Sales Dashboard" tab
 *        src/assets/dashboards/cases/  → case study cards. Name the file after
 *                                        the case study id:  greenfibre.png,
 *                                        jadeblue.png, house-of-panchhi.png,
 *                                        diamond-icq.png
 *   2. Files are shown in filename order (lead-01.png, lead-02.png …).
 *   3. (Optional) add a title / caption / privacy blur below in DASHBOARD_META,
 *      keyed by the exact file name.
 *
 *  Until you add images, clearly-labelled placeholders are shown.
 *  Nothing here is fabricated: no numbers are ever drawn by the site itself.
 */

export type DashboardCategory = 'lead' | 'b2c'

/** A blurred rectangle, in % of the image, to hide client names / account IDs. */
export interface RedactRegion {
  x: number
  y: number
  w: number
  h: number
}

export interface DashboardMeta {
  title?: string
  caption?: string
  /** Hide sensitive account names / identifiers behind a blur. */
  redact?: RedactRegion[]
}

/**
 * Optional per-file overrides. Example:
 *
 * 'lead-01.png': {
 *   title: 'Meta Lead Ads — Lead Form Performance',
 *   caption: 'Cost per lead and lead volume by audience.',
 *   redact: [{ x: 2, y: 3, w: 22, h: 6 }],   // blur the account name
 * },
 */
export const DASHBOARD_META: Record<string, DashboardMeta> = {}

export interface DashboardShot {
  id: string
  category: DashboardCategory
  title: string
  caption: string
  src: string | null
  redact: RedactRegion[]
}

const leadFiles = import.meta.glob('../assets/dashboards/lead/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>
const b2cFiles = import.meta.glob('../assets/dashboards/b2c/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>
const caseFiles = import.meta.glob('../assets/dashboards/cases/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const fileName = (p: string) => p.split('/').pop() ?? p
const humanise = (p: string) =>
  fileName(p)
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

function toShots(files: Record<string, string>, category: DashboardCategory): DashboardShot[] {
  return Object.keys(files)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((p) => {
      const meta = DASHBOARD_META[fileName(p)] ?? {}
      return {
        id: `${category}-${fileName(p)}`,
        category,
        title: meta.title ?? humanise(p),
        caption: meta.caption ?? '',
        src: files[p],
        redact: meta.redact ?? [],
      }
    })
}

const placeholder = (category: DashboardCategory, n: number, label: string): DashboardShot => ({
  id: `${category}-placeholder-${n}`,
  category,
  title: `${label} — placeholder ${n}`,
  caption: `Add your screenshot to src/assets/dashboards/${category}/ and it will appear here automatically.`,
  src: null,
  redact: [],
})

export function getDashboardShots(category: DashboardCategory): DashboardShot[] {
  const real = toShots(category === 'lead' ? leadFiles : b2cFiles, category)
  if (real.length) return real
  const label = category === 'lead' ? 'Lead Generation Dashboard' : 'B2C / D2C Sales Dashboard'
  return [1, 2, 3].map((n) => placeholder(category, n, label))
}

/** Screenshot for a case study card, by case-study id (see header comment). */
export function getCaseShot(caseId: string): string | null {
  const key = Object.keys(caseFiles).find((p) => fileName(p).replace(/\.[^.]+$/, '') === caseId)
  return key ? caseFiles[key] : null
}

export const dashboardTabs: { id: DashboardCategory; label: string; blurb: string }[] = [
  { id: 'lead', label: 'Lead Generation Dashboard', blurb: 'Lead volume, CPL and funnel performance' },
  { id: 'b2c', label: 'B2C / D2C Sales Dashboard', blurb: 'Sales, ROAS and customer acquisition' },
]
