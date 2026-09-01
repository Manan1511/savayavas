import { Link } from 'react-router-dom'
import { Eyebrow } from '@/components/Eyebrow'
import { Figure } from '@/components/Figure'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { home } from '@/content/home.en'

/**
 * The one place on the homepage where the consumer-facing shirting brand is
 * introduced. Deliberately a doorway, not a pitch — the pitch is /vas.
 */
export function VasCallout() {
  return (
    <Section tone="ink" className="py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <Eyebrow className="text-brass-soft">{home.vasCallout.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-6xl uppercase tracking-[0.08em] text-paper sm:text-7xl">
              {home.vasCallout.headline}
            </h2>
            <p className="u-prose mt-6 text-sm leading-relaxed text-paper/75">
              {home.vasCallout.body}
            </p>
            <Link
              to={home.vasCallout.cta.to}
              className="mt-8 inline-block border-b border-brass-soft pb-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass-soft hover:border-paper hover:text-paper"
            >
              {home.vasCallout.cta.label} &rarr;
            </Link>
          </Reveal>

          <Reveal>
            <Figure name="vas.fabric-stack" />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
