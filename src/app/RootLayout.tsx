import { useEffect } from 'react'
import { Head } from 'vite-react-ssg'
import { Outlet } from 'react-router-dom'
import { verifyFonts } from '@/lib/verifyFonts'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { OrganizationSchema } from '@/components/Seo'
import { SmoothScroll } from '@/app/providers/SmoothScroll'
import { site } from '@/content/site.en'

export default function RootLayout() {
  useEffect(() => {
    void verifyFonts()
  }, [])

  return (
    <SmoothScroll>
      {/* vite-react-ssg splices every Helmet-collected tag in as a block
          immediately after the literal <head>, ahead of index.html's own
          static content (confirmed by reading its prerender source — it does
          `indexHTML.replace('<head>', '<head>' + metaTags)`). That pushed our
          static <meta charset> in index.html out of first position, which
          Lighthouse flags: charset must be the first thing in <head>. Emitting
          it here, as the first Helmet tag in the tree, puts it back first. */}
      <Head>
        <meta charSet="utf-8" />
      </Head>

      <OrganizationSchema />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        style={{ zIndex: 'var(--z-overlay)' }}
      >
        {site.nav.skipToContent}
      </a>

      <Nav />

      <main id="main" className="pt-20">
        <Outlet />
      </main>

      <Footer />
    </SmoothScroll>
  )
}
