import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ChevronLeft,
  CircleCheck,
  Heart,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react'
import { getProduct, products } from '../data/products'
import { getBrand } from '../data/brands'
import { getCategory } from '../data/categories'
import { useShop } from '../context/ShopContext'
import SmartImage from '../components/ui/SmartImage'
import Badge from '../components/ui/Badge'
import Price from '../components/ui/Price'
import Rating from '../components/ui/Rating'
import QtyStepper from '../components/ui/QtyStepper'
import Button from '../components/ui/Button'
import ProductCarousel from '../components/product/ProductCarousel'
import Reveal from '../components/ui/Reveal'
import { discountPercent, formatPrice, toFa } from '../lib/format'

const TABS = [
  { id: 'desc', label: 'توضیحات' },
  { id: 'specs', label: 'مشخصات' },
  { id: 'shipping', label: 'ارسال و مرجوعی' },
]

function Gallery({ product }) {
  const gallery = [product.image, ...product.gallery]
  const [active, setActive] = useState(0)
  const trackRef = useRef(null)
  const [scrollIdx, setScrollIdx] = useState(0)

  /* ایندکس اسلاید نزدیک‌تر به مرکز — مستقل از جهت و عرض اسلایدها */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const trackRect = track.getBoundingClientRect()
        const center = trackRect.left + track.clientWidth / 2
        let best = 0
        let bestDist = Infinity
        ;[...track.children].forEach((slide, i) => {
          const r = slide.getBoundingClientRect()
          const d = Math.abs(r.left + r.width / 2 - center)
          if (d < bestDist) {
            bestDist = d
            best = i
          }
        })
        setScrollIdx(best)
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  /* فقط کانتینر گالری می‌لغزد؛ صفحه جابه‌جا نمی‌شود */
  const scrollTo = (i) => {
    const track = trackRef.current
    const slide = track?.children[i]
    if (!track || !slide) return
    const delta =
      slide.getBoundingClientRect().left -
      track.getBoundingClientRect().left -
      (track.clientWidth - slide.offsetWidth) / 2
    track.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <div>
      {/* گالری موبایل — اسکرول افقی */}
      <div className="lg:hidden">
        <div
          ref={trackRef}
          className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide"
        >
          {gallery.map((img, i) => (
            <div
              key={i}
              className="aspect-square w-[85%] shrink-0 snap-center overflow-hidden rounded-3xl bg-mist"
            >
              <SmartImage
                src={img}
                alt={`${product.name} — تصویر ${i + 1}`}
                eager={i === 0}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          {gallery.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`تصویر ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === scrollIdx ? 'w-6 bg-orange' : 'w-1.5 bg-line'
              }`}
            />
          ))}
        </div>
      </div>

      {/* گالری دسکتاپ */}
      <div className="hidden lg:block">
        <div className="aspect-square overflow-hidden rounded-3xl bg-mist">
          <SmartImage
            key={active}
            src={gallery[active]}
            alt={product.name}
            eager
            className="h-full w-full animate-fade-in object-cover"
          />
        </div>
        <div className="mt-4 flex gap-3">
          {gallery.map((img, i) => (
            <button
              key={i}
              type="button"
              aria-label={`نمایش تصویر ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-20 w-20 overflow-hidden rounded-2xl border-2 transition-all ${
                i === active
                  ? 'border-orange opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <SmartImage
                src={img}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const { addToCart, favorites, toggleFavorite } = useShop()
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('desc')

  useEffect(() => {
    document.title = product
      ? `${product.name} | اکازیون`
      : 'محصول پیدا نشد | اکازیون'
    setQty(1)
    setTab('desc')
  }, [slug, product])

  if (!product) {
    return (
      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="text-[5rem] font-black leading-none text-sage">؟</span>
        <h1 className="text-xl font-black text-ink">این محصول پیدا نشد</h1>
        <p className="text-[13px] text-mute">
          شاید آدرس اشتباه باشد یا محصول از فروشگاه حذف شده باشد.
        </p>
        <Button to="/shop">رفتن به فروشگاه</Button>
      </div>
    )
  }

  const brand = getBrand(product.brand)
  const category = getCategory(product.category)
  const off = discountPercent(product.price, product.oldPrice)
  const savings = product.oldPrice ? product.oldPrice - product.price : 0
  const isFav = favorites.includes(product.id)

  const related = [
    ...products.filter(
      (p) => p.category === product.category && p.id !== product.id,
    ),
    ...products.filter(
      (p) => p.category !== product.category && p.isBestSeller,
    ),
  ].slice(0, 8)

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-5 md:px-6 md:py-10 lg:px-8">
      {/* مسیر */}
      <Reveal>
        <nav className="flex flex-wrap items-center text-[11px] text-mute" aria-label="مسیر صفحه">
          <Link to="/" className="transition-colors hover:text-ink">خانه</Link>
          <ChevronLeft size={12} className="mx-1" />
          <Link to="/shop" className="transition-colors hover:text-ink">فروشگاه</Link>
          <ChevronLeft size={12} className="mx-1" />
          <Link
            to={`/shop?cat=${product.category}`}
            className="transition-colors hover:text-ink"
          >
            {category?.name}
          </Link>
          <ChevronLeft size={12} className="mx-1" />
          <span className="font-semibold text-ink">{product.name}</span>
        </nav>
      </Reveal>

      <div className="mt-5 grid gap-8 lg:mt-8 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <Gallery product={product} />
        </Reveal>

        {/* اطلاعات محصول */}
        <Reveal delay={80}>
          <div>
            <div className="flex items-center justify-between gap-3">
              <Link
                to={`/shop?brand=${product.brand}`}
                className="rounded-full bg-mist px-3 py-1 text-[12.5px] font-black text-ink transition-opacity hover:opacity-75"
              >
                {brand?.name}
              </Link>
              <Rating value={product.rating} count={product.reviewsCount} />
            </div>

            <h1 className="mt-2 text-[1.7rem] font-black leading-snug tracking-tight text-ink md:text-[1.9rem]">
              {product.name}
            </h1>
            <p className="mt-1.5 text-[12px] font-semibold text-mute">
              {toFa(product.sold)} فروش موفق
            </p>

            {/* قیمت */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl bg-mist p-4 md:p-5">
              <Price price={product.price} oldPrice={product.oldPrice} size="lg" />
              {off > 0 && <Badge variant="discount">{toFa(off)}٪ تخفیف</Badge>}
              {savings > 0 && (
                <span className="text-[12px] font-black text-ink">
                  {formatPrice(savings)} ارزان‌تر
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sage bg-white px-3 py-1.5 text-[11.5px] font-black text-ink">
                <CircleCheck size={13} strokeWidth={2.2} className="text-orange" />
                موجود در انبار
              </span>
              {product.isNew && <Badge variant="new">جدید</Badge>}
              {product.isBestSeller && <Badge variant="soft">پرفروش</Badge>}
            </div>

            {/* تعداد و علاقه‌مندی */}
            <div className="mt-6 flex items-center gap-3">
              <QtyStepper value={qty} onChange={setQty} />
              <button
                type="button"
                onClick={() => toggleFavorite(product.id)}
                aria-pressed={isFav}
                aria-label={
                  isFav ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'
                }
                className={`grid h-12 w-12 place-items-center rounded-full border transition-all active:scale-95 ${
                  isFav
                    ? 'border-orange bg-orange text-ink'
                    : 'border-line bg-white text-mute hover:border-orange hover:text-orange'
                }`}
              >
                <Heart size={19} strokeWidth={2} className={isFav ? 'fill-ink' : ''} />
              </button>
            </div>

            {/* دکمهٔ خرید */}
            <div className="mt-5">
              <Button
                variant="orange"
                size="xl"
                radius="rounded-xl"
                className="w-full"
                onClick={() => addToCart(product.id, qty, { openDrawer: true })}
              >
                <ShoppingBag size={20} strokeWidth={2.1} />
                افزودن به سبد خرید
              </Button>
            </div>

            {/* اطلاعات ارسال */}
            <ul className="mt-6 space-y-3 rounded-2xl border border-line bg-white p-4 text-[12px] font-semibold text-ink/80">
              <li className="flex items-center gap-2.5">
                <Truck size={16} strokeWidth={1.9} className="text-orange" />
                ارسال با پست پیشتاز، ۲ تا ۴ روز کاری
              </li>
              <li className="flex items-center gap-2.5">
                <RotateCcw size={16} strokeWidth={1.9} className="text-orange" />
                تا ۷ روز ضمانت بازگشت بدون قید و شرط
              </li>
              <li className="flex items-center gap-2.5">
                <ShieldCheck size={16} strokeWidth={1.9} className="text-orange" />
                ضمانت اصالت و سلامت فیزیکی کالا
              </li>
            </ul>

            {/* تب‌ها */}
            <div className="mt-8">
              <div
                role="tablist"
                className="flex gap-1 border-b border-line"
              >
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={tab === t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`-mb-px border-b-2 px-4 py-3 text-[13.5px] transition-colors ${
                      tab === t.id
                        ? 'border-orange font-black text-ink'
                        : 'border-transparent font-semibold text-mute hover:text-ink'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="pt-5 text-[13.5px] leading-8 text-ink/80">
                {tab === 'desc' && (
                  <div className="space-y-4">
                    <p>{product.description}</p>
                    <ul className="space-y-2">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5">
                          <CircleCheck
                            size={15}
                            strokeWidth={2}
                            className="shrink-0 text-orange"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {tab === 'specs' && (
                  <dl className="divide-y divide-dashed divide-line">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between gap-4 py-3"
                      >
                        <dt className="font-semibold text-mute">{key}</dt>
                        <dd className="font-bold text-ink">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {tab === 'shipping' && (
                  <div className="space-y-3">
                    <p>
                      سفارش‌های اکازیون با پست پیشتاز و در تهران با پیک ارسال
                      می‌شوند. بسته‌بندی همهٔ محصولات ضدضربه است و ماگ‌ها و
                      اقلام شکستنی با فوم دولایه ارسال می‌شوند.
                    </p>
                    <p>
                      اگر به هر دلیلی از خریدت راضی نبودی، تا ۷ روز بعد از
                      تحویل می‌توانی سفارش را برگردانی؛ کافی است با پشتیبانی
                      هماهنگ کنی.
                    </p>
                    <p className="font-black text-ink">
                      ارسال سفارش‌های بالای ۱ میلیون تومان رایگان است.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* محصولات مشابه */}
      <div className="mt-12 md:mt-16">
        <ProductCarousel
          title="محصولات مشابه"
          products={related}
          linkTo={`/shop?cat=${product.category}`}
        />
      </div>
    </div>
  )
}
