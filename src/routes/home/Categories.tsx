import { Link } from 'react-router-dom'
import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { site } from '@/content/site.en'
import { Reveal } from '@/motion'
import { home } from '@/content/home.en'

/**
 * Not in the deck, but Collections is the commercial core of the site and the
 * homepage has to route to it. Five cards, each straight to a category.
 */
export function Categories() {
  return (
    <Section className="py-20 sm:py-28">
      <Container>
        <Reveal className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{home.categoryStrip.eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-xl text-3xl leading-tight sm:text-4xl">
              {home.categoryStrip.headline}
            </h2>
          </div>
          <Link
            to={home.categoryStrip.cta.to}
            className="text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass hover:text-ink"
          >
            {home.categoryStrip.cta.label} &rarr;
          </Link>
        </Reveal>

        <Reveal
          as="ul"
          stagger
          className="mt-12 grid gap-px border border-greige bg-greige sm:grid-cols-2 lg:grid-cols-3"
        >
          {site.categories.map((c) => (
            <li key={c.slug} className="bg-paper">
              <Link
                to={`/collections/${c.slug}`}
                className="group flex h-full flex-col p-7 transition-colors duration-400 hover:bg-ivory"
              >
                <h3 className="text-xl leading-snug text-ink">{c.name}</h3>
                <p className="mt-3 line-clamp-4 text-xs leading-relaxed">{c.description}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[0.625rem] uppercase tracking-(--tracking-eyebrow) text-brass">
                  Explore
                  <span
                    aria-hidden
                    className="transition-transform duration-400 ease-out group-hover:translate-x-1"
                  >
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
