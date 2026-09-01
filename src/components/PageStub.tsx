import { Eyebrow } from '@/components/Eyebrow'
import { Seo } from '@/components/Seo'
import { Reveal } from '@/motion'

/**
 * Temporary scaffolding. Every route exists and prerenders with real head tags
 * from day one, so the nav never points at a 404 and SEO can be verified before
 * any page is designed. Each stub is replaced wholesale in Phase 3.
 */
export function PageStub({
  eyebrow,
  title,
  description,
  path,
  sections,
}: {
  eyebrow: string
  title: string
  description: string
  path: string
  sections: string[]
}) {
  return (
    <>
      <Seo title={title} description={description} path={path} />
      <div className="mx-auto max-w-(--container-content) px-(--spacing-gutter) py-24">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-5xl uppercase sm:text-6xl">{title}</h1>
          <p className="u-prose mt-6">{description}</p>
        </Reveal>

        <div className="mt-14 border-t border-greige pt-6">
          <Eyebrow>Planned sections</Eyebrow>
          <Reveal as="ol" stagger className="u-prose mt-4 space-y-2">
            {sections.map((s, i) => (
              <li key={s} className="flex gap-4 text-sm">
                <span className="text-brass tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span>{s}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </>
  )
}
