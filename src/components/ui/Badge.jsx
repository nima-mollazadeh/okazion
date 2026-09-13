const variants = {
  discount: 'bg-orange text-ink',
  new: 'bg-ink text-orange',
  soft: 'bg-mist text-ink border border-line',
  green: 'bg-primary text-white',
}

export default function Badge({ variant = 'soft', className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold leading-none ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
