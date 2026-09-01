import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { home } from '@/content/home.en'

export function About() {
  return (
    <Section tone="ivory" className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="relative">
            <Eyebrow>{home.about.eyebrow}</Eyebrow>

            <h2 className="relative mt-5 text-4xl uppercase leading-[1.05] sm:text-5xl">
              {home.about.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <div className="mt-8 space-y-5 text-sm leading-relaxed">
              {home.about.body.map((p) => (
                <p key={p.slice(0, 24)} className="u-prose">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-x-6 gap-y-10 self-center sm:grid-cols-4 lg:gap-x-4">
            {home.pillars.items.map((pillar, i) => (
              <Pillar key={pillar.title} index={i} title={pillar.title} body={pillar.body} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

function Pillar({ index, title, body }: { index: number; title: string; body: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-brass/45">
        <PillarIcon index={index} />
      </div>
      <h3 className="mt-4 text-[0.6875rem] uppercase leading-snug tracking-(--tracking-eyebrow) text-ink">
        {title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-ink-soft">{body}</p>
    </div>
  )
}

/**
 * Four marks, drawn rather than sourced: a weave, a boll, shears, a folded
 * stack. Kept as inline SVG so they inherit colour and stay crisp — an icon
 * font or sprite would be heavier and blur at this size.
 */
function PillarIcon({ index }: { index: number }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'var(--color-brass)',
    strokeWidth: 1,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }

  switch (index) {
    case 0: // weave
      return (
        <svg {...common}>
          <path d="M4 8h16M4 12h16M4 16h16M8 4v16M12 4v16M16 4v16" />
        </svg>
      )
    case 1: // cotton boll
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="3.2" />
          <circle cx="8" cy="13" r="2.8" />
          <circle cx="16" cy="13" r="2.8" />
          <path d="M12 16v4" />
        </svg>
      )
    case 2: // shears
      return (
        <svg {...common}>
          <circle cx="7" cy="18" r="2.4" />
          <circle cx="17" cy="18" r="2.4" />
          <path d="M8.6 16.2 17 4M15.4 16.2 7 4" />
        </svg>
      )
    default: // folded stack
      return (
        <svg {...common}>
          <path d="M4 9.5 12 6l8 3.5-8 3.5-8-3.5Z" />
          <path d="M4 14.5 12 18l8-3.5" />
        </svg>
      )
  }
}
