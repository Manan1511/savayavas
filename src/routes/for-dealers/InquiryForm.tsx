import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { LeadForm } from '@/components/LeadForm'
import { Reveal } from '@/motion'
import { forDealers } from '@/content/forDealers.en'

/**
 * One form, not two.
 *
 * docs/PLAN.md lists "dealer onboarding + pricing structure inquiry" as
 * separate forms, but two near-identical forms stacked on one page is
 * redundant UX for the same visitor. A single LeadForm with an inquiry-type
 * select covers both `dealer-onboarding` and `trade-inquiry` leads, and the
 * selected type is what gets sent.
 */
export function InquiryForm() {
  const { eyebrow, headline, body, typeOptions } = forDealers.form

  return (
    <Section id="enquire" className="py-20 sm:py-24">
      <Container className="max-w-xl">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl uppercase leading-tight sm:text-4xl">{headline}</h2>
          <p className="u-prose mt-4 text-sm leading-relaxed">{body}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <LeadForm
            kind={typeOptions[0].value}
            typeOptions={[...typeOptions]}
            submitLabel="Send Enquiry"
          />
        </Reveal>
      </Container>
    </Section>
  )
}
