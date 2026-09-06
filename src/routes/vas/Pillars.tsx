import { Section, Container } from '@/components/Section'
import { IconPillar, pillarIconProps } from '@/components/IconPillar'
import { Reveal } from '@/motion'
import { vas } from '@/content/vas.en'

export function Pillars() {
  return (
    <Section className="pb-20 pt-12 sm:pb-28">
      <Container>
        <Reveal
          stagger
          className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-5 sm:gap-x-4"
        >
          {vas.pillars.map((pillar, i) => (
            <IconPillar key={pillar.title} icon={<PillarIcon index={i} />} title={pillar.title} body={pillar.body} />
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}

/** Raw material, testing, performance, sustainability, tailoring, in order. */
function PillarIcon({ index }: { index: number }) {
  const p = pillarIconProps

  switch (index) {
    case 0: // premium raw materials: a boll / raw fibre
      return (
        <svg {...p}>
          <circle cx="8" cy="9" r="3" />
          <circle cx="16" cy="9" r="3" />
          <circle cx="12" cy="15" r="3" />
        </svg>
      )
    case 1: // rigorous testing: a checked flask
      return (
        <svg {...p}>
          <path d="M9 3h6M10 3v6l-4.5 8a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9V3" />
          <path d="M8.5 15h7" />
        </svg>
      )
    case 2: // consistent performance: a steady gauge
      return (
        <svg {...p}>
          <path d="M4 15a8 8 0 0 1 16 0" />
          <path d="M12 15l4-5" />
          <circle cx="12" cy="15" r="1.2" fill="var(--color-brass)" stroke="none" />
        </svg>
      )
    case 3: // sustainable approach: a leaf
      return (
        <svg {...p}>
          <path d="M6 18c-1-6 2-12 12-13 1 9-4 13-12 13Z" />
          <path d="M6 18c2-4 5-7 9-9" />
        </svg>
      )
    default: // tailored excellence: shears
      return (
        <svg {...p}>
          <circle cx="7" cy="18" r="2.4" />
          <circle cx="17" cy="18" r="2.4" />
          <path d="M8.6 16.2 17 4M15.4 16.2 7 4" />
        </svg>
      )
  }
}
