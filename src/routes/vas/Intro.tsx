import { Link } from 'react-router-dom'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { vas } from '@/content/vas.en'

/**
 * A single reaffirming paragraph, not a retelling. The etymology lives in
 * full on /our-story; a visitor arriving here from search or a shared link
 * only needs the root restated, plus a way to go read the rest.
 */
export function Intro() {
  return (
    <Section tone="ivory" className="py-16 sm:py-20">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <p className="u-prose mx-auto text-base leading-relaxed text-ink">{vas.intro.body}</p>
          <Link
            to={vas.intro.cta.to}
            className="mt-5 inline-block border-b border-brass pb-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass transition-colors duration-300 hover:border-ink hover:text-ink"
          >
            {vas.intro.cta.label} &rarr;
          </Link>
        </Reveal>
      </Container>
    </Section>
  )
}
