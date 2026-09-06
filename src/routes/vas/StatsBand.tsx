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
              // A <dl>'s children may only be <dt>/<dd> (or a <div> grouping
              // them) — this previously mixed a real dt/dd pair with two
              // decorative <p> tags in the same wrapper, an invalid content
              // model, and duplicated stat.label as both a sr-only dt and a
              // visible <p>. dt is now the visible label itself (a term can
              // be visible), and the caption is a second <dd> rather than a
              // stray <p> — dt/dd/dd is exactly what a definition list is
              // for. `order-*` keeps the original big-number-first layout
              // while dt still precedes its dd's in the DOM, since a <dl>'s
              // groups are defined as a term followed by its definitions.
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 mt-2 text-[0.625rem] uppercase leading-snug tracking-(--tracking-eyebrow) text-brass-soft">
                  {stat.label}
                </dt>
                <dd className="order-1 font-(family-name:--font-display) font-normal text-3xl text-paper sm:text-4xl">
                  {stat.value}
                </dd>
                <dd className="order-3 mt-1 text-xs leading-snug text-paper/60">{stat.caption}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  )
}
