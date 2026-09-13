import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import Reveal from './Reveal'

export default function SectionHeader({
  title,
  subtitle,
  linkTo,
  linkLabel = 'مشاهده همه',
  className = '',
}) {
  return (
    <Reveal className={`mb-6 md:mb-8 ${className}`}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[1.3rem] font-black tracking-tight text-ink md:text-[1.7rem]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1.5 text-[13.5px] leading-7 text-mute md:text-[14px]">
              {subtitle}
            </p>
          )}
        </div>
        {linkTo && (
          <Link
            to={linkTo}
            className="group inline-flex shrink-0 items-center gap-0.5 pb-0.5 text-[13.5px] font-black text-ink underline decoration-orange decoration-2 underline-offset-4 transition-colors hover:text-ink/70"
          >
            {linkLabel}
            <ChevronLeft
              size={16}
              strokeWidth={2.4}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
          </Link>
        )}
      </div>
    </Reveal>
  )
}
