import { Link } from 'react-router-dom'
import {
  Armchair,
  Coffee,
  Gem,
  HandHeart,
  PenTool,
  Shapes,
} from 'lucide-react'
import { showcaseBrands } from '../../data/brands'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'

const brandIcons = {
  'studio-sabz': Coffee,
  'khane-tarh': Shapes,
  'design-lab': PenTool,
  'art-home': Armchair,
  nora: Gem,
  'dast-saz': HandHeart,
}

export default function BrandShowcase() {
  return (
    <section
      id="brands"
      aria-label="برندها و هنرمندان منتخب"
      className="scroll-mt-24 bg-white py-10 md:py-14"
    >
      <div className="mx-auto max-w-[1320px] px-4 md:px-6 lg:px-8">
        <SectionHeader title="برندها و هنرمندان منتخب" />
        <Reveal delay={60}>
          <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 scrollbar-hide md:mx-0 md:grid md:grid-cols-6 md:gap-5 md:overflow-visible md:px-0">
            {showcaseBrands.map((brand) => {
              const Icon = brandIcons[brand.slug] ?? Shapes
              return (
                <Link
                  key={brand.slug}
                  to={`/shop?brand=${brand.slug}`}
                  className="group flex w-24 shrink-0 snap-start flex-col items-center gap-3 md:w-auto"
                >
                  <span className="grid h-24 w-24 place-items-center rounded-full bg-orange text-ink transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lift md:h-[9.5rem] md:w-[9.5rem]">
                    <Icon size={52} strokeWidth={1.6} className="md:h-[84px] md:w-[84px]" />
                  </span>
                  <span className="text-center">
                    <span className="block text-[13.5px] font-black text-ink transition-colors group-hover:text-ink/70">
                      {brand.name}
                    </span>
                    <span className="mt-1 block text-[10.5px] leading-4 text-mute">
                      {brand.tagline}
                    </span>
                  </span>
                </Link>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
