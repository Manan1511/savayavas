import { useLocation } from 'react-router-dom'

/**
 * Locale routing.
 *
 * Phase 1 wired up `react-i18next` on the assumption that content would be
 * resolved string-by-string via `t()`. That never actually happened: every
 * route imports a typed content OBJECT directly (`home`, `ourStory`, `vas`,
 * ...), and localizing that pattern doesn't need a translation-key library at
 * all — it needs a second object with the same shape and a way to pick
 * between them. `react-i18next` sat unused ever since; dropped in favour of
 * this smaller, purpose-built mechanism (see `useLocaleContent`).
 *
 * The scheme: English is unprefixed (`/our-story`), Hindi is prefixed
 * (`/hi/our-story`). Locale is derived from the URL, never from stored
 * preference or `Accept-Language` — a prerendered static site has no request
 * to inspect at build time, and a URL a visitor can bookmark, share, and get
 * from a search result is the only source of truth that survives all of
 * that.
 */

export const LOCALES = ['en', 'hi'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'
export const ENABLED_LOCALES: readonly Locale[] = ['en', 'hi']

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  hi: 'IN',
}

/** True HTML `lang` values, for the root element and `hreflang` links. */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: 'en',
  hi: 'hi',
}

const HI_PREFIX = '/hi'

/** Derives the current locale from a pathname alone — no request, no cookie. */
export function localeFromPathname(pathname: string): Locale {
  return pathname === HI_PREFIX || pathname.startsWith(`${HI_PREFIX}/`) ? 'hi' : 'en'
}

/** The same page, stripped of any locale prefix. Always starts with "/". */
export function delocalizePath(pathname: string): string {
  if (pathname === HI_PREFIX) return '/'
  if (pathname.startsWith(`${HI_PREFIX}/`)) return pathname.slice(HI_PREFIX.length)
  return pathname
}

/** A canonical (English-shaped) path, in the given locale's URL space. */
export function localizePath(canonicalPath: string, locale: Locale): string {
  if (locale === 'en') return canonicalPath
  if (canonicalPath === '/') return HI_PREFIX
  return `${HI_PREFIX}${canonicalPath}`
}

/** Reads the current locale from the URL. The one hook every page needs. */
export function useLocale(): Locale {
  const { pathname } = useLocation()
  return localeFromPathname(pathname)
}
