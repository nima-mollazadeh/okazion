import { useState } from 'react'

/**
 * تصویر با جایگزین برندشده؛ اگر فایل لود نشود به‌جای شکستن،
 * یک پلیس‌هولدر سبزِ اکازیون نشان می‌دهد.
 */
export default function SmartImage({
  src,
  alt = '',
  className = '',
  eager = false,
  ...rest
}) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden bg-mist ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg viewBox="0 0 32 32" className="h-1/3 w-1/3 min-w-8" fill="none">
          <path
            d="M16 29c0-13 6-24 19-28-1.4 18-7.6 25.6-19 28Z"
            className="fill-primary/20"
          />
          <path
            d="M16 29C16 16 10 5-3 1c1.4 18 7.6 25.6 19 28Z"
            className="fill-primary/10"
          />
        </svg>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}
