import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'
import Reveal from '../ui/Reveal'

/**
 * کروسل افقی محصولات — اسکرول لمسی روی موبایل، دکمه‌های کناری روی دسکتاپ.
 */
export default function ProductCarousel({
  title,
  subtitle,
  products,
  linkTo,
  linkLabel = 'مشاهده همه',
  eager = false,
}) {
  const trackRef = useRef(null)

  const nudge = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[data-card]')
    const gap = 16
    const step = card ? card.offsetWidth + gap : 240
    /* در چیدمان راست‌به‌چپ، اسکرول به سمت «بعدی» مقدار منفی می‌گیرد */
    track.scrollBy({ left: -dir * step * 2, behavior: 'smooth' })
  }

  return (
    <section aria-label={title}>
      <Reveal className="mb-5 md:mb-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[1.3rem] font-black tracking-tight text-ink md:text-[1.7rem]">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1.5 text-[13.5px] leading-7 text-mute">{subtitle}</p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-1.5 md:flex">
              <button
                type="button"
                aria-label="اسکرول به عقب"
                onClick={() => nudge(-1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition-all hover:border-orange hover:text-ink active:scale-95"
              >
                <ChevronRight size={18} strokeWidth={2.2} />
              </button>
              <button
                type="button"
                aria-label="اسکرول به جلو"
                onClick={() => nudge(1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition-all hover:border-orange hover:text-ink active:scale-95"
              >
                <ChevronLeft size={18} strokeWidth={2.2} />
              </button>
            </div>
            {linkTo && (
              <Link
                to={linkTo}
                className="rounded-full bg-ink px-3.5 py-2 text-[12px] font-black text-orange transition-opacity hover:opacity-85"
              >
                {linkLabel}
              </Link>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div
          ref={trackRef}
          className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 scrollbar-hide md:mx-0 md:px-0"
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              data-card
              className="w-[43vw] max-w-[205px] shrink-0 snap-start sm:w-[210px] md:w-[228px] lg:w-[240px]"
            >
              <ProductCard product={product} eager={eager && i < 4} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
