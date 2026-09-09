import { Head } from 'vite-react-ssg'
import { site as siteEn } from '@/content/site.en'
import { site as siteHi } from '@/content/site.hi'
import { useLocale, localizePath } from '@/lib/i18n'
import { useLocaleContent } from '@/lib/useLocaleContent'

const SITE_URL = 'https://savayavas.co'

export interface SeoProps {
  title: string
  description: string
  /**
   * The CANONICAL (English-shaped) path, e.g. "/our-story" — always this
   * shape, even when the page is currently rendering in Hindi. Seo derives
   * the actual current-locale URL and the hreflang alternates from this one
   * value via `localizePath`, so call sites never need to know or care which
   * locale they're being rendered under.
   */
  path: string
  /** Absolute or root-relative image for link previews. */
  image?: string
  type?: 'website' | 'article'
  /**
   * The 404 page's only real use: no canonical, no OG/Twitter tags (there is
   * nothing to preview or crawl), just a title, a description, and a robots
   * tag telling search engines to leave it out of the index.
   */
  noindex?: boolean
}

/**
 * Per-route document head. Because routes are prerendered, these tags land in
 * the served HTML — which is the whole reason for prerendering: link previews
 * in WhatsApp and LinkedIn are how this brand actually gets shared.
 */
export function Seo({
  title,
  description,
  path,
  image = '/og/default.jpg',
  type = 'website',
  noindex = false,
}: SeoProps) {
  const locale = useLocale()
  const site = useLocaleContent(siteEn, siteHi)
  const localizedPath = localizePath(path, locale)
  const url = `${SITE_URL}${localizedPath}`
  const fullTitle = path === '/' ? `${site.brand.name} · ${site.brand.tagline}` : `${title} · ${site.brand.name}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  if (noindex) {
    return (
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
    )
  }

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Each language points at both versions of itself plus a default,
          so a search engine serves a Hindi searcher the Hindi URL and an
          English searcher the English one, rather than treating them as
          duplicate content or two unrelated pages. */}
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}${path}`} />
      <link rel="alternate" hrefLang="hi" href={`${SITE_URL}${localizePath(path, 'hi')}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path}`} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.brand.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={locale === 'hi' ? 'hi_IN' : 'en_IN'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  )
}

/** Organization schema. Rendered once, from the root layout. */
export function OrganizationSchema() {
  const site = useLocaleContent(siteEn, siteHi)
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.brand.name,
    url: SITE_URL,
    description: 'Premium shirting fabrics manufactured under Shubh Shantinath Silk Mills.',
    parentOrganization: { '@type': 'Organization', name: site.brand.parentCompany },
    telephone: site.contact.phone,
    email: site.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '146, Krishna Bhawan, Room No. 27, Dr. Viegas Street, Kalbadevi Road',
      addressLocality: 'Mumbai',
      postalCode: '400002',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
  }

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(json)}</script>
    </Head>
  )
}
