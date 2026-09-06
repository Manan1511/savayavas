import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { forDealers as forDealersEn } from '@/content/forDealers.en'
import { forDealers as forDealersHi } from '@/content/forDealers.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'

/**
 * A quiet header, like Our Story: this is the highest-intent page on the
 * site, and its job is to get a qualified visitor to the form below, not to
 * sell the brand from scratch.
 */
export function Hero() {
  const forDealers = useLocaleContent(forDealersEn, forDealersHi)
  const ui = useLocaleContent(uiEn, uiHi)
  const { eyebrow, headline, body } = forDealers.hero

  return (
    <Section tone="ivory" className="pb-16 pt-32 sm:pb-20 sm:pt-40">
      <Container className="max-w-2xl">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl uppercase leading-[1.05] sm:text-5xl lg:text-6xl">{headline}</h1>
          <p className="u-prose mt-6 text-sm leading-relaxed">{body}</p>
          <a
            href="#enquire"
            className="mt-7 inline-block border-b border-brass pb-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass transition-colors duration-300 hover:border-ink hover:text-ink"
          >
            {ui.common.getStarted} &rarr;
          </a>
        </Reveal>
      </Container>
    </Section>
  )
}
