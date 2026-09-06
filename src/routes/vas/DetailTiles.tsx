import { useState } from 'react'
import { Eyebrow } from '@/components/Eyebrow'
import { Figure } from '@/components/Figure'
import { Section, Container } from '@/components/Section'
import { Lightbox } from '@/components/Lightbox'
import { Reveal } from '@/motion'
import { vas as vasEn } from '@/content/vas.en'
import { vas as vasHi } from '@/content/vas.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'
import type { AssetKey } from '@/assets/registry'

/**
 * Five test tiles, reusing the Lightbox built for the Our Story Tribe wall
 * rather than a second bespoke modal. `Lightbox` takes `{asset, caption}`, so
 * the test title doubles as the caption here.
 */
export function DetailTiles() {
  const vas = useLocaleContent(vasEn, vasHi)
  const ui = useLocaleContent(uiEn, uiHi)
  const { eyebrow, headline, intro } = vas.detail
  /** See the equivalent comment in our-story/TribeWall.tsx: `asset` is an
      untranslated `AssetKey` identifier that `LocaleShape` widens to `string`
      along with the real copy fields, so it is cast back here. */
  const tiles = vas.detail.tiles as readonly { asset: AssetKey; title: string; body: string }[]
  const [openAt, setOpenAt] = useState<number | null>(null)
  const items = tiles.map((t) => ({ asset: t.asset, caption: t.title }))

  return (
    <Section tone="ivory" className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_2fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-4 text-2xl leading-snug sm:text-3xl">{headline}</h2>
            <p className="u-prose mt-4 text-sm leading-relaxed">{intro}</p>
          </Reveal>

          <Reveal as="ul" stagger className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {tiles.map((tile, i) => (
              <li key={tile.asset}>
                <button
                  type="button"
                  onClick={() => setOpenAt(i)}
                  className="group block w-full text-left"
                  aria-label={`${ui.common.view}: ${tile.title}`}
                >
                  <Figure
                    name={tile.asset}
                    rounded
                    className="w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <p className="mt-3 text-[0.6875rem] uppercase leading-snug tracking-(--tracking-eyebrow) text-ink">
                    {tile.title}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-ink-soft">{tile.body}</p>
                </button>
              </li>
            ))}
          </Reveal>
        </div>
      </Container>

      {openAt !== null && (
        <Lightbox items={items} index={openAt} onClose={() => setOpenAt(null)} onNavigate={setOpenAt} />
      )}
    </Section>
  )
}
