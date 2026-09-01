/**
 * Standard section shell.
 *
 * `relative` is not optional — thread anchors position absolutely against their
 * nearest positioned ancestor.
 *
 * Deliberately carries NO z-index. A z-index here would create a stacking
 * context, and the page-level thread SVG could then never paint between this
 * section's background and its content — it would sit under every opaque
 * section regardless of its own band. Content is lifted instead, by Container.
 */
export function Section({
  children,
  className = '',
  tone = 'paper',
  id,
}: {
  children: React.ReactNode
  className?: string
  tone?: 'paper' | 'ivory' | 'ink'
  id?: string
}) {
  const tones = {
    paper: 'bg-paper text-ink-soft',
    ivory: 'bg-ivory text-ink-soft',
    ink: 'bg-ink text-paper',
  } as const

  return (
    <section id={id} className={`relative ${tones[tone]} ${className}`}>
      {children}
    </section>
  )
}

/**
 * Centred content column. Kept separate so a section can go full-bleed.
 *
 * Sits in the content band: above `thread-behind` (so the thread passes under
 * the column) and below `thread-front` (so the thread can cross over type, as
 * it does over the script word in the hero).
 */
export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative mx-auto w-full max-w-(--container-content) px-(--spacing-gutter) ${className}`}
      style={{ zIndex: 'var(--z-content)' }}
    >
      {children}
    </div>
  )
}
