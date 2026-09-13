import { formatPrice, toFa } from '../../lib/format'

export default function Price({
  price,
  oldPrice,
  size = 'md',
  className = '',
}) {
  return (
    <div className={`flex flex-wrap items-baseline gap-x-2 gap-y-0.5 ${className}`}>
      <span
        className={
          size === 'lg'
            ? 'text-[1.7rem] font-black text-ink md:text-[1.85rem]'
            : 'text-[15.5px] font-extrabold text-ink'
        }
      >
        {formatPrice(price)}
      </span>
      {oldPrice && oldPrice > price && (
        <span className="text-[12.5px] font-medium text-mute line-through">
          {toFa(oldPrice)}
        </span>
      )}
    </div>
  )
}
