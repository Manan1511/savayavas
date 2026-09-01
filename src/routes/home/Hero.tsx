import { Eyebrow } from '@/components/Eyebrow'
import { Figure } from '@/components/Figure'
import { Section, Container } from '@/components/Section'
import { ThreadAnchor, ThreadLettering } from '@/thread'
import { heroScriptLettering } from '@/content/heroLettering'
import { useViewportWidth, clamp } from '@/lib/motion'
import { home } from '@/content/home.en'

/**
 * The hero collage.
 *
 * Photography sits in a grid behind the type rather than as one flat image, so
 * the thread can pass between layers and each piece can carry its own depth.
 * The lockup is one <h1> — script lead-in, all-caps anchor — because it reads
 * as a single sentence and should be announced as one.
 */
export function Hero() {
  const vw = useViewportWidth()
  // ~4% of viewport width, held between a readable minimum and a tasteful
  // maximum. Falls back to the mid value before the first client measurement so
  // the prerendered markup is never width-dependent.
  const amp = vw === 0 ? 34 : clamp(vw * 0.04, 24, 80)

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

      <Container className="relative" >
        <div className="relative max-w-3xl py-16 sm:py-24">
          <Eyebrow>{home.hero.eyebrow}</Eyebrow>

          <h1 className="mt-5">
            {/* The script line is not text on the page — it is the thread.
                The needle arrives from the left, writes the phrase in its own
                stroke as a single-stroke centreline, and carries on out to
                the right. The words stay available to assistive tech and to
                search engines via the visually-hidden span below. */}
            <span className="sr-only">{home.hero.script}</span>

            <span className="relative block max-w-2xl">
              <ThreadLettering id="hero-script" order={2} source={heroScriptLettering} band="front" />
              {/* Lead-in from the page's left edge, and the tail that leaves to
                  the right once the word is written. Amplitude scales with
                  viewport width so the gesture reads the same on a phone and on
                  a wide desktop. Every node is numbered because the figure
                  rises as well as falls, and Y-sorting could only descend. */}
              {/* Lead-in from the page's left edge, and the tail that leaves to
                  the right after the word is written. Amplitude scales with
                  viewport width so the gesture reads the same on a phone and
                  on a wide desktop. */}
              <ThreadAnchor id="hero-in-1" order={0} side="left" offset={[-40, amp * 0.4]} band="front" />
              <ThreadAnchor id="hero-in-2" order={1} side={0.06} offset={[0, -amp * 0.5]} band="front" tension={1.4} />
              <ThreadAnchor id="hero-out-1" order={3} side={0.9} offset={[0, -amp * 0.6]} band="front" tension={1.4} />
              <ThreadAnchor id="hero-out-2" order={4} side="right" offset={[40, amp * 0.3]} band="behind" />
            </span>
            <span className="mt-2 block text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
              {home.hero.headline}
            </span>
          </h1>

          <div className="mt-8 h-px w-16 bg-brass" />

          <p className="mt-6 max-w-md text-xs uppercase leading-relaxed tracking-[0.14em] text-ink-soft sm:text-sm">
            {home.hero.subline}
          </p>
        </div>
      </Container>
    </Section>
  )
}
