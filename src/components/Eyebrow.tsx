/**
 * The brass label that sits above every section headline in the design —
 * "ABOUT US", "HOW WE CREATE", "OUR QUALITY", "KIND WORDS". The single most
 * repeated device on the site, so it exists exactly once.
 *
 * Renders as a plain `<p>` by default. A few sections show only this label
 * above a grid of `<h3>` cards, with no visible second heading in between —
 * `WhoItsFor`, `WhatYouGet`, `Onboarding` (for-dealers) and the journal
 * index all did this, which skips a heading level (h1 straight to h3) and
 * fails the heading-order accessibility check (confirmed via Lighthouse).
 * Those pass `as="h2"` so the label itself becomes the section's real
 * heading — same look, since `u-eyebrow` fully overrides font size, weight
 * and tracking regardless of tag, just correct in the document outline.
 */
export function Eyebrow({
  children,
  className = '',
  as: Tag = 'p',
}: {
  children: React.ReactNode
  className?: string
  as?: 'p' | 'h2'
}) {
  return <Tag className={`u-eyebrow ${className}`}>{children}</Tag>
}
