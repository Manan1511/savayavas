import { Link } from 'react-router-dom'
import { site as siteEn } from '@/content/site.en'
import { site as siteHi } from '@/content/site.hi'
import { useLocaleContent } from '@/lib/useLocaleContent'
import { useLocale, localizePath } from '@/lib/i18n'

export function Footer() {
  const locale = useLocale()
  const site = useLocaleContent(siteEn, siteHi)

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex max-w-(--container-content) flex-col items-center gap-6 px-(--spacing-gutter) py-8 sm:flex-row sm:justify-between">
        <Link
          to={localizePath('/', locale)}
          className="font-(family-name:--font-display) font-normal text-lg tracking-[0.06em]"
        >
          SAVAYAVAS &amp; CO
        </Link>

        <p className="text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-paper/70">
          {site.footer.tagline}
        </p>

        <ul className="flex items-center gap-5">
          {site.footer.social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="text-[0.6875rem] uppercase tracking-(--tracking-eyebrow) text-paper/70 hover:text-brass-soft"
                target="_blank"
                rel="noreferrer noopener"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
