import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '@/content/site.en'
import { LOCALES, LOCALE_LABELS, ENABLED_LOCALES, DEFAULT_LOCALE } from '@/lib/i18n'

export function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Navigating away should always close the menu, including via browser back.
  useEffect(() => setOpen(false), [pathname])

  // A fixed, open menu over a scrolling page is disorienting; hold the page.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className="fixed inset-x-0 top-0 bg-paper/85 backdrop-blur-sm"
      style={{ zIndex: 'var(--z-overlay)' }}
    >
      <div className="mx-auto flex max-w-(--container-content) items-center justify-between px-(--spacing-gutter) py-5">
        <Link
          to="/"
          className="whitespace-nowrap font-(family-name:--font-display) text-base tracking-[0.05em] text-ink transition-opacity duration-300 hover:opacity-70 sm:text-xl sm:tracking-[0.06em]"
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
                      // The brass rule grows from the left on hover, rather than
                      // the link colour simply switching.
                      'group relative block py-1 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) transition-colors duration-300',
                      isActive ? 'text-brass' : 'text-ink hover:text-brass',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        aria-hidden
                        className={[
                          'absolute inset-x-0 bottom-0 h-px origin-left bg-brass transition-transform duration-400 ease-out',
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                        ].join(' ')}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <LocaleToggle />
          <MenuToggle open={open} onClick={() => setOpen((v) => !v)} />
        </div>
      </div>

      {/* Grid-rows trick: animates to the menu's natural height without
          hardcoding one, and without a max-height guess that clips or lags. */}
      <div
        className={[
          // Solid, not the header's translucent ground: at 85% the hero type
          // reads straight through the open menu.
          'grid overflow-hidden border-greige bg-paper transition-all duration-400 ease-out lg:hidden',
          open ? 'grid-rows-[1fr] border-t opacity-100' : 'grid-rows-[0fr] border-t-0 opacity-0',
        ].join(' ')}
      >
        <nav aria-label="Primary mobile" className="min-h-0">
          <ul className="px-(--spacing-gutter) py-2">
            {site.nav.items.map((item, i) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className="block py-3 text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-ink transition-all duration-400 ease-out"
                  style={{
                    // Items settle in sequence once the panel is open.
                    opacity: open ? 1 : 0,
                    transform: open ? 'none' : 'translateY(-6px)',
                    transitionDelay: open ? `${80 + i * 45}ms` : '0ms',
                  }}
                  tabIndex={open ? undefined : -1}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

/**
 * Two bars that cross into an X.
 *
 * Each bar slides to the vertical centre and rotates in opposite directions,
 * so the shape reads as the same two threads rearranged rather than one icon
 * swapped for another.
 */
function MenuToggle({ open, onClick }: { open: boolean; onClick: () => void }) {
  const bar = 'block h-px w-6 bg-ink transition-transform duration-300 ease-out'

  return (
    <button
      type="button"
      className="relative flex h-6 w-6 flex-col items-center justify-center gap-[5px] lg:hidden"
      aria-expanded={open}
      aria-label={open ? 'Close menu' : 'Open menu'}
      onClick={onClick}
    >
      <span
        aria-hidden
        className={bar}
        style={{ transform: open ? 'translateY(3px) rotate(45deg)' : 'none' }}
      />
      <span
        aria-hidden
        className={bar}
        style={{ transform: open ? 'translateY(-3px) rotate(-45deg)' : 'none' }}
      />
    </button>
  )
}

/**
 * The EN / IN toggle from the design. Hindi is scaffolded but not written yet,
 * so IN renders disabled with an explanation rather than silently doing
 * nothing: a dead-looking control is worse than an honestly disabled one.
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
                  ? 'text-ink transition-colors duration-300 hover:text-brass'
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
