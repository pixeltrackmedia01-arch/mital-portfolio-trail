const words = [
  'Meta Ads', 'Google Ads', 'D2C Growth', 'ROAS', 'Full-Funnel', 'Lead Generation',
  'CAC & CPL', 'Shopify', 'GA4', 'Creative Testing', 'Retargeting', 'Omnichannel',
]

export function Marquee() {
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {words.map((w) => (
        <li key={w} className="flex items-center">
          <span className="px-6 font-display text-2xl font-bold tracking-tight text-paper/70 sm:text-3xl">{w}</span>
          <span className="h-2 w-2 rotate-45 bg-accent" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className="relative overflow-hidden border-y border-line bg-surface py-5" role="presentation">
      <div className="marquee-track flex">
        {row}
        {row}
      </div>
    </div>
  )
}
