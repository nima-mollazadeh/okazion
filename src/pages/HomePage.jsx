import { useEffect } from 'react'
import HeroSlider from '../components/home/HeroSlider'
import BrandShowcase from '../components/home/BrandShowcase'
import CategoryGrid from '../components/home/CategoryGrid'
import PromoBanner from '../components/home/PromoBanner'
import WhySabzineh from '../components/home/WhySabzineh'
import InstagramGrid from '../components/home/InstagramGrid'
import ProductCarousel from '../components/product/ProductCarousel'
import ProductCard from '../components/product/ProductCard'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'
import {
  bestSellerProducts,
  featuredProducts,
  newProducts,
} from '../data/products'

export default function HomePage() {
  useEffect(() => {
    document.title = 'اکازیون | هر روز، یک فرصت تازه'
  }, [])

  return (
    <>
      <h1 className="sr-only">
        اکازیون — فروشگاه آنلاین فرصت‌های ویژه
      </h1>
      <HeroSlider />
      <BrandShowcase />
      <CategoryGrid />

      {/* محبوب‌ترین‌ها */}
      <section
        aria-label="محبوب‌ترین محصولات"
        className="mx-auto max-w-[1320px] px-4 pb-10 md:px-6 md:pb-14 lg:px-8"
      >
        <SectionHeader
          title="محبوب‌ترین‌ها"
          linkTo="/shop?sort=popular"
        />
        <div className="grid grid-cols-1 gap-y-9 md:grid-cols-3 md:gap-x-6 md:gap-y-14 lg:grid-cols-4">
          {featuredProducts.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 60}>
              <ProductCard product={product} eager={i < 4} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* پرفروش‌ترین‌ها */}
      <section
        aria-label="پرفروش‌ترین محصولات"
        className="bg-white py-10 md:py-14"
      >
        <div className="mx-auto max-w-[1320px] px-4 md:px-6 lg:px-8">
          <ProductCarousel
            title="پرفروش‌ترین محصولات"
            products={bestSellerProducts}
            linkTo="/shop?sort=bestselling"
          />
        </div>
      </section>

      <PromoBanner />

      {/* تازه‌رسیده‌ها */}
      <section
        aria-label="تازه‌رسیده‌ها"
        className="mx-auto max-w-[1320px] px-4 pb-10 md:px-6 md:pb-14 lg:px-8"
      >
        <SectionHeader
          title="تازه‌رسیده‌ها"
          linkTo="/shop?sort=newest"
        />
        <div className="grid grid-cols-1 gap-y-9 md:grid-cols-3 md:gap-x-6 md:gap-y-14 lg:grid-cols-4">
          {newProducts.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 60}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      <WhySabzineh />
      <InstagramGrid />
    </>
  )
}
