import { useEffect } from 'react'
import {
  ChevronDown,
  Clock,
  HandHeart,
  Leaf,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react'
import SmartImage from '../components/ui/SmartImage'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import { toFa } from '../lib/format'
import { products } from '../data/products'
import { showcaseBrands } from '../data/brands'

const values = [
  {
    icon: Sparkles,
    title: 'ساده و کاربردی',
    text: 'هر چیزی که به اکازیون راه پیدا کند باید یک کار مشخص و خوب انجام دهد؛ بدون اضافه‌کاری.',
  },
  {
    icon: Leaf,
    title: 'طبیعت در همه‌چیز',
    text: 'از پالت سبز و متریال‌های طبیعی تا بسته‌بندی قابل بازیافت؛ طبیعت نقش اول را دارد.',
  },
  {
    icon: HandHeart,
    title: 'دست‌ساز و اصیل',
    text: 'با هنرمندان و کارگاه‌های ایرانی کار می‌کنیم؛ چیزهایی که پشت‌شان یک آدم واقعی است.',
  },
]

const faqs = [
  {
    q: 'چطور سفارشم را پیگیری کنم؟',
    a: 'بعد از ثبت سفارش، کد پیگیری برایتان پیامک می‌شود و وضعیت لحظه‌ای آن در صفحهٔ «حساب من» قابل مشاهده است.',
  },
  {
    q: 'بسته‌بندی هدیه دارید؟',
    a: 'بله؛ همهٔ باکس‌های هدیه با کاغذ کرافت، روبان کتان و کارت پیام دست‌نویس ارسال می‌شوند و متن کارت را خودتان انتخاب می‌کنید.',
  },
  {
    q: 'اگر محصول نپسندم چه؟',
    a: 'تا ۷ روز بعد از تحویل، بدون هیچ سوالی می‌توانید سفارش را برگردانید و کل مبلغ به شما بازگردانده می‌شود.',
  },
]

function AnchorSection({ id, icon: Icon, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line py-10 first:border-0 md:py-12">
      <Reveal>
        <h2 className="flex items-center gap-2.5 text-lg font-black text-ink md:text-xl">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-mist text-orange">
            <Icon size={18} strokeWidth={1.8} />
          </span>
          {title}
        </h2>
      </Reveal>
      <Reveal delay={60}>
        <div className="mt-5 text-[13.5px] leading-8 text-ink/75 md:text-[14px]">
          {children}
        </div>
      </Reveal>
    </section>
  )
}

export default function AboutPage() {
  useEffect(() => {
    document.title = 'درباره ما | اکازیون'
  }, [])

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-6 md:px-6 md:py-10 lg:px-8">
      {/* سربرگ */}
      <Reveal>
        <div className="overflow-hidden rounded-3xl bg-mist">
          <div className="grid md:grid-cols-[1.1fr_1fr]">
            <div className="p-7 sm:p-10 md:p-12">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-[11px] font-black text-orange">
                <Leaf size={12} strokeWidth={2.2} />
                درباره ما
              </span>
              <h1 className="mt-4 text-2xl font-black leading-[1.4] tracking-tight text-forest md:text-[2.1rem] md:leading-[1.35]">
                ما به فرصت‌های خوب
                <br />
                خیلی جدی نگاه می‌کنیم
              </h1>
              <p className="mt-4 text-[13.5px] leading-8 text-ink/70 md:text-[14.5px]">
                اکازیون از یک باور ساده شروع شد: خریدِ خوب یعنی محصولِ درست، در
                لحظهٔ درست و با قیمتِ درست. ما هر روز مجموعه‌ای منتخب از ماگ،
                اکسسوری، هدیه و وسایل خانه را با قیمت‌های ویژه کنار هم می‌چینیم.
              </p>
            </div>
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
              <SmartImage
                src="/images/about-1.svg"
                alt="استودیوی اکازیون"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Reveal>

      {/* آمار */}
      <Reveal delay={80}>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { n: toFa(products.length), label: 'محصول منتخب' },
            { n: toFa(showcaseBrands.length), label: 'برند و هنرمند' },
            { n: `+${toFa(9)}`, label: 'هزار سفارش موفق' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-line bg-white px-3 py-5 text-center md:py-7"
            >
              <p className="text-2xl font-black text-ink md:text-4xl">
                {stat.n}
              </p>
              <p className="mt-1 text-[11px] font-bold text-mute md:text-[12.5px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ارزش‌ها */}
      <div className="grid gap-3 py-10 md:grid-cols-3 md:py-12">
        {values.map((value, i) => (
          <Reveal key={value.title} delay={i * 70}>
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-mist text-orange">
                <value.icon size={20} strokeWidth={1.7} />
              </span>
              <h3 className="text-[14px] font-black text-ink">{value.title}</h3>
              <p className="text-[12px] leading-7 text-mute">{value.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="divide-y divide-line">
        {/* پشتیبانی */}
        <AnchorSection id="support" icon={Phone} title="پشتیبانی">
          <p>
            تیم پشتیبانی اکازیون هر روز از ۹ صبح تا ۹ شب پاسخگوی شماست. برای
            سؤالات سفارش، هدیه یا هر چیز دیگری از یکی از راه‌های زیر با ما در
            تماس باشید:
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
            <li className="flex items-center gap-2.5 rounded-xl bg-mist px-4 py-3 font-bold text-forest">
              <Phone size={15} className="text-orange" />
              <span dir="ltr">۰۲۱ - ۹۱۰۰ ۸۸۷۷</span>
            </li>
            <li className="flex items-center gap-2.5 rounded-xl bg-mist px-4 py-3 font-bold text-forest">
              <Mail size={15} className="text-orange" />
              hello@ekazion.ir
            </li>
            <li className="flex items-center gap-2.5 rounded-xl bg-mist px-4 py-3 font-bold text-forest">
              <Clock size={15} className="text-orange" />
              هر روز، ۹ تا ۲۱
            </li>
          </ul>
        </AnchorSection>

        {/* روش‌های ارسال */}
        <AnchorSection id="shipping" icon={Truck} title="روش‌های ارسال">
          <ul className="space-y-3">
            <li className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3.5">
              <Truck size={16} className="mt-1 shrink-0 text-orange" />
              <p>
                <span className="font-black text-ink">پست پیشتاز — </span>
                ارسال به سراسر ایران، ۲ تا ۴ روز کاری. سفارش‌های بالای{' '}
                {toFa(1)} میلیون تومان رایگان ارسال می‌شوند.
              </p>
            </li>
            <li className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3.5">
              <MapPin size={16} className="mt-1 shrink-0 text-orange" />
              <p>
                <span className="font-black text-ink">پیک اکازیون — </span>
                فقط تهران، تحویل همان‌روز برای سفارش‌های قبل از ساعت ۱۳.
              </p>
            </li>
            <li className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3.5">
              <ShieldCheck size={16} className="mt-1 shrink-0 text-orange" />
              <p>
                <span className="font-black text-ink">بسته‌بندی امن — </span>
                اقلام شکستنی با فوم دولایه و کارتن ضدضربه ارسال می‌شوند و تا
                لحظهٔ تحویل تحت پوشش ضمانت هستند.
              </p>
            </li>
          </ul>
        </AnchorSection>

        {/* شرایط بازگشت */}
        <AnchorSection id="returns" icon={RotateCcw} title="شرایط بازگشت">
          <p>
            اگر به هر دلیلی از خریدتان راضی نبودید، تا ۷ روز بعد از تحویل
            می‌توانید سفارش را برگردانید — بدون قید و شرط و بدون سؤال. کافی
            است از طریق پشتیبانی درخواست ثبت کنید؛ پیک ما سفارش را دریافت
            می‌کند و کل مبلغ حداکثر تا ۴۸ ساعت بعد به حساب شما بازمی‌گردد.
          </p>
          <p className="mt-3 rounded-2xl bg-mist px-4 py-3 font-bold text-forest">
            تنها شرط ما: محصول باید دست‌نخورده و در بسته‌بندی اصلی باشد.
          </p>
        </AnchorSection>

        {/* سوالات متداول */}
        <AnchorSection id="faq" icon={Sparkles} title="سوالات متداول">
          <div className="space-y-2.5">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-line bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-[13px] font-black text-ink [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown
                    size={16}
                    className="shrink-0 text-mute transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="border-t border-dashed border-line px-5 py-4 leading-7 text-mute">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </AnchorSection>
      </div>

      {/* دعوت پایانی */}
      <Reveal>
        <div className="relative mt-4 overflow-hidden rounded-3xl bg-forest p-8 text-center md:p-12">
          <svg
            className="pointer-events-none absolute -start-12 -top-12 h-40 w-40 text-white/[.05]"
            viewBox="0 0 100 100"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <h2 className="relative text-xl font-black text-white md:text-2xl">
            بیا ببینیم امروز چی برای تو داریم
          </h2>
          <p className="relative mt-3 text-[13px] leading-7 text-white/65">
            هر هفته چند چیز کوچکِ تازه به اکازیون اضافه می‌شود.
          </p>
          <div className="relative mt-6">
            <Button to="/shop" variant="white" size="lg">
              رفتن به فروشگاه
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
