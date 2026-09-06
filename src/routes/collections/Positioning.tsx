import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { collectionsPage } from '@/content/collections.en'

export function Positioning() {
  const { eyebrow, body } = collectionsPage.positioning

  return (
    <Section className="py-16 sm:py-20">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <p className="u-prose mx-auto mt-5 text-base leading-relaxed text-ink">{body}</p>
        </Reveal>
      </Container>
    </Section>
  )
}
