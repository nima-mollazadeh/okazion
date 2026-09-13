export default function PageLoader() {
  return (
    <div className="grid min-h-[55vh] place-items-center" aria-label="در حال بارگذاری">
      <div className="flex animate-pulse flex-col items-center gap-3 opacity-50">
        <svg viewBox="0 0 32 32" className="h-10 w-10" fill="none" aria-hidden="true">
          <rect x="7.5" y="7.5" width="17.5" height="17.5" rx="4.5" transform="rotate(45 16.25 16.25)" className="fill-primary" />
          <circle cx="11.6" cy="11.6" r="2.7" className="fill-white" />
        </svg>
        <span className="text-xs font-bold text-mute">در حال بارگذاری…</span>
      </div>
    </div>
  )
}
