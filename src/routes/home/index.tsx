import { Eyebrow } from '@/components/Eyebrow'
import { Seo } from '@/components/Seo'
import { site } from '@/content/site.en'

/**
 * Phase 2 replaces this entirely — hero collage, thread system, and the seven
 * Home sections from docs/PLAN.md §6. For now it proves the shell: tokens,
 * fonts, prerendered head tags, and the layout container.
 */
export function Component() {
  return (
    <>
      <Seo
        title="Home"
        path="/"
        description="Savayavas & Co. — premium shirting fabrics for traders, manufacturers and menswear brands. Manufactured under Shubh Shantinath Silk Mills."
      />

      <section className="mx-auto max-w-(--container-content) px-(--spacing-gutter) py-24">
        <Eyebrow>Various Types of Fabrics</Eyebrow>
        <h1 className="mt-5 text-6xl uppercase sm:text-7xl">
          Savayavas
          <span className="block font-(family-name:--font-script) text-5xl normal-case tracking-normal text-brass sm:text-6xl">
            &amp; Co.
          </span>
        </h1>
        <p className="u-prose mt-8">
          Foundation is in place. The hero collage, the thread animation and the remaining Home
          sections land in Phase 2 — see <code className="text-brass">docs/PLAN.md</code>.
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
