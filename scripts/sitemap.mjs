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

const urls = [
  ...STATIC_ROUTES,
  ...categorySlugs.map((s) => `/collections/${s}`),
  ...journalSlugs.map((s) => `/journal/${s}`),
]

const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`

await writeFile(join(root, 'dist/sitemap.xml'), xml)
console.log(`Wrote dist/sitemap.xml with ${urls.length} URLs (${STATIC_ROUTES.length} static, ${categorySlugs.length} categories, ${journalSlugs.length} journal posts).`)
