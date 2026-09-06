import { useLocale } from './i18n'
import type { LocaleShape } from './localeShape'

/**
 * Picks between an English and a Hindi content object based on the current
 * URL's locale. Every `*.en.ts` content module gets a `*.hi.ts` sibling with
 * the exact same shape, and every component that previously did:
 *
 *   import { home } from '@/content/home.en'
 *
 * now does:
 *
 *   import { home as homeEn } from '@/content/home.en'
 *   import { home as homeHi } from '@/content/home.hi'
 *   const home = useLocaleContent(homeEn, homeHi)
 *
 * inside the component body. Mechanical, but it keeps one component tree
 * shared between locales instead of forking every route file in two — the
 * far worse alternative once anyone has to edit a section's JSX again.
 *
 * `hi` is typed as `LocaleShape<T>`, not `T`: the English source uses
 * `as const`, which narrows every string to its own exact literal, so `T`
 * itself demands the Hindi object contain the identical English words.
 * `LocaleShape` widens literals to their base type (`string`, `number`, ...)
 * while still requiring the same keys and nesting — real shape mismatches
 * (a missing field, an array where an object was expected) still fail at
 * build time, but a translated string is no longer treated as one.
 */
export function useLocaleContent<T>(en: T, hi: LocaleShape<T>): LocaleShape<T> {
  const locale = useLocale()
  return locale === 'hi' ? hi : (en as LocaleShape<T>)
}
