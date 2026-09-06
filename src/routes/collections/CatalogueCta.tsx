import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { collectionsPage as collectionsPageEn } from '@/content/collections.en'
import { collectionsPage as collectionsPageHi } from '@/content/collections.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { ui as uiEn } from '@/content/ui.en'
import { ui as uiHi } from '@/content/ui.hi'

/**
 * No catalogue PDF exists yet (docs/PLAN.md §2, item 6). The button renders
 * visibly disabled with a reason, rather than a live link to nothing or a
 * silent no-op — the same honesty rule as the forms' submitLead() stub.
 */
export function CatalogueCta() {
  const collectionsPage = useLocaleContent(collectionsPageEn, collectionsPageHi)
  const ui = useLocaleContent(uiEn, uiHi)
  const { eyebrow, headline, body, ctaLabel, available } = collectionsPage.catalogue

  return (
    <Section className="py-20 sm:py-24">
      <Container className="max-w-xl text-center">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl uppercase leading-tight sm:text-4xl">{headline}</h2>
          <p className="u-prose mx-auto mt-4 text-sm leading-relaxed">{body}</p>

          {available ? (
            <a
              href="/catalogue.pdf"
              className="mt-7 inline-block border-b border-brass pb-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass transition-colors duration-300 hover:border-ink hover:text-ink"
            >
              {ctaLabel} &rarr;
            </a>
          ) : (
            <div className="mt-7">
              <span
                aria-disabled="true"
                className="inline-block cursor-not-allowed border-b border-stone/40 pb-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-stone"
              >
                {ctaLabel}
              </span>
              <p className="mt-2 text-xs text-stone">{ui.collectionsPage.comingSoonCatalogue}</p>
            </div>
          )}
        </Reveal>
      </Container>
    </Section>
  )
}
