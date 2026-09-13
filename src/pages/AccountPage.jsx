import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Heart,
  LogOut,
  MapPin,
  Package,
  Plus,
  Settings,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { getProductById } from '../data/products'
import { sampleOrders, orderStatusMeta } from '../data/orders'
import ProductCard from '../components/product/ProductCard'
import SmartImage from '../components/ui/SmartImage'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import { formatPrice, toFa } from '../lib/format'

const TABS = [
  { id: 'orders', label: 'سفارش‌های من', icon: Package },
  { id: 'favorites', label: 'علاقه‌مندی‌ها', icon: Heart },
  { id: 'addresses', label: 'آدرس‌ها', icon: MapPin },
]

const addresses = [
  {
    id: 1,
    label: 'خانه',
    isDefault: true,
    text: 'تهران، خیابان ولیعصر، کوچهٔ بهار، پلاک ۱۲، واحد ۳',
    postal: '۱۳۶۷۷۳۳۳۱۱',
  },
  {
    id: 2,
    label: 'محل کار',
    isDefault: false,
    text: 'تهران، خیابان کارگر شمالی، برج نور، طبقهٔ ۷',
    postal: '۱۵۱۸۸۳۳۳۱۴',
  },
]

function OrdersTab() {
  return (
    <div className="space-y-4">
      {sampleOrders.map((order) => {
        const items = order.items
          .map(({ productId, qty }) => ({ product: getProductById(productId), qty }))
          .filter((i) => i.product)
        const total = items.reduce(
          (sum, i) => sum + i.product.price * i.qty,
          0,
        )
        const meta = orderStatusMeta[order.status]
        return (
          <article
            key={order.id}
            className="overflow-hidden rounded-2xl border border-line bg-white"
          >
            <header className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-mist/50 px-4 py-3 md:px-5">
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-black text-ink" dir="ltr">
                  {order.id}
                </span>
                <span className="text-[11px] text-mute">{order.date}</span>
              </div>
              <span
                className={`rounded-full border px-2.5 py-1 text-[10px] font-black ${meta.className}`}
              >
                {meta.label}
              </span>
            </header>
            <div className="flex items-center gap-3 px-4 py-3.5 md:px-5">
              <div className="flex -space-x-2.5">
                {items.map(({ product }) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="h-12 w-12 overflow-hidden rounded-xl border-2 border-white bg-mist"
                  >
                    <SmartImage
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                ))}
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-[12px] font-bold text-ink">
                  {items.map(({ product, qty }) => `${product.name} × ${toFa(qty)}`).join('، ')}
                </p>
                <p className="mt-1 text-[11px] text-mute">
                  {toFa(items.reduce((s, i) => s + i.qty, 0))} کالا
                </p>
              </div>
              <span className="shrink-0 text-[13px] font-black text-ink">
                {formatPrice(total)}
              </span>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function FavoritesTab() {
  const { favorites } = useShop()
  const products = favorites.map(getProductById).filter(Boolean)

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-line bg-white/60 px-6 py-14 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-mist text-orange">
          <Heart size={26} strokeWidth={1.6} />
        </span>
        <div>
          <p className="font-black text-ink">هنوز چیزی لایک نکردی</p>
          <p className="mt-1 text-[12.5px] leading-6 text-mute">
            روی قلبِ گوشهٔ هر محصول بزن تا این‌جا ذخیره شود.
          </p>
        </div>
        <Button to="/shop" size="sm">رفتن به فروشگاه</Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-y-9 md:grid-cols-3 md:gap-x-6 md:gap-y-14 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function AddressesTab() {
  const { pushToast } = useShop()
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {addresses.map((addr) => (
        <div
          key={addr.id}
          className="rounded-2xl border border-line bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[13.5px] font-black text-ink">
              <MapPin size={15} strokeWidth={2} className="text-orange" />
              {addr.label}
            </span>
            {addr.isDefault && (
              <span className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-black text-orange">
                پیش‌فرض
              </span>
            )}
          </div>
          <p className="mt-3 text-[12.5px] leading-7 text-mute">{addr.text}</p>
          <p className="mt-1 text-[11.5px] font-semibold text-mute" dir="ltr">
            {addr.postal}
          </p>
        </div>
      ))}
      <button
        type="button"
        onClick={() => pushToast('افزودن آدرس به‌زودی فعال می‌شود')}
        className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line text-mute transition-colors hover:border-sage hover:text-orange"
      >
        <Plus size={20} strokeWidth={2} />
        <span className="text-[12.5px] font-bold">افزودن آدرس جدید</span>
      </button>
    </div>
  )
}

export default function AccountPage() {
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') ?? 'orders'
  const { favorites, pushToast } = useShop()

  useEffect(() => {
    document.title = 'حساب کاربری | اکازیون'
  }, [])

  const setTab = (id) => setParams(id === 'orders' ? {} : { tab: id }, { replace: true })

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-6 md:px-6 md:py-10 lg:px-8">
      {/* پروفایل */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-4 rounded-3xl bg-mist p-5 md:p-7">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-sage text-2xl font-black text-forest md:h-20 md:w-20">
            س
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-black text-ink md:text-xl">
              کاربر اکازیون
            </h1>
            <p className="mt-1 text-[12.5px] font-semibold text-mute" dir="ltr">
              ۰۹۱۲ ••• ۱۲۳۴
            </p>
            <p className="mt-0.5 text-[11px] text-mute">
              عضو خانوادهٔ اکازیون از شهریور ۱۴۰۴
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="تنظیمات حساب"
              onClick={() => pushToast('تنظیمات حساب به‌زودی فعال می‌شود')}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-mute transition-colors hover:text-orange"
            >
              <Settings size={17} strokeWidth={1.9} />
            </button>
            <button
              type="button"
              aria-label="خروج از حساب"
              onClick={() => pushToast('خروج از حساب به‌زودی فعال می‌شود')}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-mute transition-colors hover:text-red-500"
            >
              <LogOut size={17} strokeWidth={1.9} />
            </button>
          </div>
        </div>
      </Reveal>

      {/* تب‌ها */}
      <div className="mt-6 flex gap-1 overflow-x-auto rounded-full bg-mist p-1 scrollbar-hide">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = tab === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-pressed={isActive}
              className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-[12.5px] font-bold transition-all md:text-[13.5px] ${
                isActive
                  ? 'bg-white text-ink shadow-soft'
                  : 'text-ink/60 hover:text-ink'
              }`}
            >
              <Icon size={15} strokeWidth={2} />
              {label}
              {id === 'favorites' && favorites.length > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[9.5px] font-black text-orange">
                  {toFa(favorites.length)}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-6">
        {tab === 'orders' && <OrdersTab />}
        {tab === 'favorites' && <FavoritesTab />}
        {tab === 'addresses' && <AddressesTab />}
      </div>
    </div>
  )
}
