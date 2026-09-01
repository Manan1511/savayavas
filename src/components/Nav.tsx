import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { site } from '@/content/site.en'
import { LOCALES, LOCALE_LABELS, ENABLED_LOCALES, DEFAULT_LOCALE } from '@/lib/i18n'

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="fixed inset-x-0 top-0 bg-paper/85 backdrop-blur-sm"
      style={{ zIndex: 'var(--z-overlay)' }}
    >
      <div className="mx-auto flex max-w-(--container-content) items-center justify-between px-(--spacing-gutter) py-5">
        <Link
          to="/"
          className="whitespace-nowrap font-(family-name:--font-display) text-base tracking-[0.05em] text-ink sm:text-xl sm:tracking-[0.06em]"
          aria-label={`${site.brand.name}, home`}
        >
          SAVAYAVAS &amp; CO
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {site.nav.items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) transition-colors',
                      isActive ? 'text-brass' : 'text-ink hover:text-brass',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <LocaleToggle />
          <button
            type="button"
            className="lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="block h-px w-6 bg-ink" />
            <span aria-hidden className="mt-1.5 block h-px w-6 bg-ink" />
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Primary mobile" className="border-t border-greige lg:hidden">
          <ul className="px-(--spacing-gutter) py-4">
            {site.nav.items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-ink"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

/**
 * The EN / IN toggle from the design. Hindi is scaffolded but not written yet,
 * so IN renders disabled with an explanation rather than silently doing
 * nothing — a dead-looking control is worse than an honestly disabled one.
 */
function LocaleToggle() {
  return (
    <div className="flex items-center gap-1.5 text-[0.6875rem] tracking-(--tracking-eyebrow)">
      {LOCALES.map((locale, i) => {
        const enabled = ENABLED_LOCALES.includes(locale)
        return (
          <span key={locale} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-stone">/</span>}
            <button
              type="button"
              disabled={!enabled}
              aria-current={locale === DEFAULT_LOCALE ? 'true' : undefined}
              title={enabled ? undefined : 'Hindi is coming soon'}
              className={
                enabled
                  ? 'text-ink hover:text-brass'
                  : 'cursor-not-allowed text-stone/60'
              }
            >
              {LOCALE_LABELS[locale]}
            </button>
          </span>
        )
      })}
    </div>
  )
}
