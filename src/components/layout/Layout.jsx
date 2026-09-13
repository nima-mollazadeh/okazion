import { Suspense, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import MobileHeader from './MobileHeader'
import MobileMenu from './MobileMenu'
import CartDrawer from './CartDrawer'
import Toasts from './Toasts'
import MobileBottomNav from './MobileBottomNav'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import PageLoader from './PageLoader'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />
      <MobileHeader onOpenMenu={() => setMenuOpen(true)} />
      <main className="flex-1 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <MobileBottomNav />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer />
      <Toasts />
      <ScrollToTop />
    </div>
  )
}
