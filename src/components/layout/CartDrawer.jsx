import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Trash2, X } from 'lucide-react'
import { useShop } from '../../context/ShopContext'
import SmartImage from '../ui/SmartImage'
import QtyStepper from '../ui/QtyStepper'
import Button from '../ui/Button'
import { formatPrice, toFa, FREE_SHIPPING_THRESHOLD } from '../../lib/format'

export default function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cartItems,
    cartCount,
    setQty,
    removeFromCart,
    subtotal,
    shipping,
  } = useShop()

  useEffect(() => {
    if (!cartOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setCartOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [cartOpen, setCartOpen])

  if (!cartOpen) return null

  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="سبد خرید">
      <div
        className="absolute inset-0 animate-fade-in bg-black/60 backdrop-blur-[2px]"
        onClick={() => setCartOpen(false)}
      />

      <aside className="absolute inset-y-0 end-0 flex w-[92%] max-w-[420px] animate-drawer-end flex-col bg-cream shadow-lift">
        <header className="flex items-center justify-between border-b border-line bg-white px-5 py-4">
          <h2 className="flex items-center gap-2 text-base font-black text-ink">
            سبد خرید
            {cartCount > 0 && (
              <span className="grid h-6 min-w-6 place-items-center rounded-full bg-orange px-2 text-[11px] font-black text-ink">
                {toFa(cartCount)}
              </span>
            )}
          </h2>
          <button
            type="button"
            aria-label="بستن سبد خرید"
            onClick={() => setCartOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full text-mute transition-colors hover:bg-mist hover:text-ink"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </header>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-mist text-orange">
              <ShoppingBag size={34} strokeWidth={1.5} />
            </span>
            <div>
              <p className="font-black text-ink">سبد خریدت خالی است</p>
              <p className="mt-1 text-[13px] leading-6 text-mute">
                هنوز چیزی انتخاب نکردی؛ فرصت‌های امروز منتظرت هستند.
              </p>
            </div>
            <Button to="/shop" variant="primary" onClick={() => setCartOpen(false)}>
              رفتن به فروشگاه
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b border-line bg-white px-5 py-3.5">
              {remaining > 0 ? (
                <p className="text-[12px] font-semibold text-mute">
                  تا ارسال رایگان{' '}
                  <span className="font-black text-ink">{formatPrice(remaining)}</span>{' '}
                  مانده
                </p>
              ) : (
                <p className="text-[12px] font-black text-ink">
                  ارسال این سفارش رایگان است
                </p>
              )}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sage/70">
                <div
                  className="h-full rounded-full bg-orange transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 space-y-3 overflow-y-auto p-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-2xl border border-line bg-white p-3"
                >
                  <Link
                    to={`/product/${item.slug}`}
                    onClick={() => setCartOpen(false)}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-mist"
                  >
                    <SmartImage
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="line-clamp-1 text-[13px] font-bold leading-6 text-ink hover:text-orange"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        aria-label={`حذف ${item.name}`}
                        onClick={() => removeFromCart(item.id)}
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-mute transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={15} strokeWidth={1.9} />
                      </button>
                    </div>
                    <p className="mt-0.5 text-[11px] text-mute">
                      {formatPrice(item.price)}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QtyStepper
                        size="sm"
                        value={item.qty}
                        onChange={(q) => setQty(item.id, q)}
                        min={0}
                      />
                      <span className="text-[13px] font-black text-ink">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="space-y-3 border-t border-line bg-white p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
              <div className="space-y-1.5 text-[13px]">
                <div className="flex justify-between text-mute">
                  <span>جمع کل</span>
                  <span className="font-semibold text-ink">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-mute">
                  <span>هزینهٔ ارسال</span>
                  <span className="font-semibold text-ink">
                    {shipping === 0 ? 'رایگان' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-dashed border-line pt-2 text-[15px] font-black text-ink">
                  <span>مبلغ نهایی</span>
                  <span>{formatPrice(subtotal + shipping)}</span>
                </div>
              </div>
              <Button
                to="/cart"
                size="lg"
                className="w-full"
                onClick={() => setCartOpen(false)}
              >
                مشاهده سبد و ثبت سفارش
              </Button>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="w-full rounded-full py-2 text-[13px] font-bold text-mute transition-colors hover:text-ink"
              >
                ادامه خرید
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
