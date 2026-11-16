/**
 * Portfolio content. Source of truth: Mital's resume.
 * No metric on the site is invented — edit here to change any copy.
 */

export interface Metric {
  id: string
  value: number
  value2?: number // for ranges like 20–30%
  decimals?: number
  prefix?: string
  suffix: string
  label: string
  description: string
}

export const metrics: Metric[] = [
  {
    id: 'years',
    value: 5,
    suffix: '+',
    label: 'Years',
    description: 'Performance marketing experience across lead generation and D2C eCommerce.',
  },
  {
    id: 'budget',
    value: 50,
    prefix: '₹',
    suffix: 'L',
    label: 'Monthly ad budget',
    description: 'Highest monthly advertising budget managed across Meta Ads and Google Ads.',
  },
  {
    id: 'roas',
    value: 10,
    suffix: 'X',
    label: 'Highest ROAS',
    description: 'Peak ROAS achieved in D2C brand campaigns through restructuring and creative optimization.',
  },
  {
    id: 'cac',
    value: 20,
    value2: 30,
    suffix: '%',
    label: 'CAC / CPL reduction',
    description: 'Lower acquisition costs through funnel and audience optimization.',
  },
  {
    id: 'ctr',
    value: 1.5,
    decimals: 1,
    suffix: 'X',
    label: 'CTR improvement',
    description: 'Up to 1.5X higher CTR from structured creative, messaging and audience A/B tests.',
  },
]

export const heroHighlights = [
  { icon: 'clock', text: '5+ Years of Experience' },
  { icon: 'megaphone', text: 'Meta Ads & Google Ads' },
  { icon: 'bag', text: 'D2C & eCommerce Growth' },
  { icon: 'wallet', text: 'Campaign Budgets up to ₹50L/Month' },
] as const

export const aboutExpertise = [
  'Performance Marketing',
  'Customer Acquisition',
  'D2C Growth',
  'eCommerce Advertising',
  'Campaign Analytics',
  'Conversion Optimization',
  'Omnichannel Marketing',
]

export const approach = [
  { title: 'Data-driven decisions', text: 'ROAS, CAC, CPL and conversion rate decide where the next rupee goes.' },
  { title: 'Full-funnel planning', text: 'TOF, MOF and BOF built to work together — not as separate campaigns.' },
  { title: 'Creative testing', text: 'Structured A/B tests on creatives, messaging, audiences and offers.' },
  { title: 'Budget allocation & scaling', text: 'Shift budget towards what wins; scale with control.' },
  { title: 'Conversion & revenue focus', text: 'Shopify, landing pages and checkout analysed alongside the ads.' },
  { title: 'Cross-functional collaboration', text: 'Design, merchandising, UX, web, SEO and CRM aligned on one goal.' },
]

export const funnelStages = [
  { label: 'Impressions', note: 'Reach the right audience' },
  { label: 'Clicks', note: 'Earn attention with creative' },
  { label: 'Leads / Add to Cart', note: 'Turn interest into intent' },
  { label: 'Conversions', note: 'Remove friction at checkout' },
  { label: 'Revenue', note: 'Scale what pays back' },
]

export const campaignCards = {
  lead: {
    kicker: '01 — Lead Generation',
    title: 'Lead Generation Campaigns',
    description:
      'Explore my lead generation campaigns across different industries, including campaign strategies, audience targeting, lead acquisition, funnel optimization and actual performance dashboards.',
    tags: [
      'Lead Generation',
      'Meta Lead Ads',
      'Google Search Campaigns',
      'WhatsApp Lead Generation',
      'CPL Optimization',
      'Audience Research',
      'Campaign Performance Analysis',
    ],
    cta: 'Explore Lead Generation Work',
    fileLabel: 'Lead Generation Portfolio · PDF',
  },
  b2c: {
    kicker: '02 — B2C / D2C Sales',
    title: 'B2C & D2C Growth Campaigns',
    description:
      'Explore my eCommerce and consumer brand campaigns focused on customer acquisition, online sales, ROAS optimization, revenue growth and omnichannel marketing.',
    tags: [
      'D2C eCommerce',
      'Meta Sales Campaigns',
      'Google Shopping & Search Ads',
      'Customer Acquisition',
      'ROAS Optimization',
      'Retargeting',
      'Online & Offline Sales Growth',
    ],
    cta: 'Explore B2C / D2C Work',
    fileLabel: 'B2C / D2C Portfolio · PDF',
  },
}

