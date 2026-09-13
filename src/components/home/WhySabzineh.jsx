import { Headset, Package, Sparkles, Truck } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'

const benefits = [
  {
    icon: Truck,
    title: 'ارسال سریع',
    text: 'سفارشت را ۲ تا ۴ روز کاری بعد، همان جا که باشی تحویل می‌گیری.',
  },
  {
    icon: Package,
    title: 'بسته‌بندی خاص',
    text: 'هر سفارش مثل یک هدیه بسته‌بندی می‌شود؛ کاغذ کرافت، روبان و کارت.',
  },
  {
    icon: Sparkles,
    title: 'محصولات منتخب',
    text: 'فقط چیزهایی که خودمان هم برای خانه‌مان انتخاب می‌کنیم.',
  },
  {
    icon: Headset,
    title: 'پشتیبانی واقعی',
    text: 'آدم‌های واقعی پاسخ می‌دهند؛ هر روز از ۹ صبح تا ۹ شب.',
  },
]

export default function WhySabzineh() {
  return (
    <section aria-label="چرا اکازیون" className="bg-mist/70 py-12 md:py-16">
      <div className="mx-auto max-w-[1320px] px-4 md:px-6 lg:px-8">
        <SectionHeader title="چرا اکازیون؟" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 70}>
              <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-line bg-white/85 px-4 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-soft md:rounded-3xl md:py-9">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-mist text-orange md:h-14 md:w-14">
                  <benefit.icon size={23} strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="text-[13.5px] font-black text-ink md:text-[15.5px]">
                    {benefit.title}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-6 text-mute md:text-[13px] md:leading-7">
                    {benefit.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
