# Mital Chikhaliya — Performance Marketing Portfolio

Vite + React + TypeScript + Tailwind CSS v4 + GSAP (ScrollTrigger) + Lucide icons.
Fonts are self-hosted (Bricolage Grotesque, Inter, JetBrains Mono) — no external requests.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into /dist
npm run preview    # serve the production build
```

## Replace these (no code changes needed)

| What | Where |
| --- | --- |
| Lead Generation portfolio PDF | `public/assets/lead-generation-portfolio.pdf` |
| B2C / D2C portfolio PDF | `public/assets/b2c-d2c-portfolio.pdf` |
| Resume PDF (download + quick view) | `public/assets/resume.pdf` (your real resume is already included) |
| Lead-gen dashboard screenshots | drop `.png/.jpg/.webp` into `src/assets/dashboards/lead/` |
| B2C / D2C dashboard screenshots | drop images into `src/assets/dashboards/b2c/` |
| Case-study screenshots | `src/assets/dashboards/cases/` named `greenfibre`, `jadeblue`, `house-of-panchhi`, `diamond-icq` |
| Optional real photo | put a file in `public/assets/`, then set `assets.personalPhoto` in `src/config/site.ts` |

PDF paths are the constants `LEAD_GENERATION_PDF`, `B2C_PORTFOLIO_PDF` and `RESUME_PDF` at the top of
`src/config/site.ts`. Each campaign card opens **its own** PDF in a **new tab**; if the file is missing the
tab closes again and a message names the missing path.

Screenshots appear in filename order. To add a title, caption, or **blur client names / account IDs**, add an
entry to `DASHBOARD_META` in `src/config/dashboards.ts` (blur regions are percentages of the image).

## Content

* `src/config/site.ts` — name, contact details, LinkedIn, availability text, nav, asset paths
* `src/config/content.ts` — metrics, case studies, process, experience, skills, copy
* All facts come from the resume. No metric is invented; screenshots are never generated.

## Character

`public/assets/character/` holds transparent cut-outs made from the supplied illustrations
(`rest.webp`, `wave-body.webp`, `wave-hand.webp`, `curious.webp`). The hand is a separate layer so it really waves
(~2.4 s), then she settles to rest and only breathes. Click or press Enter on her to wave again.
`prefers-reduced-motion` shows the resting pose with no animation.