export interface CaseStudy {
  id: string
  brand: string
  role: string
  period: string
  objective: string
  kind: 'd2c' | 'lead'
  /** Real, resume-sourced numbers only. */
  stats: { label: string; value: string; sub?: string }[]
  roasShift?: { from: number; to: number }
  strategy: string[]
  contribution: string
  tags: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'greenfibre',
    brand: 'Greenfibre',
    role: 'Performance Marketing Executive · JadeBlue Lifestyle India Ltd.',
    period: 'May 2026 – Present',
    objective: 'D2C eCommerce growth for a fashion brand across Meta Ads and Google Ads.',
    kind: 'd2c',
    stats: [{ label: 'ROAS', value: '3X → 4.5X' }],
    roasShift: { from: 3, to: 4.5 },
    strategy: [
      'Structured campaign optimization',
      'Creative experimentation',
      'Audience testing',
      'Coordination with WhatsApp marketing',
    ],
    contribution:
      'I manage end-to-end performance marketing for the brand — planning, launching, testing and optimising campaigns on Meta and Google.',
    tags: ['Meta Ads', 'Google Ads', 'D2C', 'WhatsApp'],
  },
  {
    id: 'jadeblue',
    brand: 'JadeBlue',
    role: 'Performance Marketing Executive · JadeBlue Lifestyle India Ltd.',
    period: 'May 2026 – Present',
    objective: 'D2C eCommerce growth and customer acquisition for a fashion brand.',
    kind: 'd2c',
    stats: [{ label: 'ROAS', value: '4X → 6X' }],
    roasShift: { from: 4, to: 6 },
    strategy: [
      'Performance optimization',
      'Customer acquisition',
      'Omnichannel strategy: online revenue, store visits & retail footfall',
      'Budget allocation and campaign scaling',
    ],
    contribution:
      'I own channel allocation and budget decisions from ROAS, CAC, CPA and AOV, and lead a two-member team on execution and reporting.',
    tags: ['Meta Ads', 'Google Ads', 'Omnichannel', 'Scaling'],
  },
  {
    id: 'house-of-panchhi',
    brand: 'House of Panchhi',
    role: 'Digital Marketing Executive (Performance Marketing Lead)',
    period: 'Sep 2023 – Apr 2026 · Surat',
    objective: 'Customer acquisition, eCommerce sales and retargeting for a D2C fashion brand.',
    kind: 'd2c',
    stats: [
      { label: 'Peak ROAS', value: 'Up to 10X' },
      { label: 'Monthly ad budget', value: 'Up to ₹10L' },
    ],
    strategy: [
      'Full-funnel advertising',
      'Creative A/B testing',
      'Audience segmentation & retargeting',
      'Shopify, landing page and checkout optimization',
    ],
    contribution:
      'I led strategy and execution end to end, directed a three-member team (two graphic designers, one reporting analyst) and owned budget allocation against revenue and ROAS targets.',
    tags: ['Meta Ads', 'Google Ads', 'Shopify', 'Team lead'],
  },
  {
    id: 'diamond-icq',
    brand: 'Diamond ICQ',
    role: 'Social Media & Ads Assistant → Digital Marketing Executive',
    period: 'Jul 2021 – Sep 2023 · Surat',
    objective: 'Lead generation for the Hong Kong market via Meta, Google Search and WhatsApp.',
    kind: 'lead',
    stats: [{ label: 'Market', value: 'Hong Kong' }],
    strategy: [
      'Meta Ads lead generation targeting Hong Kong',
      'Google Search advertising',
      'WhatsApp lead generation',
      'Audience targeting, remarketing and lead funnel drop-off analysis',
    ],
    contribution:
      'I progressed from supporting reporting and social posting to running campaigns — monitoring CTR, CPC, CPL, LPV and conversion rates and recommending optimisations.',
    tags: ['Meta Ads', 'Google Search', 'WhatsApp', 'Lead gen'],
  },
]

