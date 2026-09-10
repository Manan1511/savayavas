import { Link, useParams } from 'react-router-dom'
import { Eyebrow } from '@/components/Eyebrow'
import { Figure } from '@/components/Figure'
import { Section, Container } from '@/components/Section'
import { Seo } from '@/components/Seo'
import { Reveal } from '@/motion'
import { site as siteEn } from '@/content/site.en'
import { site as siteHi } from '@/content/site.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { useLocale, localizePath } from '@/lib/i18n'
import { whoThisIsFor as whoThisIsForEn } from '@/content/categoryDetail.en'
import { whoThisIsFor as whoThisIsForHi } from '@/content/categoryDetail.hi'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'
import { CATEGORY_IMAGE } from '@/assets/registry'

/**
 * One page per fabric category, prerendered from the taxonomy in
 * content/site.en.ts. Five static routes, each with its own title,
 * canonical and description rather than five pages claiming to be
 * /collections.
 */
export function Component() {
  const { slug } = useParams<{ slug: string }>()
  const site = useLocaleContent(siteEn, siteHi)
  const ui = useLocaleContent(uiEn, uiHi)
  const locale = useLocale()
  const category = site.categories.find((c) => c.slug === slug)

  if (!category) {
    return (
      <div className="mx-auto max-w-(--container-content) px-(--spacing-gutter) py-32 text-center">
        <Eyebrow>{ui.common.notFoundEyebrow}</Eyebrow>
        <h1 className="mt-4 text-5xl uppercase">{ui.category.unknownCollection}</h1>
        <Link
          to={localizePath('/collections', locale)}
          className="mt-6 inline-block text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass"
        >
          {ui.category.backToCollections} &rarr;
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
      <Swatches />
      <WhoThisIsFor slug={category.slug} />
      <RelatedCategories currentSlug={category.slug} />
      <InquiryCta categoryName={category.name} slug={category.slug} />
    </>
  )
}

Component.displayName = 'CategoryRoute'

/**
 * The strict per-slug `Category` union from site.en.ts doesn't survive
 * `useLocaleContent`'s literal-widening (a translated name is not the same
 * literal string), so this component takes the widened shape rather than
 * that exact type.
 */
interface ResolvedCategory {
  slug: string
  name: string
  description: string
}

function CategoryHero({ category }: { category: ResolvedCategory }) {
  const ui = useLocaleContent(uiEn, uiHi)
  const locale = useLocale()
  const image = CATEGORY_IMAGE[category.slug]

  return (
    <Section tone="ivory" className="pt-32 pb-16 sm:pt-40 sm:pb-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Link
              to={localizePath('/collections', locale)}
              className="text-[0.625rem] uppercase tracking-(--tracking-eyebrow) text-brass hover:text-ink"
            >
              &larr; {ui.category.allCollections}
            </Link>
            <Eyebrow className="mt-6">{ui.category.collection}</Eyebrow>
            <h1 className="mt-4 text-4xl uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
              {category.name}
            </h1>
            <p className="u-prose mt-6 text-sm leading-relaxed">{category.description}</p>

            {/* Every fabric in the catalogue is sold under the VAS shirting
                line, not the parent company directly — the product-level
                mark belongs here, distinct from the Savayavas & Co. lockup
                in the site chrome. */}
            <img src="/logos/vas-logo.png" alt="VAS Luxe Fabrics" className="mt-8 h-12 w-auto" />
          </Reveal>

          {image && (
            <Reveal delay={0.1}>
              <Figure name={image} className="w-full" priority />
            </Reveal>
          )}
        </div>
      </Container>
    </Section>
  )
}

function Swatches() {
  const ui = useLocaleContent(uiEn, uiHi)

  return (
    <Section tone="ivory" className="py-16 sm:py-20">
      <Container className="max-w-md text-center">
        <Reveal>
          <Eyebrow>{ui.category.colourways}</Eyebrow>
          <p className="mx-auto mt-3 max-w-sm text-xs text-stone">{ui.category.colourwaysNote}</p>
          <Figure name="category.shade-card" className="mx-auto mt-8 max-w-xs" rounded />
        </Reveal>
      </Container>
    </Section>
  )
}

function WhoThisIsFor({ slug }: { slug: string }) {
  const whoThisIsFor = useLocaleContent(whoThisIsForEn, whoThisIsForHi)
  const ui = useLocaleContent(uiEn, uiHi)
  const line = whoThisIsFor[slug]
  if (!line) return null

  return (
    <Section className="py-16 sm:py-20">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <Eyebrow>{ui.category.whoThisIsFor}</Eyebrow>
          <p className="u-prose mx-auto mt-4 text-base leading-relaxed text-ink">{line}</p>
        </Reveal>
      </Container>
    </Section>
  )
}

function RelatedCategories({ currentSlug }: { currentSlug: string }) {
  const site = useLocaleContent(siteEn, siteHi)
  const ui = useLocaleContent(uiEn, uiHi)
  const locale = useLocale()
  const others = site.categories.filter((c) => c.slug !== currentSlug)

  return (
    <Section tone="ivory" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <Eyebrow as="h2">{ui.category.otherCollections}</Eyebrow>
        </Reveal>
        <Reveal as="ul" stagger className="mt-6 grid gap-px border border-greige bg-greige sm:grid-cols-2 lg:grid-cols-4">
          {others.map((c) => (
            <li key={c.slug} className="bg-paper">
              <Link
                to={localizePath(`/collections/${c.slug}`, locale)}
                className="group block h-full p-6 transition-colors duration-400 hover:bg-ivory"
              >
                <h3 className="text-lg leading-snug text-ink">{c.name}</h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[0.625rem] uppercase tracking-(--tracking-eyebrow) text-brass">
                  {ui.common.view}
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
  const ui = useLocaleContent(uiEn, uiHi)
  const locale = useLocale()

  return (
    <Section className="py-20 sm:py-24">
      <Container className="max-w-xl text-center">
        <Reveal>
          <Eyebrow>{ui.category.sourcingQuestion.replace('{category}', categoryName)}</Eyebrow>
          <h2 className="mt-4 text-3xl uppercase leading-tight sm:text-4xl">{ui.category.requestQuote}</h2>
          <p className="u-prose mx-auto mt-4 text-sm leading-relaxed">{ui.category.requestQuoteBody}</p>
          <Link
            to={`${localizePath('/contact', locale)}?category=${slug}`}
            className="mt-7 inline-block border-b border-brass pb-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass transition-colors duration-300 hover:border-ink hover:text-ink"
          >
            {ui.category.enquireAbout.replace('{category}', categoryName)} &rarr;
          </Link>
        </Reveal>
      </Container>
    </Section>
  )
}
