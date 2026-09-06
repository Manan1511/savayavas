import { Eyebrow } from '@/components/Eyebrow'
import { Figure } from '@/components/Figure'
import { Section } from '@/components/Section'
import { TornEdge } from '@/components/TornEdge'
import { Reveal } from '@/motion'
import { vas as vasEn } from '@/content/vas.en'
import { vas as vasHi } from '@/content/vas.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'

/**
 * Deliberately not the WeaveReveal treatment. The weave is Home's signature
 * gesture, and docs/PLAN.md §5 is explicit that it stays there so it keeps
 * meaning something. Every other page, including this one, uses the plain
 * Reveal entrance.
 *
 * Structurally lighter than Home's collage: VAS only has one hero asset
 * (fabric-stack) rather than a set of pieces, so the torn band frames a single
 * large image beside the lockup instead of scattering several around it.
 */
export function Hero() {
  const vas = useLocaleContent(vasEn, vasHi)
  return (
    <Section className="relative overflow-hidden bg-paper">
      <div
        aria-hidden
        className="absolute inset-x-0 top-[10%] bottom-[10%] bg-ivory"
      >
        <TornEdge position="top" />
        <TornEdge position="bottom" />
      </div>

      <div className="relative mx-auto grid max-w-(--container-content) items-center gap-12 px-(--spacing-gutter) py-28 sm:py-36 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-44">
        <Reveal>
          <Eyebrow>{vas.hero.eyebrow}</Eyebrow>
          <h1 className="mt-5">
            <span className="block u-script text-4xl leading-[1.15] text-brass sm:text-5xl lg:text-6xl">
              {vas.hero.script}
            </span>
            <span className="mt-1 block text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
              {vas.hero.headline}
            </span>
          </h1>
          <div className="mt-8 h-px w-14 bg-brass" />
          <p className="mt-6 max-w-sm text-xs uppercase leading-relaxed tracking-[0.14em] text-ink-soft">
            {vas.hero.subline}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <Figure name="vas.fabric-stack" className="w-full" priority />
        </Reveal>
      </div>
    </Section>
  )
}
