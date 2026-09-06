import { Section, Container } from '@/components/Section'
import { Reveal } from '@/motion'
import { vas } from '@/content/vas.en'

export function StatsBand() {
  const { headline, items } = vas.stats

  return (
    <Section tone="ink" className="py-16 sm:py-20">
      <Container>
        <Reveal className="grid gap-10 lg:grid-cols-[1fr_2.5fr] lg:gap-12">
          <h2 className="text-2xl uppercase leading-tight text-paper sm:text-3xl">
            {headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-5">
            {items.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-(family-name:--font-display) text-3xl text-paper sm:text-4xl">
                  {stat.value}
                </dd>
                <p className="mt-2 text-[0.625rem] uppercase leading-snug tracking-(--tracking-eyebrow) text-brass-soft">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs leading-snug text-paper/60">{stat.caption}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  )
}
