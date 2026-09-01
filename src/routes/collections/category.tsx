import { useParams } from 'react-router-dom'
import { Eyebrow } from '@/components/Eyebrow'
import { Seo } from '@/components/Seo'
import { Reveal } from '@/motion'
import { site } from '@/content/site.en'

/**
 * One page per fabric category, prerendered from the taxonomy in
 * content/site.en.ts. Still a stub visually, but the head tags are real —
 * each URL gets its own title, description and canonical rather than five
 * pages all claiming to be /collections.
 */
export function Component() {
  const { slug } = useParams<{ slug: string }>()
  const category = site.categories.find((c) => c.slug === slug)

  if (!category) {
    return (
      <div className="mx-auto max-w-(--container-content) px-(--spacing-gutter) py-24">
        <Eyebrow>Not found</Eyebrow>
        <h1 className="mt-4 text-5xl uppercase">Unknown collection</h1>
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

      <div className="mx-auto max-w-(--container-content) px-(--spacing-gutter) py-24">
        <Reveal>
          <Eyebrow>Collection</Eyebrow>
          <h1 className="mt-4 text-5xl uppercase sm:text-6xl">{category.name}</h1>
          <p className="u-prose mt-6">{category.description}</p>
        </Reveal>

        <div className="mt-14 border-t border-greige pt-6">
          <Eyebrow>Planned sections</Eyebrow>
          <ol className="u-prose mt-4 space-y-2">
            {[
              'Category hero',
              'Specification table: composition, GSM, width, weave, finish',
              'Fabric and colourway grid',
              'Who this is for',
              'Related categories',
              'Inquiry CTA, prefilled with this category',
            ].map((s, i) => (
              <li key={s} className="flex gap-4 text-sm">
                <span className="text-brass tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  )
}

Component.displayName = 'CategoryRoute'
