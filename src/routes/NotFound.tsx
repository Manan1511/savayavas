import { Link } from 'react-router-dom'
import { Eyebrow } from '@/components/Eyebrow'
import { Section, Container } from '@/components/Section'
import { Seo } from '@/components/Seo'
import { site } from '@/content/site.en'

/**
 * A real page, not PageStub. Prerendered to a real /404.html so Netlify can
 * serve it (with an actual 404 status) for any path that has no matching
 * static file — see netlify.toml. Every other route on this site is fully
 * enumerated and prerendered, so any path that lands here is genuinely wrong,
 * not a route we forgot to build.
 */
export function Component() {
  return (
    <>
      <Seo title="Page Not Found" path="/404" description="That page does not exist." noindex />

      <Section className="flex min-h-[70vh] items-center py-32">
        <Container className="max-w-xl text-center">
          <Eyebrow>404</Eyebrow>
          <h1 className="mt-4 text-4xl uppercase leading-tight sm:text-5xl">Page Not Found</h1>
          <p className="u-prose mx-auto mt-5 text-sm leading-relaxed">
            That page does not exist, or has moved. Try one of these instead:
          </p>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass">
            {site.nav.items.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to="/"
            className="mt-10 inline-block border-b border-brass pb-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-brass transition-colors duration-300 hover:border-ink hover:text-ink"
          >
            Back to Home &rarr;
          </Link>
        </Container>
      </Section>
    </>
  )
}

Component.displayName = 'NotFoundRoute'
