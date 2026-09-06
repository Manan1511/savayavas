/**
 * Generates dist/sitemap.xml after the prerender build.
 *
 * Runs as plain Node (no TS runtime available in this script, same
 * constraint as scripts/assets.mjs), so the two sources of dynamic slugs
 * (fabric categories, journal posts) are read by parsing their content
 * modules' source text rather than importing them. The list of static
 * top-level routes is a literal array here: it changes rarely, and duplicating
 * it is far simpler than executing TypeScript from a build script.
 *
 * If a new static route is added to src/app/routes.tsx, add it to
 * STATIC_ROUTES below too.
 *
 * Every canonical path gets both an English and a Hindi entry (slugs are
 * shared between languages — see src/app/routes.tsx), and each entry carries
 * xhtml:link hreflang alternates pointing at its sibling, so a crawler reads
 * the same "these are the same page, in two languages" relationship from the
 * sitemap that <Seo> already states in each page's own <head>.
 */

import { readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE_URL = 'https://savayavas.co'

const STATIC_ROUTES = ['/', '/our-story', '/collections', '/vas', '/for-dealers', '/journal', '/contact']

async function extractSlugs(relativePath) {
  const src = await readFile(join(root, relativePath), 'utf8')
  return [...src.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])
}

const categorySlugs = await extractSlugs('src/content/site.en.ts')
const journalSlugs = await extractSlugs('src/content/journal.en.ts')

const canonicalPaths = [
  ...STATIC_ROUTES,
  ...categorySlugs.map((s) => `/collections/${s}`),
  ...journalSlugs.map((s) => `/journal/${s}`),
]

function localize(path, locale) {
  if (locale === 'en') return path
  return path === '/' ? '/hi' : `/hi${path}`
}

const today = new Date().toISOString().slice(0, 10)

const urlEntries = canonicalPaths.flatMap((canonical) =>
  ['en', 'hi'].map((locale) => {
    const loc = `${SITE_URL}${localize(canonical, locale)}`
    const alternates = ['en', 'hi']
      .map(
        (altLocale) =>
          `      <xhtml:link rel="alternate" hreflang="${altLocale}" href="${SITE_URL}${localize(canonical, altLocale)}" />`,
      )
      .join('\n')
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
${alternates}
  </url>`
  }),
)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>
`

await writeFile(join(root, 'dist/sitemap.xml'), xml)
console.log(
  `Wrote dist/sitemap.xml with ${urlEntries.length} URLs (${canonicalPaths.length} pages x 2 locales: ${STATIC_ROUTES.length} static, ${categorySlugs.length} categories, ${journalSlugs.length} journal posts).`,
)
