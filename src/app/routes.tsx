import type { RouteRecord } from 'vite-react-ssg'
import RootLayout from '@/app/RootLayout'
import { PageStub } from '@/components/PageStub'
import { site } from '@/content/site.en'

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
        element: (
          <PageStub
            eyebrow="Content Hub"
            title="Journal"
            path="/journal"
            description="Brand stories, reel series and notes from the mill."
            sections={['Header', 'Featured post', 'Post grid', 'Category filter', 'Instagram strip']}
          />
        ),
      },
      {
        path: 'contact',
        lazy: () => import('@/routes/contact'),
      },
      {
        path: '*',
        element: (
          <PageStub
            eyebrow="404"
            title="Not Found"
            path="/404"
            description="That page does not exist. Try the collections, or get in touch."
            sections={[]}
          />
        ),
      },
    ],
  },
]
