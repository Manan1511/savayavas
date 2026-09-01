import { useState } from 'react'
import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { site } from '@/content/site.en'

/**
 * Shared by Home and /for-dealers — social proof does more work next to a CTA
 * than on a page of its own, which is why the deck's standalone Reviews route
 * was dropped (PLAN.md §1).
 *
 * Keyboard-navigable by design: the deck shows arrows only, but a carousel
 * whose content is unreachable without a mouse is broken, not minimal.
 */
export function Reviews({ tone = 'ivory' }: { tone?: 'paper' | 'ivory' }) {
  const { items, rating, ratingOutOf, count, eyebrow, headline, intro } = site.reviews
  const [index, setIndex] = useState(0)

  const go = (delta: number) => setIndex((i) => (i + delta + items.length) % items.length)

  return (
    <Section tone={tone} className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_2fr] lg:gap-16">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl uppercase leading-tight sm:text-4xl">{headline}</h2>
            <p className="u-prose mt-5 text-sm leading-relaxed">{intro}</p>

            <div className="mt-10">
              <p className="font-(family-name:--font-display) text-6xl leading-none text-ink">
                {rating}
                <span className="text-2xl text-stone">/{ratingOutOf}</span>
              </p>
              <p className="mt-3 text-[0.625rem] uppercase tracking-(--tracking-eyebrow) text-ink-soft">
                Based on {count} reviews
              </p>
            </div>
          </div>

          <div>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((r, i) => (
                <li
                  key={r.name}
                  // On small screens show one at a time; on desktop show all three.
                  className={`${i === index ? 'block' : 'hidden'} bg-paper p-7 sm:block`}
                >
                  <p className="font-(family-name:--font-display) text-4xl leading-none text-brass/50" aria-hidden>
                    &ldquo;
                  </p>
                  <blockquote className="mt-2 text-sm italic leading-relaxed">{r.quote}</blockquote>
                  <div className="mt-6 border-t border-greige pt-4">
                    <p className="text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-ink">{r.name}</p>
                    <p className="mt-1 text-xs text-stone">{r.role}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-3 sm:hidden">
              <CarouselButton label="Previous review" onClick={() => go(-1)}>
                &larr;
              </CarouselButton>
              <span className="text-xs tabular-nums text-stone">
                {index + 1} / {items.length}
              </span>
              <CarouselButton label="Next review" onClick={() => go(1)}>
                &rarr;
              </CarouselButton>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function CarouselButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-greige text-ink transition-colors hover:border-brass hover:text-brass"
    >
      {children}
    </button>
  )
}
