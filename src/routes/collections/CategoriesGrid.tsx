import { Link } from 'react-router-dom'
import { Eyebrow } from '@/components/Eyebrow'
import { Figure } from '@/components/Figure'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { site as siteEn } from '@/content/site.en'
import { site as siteHi } from '@/content/site.hi'
import { collectionsPage as collectionsPageEn } from '@/content/collections.en'
import { collectionsPage as collectionsPageHi } from '@/content/collections.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'
import { useLocale, localizePath } from '@/lib/i18n'
import { CATEGORY_IMAGE } from '@/assets/registry'

/**
 * Larger than Home's category strip: this is the dedicated catalogue page,
 * not a doorway to it, so each card gets the full description rather than a
 * clamped preview.
 */
export function CategoriesGrid() {
  const site = useLocaleContent(siteEn, siteHi)
  const collectionsPage = useLocaleContent(collectionsPageEn, collectionsPageHi)
  const ui = useLocaleContent(uiEn, uiHi)
  const locale = useLocale()
  const { eyebrow, headline } = collectionsPage.categoriesIntro

  return (
    <Section tone="ivory" className="py-16 sm:py-20">
      <Container>
        <Reveal className="max-w-xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl uppercase leading-tight sm:text-4xl">{headline}</h2>
        </Reveal>

        <Reveal as="ul" stagger className="mt-10 grid gap-px border border-greige bg-greige sm:grid-cols-2">
          {site.categories.map((c) => {
            const image = CATEGORY_IMAGE[c.slug]
            return (
            <li key={c.slug} className="bg-paper">
              <Link
                to={localizePath(`/collections/${c.slug}`, locale)}
                className="group flex h-full flex-col transition-colors duration-400 hover:bg-ivory"
              >
                {image && (
                  <Figure
                    name={image}
                    aspect={1}
                    className="w-full"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="flex flex-1 flex-col p-8 sm:p-10">
                  <h3 className="text-2xl leading-snug text-ink">{c.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed">{c.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass">
                    {ui.collectionsPage.viewCollection}
                    <span aria-hidden className="transition-transform duration-400 ease-out group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            </li>
            )
          })}
        </Reveal>
      </Container>
    </Section>
  )
}
