import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { collectionsPage as collectionsPageEn } from '@/content/collections.en'
import { collectionsPage as collectionsPageHi } from '@/content/collections.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'

export function Positioning() {
  const collectionsPage = useLocaleContent(collectionsPageEn, collectionsPageHi)
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
