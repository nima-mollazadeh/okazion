import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Search, ShoppingBag, Truck, X } from 'lucide-react'
import { useShop } from '../../context/ShopContext'
import Logo from '../ui/Logo'
import { toFa } from '../../lib/format'

export default function MobileHeader({ onOpenMenu }) {
  const { cartCount, setCartOpen } = useShop()
  const [dismissed, setDismissed] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef(null)
  const navigate = useNavigate()

  /* ارتفاع هدر موبایل را به‌صورت متغیر CSS منتشر می‌کنیم تا
     نوار چسبانِ فیلترها در صفحهٔ فروشگاه دقیقاً زیر آن بنشیند. */
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const publish = () =>
      document.documentElement.style.setProperty('--mh', `${el.offsetHeight}px`)
    publish()
    const observer = new ResizeObserver(publish)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const submitSearch = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (q) {
      navigate(`/shop?q=${encodeURIComponent(q)}`)
      setQuery('')
    }
  }

  return (
    <div
      ref={rootRef}
      className="sticky top-0 z-40 border-b border-ink/10 bg-primary md:hidden"
    >
      {!dismissed && (
        <div className="relative bg-ink px-10 py-2 text-center">
          <p className="flex items-center justify-center gap-1.5 text-[11.5px] font-semibold text-white/90">
            <Truck size={13} strokeWidth={2.2} className="text-mint" />
            ارسال رایگان برای سفارش‌های بالای ۱ میلیون تومان
          </p>
          <button
            type="button"
            aria-label="بستن پیام"
            onClick={() => setDismissed(true)}
            className="absolute end-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-white/60 transition-colors hover:text-white"
          >
            <X size={14} strokeWidth={2.4} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center px-4 py-2">
        <button
          type="button"
          aria-label="باز کردن منو"
          onClick={onOpenMenu}
          className="grid h-11 w-11 place-items-center justify-self-start rounded-full text-white transition-colors hover:bg-white/15 active:scale-95"
        >
          <Menu size={22} strokeWidth={1.9} />
        </button>

        <Link to="/" aria-label="اکازیون — صفحه اصلی" className="justify-self-center">
          <Logo variant="neon" withLatin={false} />
        </Link>

        <button
          type="button"
          aria-label="سبد خرید"
          onClick={() => setCartOpen(true)}
          className="relative grid h-11 w-11 place-items-center justify-self-end rounded-full text-white transition-colors hover:bg-white/15 active:scale-95"
        >
          <ShoppingBag size={21} strokeWidth={1.9} />
          {cartCount > 0 && (
            <span className="absolute end-0.5 top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-orange px-1 text-[9.5px] font-black leading-none text-ink ring-2 ring-primary">
              {toFa(cartCount)}
            </span>
          )}
        </button>
      </div>

      <form onSubmit={submitSearch} className="px-4 pb-3">
        <div className="relative">
          <Search
            size={17}
            strokeWidth={2}
            className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-mute"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="جستجوی محصولات…"
            className="h-11 w-full rounded-full border border-line bg-white ps-11 pe-4 text-[13.5px] outline-none transition-colors placeholder:text-mute focus:border-orange"
          />
        </div>
      </form>
    </div>
  )
}
