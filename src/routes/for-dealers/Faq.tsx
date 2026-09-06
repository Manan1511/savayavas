import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { forDealers } from '@/content/forDealers.en'

/**
 * Native <details>/<summary>: full keyboard support, screen-reader semantics
 * and open/close state for free, no JS state to manage.
 */
export function Faq() {
  const { eyebrow, items } = forDealers.faq

  return (
    <Section tone="ivory" className="py-16 sm:py-20">
      <Container className="max-w-2xl">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <Reveal as="ul" stagger className="mt-6 divide-y divide-greige border-y border-greige">
          {items.map((item) => (
            <li key={item.q}>
              <details className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden className="ml-4 shrink-0 text-brass transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.a}</p>
              </details>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
