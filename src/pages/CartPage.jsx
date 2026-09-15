import { useEffect, useState } from 'react'
import { setMeta } from '../lib/seo'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  CircleCheck,
  ShoppingBag,
  Trash2,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import SmartImage from '../components/ui/SmartImage'
import QtyStepper from '../components/ui/QtyStepper'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import { formatPrice, toFa, FREE_SHIPPING_THRESHOLD } from '../lib/format'

function Summary({ onCheckout }) {
  const { subtotal, shipping } = useShop()
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)

  return (
    <div className="space-y-4 rounded-3xl border border-line bg-white p-5 md:p-6">
      <h2 className="text-[15.5px] font-black text-ink">خلاصهٔ سفارش</h2>

      {remaining > 0 ? (
        <div className="rounded-2xl bg-mist p-3.5">
          <p className="text-[12px] font-semibold leading-5 text-ink/75">
            با <span className="font-black text-ink">{formatPrice(remaining)}</span>{' '}
            خرید بیشتر، ارسالت رایگان می‌شود
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-orange transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <p className="rounded-2xl bg-mist p-3.5 text-[12px] font-black text-ink">
          ارسال این سفارش رایگان است
        </p>
      )}

      <div className="space-y-2.5 text-[13px]">
        <div className="flex justify-between text-mute">
          <span>جمع کالاها</span>
          <span className="font-bold text-ink">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-mute">
          <span>هزینهٔ ارسال</span>
          <span className="font-bold text-ink">
            {shipping === 0 ? 'رایگان' : formatPrice(shipping)}
          </span>
        </div>
        <div className="flex items-baseline justify-between border-t border-dashed border-line pt-3 text-base font-black text-ink">
          <span>مبلغ نهایی</span>
          <span>{formatPrice(subtotal + shipping)}</span>
        </div>
      </div>

      <Button variant="primary" size="lg" className="w-full" onClick={onCheckout}>
        ثبت سفارش
      </Button>
      <Button variant="ghost" to="/shop" className="w-full">
        ادامه خرید
      </Button>
    </div>
  )
}

export default function CartPage() {
  const { cartItems, cartCount, setQty, removeFromCart, clearCart } = useShop()
  const [placedOrder, setPlacedOrder] = useState(null)

  useEffect(() => {
    setMeta({ title: 'سبد خرید', path: '/cart' })
  }, [])

  const placeOrder = () => {
    const code = `SBZ-${Math.floor(1000 + Math.random() * 9000)}`
    clearCart()
    setPlacedOrder(code)
    window.scrollTo(0, 0)
  }

  if (placedOrder) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-5 px-4 py-16 text-center md:py-24">
        <span className="grid h-20 w-20 animate-pop-in place-items-center rounded-full bg-mist text-orange">
          <CircleCheck size={38} strokeWidth={1.6} />
        </span>
        <div>
          <h1 className="text-xl font-black text-ink md:text-2xl">
            سفارش شما ثبت شد!
          </h1>
          <p className="mt-2 text-[13px] leading-7 text-mute">
            کد پیگیری سفارش:{' '}
            <span className="font-black text-orange" dir="ltr">
              {placedOrder}
            </span>
            <br />
            جزئیات سفارش در صفحهٔ حساب کاربری‌تان قابل مشاهده است.
          </p>
          <p className="mt-3 rounded-2xl bg-mist px-4 py-2.5 text-[11px] font-semibold text-forest/70">
            این یک نسخهٔ نمایشی است؛ در فروشگاه واقعی این‌جا به درگاه پرداخت
            می‌رویم.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button to="/shop" variant="primary">
            بازگشت به فروشگاه
          </Button>
          <Button to="/account" variant="outline">
            پیگیری سفارش
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-6 md:px-6 md:py-10 lg:px-8">
      <Reveal>
        <nav className="flex items-center text-[11px] text-mute" aria-label="مسیر صفحه">
          <Link to="/" className="transition-colors hover:text-orange">خانه</Link>
          <ChevronLeft size={12} className="mx-1" />
          <span className="font-semibold text-ink">سبد خرید</span>
        </nav>
        <div className="mt-2 flex items-end justify-between gap-2">
          <h1 className="text-[1.75rem] font-black tracking-tight text-ink md:text-[2rem]">
            سبد خرید
          </h1>
          {cartCount > 0 && (
            <p className="text-[12.5px] font-semibold text-mute">
              {toFa(cartCount)} کالا
            </p>
          )}
        </div>
      </Reveal>

      {cartItems.length === 0 ? (
        <Reveal delay={60}>
          <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-line bg-white/60 px-6 py-16 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-mist text-orange">
              <ShoppingBag size={32} strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-lg font-black text-ink">سبد خریدت خالی است</p>
              <p className="mt-1.5 text-[13px] leading-7 text-mute">
                هنوز چیزی انتخاب نکردی؛ فرصت‌های امروز منتظرت هستند.
              </p>
            </div>
            <Button to="/shop">رفتن به فروشگاه</Button>
          </div>
        </Reveal>
      ) : (
        <div className="mt-6 gap-8 lg:grid lg:grid-cols-[1fr_380px]">
          {/* اقلام */}
          <Reveal>
            <ul className="space-y-3">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-2xl border border-line bg-white p-3.5 md:gap-4 md:p-4"
                >
                  <Link
                    to={`/product/${item.slug}`}
                    className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-mist md:h-28 md:w-28"
                  >
                    <SmartImage
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          to={`/product/${item.slug}`}
                          className="line-clamp-1 text-[13.5px] font-bold leading-6 text-ink transition-colors hover:text-orange md:text-[14.5px]"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-0.5 text-[11.5px] text-mute">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label={`حذف ${item.name} از سبد`}
                        onClick={() => removeFromCart(item.id)}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-mute transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={16} strokeWidth={1.9} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2 md:pt-3">
                      <QtyStepper
                        size="sm"
                        value={item.qty}
                        onChange={(q) => setQty(item.id, q)}
                        min={0}
                      />
                      <span className="text-[14px] font-black text-ink md:text-[15px]">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* خلاصه */}
          <Reveal delay={80} className="mt-6 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <Summary onCheckout={placeOrder} />
            </div>
          </Reveal>
        </div>
      )}
    </div>
  )
}
