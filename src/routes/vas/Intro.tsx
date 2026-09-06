import { Link } from 'react-router-dom'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { vas as vasEn } from '@/content/vas.en'
import { vas as vasHi } from '@/content/vas.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { useLocale, localizePath } from '@/lib/i18n'

/**
 * A single reaffirming paragraph, not a retelling. The etymology lives in
 * full on /our-story; a visitor arriving here from search or a shared link
 * only needs the root restated, plus a way to go read the rest.
 */
export function Intro() {
  const vas = useLocaleContent(vasEn, vasHi)
  const locale = useLocale()
  return (
    <Section tone="ivory" className="py-16 sm:py-20">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <p className="u-prose mx-auto text-base leading-relaxed text-ink">{vas.intro.body}</p>
          <Link
            to={localizePath(vas.intro.cta.to, locale)}
            className="mt-5 inline-block border-b border-brass pb-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass transition-colors duration-300 hover:border-ink hover:text-ink"
          >
            {vas.intro.cta.label} &rarr;
          </Link>
        </Reveal>
      </Container>
    </Section>
  )
}
