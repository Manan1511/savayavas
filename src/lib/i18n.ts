import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { site } from '@/content/site.en'

/**
 * i18n is wired from day one so no component ever hardcodes a string, but only
 * English ships. The IN toggle in the nav stays visibly disabled until Hindi
 * copy and a Devanagari display pairing are signed off — see docs/PLAN.md §2.
 */

export const LOCALES = ['en', 'hi'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'
export const ENABLED_LOCALES: readonly Locale[] = ['en']

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  hi: 'IN',
}

void i18n.use(initReactI18next).init({
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  defaultNS: 'site',
  resources: {
    en: { site },
  },
  // Deterministic on the server: resources are bundled, nothing loads async,
  // so prerendered HTML always contains real copy rather than translation keys.
  interpolation: { escapeValue: false },
})

export default i18n
