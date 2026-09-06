import { useState } from 'react'
import { Eyebrow } from '@/components/Eyebrow'
import { Figure } from '@/components/Figure'
import { Section, Container } from '@/components/Section'
import { Lightbox } from '@/components/Lightbox'
import { Reveal } from '@/motion'
import { ourStory } from '@/content/ourStory.en'

/**
 * A grid of posters, not the deck's 14 autoplaying videos.
 *
 * Fourteen simultaneous <video> elements would melt a mid-range phone and
 * blow the data budget of exactly the audience this brand needs to reach —
 * see docs/PLAN.md, "Video wall". A static grid costs a fraction of the
 * weight and keeps the designed look; each tile opens larger in the Lightbox
 * on click.
 */
export function TribeWall() {
  const { eyebrow, headline, intro, items } = ourStory.tribe
  const [openAt, setOpenAt] = useState<number | null>(null)

  return (
    <Section className="py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl uppercase leading-tight sm:text-4xl">{headline}</h2>
          <p className="u-prose mt-4 text-sm leading-relaxed">{intro}</p>
        </Reveal>

        <Reveal
          as="ul"
          stagger
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7"
        >
          {items.map((item, i) => (
            <li key={item.asset}>
              <button
                type="button"
                onClick={() => setOpenAt(i)}
                className="group relative block w-full overflow-hidden text-left"
                aria-label={`View: ${item.caption}`}
              >
                <Figure name={item.asset} className="w-full transition-transform duration-500 group-hover:scale-105" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-2.5 pb-2.5 pt-6"
                >
                  <span className="block text-[0.5625rem] uppercase leading-tight tracking-wide text-paper">
                    {item.caption}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </Reveal>
      </Container>

      {openAt !== null && (
        <Lightbox
          items={items}
          index={openAt}
          onClose={() => setOpenAt(null)}
          onNavigate={setOpenAt}
        />
      )}
    </Section>
  )
}
