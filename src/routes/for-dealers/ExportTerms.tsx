import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { forDealers as forDealersEn } from '@/content/forDealers.en'
import { forDealers as forDealersHi } from '@/content/forDealers.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'

/**
 * Stated as plain fact, not hedged like the rest of the page's numbers: this
 * policy was supplied directly rather than invented by the concept boards.
 */
export function ExportTerms() {
  const forDealers = useLocaleContent(forDealersEn, forDealersHi)
  const { eyebrow, headline, body } = forDealers.exportTerms

  return (
    <Section tone="ink" className="py-16 sm:py-20">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="text-brass-soft">{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-2xl leading-snug text-paper sm:text-3xl">{headline}</h2>
          <p className="u-prose mx-auto mt-4 text-sm leading-relaxed text-paper/80">{body}</p>
        </Reveal>
      </Container>
    </Section>
  )
}
