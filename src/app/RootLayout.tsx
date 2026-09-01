import { useEffect } from 'react'
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
