import { Eyebrow } from '@/components/Eyebrow'
import { Figure } from '@/components/Figure'
import { Section, Container } from '@/components/Section'
import { WeaveReveal } from '@/motion'
import { home } from '@/content/home.en'

/**
 * The hero.
 *
 * One gesture, drawn from the mill floor: the lockup is woven into place, warp
 * threads dressed onto the loom and weft passed through them.
 *
 * The photography deliberately does not animate. A travelling wipe across an
 * image reads as a slide transition, not as craft — and restraint around
 * photography is most of what separates a premium site from a busy one.
 */
export function Hero() {
  return (
    <Section className="overflow-hidden pb-20 pt-10 sm:pb-28">
      {/* Collage. Decorative, so it is hidden from assistive tech entirely. */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 'var(--z-content)' }}>
        <div className="mx-auto grid h-full max-w-[1600px] grid-cols-12 gap-3 px-3 opacity-70 sm:opacity-100">
          <div className="col-span-3 hidden self-start pt-4 lg:block">
            <Figure name="hero.yarn-cone" className="w-32" />
          </div>
          <div className="col-span-3 hidden self-center lg:block">
            <Figure name="hero.denim-drape" />
          </div>
          <div className="col-span-6 lg:col-span-2" />
          <div className="col-span-3 hidden self-start lg:block">
            <Figure name="hero.model-jacket" className="w-full" />
          </div>
          <div className="col-span-1 hidden self-end pb-10 lg:block">
            <Figure name="hero.dark-ribs" />
          </div>
        </div>
      </div>

      <Container className="relative">
        <WeaveReveal className="max-w-3xl py-16 sm:py-24" warp={16} weft={10}>
          <Eyebrow>{home.hero.eyebrow}</Eyebrow>

          <h1 className="mt-5">
            <span className="block font-(family-name:--font-script) text-5xl leading-[1.15] tracking-normal text-brass sm:text-6xl lg:text-7xl">
              {home.hero.script}
            </span>
            <span className="mt-2 block text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
              {home.hero.headline}
            </span>
          </h1>

          <div className="mt-8 h-px w-16 bg-brass" />

          <p className="mt-6 max-w-md text-xs uppercase leading-relaxed tracking-[0.14em] text-ink-soft sm:text-sm">
            {home.hero.subline}
          </p>
        </WeaveReveal>
      </Container>
    </Section>
  )
}
