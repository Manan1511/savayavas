import { Eyebrow } from '@/components/Eyebrow'
import { Seo } from '@/components/Seo'
import { site } from '@/content/site.en'
import { home } from '@/content/home.en'

/**
 * Phase 2 replaces this entirely — hero collage, thread system, and the seven
 * Home sections from docs/PLAN.md §6. For now it proves the shell: tokens,
 * fonts, prerendered head tags, and the layout container.
 */
export function Component() {
  return (
    <>
      <Seo title="Home" path="/" description={home.seo.description} />

      <section className="mx-auto max-w-(--container-content) px-(--spacing-gutter) py-24">
        <Eyebrow>{home.hero.eyebrow}</Eyebrow>

        {/* The lockup: script lead-in, all-caps anchor, small-caps subline.
            Read as one sentence, so it is one heading to a screen reader. */}
        <h1 className="mt-5">
          <span className="block font-(family-name:--font-script) text-5xl tracking-normal text-brass sm:text-6xl">
            {home.hero.script}
          </span>
          <span className="mt-1 block text-5xl uppercase sm:text-7xl">{home.hero.headline}</span>
        </h1>

        <p className="u-prose mt-7 text-sm uppercase tracking-[0.12em] text-ink-soft">
          {home.hero.subline}
        </p>

        <p className="u-prose mt-10 text-xs text-stone">
          Phase 1 scaffold — the hero collage and thread animation land in Phase 2. See{' '}
          <code className="text-brass">docs/PLAN.md</code>.
        </p>

        <div className="mt-14 grid gap-px border border-greige bg-greige sm:grid-cols-2 lg:grid-cols-3">
          {site.categories.map((c) => (
            <article key={c.slug} className="bg-paper p-6">
              <h2 className="text-xl">{c.name}</h2>
              <p className="mt-3 text-sm">{c.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

Component.displayName = 'HomeRoute'
