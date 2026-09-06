import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { contactPage } from '@/content/contact.en'

export function Hero() {
  const { eyebrow, headline, body } = contactPage.hero

  return (
    <Section tone="ivory" className="pb-16 pt-32 sm:pb-20 sm:pt-40">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl uppercase leading-[1.05] sm:text-5xl lg:text-6xl">{headline}</h1>
          <p className="u-prose mx-auto mt-6 text-sm leading-relaxed">{body}</p>
        </Reveal>
      </Container>
    </Section>
  )
}
