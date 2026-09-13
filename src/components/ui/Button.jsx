import { Link } from 'react-router-dom'

const variants = {
  primary:
    'bg-primary text-white hover:bg-ink hover:text-white shadow-soft hover:shadow-lift',
  dark: 'bg-ink text-orange hover:bg-orange hover:text-ink shadow-soft hover:shadow-lift',
  orange:
    'bg-orange text-ink hover:bg-ink hover:text-white shadow-soft hover:shadow-lift',
  outline:
    'border border-ink/60 text-ink hover:border-orange hover:bg-orange hover:text-ink',
  ghost: 'text-ink hover:bg-sage',
  white: 'bg-white text-ink hover:bg-orange hover:text-ink shadow-soft',
}

const sizes = {
  sm: 'h-9 px-4 text-[12.5px]',
  md: 'h-11 px-6 text-[13.5px]',
  lg: 'h-12 px-7 text-[14.5px] md:h-[3.25rem] md:px-9',
  xl: 'h-14 px-8 text-[15px] md:h-16 md:text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  radius = 'rounded-full',
  to,
  href,
  className = '',
  children,
  ...rest
}) {
  const classes = `inline-flex select-none items-center justify-center gap-2 ${radius} font-bold transition-all duration-200 active:scale-[.97] disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
