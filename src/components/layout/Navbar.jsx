import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown, Heart, Search, ShoppingBag, User } from 'lucide-react'
import { useShop } from '../../context/ShopContext'
import { categories } from '../../data/categories'
import { products } from '../../data/products'
import Logo from '../ui/Logo'
import { toFa } from '../../lib/format'

const navLinkClass = ({ isActive }) =>
  `relative py-2 text-[14.5px] font-semibold transition-colors after:absolute after:-bottom-0.5 after:start-0 after:h-[2.5px] after:w-full after:origin-center after:scale-x-0 after:rounded-full after:bg-orange after:transition-transform after:duration-300 ${
    isActive
      ? 'text-white after:scale-x-100'
      : 'text-white/80 hover:text-white hover:after:scale-x-100'
  }`

const iconBtn =
  'relative grid h-10 w-10 place-items-center rounded-full text-white transition-all duration-200 hover:bg-white/15 hover:text-white active:scale-95'

function CountBadge({ count }) {
  if (!count) return null
  return (
    <span className="absolute -end-0.5 -top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-orange px-1 text-[9.5px] font-black leading-none text-ink ring-2 ring-primary">
      {toFa(count)}
    </span>
  )
}

export default function Navbar() {
  const { cartCount, favorites, setCartOpen } = useShop()
  const [searchOpen, setSearchOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const catTimeout = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  const submitSearch = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (q) {
      navigate(`/shop?q=${encodeURIComponent(q)}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  const openCats = () => {
    window.clearTimeout(catTimeout.current)
    setCatOpen(true)
  }
  const closeCats = () => {
    catTimeout.current = window.setTimeout(() => setCatOpen(false), 120)
  }

  const countByCategory = (slug) =>
    products.filter((p) => p.category === slug).length

  return (
    <header className="sticky top-0 z-40 hidden bg-primary md:block">
      <div className="mx-auto grid h-[4.5rem] max-w-[1320px] grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-8">
        <Link to="/" aria-label="اکازیون — صفحه اصلی" className="justify-self-start py-1">
          <Logo variant="neon" />
        </Link>

        <nav aria-label="ناوبری اصلی" className="flex items-center gap-7">
          <NavLink to="/" end className={navLinkClass}>
            خانه
          </NavLink>
          <NavLink to="/shop" className={navLinkClass}>
            فروشگاه
          </NavLink>

          <div
            className="relative"
            onMouseEnter={openCats}
            onMouseLeave={closeCats}
          >
            <button
              type="button"
              className={`relative flex items-center gap-1 py-2 text-[14.5px] font-semibold transition-colors ${
                catOpen ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
              aria-expanded={catOpen}
              onClick={() => setCatOpen((v) => !v)}
            >
              دسته‌بندی‌ها
              <ChevronDown
                size={14}
                strokeWidth={2.4}
                className={`transition-transform duration-200 ${catOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {catOpen && (
              <div className="absolute -start-6 top-full z-50 w-[21rem] animate-pop-in rounded-2xl border border-line bg-white p-2 shadow-lift">
                <div className="grid grid-cols-2 gap-0.5">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/shop?cat=${cat.slug}`}
                      onClick={() => setCatOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-colors hover:bg-mist"
                    >
                      <span className="text-[13.5px] font-bold text-ink">
                        {cat.name}
                      </span>
                      <span className="text-[11px] font-semibold text-mute">
                        {toFa(countByCategory(cat.slug))}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/shop"
                  onClick={() => setCatOpen(false)}
                  className="mt-1.5 block rounded-xl bg-mist px-3.5 py-2.5 text-center text-[13.5px] font-black text-ink transition-colors hover:bg-sage"
                >
                  مشاهده همه محصولات
                </Link>
              </div>
            )}
          </div>

          {/* برندها لنگرِ بخشی در صفحهٔ اصلی است؛ نباید حالت «فعال» بگیرد */}
          <Link
            to="/#brands"
            className="relative py-2 text-[14.5px] font-semibold text-ink/70 transition-colors after:absolute after:-bottom-0.5 after:start-0 after:h-[2.5px] after:w-full after:origin-center after:scale-x-0 after:rounded-full after:bg-ink after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100"
          >
            برندها
          </Link>
          <NavLink to="/about" className={navLinkClass}>
            درباره ما
          </NavLink>
        </nav>

        <div className="flex items-center justify-self-end gap-1">
          {searchOpen ? (
            <form onSubmit={submitSearch} className="animate-fade-in">
              <div className="relative">
                <Search
                  size={16}
                  strokeWidth={2.2}
                  className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-mute"
                />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => !query && setSearchOpen(false)}
              placeholder="جستجو…"
              className="h-10 w-52 rounded-full border border-line bg-white ps-10 pe-4 text-[13.5px] outline-none transition-colors placeholder:text-mute focus:border-orange"
            />
              </div>
            </form>
          ) : (
            <button
              type="button"
              aria-label="جستجو"
              className={iconBtn}
              onClick={() => setSearchOpen(true)}
            >
              <Search size={20} strokeWidth={1.9} />
            </button>
          )}

          <Link to="/account?tab=favorites" aria-label="حساب کاربری" className={iconBtn}>
            <User size={20} strokeWidth={1.9} />
          </Link>

          <Link
            to="/account?tab=favorites"
            aria-label="علاقه‌مندی‌ها"
            className={iconBtn}
          >
            <Heart size={20} strokeWidth={1.9} />
            <CountBadge count={favorites.length} />
          </Link>

          <button
            type="button"
            aria-label="سبد خرید"
            className={iconBtn}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={20} strokeWidth={1.9} />
            <CountBadge count={cartCount} />
          </button>
        </div>
      </div>
    </header>
  )
}
