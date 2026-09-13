import { Star } from 'lucide-react'
import { toFa } from '../../lib/format'

export default function Rating({ value, count, showValue = true }) {
  const rounded = Math.round(value)
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5" dir="ltr" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={13}
            strokeWidth={0}
            className={i <= rounded ? 'fill-orange' : 'fill-line'}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-mute">
          {toFa(value)}
          {count ? ` (${toFa(count)})` : ''}
        </span>
      )}
    </div>
  )
}
