import { Link } from 'react-router-dom'
import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { site } from '@/content/site.en'
import { collectionsPage } from '@/content/collections.en'

/**
 * Larger than Home's category strip: this is the dedicated catalogue page,
 * not a doorway to it, so each card gets the full description rather than a
 * clamped preview.
 */
export function CategoriesGrid() {
  const { eyebrow, headline } = collectionsPage.categoriesIntro

  return (
    <Section tone="ivory" className="py-16 sm:py-20">
      <Container>
        <Reveal className="max-w-xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl uppercase leading-tight sm:text-4xl">{headline}</h2>
        </Reveal>

        <Reveal as="ul" stagger className="mt-10 grid gap-px border border-greige bg-greige sm:grid-cols-2">
          {site.categories.map((c) => (
            <li key={c.slug} className="bg-paper">
              <Link
                to={`/collections/${c.slug}`}
                className="group flex h-full flex-col p-8 transition-colors duration-400 hover:bg-ivory sm:p-10"
              >
                <h3 className="text-2xl leading-snug text-ink">{c.name}</h3>
                <p className="mt-4 text-sm leading-relaxed">{c.description}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass">
                  View specification
                  <span aria-hidden className="transition-transform duration-400 ease-out group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
