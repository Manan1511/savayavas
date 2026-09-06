import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { collectionsPage } from '@/content/collections.en'

export function Manufacturing() {
  const { eyebrow, headline, body } = collectionsPage.manufacturing

  return (
    <Section tone="ink" className="py-16 sm:py-20">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <Eyebrow className="text-brass-soft">{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-2xl leading-snug text-paper sm:text-3xl">{headline}</h2>
          <p className="u-prose mx-auto mt-4 text-sm leading-relaxed text-paper/75">{body}</p>
        </Reveal>
      </Container>
    </Section>
  )
}