export const processSteps = [
  {
    n: '01',
    title: 'Research',
    short: 'Understand the business, audience, competitors and customer behaviour.',
    points: [
      'Business goals, margins and best-selling products',
      'Audience segments and buying behaviour',
      'Competitor creatives and positioning',
      'Existing GA4, Shopify and ad-account data',
    ],
  },
  {
    n: '02',
    title: 'Strategy',
    short: 'Build the right campaign structure, audience segments and marketing funnel.',
    points: [
      'Full-funnel plan across TOF, MOF and BOF',
      'Campaign and audience architecture',
      'Budget split and channel allocation',
      'KPIs and tracking plan agreed up front',
    ],
  },
  {
    n: '03',
    title: 'Execution',
    short: 'Launch campaigns across Meta Ads and Google Ads.',
    points: [
      'Meta sales / lead campaigns and Google Search, Shopping, PMax',
      'Tracking set up with Pixel, CAPI, GTM and UTMs',
      'Creative briefs aligned with the design team',
      'Clean launch with naming and reporting in place',
    ],
  },
  {
    n: '04',
    title: 'Experimentation',
    short: 'Test creatives, messaging, audiences, placements and offers.',
    points: [
      'One variable at a time wherever possible',
      'Creative, copy, format and hook testing',
      'Audience and lookalike tests',
      'Landing page and offer experiments',
    ],
  },
  {
    n: '05',
    title: 'Analysis',
    short: 'Monitor ROAS, CAC, CPL, CTR, CPC, CPA and conversion rates.',
    points: [
      'Weekly and monthly reporting in GA4 & Looker Studio',
      'Cross-check platform data with Shopify Analytics',
      'Spot fatigue, drop-offs and wasted spend',
      'Turn findings into clear next actions',
    ],
  },
  {
    n: '06',
    title: 'Optimization & Scaling',
    short: 'Improve performance and allocate budgets towards winning strategies.',
    points: [
      'Shift budget to proven campaigns and audiences',
      'Scale in controlled steps while watching efficiency',
      'Refresh creative before fatigue sets in',
      'Feed learnings back into research',
    ],
  },
]

export const insights = [
  {
    id: 'roas',
    label: 'Low ROAS',
    summary: 'Revenue is not covering ad spend. I work from the top of the funnel down to tracking.',
    checks: [
      ['Campaign structure', 'Overlap, budget spread and prospecting vs. retargeting balance.'],
      ['Audience quality', 'Who is actually buying — and who is just clicking.'],
      ['Creative performance', 'Hook strength, fatigue and message-to-offer fit.'],
      ['Landing pages', 'Product-page clarity, speed, price and trust signals.'],
      ['Conversion tracking', 'Pixel / CAPI health and GA4 vs. platform discrepancies.'],
    ],
  },
  {
    id: 'cpl',
    label: 'High CPL',
    summary: 'Leads cost too much. I look at lead quality as much as lead cost.',
    checks: [
      ['Targeting & audiences', 'Prune weak segments and test fresh interest or lookalike pools.'],
      ['Offer & creative', 'Is the value proposition clear in the first second?'],
      ['Form / landing friction', 'Fields, load time and message match.'],
      ['Lead quality', 'Qualified vs. unqualified leads — not just the cheapest ones.'],
      ['Follow-up speed', 'WhatsApp and call response time after the lead lands.'],
    ],
  },
  {
    id: 'ctr',
    label: 'Low CTR',
    summary: 'People see the ad but do not act. Usually a creative or relevance problem.',
    checks: [
      ['Hook & first seconds', 'What stops the scroll — and what doesn’t.'],
      ['Message–audience fit', 'Is this the right promise for this segment?'],
      ['Format & placement', 'Reels, static, carousel, Feed vs. Stories.'],
      ['Frequency & fatigue', 'Is the same audience seeing the same ad too often?'],
      ['CTA & offer clarity', 'A clear reason to click now.'],
    ],
  },
  {
    id: 'cvr',
    label: 'Poor Conversion Rate',
    summary: 'Traffic arrives but does not convert. I follow the visitor through the site.',
    checks: [
      ['Traffic quality', 'Is the right intent reaching the page?'],
      ['Landing page match', 'Ad promise vs. what the page delivers.'],
      ['Mobile experience', 'Speed, layout and tap targets on the device most shoppers use.'],
      ['Checkout funnel', 'Where visitors drop between cart, checkout and payment.'],
      ['Tracking accuracy', 'Make sure the drop is real, not a measurement gap.'],
    ],
  },
] as const

