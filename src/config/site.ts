/**
 * ─────────────────────────────────────────────────────────────
 *  CENTRAL SITE CONFIGURATION
 *  Everything you are likely to change lives in /src/config.
 * ─────────────────────────────────────────────────────────────
 *
 *  PDF portfolios — drop your files into /public/assets/ and either keep
 *  these paths or change them here. Nothing else in the code needs editing.
 *    /public/assets/lead-generation-portfolio.pdf
 *    /public/assets/b2c-d2c-portfolio.pdf
 *    /public/assets/resume.pdf               (already included)
 *
 *  Each PDF opens in its own browser tab (never merged, never auto-downloaded).
 */
export const LEAD_GENERATION_PDF = '/assets/lead-generation-portfolio.pdf'
export const B2C_PORTFOLIO_PDF = '/assets/b2c-d2c-portfolio.pdf'
export const RESUME_PDF = '/assets/resume.pdf'

export const person = {
  name: 'Mital Chikhaliya',
  firstName: 'Mital',
  title: 'Performance Marketing Specialist',
  tagline: 'Turning Data Into Performance. Performance Into Growth.',
  intro:
    'I help businesses scale through data-driven advertising, full-funnel strategies, campaign optimization and performance-focused marketing.',
  email: 'mitalchikhaliya01@gmail.com',
  phone: '+91 8141482284',
  phoneHref: 'tel:+918141482284',
  location: 'Ahmedabad, India',
  /** Taken from the hyperlinks embedded in the resume PDF. */
  linkedin: 'https://www.linkedin.com/in/mital-chikhaliya-612428220/',
  liveSite: 'https://mital-chikhaliya-portfolio-ptm8.vercel.app/',
  resumeFileName: 'Mital-Chikhaliya-Resume.pdf',
  /** Shown in the hero status pill — edit freely (e.g. 'Open to new opportunities'). */
  availability: 'Available to connect & collaborate',
} as const

export const assets = {
  /** Illustrated character layers (generated from the supplied reference art). */
  character: {
    rest: '/assets/character/rest.webp',
    waveBody: '/assets/character/wave-body.webp',
    waveHand: '/assets/character/wave-hand.webp',
    curious: '/assets/character/curious.webp',
  },
  /**
   * Optional real photograph. Put a file in /public/assets/ and set the path,
   * e.g. '/assets/mital.jpg'. It then appears as a small inset in the
   * "Curious Mind" section. Leave null to hide it.
   */
  personalPhoto: null as string | null,
}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const
