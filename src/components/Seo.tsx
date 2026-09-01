import { Head } from 'vite-react-ssg'
import { site } from '@/content/site.en'

const SITE_URL = 'https://savayavas.co'

export interface SeoProps {
  title: string
  description: string
  /** Route path, e.g. "/our-story". Used for canonical + OG url. */
  path: string
  /** Absolute or root-relative image for link previews. */
  image?: string
  type?: 'website' | 'article'
}

/**
 * Per-route document head. Because routes are prerendered, these tags land in
 * the served HTML — which is the whole reason for prerendering: link previews
 * in WhatsApp and LinkedIn are how this brand actually gets shared.
 */
export function Seo({ title, description, path, image = '/og/default.jpg', type = 'website' }: SeoProps) {
  const url = `${SITE_URL}${path}`
  const fullTitle = path === '/' ? `${site.brand.name} · ${site.brand.tagline}` : `${title} · ${site.brand.name}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.brand.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  )
}

/** Organization schema. Rendered once, from the root layout. */
export function OrganizationSchema() {
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
      streetAddress: '123, Textile Market, Ring Road',
      addressLocality: 'Surat',
      postalCode: '395002',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
  }

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(json)}</script>
    </Head>
  )
}