export interface ExperienceItem {
  id: string
  role: string
  company: string
  period: string
  location: string
  current?: boolean
  summary: string
  highlights: string[]
  details: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 'jadeblue',
    role: 'Performance Marketing Executive',
    company: 'JadeBlue Lifestyle India Ltd.',
    period: 'May 2026 – Present',
    location: 'Ahmedabad',
    current: true,
    summary: 'Performance marketing for two fashion brands, Greenfibre and JadeBlue.',
    highlights: [
      'Managing performance marketing for Greenfibre and JadeBlue',
      'Meta Ads and Google Ads',
      'D2C sales and customer acquisition',
      'ROAS improvement',
      'Budget allocation and campaign scaling',
      'Omnichannel marketing',
      'Leading a two-member performance marketing team',
    ],
    details: [
      'Manage end-to-end performance marketing strategies for two fashion brands, Greenfibre and JadeBlue, across Meta Ads and Google Ads.',
      'Drive ROAS improvement through structured campaign optimization, creative experimentation, audience testing and coordination with WhatsApp marketing. Improved Greenfibre ROAS from 3X to 4.5X and JadeBlue ROAS from 4X to 6X.',
      'Plan and execute D2C eCommerce campaigns focused on website traffic, customer acquisition, online sales and revenue growth, alongside brand awareness, reach, engagement and consideration campaigns.',
      'Develop omnichannel campaign strategies to support online revenue, offline store visits, retail footfall and overall brand growth.',
      'Manage advertising budgets, campaign scaling, audience segmentation and channel allocation based on ROAS, CAC, CPA, AOV and conversion performance.',
      'Analyze business performance across paid media, organic, influencer and offline retail channels to identify growth opportunities.',
      'Collaborate with merchandising, UI/UX, website development and SEO teams; align email, WhatsApp and SMS marketing with paid campaigns.',
      'Monitor Shopify Analytics, GA4, Meta Pixel and CAPI to evaluate performance, tracking accuracy and conversion attribution.',
      'Lead a two-member performance marketing team comprising a Campaign Executive and Reporting Analyst.',
    ],
  },
  {
    id: 'panchhi',
    role: 'Digital Marketing Executive (Performance Marketing Lead)',
    company: 'House of Panchhi',
    period: 'September 2023 – April 2026',
    location: 'Surat',
    summary: 'Led performance marketing for a D2C fashion brand.',
    highlights: [
      'Up to 10X ROAS',
      'Monthly budgets up to ₹10 lakh',
      'Full-funnel advertising',
      'A/B testing and creative strategy',
      'Led a three-member team',
      'Shopify and conversion optimization',
    ],
    details: [
      'Led end-to-end performance marketing strategy and execution for a D2C fashion brand across Meta Ads and Google Ads, focusing on customer acquisition, eCommerce sales and retargeting.',
      'Achieved up to 10X ROAS through structured full-funnel campaigns, creative A/B testing, audience segmentation and continuous campaign optimization.',
      'Managed monthly advertising budgets of up to ₹10 lakh, optimizing budget allocation, audience targeting and campaign performance to achieve revenue and ROAS targets.',
      'Planned and executed full-funnel campaigns, including creative strategy, audience segmentation, retargeting and customer re-engagement.',
      'Developed A/B testing strategies across ad creatives, formats, messaging and audiences to improve CTR, conversion rates and campaign efficiency.',
      'Led a three-member team of two graphic designers and one reporting analyst, managing creative direction, task allocation and reporting.',
      'Coordinated with merchandising, UX, website development and customer care teams; managed influencer marketing and end-to-end brand and product photoshoots.',
      'Optimized the Shopify store, landing pages and checkout funnel; supervised weekly and monthly reporting through GA4, Looker Studio, Shopify Analytics and Google Search Console.',
    ],
  },
  {
    id: 'diamond',
    role: 'Social Media & Ads Assistant → Digital Marketing Executive',
    company: 'Diamond ICQ',
    period: 'July 2021 – September 2023',
    location: 'Surat',
    summary: 'Grew from social media and ads support into running paid lead generation.',
    highlights: [
      'Meta Ads lead generation',
      'Google Search campaigns',
      'Hong Kong market campaigns',
      'WhatsApp lead generation',
      'Campaign analysis and reporting',
      'Social media management',
    ],
    details: [
      'Progressed from Social Media & Ads Assistant to Digital Marketing Executive, handling paid advertising, WhatsApp lead generation and digital marketing activities.',
      'Managed Meta Ads lead-generation campaigns targeting the Hong Kong market and Google Ads Search campaigns to generate relevant traffic and qualified leads.',
      'Planned and executed WhatsApp lead-generation campaigns, driving potential customers to WhatsApp for business inquiries and lead conversion.',
      'Managed campaign planning, audience targeting, budget allocation, remarketing and segmentation to improve lead generation performance.',
      'Monitored CTR, CPC, CPL, Landing Page Views (LPV) and conversion rates; analysed lead funnel drop-offs and recommended optimizations.',
      'Prepared performance reports using Meta Ads Manager, Google Ads Dashboard, GA4 and Google Search Console.',
      'Coordinated with the graphic design team on ad creatives; managed social media scheduling and website product updates.',
    ],
  },
]

