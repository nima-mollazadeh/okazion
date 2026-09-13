import { ArrowLeft, Gift } from 'lucide-react'
import SmartImage from '../ui/SmartImage'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import { toFa } from '../../lib/format'
import { products } from '../../data/products'

export default function PromoBanner() {
  const giftMin = Math.min(
    ...products.filter((p) => p.category === 'gift').map((p) => p.price),
  )

  return (
    <section
      aria-label="مجموعهٔ هدیه"
      className="mx-auto max-w-[1320px] px-4 py-10 md:px-6 md:py-14 lg:px-8"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-forest md:rounded-4xl">
          {/* عناصر تزیینی */}
          <svg
            className="pointer-events-none absolute -start-16 -top-16 h-56 w-56 text-white/[.05]"
            viewBox="0 0 100 100"
            aria-hidden="true"
            fill="currentColor"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <svg
            className="pointer-events-none absolute -bottom-20 end-[42%] hidden h-48 w-48 text-white/[.04] md:block"
            viewBox="0 0 100 100"
            aria-hidden="true"
            fill="currentColor"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>

          <div className="relative grid items-center md:grid-cols-[1.05fr_1fr]">
            <div className="order-2 p-7 sm:p-10 md:order-1 md:p-14">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange px-3.5 py-1.5 text-[11px] font-black text-ink">
                <Gift size={12} strokeWidth={2.2} />
                مجموعهٔ هدیه
              </span>
              <h2 className="mt-4 text-[1.5rem] font-black leading-[1.4] tracking-tight text-white sm:text-3xl md:text-[2.3rem] md:leading-[1.35]">
                هدیه‌ای برای خودت
                <br />
                یا کسی که دوستش داری
              </h2>
              <p className="mt-4 max-w-md text-[14px] leading-8 text-white/65 md:text-[16px] md:leading-9">
                باکس‌های هدیهٔ اکازیون؛ چیدمان دستی، بسته‌بندی کتان و کارت پیام
                شخصی. فقط کافی است بگویی برای کیست.
              </p>
              <div className="mt-7">
                <Button to="/shop?cat=gift" variant="white" size="lg">
                  کشف مجموعهٔ هدیه
                  <ArrowLeft size={16} strokeWidth={2.4} />
                </Button>
              </div>
            </div>

            <div className="relative order-1 aspect-[16/10] md:order-2 md:aspect-auto md:h-[420px] lg:h-[460px]">
              <SmartImage
                src="/images/promo-gift.svg"
                alt="بسته‌بندی هدیهٔ اکازیون"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute bottom-4 start-4 rounded-full bg-white/90 px-4 py-2 text-[11.5px] font-black text-ink shadow-soft backdrop-blur">
                باکس‌های هدیه از {toFa(giftMin / 1000)} هزار تومان
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
