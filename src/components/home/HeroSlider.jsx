import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { heroSlides } from '../../data/slides'
import SmartImage from '../ui/SmartImage'
import Reveal from '../ui/Reveal'

const AUTOPLAY_MS = 5500

/**
 * اسلایدر بنر — فقط تصویر؛ پخش خودکار با توقف هنگام هاور و لمس،
 * نقطه‌ها و کنترل‌های دسکتاپ و سوایپ لمسی.
 */
export default function HeroSlider() {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const indexRef = useRef(0)
  const pausedRef = useRef(false)

  /* فقط کانتینر اسلایدر را می‌لغزاند؛ صفحه را جابه‌جا نمی‌کند */
  const scrollToIndex = (i) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({
      left: -i * track.clientWidth,
      behavior: 'smooth',
    })
  }

  /* ردیابی اسلاید فعال هنگام اسکرول/سوایپ */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const w = track.clientWidth || 1
        const i = Math.min(
          Math.max(Math.round(Math.abs(track.scrollLeft) / w), 0),
          heroSlides.length - 1,
        )
        if (i !== indexRef.current) {
          indexRef.current = i
          setIndex(i)
        }
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  /* پخش خودکار با توقف هنگام هاور، لمس و مخفی‌بودن صفحه */
  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current || document.hidden) return
      scrollToIndex((indexRef.current + 1) % heroSlides.length)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [])

  const go = (dir) => {
    const next =
      (indexRef.current + dir + heroSlides.length) % heroSlides.length
    scrollToIndex(next)
  }

  return (
    <section
      aria-label="بنرهای اکازیون"
      className="mx-auto max-w-[1320px] px-4 pt-4 md:px-6 md:pt-6 lg:px-8"
    >
      <Reveal>
        <div
          className="relative"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          onPointerDown={() => (pausedRef.current = true)}
          onPointerUp={() => (pausedRef.current = false)}
          onPointerCancel={() => (pausedRef.current = false)}
        >
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
          >
            {heroSlides.map((slide, index) => (
              <div key={slide.id} className="w-full flex-none snap-start">
                <div className="aspect-[16/9] overflow-hidden rounded-3xl bg-mist md:aspect-[2.4/1] lg:aspect-[2.9/1]">
                  <SmartImage
                    src={slide.image}
                    alt={slide.alt}
                    eager={index === 0}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* کنترل‌های دسکتاپ */}
          <button
            type="button"
            aria-label="اسلاید قبلی"
            onClick={() => go(-1)}
            className="absolute start-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-ink shadow-soft backdrop-blur transition-all hover:scale-105 hover:bg-white md:grid"
          >
            <ChevronRight size={20} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            aria-label="اسلاید بعدی"
            onClick={() => go(1)}
            className="absolute end-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-ink shadow-soft backdrop-blur transition-all hover:scale-105 hover:bg-white md:grid"
          >
            <ChevronLeft size={20} strokeWidth={2.2} />
          </button>

          {/* نقطه‌ها */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`رفتن به اسلاید ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-7 bg-orange'
                    : 'w-2 bg-white/70 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