export const education = {
  degree: 'Bachelor of Business Administration (BBA)',
  school: 'Veer Narmad South Gujarat University (VNSGU)',
  year: '2019',
  languages: ['English', 'Hindi', 'Gujarati'],
}

export interface SkillGroup {
  id: string
  title: string
  icon: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'perf',
    title: 'Performance Marketing',
    icon: 'target',
    items: [
      'Performance Strategy',
      'Full-Funnel Marketing',
      'Media Planning',
      'Budget Allocation',
      'Campaign Scaling',
      'Performance Forecasting',
    ],
  },
  {
    id: 'paid',
    title: 'Paid Advertising',
    icon: 'megaphone',
    items: [
      'Meta Ads',
      'Google Search Ads',
      'Display Ads',
      'YouTube Ads',
      'Performance Max',
      'Shopping Ads',
      'Demand Gen',
      'Retargeting',
      'Lookalike Audiences',
    ],
  },
  {
    id: 'growth',
    title: 'Growth & Conversion',
    icon: 'trend',
    items: [
      'D2C Marketing',
      'eCommerce Growth',
      'Customer Acquisition',
      'ROAS Optimization',
      'CAC Reduction',
      'Conversion Rate Optimization',
      'Shopify Optimization',
      'Landing Page Optimization',
      'Checkout Funnel Optimization',
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics & Tracking',
    icon: 'chart',
    items: [
      'GA4',
      'Google Tag Manager',
      'Meta Pixel',
      'Meta Events Manager',
      'Conversions API',
      'Looker Studio',
      'Shopify Analytics',
      'Google Search Console',
      'UTM Tracking',
    ],
  },
  {
    id: 'metrics',
    title: 'Metrics I Track',
    icon: 'gauge',
    items: ['ROAS', 'MER', 'CAC', 'CPL', 'CPA', 'CTR', 'CPC', 'CPM', 'AOV', 'LTV', 'Conversion Rate'],
  },
  {
    id: 'creative',
    title: 'Creative & Experimentation',
    icon: 'palette',
    items: [
      'A/B Testing',
      'Creative Strategy',
      'Creative Briefing',
      'Ad Copywriting',
      'Audience Testing',
      'Canva',
      'Photoshop',
      'Premiere Pro',
      'After Effects',
    ],
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    icon: 'bot',
    items: ['ChatGPT', 'Claude', 'Gemini', 'Pabbly Connect', 'AI-Assisted Research', 'Ad Copy & Reporting Workflows'],
  },
  {
    id: 'exposure',
    title: 'Additional Exposure',
    icon: 'compass',
    items: ['SEO', 'Email Marketing', 'WhatsApp Marketing', 'SMS Marketing', 'Influencer Marketing', 'Lifecycle Marketing'],
  },
]

export const teams = [
  {
    company: 'JadeBlue Lifestyle India',
    size: 2,
    title: 'Two-member performance marketing team',
    members: ['Campaign Executive', 'Reporting Analyst'],
  },
  {
    company: 'House of Panchhi',
    size: 3,
    title: 'Three-member team',
    members: ['Graphic Designer', 'Graphic Designer', 'Reporting Analyst'],
  },
]

export const collaborators = [
  'Designers',
  'Reporting analysts',
  'Merchandising',
  'UI / UX',
  'Website development',
  'SEO',
  'Customer care',
]

export const curiousChips = [
  'How businesses actually grow',
  'Marketing experiments',
  'AI tools: ChatGPT, Claude, Gemini',
  'Smarter ways to lift performance',
]
