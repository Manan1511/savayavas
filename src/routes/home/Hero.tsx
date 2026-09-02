import { Eyebrow } from '@/components/Eyebrow'
import { Figure } from '@/components/Figure'
import { Section } from '@/components/Section'
import { TornEdge } from '@/components/TornEdge'
import { WeaveReveal } from '@/motion'
import { home } from '@/content/home.en'
import type { AssetKey } from '@/assets/registry'

/**
 * A torn-paper collage, as on the concept boards.
 *
 * A deckle-edged band runs across the viewport; photography sits at varied
 * sizes and depths along it, some bleeding off the edges; a couple of cutouts
 * float above the paper on their own shadows. The lockup holds the centre,
 * with the collage kept out of the middle column so the type is never fighting
 * an image behind it.
 *
 * Positions are percentages of the band, not fixed pixels, so the arrangement
 * scales rather than reflowing into a grid at every breakpoint.
 */

interface Piece {
  name: AssetKey
  /** Position and size within the band. */
  className: string
  /** Cutout objects sit on the paper and cast a shadow; photographs do not. */
  floats?: boolean
}

/** Left of the lockup. */
const LEFT: Piece[] = [
  { name: 'hero.yarn-cone', className: 'left-[1%] top-[-6%] w-[7rem] rotate-[-8deg] xl:w-[9rem]', floats: true },
  { name: 'hero.denim-drape', className: 'left-[6%] top-[26%] w-[13rem] xl:w-[16rem]' },
  { name: 'hero.shirts-rail', className: 'left-[-3%] bottom-[-8%] w-[15rem] xl:w-[19rem]' },
]

/** Right of the lockup. */
const RIGHT: Piece[] = [
  { name: 'hero.model-jacket', className: 'right-[5%] top-[-8%] w-[11rem] xl:w-[14rem]' },
  { name: 'hero.folded-stack', className: 'right-[1%] top-[22%] w-[12rem] xl:w-[15rem]' },
  { name: 'hero.dark-ribs', className: 'right-[8%] bottom-[-6%] w-[9rem] xl:w-[11rem]' },
  { name: 'hero.swatch-book', className: 'right-[-2%] bottom-[14%] w-[10rem] rotate-[5deg] xl:w-[13rem]', floats: true },
]

export function Hero() {
  return (
    <Section className="relative overflow-hidden bg-paper">
      <div className="relative mx-auto flex min-h-[78vh] max-w-[1700px] items-center justify-center px-(--spacing-gutter) py-24 sm:min-h-[86vh]">
        {/* The torn sheet the whole collage sits on. */}
        <div
          aria-hidden
          className="absolute inset-x-[-4%] top-[8%] bottom-[8%] bg-ivory"
          style={{ zIndex: 'var(--z-base)' }}
        >
          <TornEdge position="top" />
          <TornEdge position="bottom" />
        </div>

        {/* Photography. Decorative and hidden from assistive tech: the page's
            meaning is entirely in the lockup.

            Held back until xl, not lg: at 1024 the centre column leaves about
            170px a side, and the pieces are 200-300px wide, so five of seven
            of them landed on the type. Below xl the simpler treatment runs. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[10%] bottom-[10%] hidden xl:block"
          style={{ zIndex: 'var(--z-content)' }}
        >
          {[...LEFT, ...RIGHT].map((piece) => (
            <div
              key={piece.name}
              className={`absolute ${piece.className} ${
                piece.floats ? 'drop-shadow-[0_18px_28px_rgba(20,20,20,0.22)]' : ''
              }`}
            >
              <Figure name={piece.name} priority />
            </div>
          ))}
        </div>

        {/* The lockup owns the centre column, so nothing sits behind the type. */}
        <WeaveReveal className="relative w-full max-w-2xl text-center" warp={18} weft={11}>
          <div style={{ zIndex: 'var(--z-text)' }} className="relative">
            <Eyebrow>{home.hero.eyebrow}</Eyebrow>

            <h1 className="mt-6">
              <span className="block font-(family-name:--font-script) text-4xl leading-[1.15] tracking-normal text-brass sm:text-5xl lg:text-6xl">
                {home.hero.script}
              </span>
              <span className="mt-1 block text-[2.75rem] uppercase leading-[0.92] sm:text-6xl lg:text-7xl xl:text-8xl">
                {home.hero.headline}
              </span>
            </h1>

            <div className="mx-auto mt-8 h-px w-14 bg-brass" />

            <p className="mx-auto mt-6 max-w-md text-[0.6875rem] uppercase leading-relaxed tracking-[0.16em] text-ink-soft sm:text-xs">
              {home.hero.subline}
            </p>
          </div>
        </WeaveReveal>

        {/* Below xl the collage would crowd the type, so a single strip of
            fabric sits under the lockup instead of around it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-3 opacity-90 xl:hidden"
          style={{ zIndex: 'var(--z-content)' }}
        >
          <div className="w-28 translate-y-6 -rotate-3">
            <Figure name="hero.denim-drape" priority />
          </div>
          <div className="w-28 translate-y-10 rotate-2">
            <Figure name="hero.folded-stack" priority />
          </div>
        </div>
      </div>
    </Section>
  )
}
