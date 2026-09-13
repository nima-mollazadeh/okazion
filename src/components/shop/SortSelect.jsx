import { useEffect, useRef, useState } from 'react'
import { ArrowUpDown, Check, ChevronDown } from 'lucide-react'

export const sortOptions = [
  { value: 'popular', label: 'محبوب‌ترین' },
  { value: 'newest', label: 'جدیدترین' },
  { value: 'bestselling', label: 'پرفروش‌ترین' },
  { value: 'cheap', label: 'ارزان‌ترین' },
  { value: 'expensive', label: 'گران‌ترین' },
]

/** منوی بازشوی مرتب‌سازی برای دسکتاپ */
export default function SortSelect({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = sortOptions.find((s) => s.value === value) ?? sortOptions[0]

  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-[13px] font-bold text-ink transition-colors hover:border-orange"
      >
        <ArrowUpDown size={14} strokeWidth={2.2} className="text-orange" />
        {current.label}
        <ChevronDown
          size={14}
          strokeWidth={2.4}
          className={`text-mute transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute end-0 top-full z-30 mt-2 w-44 animate-pop-in rounded-2xl border border-line bg-white p-1.5 shadow-lift"
        >
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-[13px] transition-colors ${
                opt.value === value
                  ? 'bg-mist font-black text-ink'
                  : 'font-semibold text-ink/80 hover:bg-mist'
              }`}
            >
              {opt.label}
              {opt.value === value && <Check size={14} strokeWidth={2.6} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
