import { Minus, Plus } from 'lucide-react'
import { toFa } from '../../lib/format'

export default function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  size = 'md',
  className = '',
}) {
  const btn =
    size === 'sm'
      ? 'h-7 w-7 [&_svg]:h-3.5 [&_svg]:w-3.5'
      : 'h-9 w-9 [&_svg]:h-4 [&_svg]:w-4'
  return (
    <div
      className={`inline-flex select-none items-center gap-0.5 rounded-full border border-line bg-white p-1 ${className}`}
      role="group"
      aria-label="تعداد"
    >
      <button
        type="button"
        aria-label="افزایش تعداد"
        className={`${btn} grid place-items-center rounded-full text-ink transition-colors hover:bg-mist disabled:opacity-30`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(value + 1, max))}
      >
        <Plus strokeWidth={2.2} />
      </button>
      <span
        className={`grid min-w-8 place-items-center text-center font-extrabold tabular-nums ${
          size === 'sm' ? 'text-xs' : 'text-sm'
        }`}
      >
        {toFa(value)}
      </span>
      <button
        type="button"
        aria-label="کاهش تعداد"
        className={`${btn} grid place-items-center rounded-full text-ink transition-colors hover:bg-mist disabled:opacity-30`}
        disabled={value <= min && min !== 0}
        onClick={() => onChange(Math.max(value - 1, min))}
      >
        <Minus strokeWidth={2.2} />
      </button>
    </div>
  )
}
