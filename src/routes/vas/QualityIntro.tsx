import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { vas as vasEn } from '@/content/vas.en'
import { vas as vasHi } from '@/content/vas.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'

export function QualityIntro() {
  const vas = useLocaleContent(vasEn, vasHi)
  const { eyebrow, headline, body } = vas.qualityIntro

  return (
    <Section className="pb-4 pt-20 sm:pt-24">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 text-3xl uppercase leading-tight sm:text-4xl">{headline}</h2>
          <p className="u-prose mx-auto mt-5 text-sm leading-relaxed">{body}</p>
        </Reveal>
      </Container>
    </Section>
  )
}
