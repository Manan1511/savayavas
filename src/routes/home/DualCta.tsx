import { Link } from 'react-router-dom'
import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { home } from '@/content/home.en'

/** The two paths the sitemap asks the homepage to split traffic between. */
export function DualCta() {
  const { dealers, story } = home.dualCta

  return (
    <Section className="pb-24 pt-20 sm:pb-28">
      <Container>
        <Reveal stagger className="relative grid gap-px border border-greige bg-greige md:grid-cols-2">
          {[dealers, story].map((block) => (
            <Link
              key={block.cta.to}
              to={block.cta.to}
              className="group flex flex-col justify-between bg-paper p-9 transition-colors duration-400 hover:bg-ivory sm:p-12"
            >
              <div>
                <h2 className="text-3xl uppercase leading-tight sm:text-4xl">{block.headline}</h2>
                <p className="u-prose mt-4 text-sm leading-relaxed">{block.body}</p>
              </div>
              <span className="mt-10 inline-flex items-center gap-1.5 text-[0.625rem] uppercase tracking-(--tracking-eyebrow) text-brass">
                {block.cta.label}
                <span
                  aria-hidden
                  className="transition-transform duration-400 ease-out group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </span>
            </Link>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
