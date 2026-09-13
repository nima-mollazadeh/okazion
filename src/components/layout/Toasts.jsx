import { CircleCheck, Heart } from 'lucide-react'
import { useShop } from '../../context/ShopContext'

const icons = {
  check: CircleCheck,
  heart: Heart,
}

export default function Toasts() {
  const { toasts } = useShop()

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-[70] flex flex-col items-center gap-2 px-4 md:bottom-8"
    >
      {toasts.map((toast) => {
        const Icon = icons[toast.icon] ?? CircleCheck
        return (
          <div
            key={toast.id}
            className="flex animate-toast-in items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[13px] font-bold text-white shadow-lift backdrop-blur"
          >
            <Icon
              size={16}
              strokeWidth={2.2}
              className={toast.icon === 'heart' ? 'fill-mint text-mint' : 'text-mint'}
            />
            {toast.message}
          </div>
        )
      })}
    </div>
  )
}
