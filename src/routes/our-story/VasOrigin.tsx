import { Link } from 'react-router-dom'
import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { ourStory as ourStoryEn } from '@/content/ourStory.en'
import { ourStory as ourStoryHi } from '@/content/ourStory.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { useLocale, localizePath } from '@/lib/i18n'

/** The hinge between the family history and the shirting brand it produced. */
export function VasOrigin() {
  const ourStory = useLocaleContent(ourStoryEn, ourStoryHi)
  const locale = useLocale()
  const { eyebrow, headline, body, cta } = ourStory.vasOrigin

  return (
    <Section tone="ivory" className="py-20 sm:py-24">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 u-script text-6xl text-brass sm:text-7xl">
            {headline}
          </h2>
          <p className="u-prose mx-auto mt-6 text-sm leading-relaxed">{body}</p>
          <Link
            to={localizePath(cta.to, locale)}
            className="mt-8 inline-block border-b border-brass pb-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass transition-colors duration-300 hover:border-ink hover:text-ink"
          >
            {cta.label} &rarr;
          </Link>
        </Reveal>
      </Container>
    </Section>
  )
}
