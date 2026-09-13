import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useShop } from '../../context/ShopContext'
import SmartImage from '../ui/SmartImage'
import Badge from '../ui/Badge'
import Price from '../ui/Price'
import { getBrand } from '../../data/brands'
import { discountPercent, toFa } from '../../lib/format'

export default function ProductCard({ product, eager = false }) {
  const { favorites, toggleFavorite, addToCart } = useShop()
  const isFav = favorites.includes(product.id)
  const off = discountPercent(product.price, product.oldPrice)
  const brand = getBrand(product.brand)

  return (
    <article className="group flex h-full flex-col">
      <div className="relative overflow-hidden rounded-2xl bg-mist transition-shadow duration-300 group-hover:shadow-lift">
        <Link
          to={`/product/${product.slug}`}
          aria-label={product.name}
          className="block aspect-square"
        >
          <SmartImage
            src={product.image}
            alt={product.name}
            eager={eager}
            className="h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.06]"
          />
        </Link>

        <div className="absolute start-2.5 top-2.5 flex flex-col items-start gap-1.5">
          {off > 0 && <Badge variant="discount">{toFa(off)}٪ تخفیف</Badge>}
          {product.isNew && <Badge variant="new">جدید</Badge>}
        </div>

        <button
          type="button"
          aria-label={
            isFav ? `حذف ${product.name} از علاقه‌مندی‌ها` : `افزودن ${product.name} به علاقه‌مندی‌ها`
          }
          aria-pressed={isFav}
          onClick={() => toggleFavorite(product.id)}
          className={`absolute end-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full shadow-soft backdrop-blur transition-all duration-200 active:scale-90 ${
            isFav
              ? 'bg-orange text-ink'
              : 'bg-white/90 text-mute hover:bg-white hover:text-ink'
          }`}
        >
          <Heart
            size={16}
            strokeWidth={2}
            className={isFav ? 'fill-ink' : ''}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1 pt-3">
        <Link
          to={`/product/${product.slug}`}
          className="line-clamp-1 text-[14px] font-black leading-7 text-ink transition-colors hover:text-ink/70 md:text-[15px]"
        >
          {product.name}
        </Link>
        <Link
          to={`/shop?brand=${product.brand}`}
          className="text-[11.5px] font-semibold text-mute transition-colors hover:text-ink"
        >
          {brand?.name}
        </Link>
        <Price price={product.price} oldPrice={product.oldPrice} className="mt-1" />
        <button
          type="button"
          aria-label={`افزودن ${product.name} به سبد خرید`}
          onClick={() => addToCart(product.id)}
          className="mt-2.5 flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-orange text-[12px] font-black text-ink shadow-soft transition-all duration-200 hover:bg-ink hover:text-white active:scale-[.97] md:text-[12.5px]"
        >
          <ShoppingBag size={15} strokeWidth={2.2} />
          افزودن به سبد
        </button>
      </div>
    </article>
  )
}
