import { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  ChevronLeft,
  Heart,
  Send,
  User,
  X,
} from 'lucide-react'
import { InstagramIcon as Instagram } from '../ui/icons'
import Logo from '../ui/Logo'
import { categories } from '../../data/categories'

const menuLinkClass = ({ isActive }) =>
  `flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15.5px] font-bold transition-colors ${
    isActive ? 'bg-ink text-orange' : 'text-ink hover:bg-mist'
  }`

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="منو">
      <div
        className="absolute inset-0 animate-fade-in bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 end-0 flex w-[86%] max-w-[350px] animate-drawer-start flex-col rounded-s-3xl bg-white shadow-lift">
        <div className="flex items-center justify-between border-b border-line p-5">
          <Logo />
          <button
            type="button"
            aria-label="بستن منو"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full text-mute transition-colors hover:bg-mist hover:text-ink"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4" aria-label="منوی موبایل">
          <ul className="space-y-1">
            <li>
              <NavLink to="/" end className={menuLinkClass} onClick={onClose}>
                خانه
                <ChevronLeft size={17} className="text-mute" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" className={menuLinkClass} onClick={onClose}>
                فروشگاه
                <ChevronLeft size={17} className="text-mute" />
              </NavLink>
            </li>
            <li>
              <Link
                to="/#brands"
                onClick={onClose}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15.5px] font-bold text-ink transition-colors hover:bg-mist"
              >
                برندها
                <ChevronLeft size={17} className="text-mute" />
              </Link>
            </li>
            <li>
              <NavLink to="/about" className={menuLinkClass} onClick={onClose}>
                درباره ما
                <ChevronLeft size={17} className="text-mute" />
              </NavLink>
            </li>
          </ul>

          <p className="mt-6 px-4 text-[11px] font-bold text-mute">
            دسته‌بندی‌ها
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/shop?cat=${cat.slug}`}
                onClick={onClose}
                className="rounded-2xl bg-mist px-3 py-3 text-center text-[13.5px] font-bold text-ink transition-colors hover:bg-sage active:scale-[.97]"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="border-t border-line p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/account"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-full border border-line px-3 py-2.5 text-[13px] font-bold text-ink transition-colors hover:bg-mist"
            >
              <User size={16} strokeWidth={2} />
              حساب من
            </Link>
            <Link
              to="/account?tab=favorites"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-full border border-line px-3 py-2.5 text-[13px] font-bold text-ink transition-colors hover:bg-mist"
            >
              <Heart size={16} strokeWidth={2} />
              علاقه‌مندی‌ها
            </Link>
          </div>
          <div className="mt-4 flex items-center justify-center gap-3">
            <a
              href="https://instagram.com/ekazion"
              target="_blank"
              rel="noreferrer"
              aria-label="اینستاگرام اکازیون"
              className="grid h-10 w-10 place-items-center rounded-full bg-mist text-forest transition-colors hover:bg-sage/70"
            >
              <Instagram size={17} strokeWidth={1.9} />
            </a>
            <a
              href="https://t.me/ekazion"
              target="_blank"
              rel="noreferrer"
              aria-label="تلگرام اکازیون"
              className="grid h-10 w-10 place-items-center rounded-full bg-mist text-forest transition-colors hover:bg-sage/70"
            >
              <Send size={17} strokeWidth={1.9} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
