import type { RouteRecord } from 'vite-react-ssg'
import RootLayout from '@/app/RootLayout'
import { site } from '@/content/site.en'
import { journalPosts } from '@/content/journal.en'

/**
 * The nine routes from docs/PLAN.md §6. Every one is prerendered at build.
 *
 * Home is eager (it's the entry point and must paint fast); everything else is
 * lazy so the landing page doesn't pay for pages nobody has visited yet.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
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
        // Prerender one static page per fabric category.
        getStaticPaths: () => site.categories.map((c) => `/collections/${c.slug}`),
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
        path: 'journal',
        lazy: () => import('@/routes/journal'),
      },
      {
        path: 'journal/:slug',
        lazy: () => import('@/routes/journal/post'),
        // Prerender one static page per journal post.
        getStaticPaths: () => journalPosts.map((p) => `/journal/${p.slug}`),
      },
      {
        path: 'contact',
        lazy: () => import('@/routes/contact'),
      },
      {
        // Prerendered to a real dist/404.html (a plain static path, not a
        // dynamic one, so it needs no getStaticPaths). Netlify serves this
        // file automatically, with a genuine 404 status, for any path with no
        // matching static file — see netlify.toml.
        path: '404',
        lazy: () => import('@/routes/NotFound'),
      },
      {
        // Client-side fallback for the rare case that in-app navigation (not
        // a fresh page load) reaches an unmatched path. Static hosting never
        // exercises this branch; Netlify's own 404.html lookup handles that.
        path: '*',
        lazy: () => import('@/routes/NotFound'),
      },
    ],
  },
]
