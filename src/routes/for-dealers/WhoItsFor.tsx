import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { forDealers } from '@/content/forDealers.en'

export function WhoItsFor() {
  const { eyebrow, items } = forDealers.whoItsFor

  return (
    <Section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <Eyebrow as="h2">{eyebrow}</Eyebrow>
        </Reveal>

        <Reveal as="ul" stagger className="mt-6 grid gap-px border border-greige bg-greige sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.title} className="bg-paper p-7">
              <h3 className="text-lg leading-snug text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{item.body}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
