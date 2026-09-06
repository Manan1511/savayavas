import { Link, useParams } from 'react-router-dom'
import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Seo } from '@/components/Seo'
import { Reveal } from '@/motion'
import { site, type Category } from '@/content/site.en'
import { specSchema, placeholderSwatches, whoThisIsFor, SPEC_PENDING } from '@/content/categoryDetail.en'

/**
 * One page per fabric category, prerendered from the taxonomy in
 * content/site.en.ts. Five static routes, each with its own title,
 * canonical and description rather than five pages claiming to be
 * /collections.
 */
export function Component() {
  const { slug } = useParams<{ slug: string }>()
  const category = site.categories.find((c) => c.slug === slug)

  if (!category) {
    return (
      <div className="mx-auto max-w-(--container-content) px-(--spacing-gutter) py-32 text-center">
        <Eyebrow>Not Found</Eyebrow>
        <h1 className="mt-4 text-5xl uppercase">Unknown Collection</h1>
        <Link
          to="/collections"
          className="mt-6 inline-block text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass"
        >
          Back to Collections &rarr;
        </Link>
      </div>
    )
  }

  return (
    <>
      <Seo
        title={category.name}
        path={`/collections/${category.slug}`}
        description={category.description}
      />

      <CategoryHero category={category} />
      <SpecTable />
      <Swatches />
      <WhoThisIsFor slug={category.slug} />
      <RelatedCategories currentSlug={category.slug} />
      <InquiryCta categoryName={category.name} slug={category.slug} />
    </>
  )
}

Component.displayName = 'CategoryRoute'

function CategoryHero({ category }: { category: Category }) {
  return (
    <Section tone="ivory" className="pt-32 pb-16 sm:pt-40 sm:pb-20">
      <Container className="max-w-2xl">
        <Reveal>
          <Link
            to="/collections"
            className="text-[0.625rem] uppercase tracking-(--tracking-eyebrow) text-brass hover:text-ink"
          >
            &larr; All Collections
          </Link>
          <Eyebrow className="mt-6">Collection</Eyebrow>
          <h1 className="mt-4 text-4xl uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
            {category.name}
          </h1>
          <p className="u-prose mt-6 text-sm leading-relaxed">{category.description}</p>
        </Reveal>
      </Container>
    </Section>
  )
}

function SpecTable() {
  return (
    <Section className="py-16 sm:py-20">
      <Container className="max-w-2xl">
        <Reveal>
          <Eyebrow>Specification</Eyebrow>
          <dl className="mt-6 divide-y divide-greige border-y border-greige">
            {specSchema.map((row) => (
              <div key={row.label} className="flex items-center justify-between py-3 text-sm">
                <dt className="text-ink-soft">{row.label}</dt>
                <dd className="italic text-stone">{SPEC_PENDING}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-stone">
            Full specification data is being confirmed and will be published here shortly.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

function Swatches() {
  return (
    <Section tone="ivory" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <Eyebrow>Colourways</Eyebrow>
          <p className="mt-3 max-w-md text-xs text-stone">
            Illustrative palette. Actual fabric colourways vary by dye lot and will be photographed for this page.
          </p>
        </Reveal>
        <Reveal as="ul" stagger className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {placeholderSwatches.map((s) => (
            <li key={s.name} className="text-center">
              <div
                className="aspect-square w-full rounded-sm border border-greige"
                style={{ backgroundColor: s.hex }}
                aria-hidden
              />
              <p className="mt-2 text-[0.625rem] uppercase tracking-(--tracking-eyebrow) text-ink-soft">
                {s.name}
              </p>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}

function WhoThisIsFor({ slug }: { slug: string }) {
  const line = whoThisIsFor[slug]
  if (!line) return null

  return (
    <Section className="py-16 sm:py-20">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <Eyebrow>Who This Is For</Eyebrow>
          <p className="u-prose mx-auto mt-4 text-base leading-relaxed text-ink">{line}</p>
        </Reveal>
      </Container>
    </Section>
  )
}

function RelatedCategories({ currentSlug }: { currentSlug: string }) {
  const others = site.categories.filter((c) => c.slug !== currentSlug)

  return (
    <Section tone="ivory" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <Eyebrow as="h2">Other Collections</Eyebrow>
        </Reveal>
        <Reveal as="ul" stagger className="mt-6 grid gap-px border border-greige bg-greige sm:grid-cols-2 lg:grid-cols-4">
          {others.map((c) => (
            <li key={c.slug} className="bg-paper">
              <Link
                to={`/collections/${c.slug}`}
                className="group block h-full p-6 transition-colors duration-400 hover:bg-ivory"
              >
                <h3 className="text-lg leading-snug text-ink">{c.name}</h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[0.625rem] uppercase tracking-(--tracking-eyebrow) text-brass">
                  View
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

function InquiryCta({ categoryName, slug }: { categoryName: string; slug: string }) {
  return (
    <Section className="py-20 sm:py-24">
      <Container className="max-w-xl text-center">
        <Reveal>
          <Eyebrow>Sourcing {categoryName}?</Eyebrow>
          <h2 className="mt-4 text-3xl uppercase leading-tight sm:text-4xl">Request a Quote</h2>
          <p className="u-prose mx-auto mt-4 text-sm leading-relaxed">
            Tell us your volume and specification, and our team will get back to you.
          </p>
          <Link
            to={`/contact?category=${slug}`}
            className="mt-7 inline-block border-b border-brass pb-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass transition-colors duration-300 hover:border-ink hover:text-ink"
          >
            Enquire About {categoryName} &rarr;
          </Link>
        </Reveal>
      </Container>
    </Section>
  )
}
