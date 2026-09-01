/**
 * Dev-only guard against silently-missing web fonts.
 *
 * A dropped font stylesheet does not throw and does not look broken — the page
 * falls back to a system face that reads as "close enough" and ships. That
 * exact failure happened once already: Tailwind v4 inlines its own @import,
 * which pushed the Google Fonts @import out of first position, CSS treated it
 * as invalid, and every face fell back for several commits without anyone
 * noticing. Fonts now load via <link> in index.html; this makes a regression loud.
 */

const REQUIRED = ['Playfair Display', 'Jost', 'Allura'] as const

export async function verifyFonts(): Promise<void> {
  if (!import.meta.env.DEV) return
  if (typeof document === 'undefined' || !('fonts' in document)) return

  await document.fonts.ready

  const loaded = new Set([...document.fonts].map((f) => f.family))
  const missing = REQUIRED.filter((f) => !loaded.has(f))

  if (missing.length > 0) {
    console.error(
      `[fonts] Not loaded: ${missing.join(', ')}.\n` +
        'The page is rendering system fallbacks. Check the stylesheet <link> in index.html — ' +
        'note that an @import in a CSS file processed by Tailwind v4 will be silently dropped.',
    )
  }
}
