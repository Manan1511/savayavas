import { Eyebrow } from '@/components/Eyebrow'
import { Figure } from '@/components/Figure'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { collectionsPage } from '@/content/collections.en'

export function Hero() {
  const { eyebrow, headline, body } = collectionsPage.hero

  return (
    <Section tone="ivory" className="pt-32 pb-16 sm:pt-40 sm:pb-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
              {headline}
            </h1>
            <p className="u-prose mt-6 text-sm leading-relaxed">{body}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <Figure name="collections.yarn-table" className="w-full" priority />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
