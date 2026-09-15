import { Link } from 'react-router-dom'
import { Heart, Send } from 'lucide-react'
import { InstagramIcon as Instagram } from '../ui/icons'
import { useShop } from '../../context/ShopContext'
import Logo from '../ui/Logo'

const shopLinks = [
  { label: 'فروشگاه', to: '/shop' },
  { label: 'دسته‌بندی‌ها', to: '/shop' },
  { label: 'برندها', to: '/#brands' },
  { label: 'درباره ما', to: '/about' },
  { label: 'تماس با ما', to: '/about#support' },
  { label: 'سوالات متداول', to: '/about#faq' },
]

const serviceLinks = [
  { label: 'پشتیبانی', to: '/about#support' },
  { label: 'پیگیری سفارش', to: '/account' },
  { label: 'روش‌های ارسال', to: '/about#shipping' },
  { label: 'شرایط بازگشت', to: '/about#returns' },
]

export default function Footer() {
  const { pushToast } = useShop()

  const subscribe = (e) => {
    e.preventDefault()
    const input = e.currentTarget.querySelector('input')
    if (input.value.trim()) {
      pushToast('این بخش در نسخهٔ نمایشی فعال است — از همراهی‌تان ممنونیم')
      input.value = ''
    }
  }

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1320px] px-4 pb-6 pt-12 sm:px-6 md:pt-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-4 max-w-[260px] text-[13px] leading-7 text-white/60">
              هر روز، یک فرصت تازه.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href="https://instagram.com/ekazion"
                target="_blank"
                rel="noreferrer"
                aria-label="اینستاگرام اکازیون"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-all hover:border-white/40 hover:bg-white/10"
              >
                <Instagram size={17} strokeWidth={1.8} />
              </a>
              <a
                href="https://t.me/ekazion"
                target="_blank"
                rel="noreferrer"
                aria-label="تلگرام اکازیون"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition-all hover:border-white/40 hover:bg-white/10"
              >
                <Send size={17} strokeWidth={1.8} />
              </a>
            </div>
          </div>

          <nav aria-label="فروشگاه">
            <h3 className="mb-4 text-[13px] font-black text-white/90">فروشگاه</h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="خدمات مشتریان">
            <h3 className="mb-4 text-[13px] font-black text-white/90">
              خدمات مشتریان
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-[13px] font-black text-white/90">
              از تخفیف‌ها جا نمان
            </h3>
            <p className="mb-4 text-[12.5px] leading-6 text-white/60">
              هر هفته یک ایمیل کوتاه؛ محصولات تازه، تخفیف‌ها و ایده‌های هدیه.
            </p>
            <form onSubmit={subscribe} className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10 p-1">
              <input
                type="email"
                required
                placeholder="ایمیل شما"
                className="h-10 min-w-0 flex-1 bg-transparent px-4 text-[13px] text-white outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                className="h-10 shrink-0 rounded-full bg-orange px-5 text-[12.5px] font-black text-ink transition-colors hover:bg-white hover:text-ink"
              >
                ثبت
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-6 text-[11px] text-white/45 md:flex-row md:pb-2">
          <p>© ۱۴۰۴ اکازیون — تمام حقوق محفوظ است.</p>
          <p className="flex items-center gap-1.5">
            ساخته‌شده با
            <Heart size={12} strokeWidth={0} className="fill-white" />
            در ایران
          </p>
        </div>
      </div>
    </footer>
  )
}
