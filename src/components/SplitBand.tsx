import { Eyebrow } from '@/components/Eyebrow'
import { Figure } from '@/components/Figure'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import type { AssetKey } from '@/assets/registry'

/**
 * An image beside a block of copy, alternating sides down a page. Used
 * throughout /collections, where the deck's "How We Create" section is built
 * from exactly this pattern twice.
 */
export function SplitBand({
  image,
  eyebrow,
  headline,
  children,
  reverse = false,
  tone = 'paper',
}: {
  image: AssetKey
  eyebrow: string
  headline: string
  children: React.ReactNode
  /** Image on the right instead of the left. */
  reverse?: boolean
  tone?: 'paper' | 'ivory'
}) {
  return (
    <Section tone={tone} className="py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className={reverse ? 'lg:order-2' : ''}>
            <Figure name={image} className="w-full" />
          </Reveal>

          <Reveal className={reverse ? 'lg:order-1' : ''}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl uppercase leading-tight sm:text-4xl">{headline}</h2>
            <div className="u-prose mt-5 text-sm leading-relaxed">{children}</div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
