/**
 * A circular icon over a short title and one line of body copy.
 *
 * Used for the About section's four brand pillars and the VAS quality
 * pillars: same shape, different icon sets, so the icon is a prop rather than
 * baked in here.
 */
export function IconPillar({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode
  title: string
  body: string
}) {
  return (
    <div className="group text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-brass/45 transition-colors duration-500 group-hover:border-brass">
        {icon}
      </div>
      <h3 className="mt-4 text-[0.6875rem] uppercase leading-snug tracking-(--tracking-eyebrow) text-ink">
        {title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-ink-soft">{body}</p>
    </div>
  )
}

/** Common props for the small line-icon SVGs drawn for each pillar set. */
export const pillarIconProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'var(--color-brass)',
  strokeWidth: 1,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
}
