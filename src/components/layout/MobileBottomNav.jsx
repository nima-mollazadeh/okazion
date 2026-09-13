import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  Home,
  LayoutGrid,
  ShoppingBag,
  Store,
  User,
} from 'lucide-react'
import { useShop } from '../../context/ShopContext'
import { categories } from '../../data/categories'
import { toFa } from '../../lib/format'

const items = [
  { to: '/', label: 'خانه', icon: Home, end: true },
  { to: '/shop', label: 'فروشگاه', icon: Store, end: false },
]

function CategorySheet({ open, onClose }) {
  const navigate = useNavigate()

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
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="دسته‌بندی‌ها">
      <div
        className="absolute inset-0 animate-fade-in bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 animate-sheet-up rounded-t-3xl bg-white pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-lift">
        <div className="flex justify-center pt-3">
          <span className="h-1 w-10 rounded-full bg-line" />
        </div>
        <div className="flex items-center justify-between px-5 pb-3 pt-3">
          <h3 className="text-base font-black text-ink">دسته‌بندی‌ها</h3>
          <button
            type="button"
            aria-label="بستن"
            onClick={onClose}
            className="rounded-full bg-mist px-3.5 py-1.5 text-[11px] font-bold text-ink"
          >
            بستن
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2.5 px-5">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => {
                navigate(`/shop?cat=${cat.slug}`)
                onClose()
              }}
              className="rounded-2xl bg-mist px-4 py-4 text-start transition-all hover:bg-sage active:scale-[.97]"
            >
              <span className="text-[14px] font-black text-ink">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* آیکون همهٔ آیتم‌ها عرض ثابت دارد تا فاصله‌گذاری کاملاً یکدست بماند */
const iconPill =
  'relative grid h-7 w-10 shrink-0 place-items-center rounded-full transition-all duration-200'

export default function MobileBottomNav() {
  const { cartCount } = useShop()
  const [catSheetOpen, setCatSheetOpen] = useState(false)

  const itemClass = (isActive) =>
    `flex h-16 w-full flex-col items-center justify-center gap-1 ${
      isActive ? 'text-white' : 'text-white/70'
    }`

  return (
    <>
      <nav
        aria-label="ناوبری موبایل"
        className="fixed inset-x-0 bottom-0 z-40 rounded-t-[1.35rem] border-t border-ink/10 bg-primary shadow-top md:hidden"
      >
        <ul className="grid grid-cols-5 pb-safe">
          {items.map(({ to, label, icon: Icon, end }) => (
            <li key={to + label}>
              <NavLink to={to} end={end} className={({ isActive }) => itemClass(isActive)}>
                {({ isActive }) => (
                  <>
                    <span className={`${iconPill} ${isActive ? 'scale-105 bg-orange' : ''}`}>
                      <Icon size={21} strokeWidth={isActive ? 2.2 : 1.8} className={isActive ? 'text-ink' : ''} />
                    </span>
                    <span className="text-[11px] font-bold leading-none">
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}

          <li>
            <button
              type="button"
              onClick={() => setCatSheetOpen(true)}
              className="flex h-16 w-full flex-col items-center justify-center gap-1 text-white/70 transition-colors active:text-white"
              aria-label="دسته‌بندی‌ها"
            >
              <span className={iconPill}>
                <LayoutGrid size={21} strokeWidth={1.8} />
              </span>
              <span className="text-[11px] font-bold leading-none">دسته‌بندی</span>
            </button>
          </li>

          <li>
            <Link
              to="/cart"
              className="relative flex h-16 w-full flex-col items-center justify-center gap-1 text-white/70 transition-colors aria-[current=page]:text-white"
            >
              <span className={iconPill}>
                <ShoppingBag size={21} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -end-0.5 -top-1 grid h-[16px] min-w-[16px] place-items-center rounded-full bg-orange px-1 text-[9px] font-black leading-none text-ink ring-2 ring-primary">
                    {toFa(cartCount)}
                  </span>
                )}
              </span>
              <span className="text-[11px] font-bold leading-none">سبد خرید</span>
            </Link>
          </li>

          <li>
            <NavLink to="/account" className={({ isActive }) => itemClass(isActive)}>
              {({ isActive }) => (
                <>
                  <span className={`${iconPill} ${isActive ? 'scale-105 bg-orange' : ''}`}>
                    <User size={21} strokeWidth={isActive ? 2.2 : 1.8} className={isActive ? 'text-ink' : ''} />
                  </span>
                  <span className="text-[11px] font-bold leading-none">حساب من</span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>

      <CategorySheet open={catSheetOpen} onClose={() => setCatSheetOpen(false)} />
    </>
  )
}
