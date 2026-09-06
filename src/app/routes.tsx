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
        element: (
          <PageStub
            eyebrow="How We Create"
            title="Collections"
            path="/collections"
            description="Cotton, linen and performance-engineered blends, built on one principle: consistency at scale."
            sections={[
              'Materials that speak for themselves',
              'Positioning: consistency at scale',
              'The five fabric categories',
              'Crafted with purpose: spinning, weaving, finishing',
              'Manufactured under Shubh Shantinath Silk Mills',
              'Catalogue PDF download',
            ]}
          />
        ),
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
        element: (
          <PageStub
            eyebrow="Trade"
            title="For Dealers"
            path="/for-dealers"
            description="Dealer program, pricing structure and onboarding for traders, manufacturers and menswear brands."
            sections={[
              'Header',
              'Who the program is for',
              'What dealers get',
              'Three-step onboarding',
              'Pricing structure inquiry',
              'Export terms: advance payment only',
              'Reviews',
              'FAQ and CTA',
            ]}
          />
        ),
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
        element: (
          <PageStub
            eyebrow="Kind Words"
            title="Contact"
            path="/contact"
            description="Trade and export inquiries, and where to find us in Surat."
            sections={[
              'Header',
              'Reviews',
              'Get in touch',
              'Visit us: address and static map',
              'Trade inquiry form',
              'Export inquiry form',
            ]}
          />
        ),
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
