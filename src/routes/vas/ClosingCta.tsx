import { Link } from 'react-router-dom'
import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { vas as vasEn } from '@/content/vas.en'
import { vas as vasHi } from '@/content/vas.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { useLocale, localizePath } from '@/lib/i18n'

/** Routes the consumer-facing page back to the trade funnel it feeds. */
export function ClosingCta() {
  const vas = useLocaleContent(vasEn, vasHi)
  const locale = useLocale()
  const { eyebrow, headline, body, cta } = vas.closingCta

  return (
    <Section className="py-20 sm:py-24">
      <Container className="max-w-xl text-center">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl uppercase leading-tight sm:text-4xl">{headline}</h2>
          <p className="u-prose mx-auto mt-4 text-sm leading-relaxed">{body}</p>
          <Link
            to={localizePath(cta.to, locale)}
            className="mt-7 inline-block border-b border-brass pb-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass transition-colors duration-300 hover:border-ink hover:text-ink"
          >
            {cta.label} &rarr;
          </Link>
        </Reveal>
      </Container>
    </Section>
  )
}
