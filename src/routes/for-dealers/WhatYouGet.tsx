import { Section, Container } from '@/components/Section'
import { Eyebrow } from '@/components/Eyebrow'
import { IconPillar, pillarIconProps } from '@/components/IconPillar'
import { Reveal } from '@/motion'
import { forDealers } from '@/content/forDealers.en'

export function WhatYouGet() {
  const { eyebrow, items } = forDealers.whatYouGet

  return (
    <Section tone="ivory" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <Eyebrow as="h2">{eyebrow}</Eyebrow>
        </Reveal>

        <Reveal stagger className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
          {items.map((item, i) => (
            <IconPillar key={item.title} icon={<GetIcon index={i} />} title={item.title} body={item.body} />
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}

/** Account support, pricing, priority scheduling, swatches, in order. */
function GetIcon({ index }: { index: number }) {
  const p = pillarIconProps

  switch (index) {
    case 0: // dedicated account support: a person
      return (
        <svg {...p}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" />
        </svg>
      )
    case 1: // volume pricing: a price tag
      return (
        <svg {...p}>
          <path d="M11 4h6a1 1 0 0 1 1 1v6l-9 9-7-7 9-9Z" />
          <circle cx="15" cy="8" r="1.1" fill="var(--color-brass)" stroke="none" />
        </svg>
      )
    case 2: // priority slots: a calendar with a mark
      return (
        <svg {...p}>
          <rect x="4" y="5" width="16" height="15" rx="1" />
          <path d="M4 9h16M8 3v4M16 3v4" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      )
    default: // swatch support: a stack of squares
      return (
        <svg {...p}>
          <rect x="5" y="5" width="10" height="10" rx="1" />
          <rect x="9" y="9" width="10" height="10" rx="1" />
        </svg>
      )
  }
}
