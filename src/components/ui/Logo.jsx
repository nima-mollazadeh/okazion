export default function Logo({
  variant = 'dark',
  withLatin = true,
  className = '',
}) {
  const isLight = variant === 'light' // روی پنل‌های روشن (فوتر)
  const onAccent = variant === 'neon' // روی نوار نارنجی اکازیون
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* نشان اتیکت قیمت */}
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 shrink-0"
        aria-hidden="true"
        fill="none"
      >
        <rect
          x="7.5"
          y="7.5"
          width="17.5"
          height="17.5"
          rx="4.5"
          transform="rotate(45 16.25 16.25)"
          className={onAccent || isLight ? 'fill-white' : 'fill-primary'}
        />
        <circle
          cx="11.6"
          cy="11.6"
          r="2.7"
          className={
            onAccent || isLight ? 'fill-orange' : 'fill-white'
          }
        />
      </svg>
      <span className="flex flex-col items-start leading-none">
        <span
          className={`text-[1.35rem] font-black tracking-tight ${
            isLight ? 'text-white' : onAccent ? 'text-white' : 'text-ink'
          }`}
        >
          اکازیون
        </span>
        {withLatin && (
          <span
            className={`mt-1 text-[0.55rem] font-medium tracking-[0.32em] ${
              isLight ? 'text-white/50' : onAccent ? 'text-white/55' : 'text-mute'
            }`}
          >
            EKAZION
          </span>
        )}
      </span>
    </span>
  )
}
