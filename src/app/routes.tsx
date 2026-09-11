import type { RouteRecord } from 'vite-react-ssg'
import RootLayout from '@/app/RootLayout'
import { site } from '@/content/site.en'

/**
 * The routes from docs/PLAN.md §6 (journal removed), mounted twice: once at
 * `/` (English) and once at `/hi` (Hindi) — see docs/PLAN.md §9 and
 * src/lib/i18n.ts for the locale scheme. `RootLayout`, and every route
 * component beneath it, is locale-agnostic: each resolves its own content
 * via `useLocaleContent` reading the URL, so the exact same lazy-loaded
 * component tree serves both mounts. The only place a locale actually needs
 * to be known here is `getStaticPaths`, since a dynamic route's prerendered
 * file list has to include both `/collections/:slug` and
 * `/hi/collections/:slug`.
 *
 * Categories (site.categories) stay locale-agnostic here deliberately:
 * slugs are shared between languages (`/hi/collections/linen`, not a
 * translated slug), so a URL means the same category in either language and
 * a link never needs to know which locale it's in to work.
 *
 * Home is eager (it's the entry point and must paint fast); everything else
 * is lazy so the landing page doesn't pay for pages nobody has visited yet.
 */
function buildChildRoutes(localePrefix: '' | '/hi'): RouteRecord[] {
  return [
    {
      index: true,
      lazy: () => import('@/routes/home'),
    },
    {
      path: 'our-story',
      lazy: () => import('@/routes/our-story'),
    },
    {
      path: 'collections',
      lazy: () => import('@/routes/collections'),
    },
    {
      path: 'collections/:slug',
      lazy: () => import('@/routes/collections/category'),
      // Prerender one static page per fabric category, per locale.
      getStaticPaths: () => site.categories.map((c) => `${localePrefix}/collections/${c.slug}`),
    },
    {
      path: 'vas',
      lazy: () => import('@/routes/vas'),
    },
    {
      path: 'for-dealers',
      lazy: () => import('@/routes/for-dealers'),
    },
    {
      path: 'contact',
      lazy: () => import('@/routes/contact'),
    },
    {
      // Prerendered to a real dist/404.html (and dist/hi/404.html) — a plain
      // static path, not a dynamic one, so it needs no getStaticPaths.
      // Netlify serves the root one automatically, with a genuine 404
      // status, for any path with no matching static file (see
      // netlify.toml); the /hi copy exists mainly so a Hindi visitor who
      // lands here via in-app navigation still sees Hindi chrome.
      path: '404',
      lazy: () => import('@/routes/NotFound'),
    },
    {
      // Client-side fallback for the rare case that in-app navigation (not a
      // fresh page load) reaches an unmatched path within this locale's
      // subtree. Static hosting never exercises this branch; Netlify's own
      // 404.html lookup handles that.
      path: '*',
      lazy: () => import('@/routes/NotFound'),
    },
  ]
}

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: buildChildRoutes(''),
  },
  {
    path: '/hi',
    element: <RootLayout />,
    children: buildChildRoutes('/hi'),
  },
]
