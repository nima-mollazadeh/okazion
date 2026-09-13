import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { categories } from '../../data/categories'
import { products } from '../../data/products'
import SmartImage from '../ui/SmartImage'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import { toFa } from '../../lib/format'

export default function CategoryGrid() {
  const countOf = (slug) => products.filter((p) => p.category === slug).length

  return (
    <section
      aria-label="دسته‌بندی‌ها"
      className="mx-auto max-w-[1320px] px-4 py-10 md:px-6 md:py-14 lg:px-8"
    >
      <SectionHeader
        title="چی دوست داری؟"
        linkTo="/shop"
        linkLabel="همهٔ دسته‌ها"
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {categories.map((cat, i) => (
          <Reveal key={cat.slug} delay={(i % 4) * 60}>
            <Link
              to={`/shop?cat=${cat.slug}`}
              className="group flex h-full flex-col"
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-2xl md:rounded-3xl ${cat.tint}`}
              >
                <SmartImage
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between px-1.5 pb-1 pt-2.5 md:px-2">
                <div className="flex flex-col">
                  <span className="text-[13.5px] font-black text-ink md:text-[15px]">
                    {cat.name}
                  </span>
                  <span className="mt-0.5 text-[10.5px] font-semibold text-mute">
                    {toFa(countOf(cat.slug))} محصول
                  </span>
                </div>
                <span className="grid h-6 w-6 -translate-x-1 place-items-center rounded-full bg-mist text-orange opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  <ChevronLeft size={13} strokeWidth={2.4} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
