import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { vas as vasEn } from '@/content/vas.en'
import { vas as vasHi } from '@/content/vas.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { pillarIconProps } from '@/components/IconPillar'

/**
 * Five test tiles. Previously rendered as enlargeable photos, but no
 * photography of the actual tests exists (or ever will, without a real lab
 * shoot) — a flat placeholder colour block standing in for a photo reads as
 * a photo that failed to load, and it doesn't literally exist as a photo
 * to be true. Line icons, matching the pillar icons used elsewhere on this
 * page, are honest about being a symbol rather than a photograph and give
 * each test its own quick visual anchor.
 */
export function DetailTiles() {
  const vas = useLocaleContent(vasEn, vasHi)
  const { eyebrow, headline, intro } = vas.detail
  const tiles = vas.detail.tiles as readonly { title: string; body: string }[]

  return (
    <Section tone="ivory" className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_2fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-4 text-2xl leading-snug sm:text-3xl">{headline}</h2>
            <p className="u-prose mt-4 text-sm leading-relaxed">{intro}</p>
          </Reveal>

          <Reveal as="ul" stagger className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {tiles.map((tile, i) => (
              <li key={tile.title}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brass/45">
                  <TestIcon index={i} />
                </div>
                <p className="mt-3 text-[0.6875rem] uppercase leading-snug tracking-(--tracking-eyebrow) text-ink">
                  {tile.title}
                </p>
                <p className="mt-1 text-xs leading-snug text-ink-soft">{tile.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

/** Tensile strength, colour fastness, shrinkage control, pilling resistance, perfect finish, in order. */
function TestIcon({ index }: { index: number }) {
  const p = pillarIconProps

  switch (index) {
    case 0: // tensile strength: fabric under tension between two clamps
      return (
        <svg {...p}>
          <path d="M4 12h3M17 12h3" />
          <path d="M7 8v8M17 8v8" />
          <path d="M7 12h10" />
        </svg>
      )
    case 1: // colour fastness: a droplet that stays true (checkmark inside)
      return (
        <svg {...p}>
          <path d="M12 3c3.5 4.2 6 7.4 6 10.2a6 6 0 0 1-12 0C6 10.4 8.5 7.2 12 3Z" />
          <path d="M9.3 13.3l1.8 1.8 3.6-3.8" />
        </svg>
      )
    case 2: // shrinkage control: inward-facing corner brackets, holding size
      return (
        <svg {...p}>
          <path d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4" />
        </svg>
      )
    case 3: // pilling resistance: a smooth plane, magnified
      return (
        <svg {...p}>
          <circle cx="10" cy="10" r="6" />
          <path d="M14.3 14.3 20 20" />
          <path d="M7.5 10h5" />
        </svg>
      )
    default: // perfect finish: a sparkle
      return (
        <svg {...p}>
          <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
          <path d="M12 8.5 13.2 12 12 15.5 10.8 12Z" />
        </svg>
      )
  }
}
