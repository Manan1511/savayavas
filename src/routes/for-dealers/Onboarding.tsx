import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { forDealers } from '@/content/forDealers.en'

export function Onboarding() {
  const { eyebrow, steps } = forDealers.onboarding

  return (
    <Section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <Reveal as="ol" stagger className="mt-8 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step, i) => (
            <li key={step.title} className="relative pl-0">
              <span className="font-(family-name:--font-display) text-4xl text-brass/40">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 text-lg uppercase tracking-wide text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{step.body}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
