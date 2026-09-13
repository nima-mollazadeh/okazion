export const sampleOrders = [
  {
    id: 'SBZ-1103',
    date: '۵ شهریور ۱۴۰۴',
    status: 'processing',
    items: [
      { productId: 21, qty: 1 },
      { productId: 4, qty: 2 },
    ],
  },
  {
    id: 'SBZ-1078',
    date: '۲۱ مرداد ۱۴۰۴',
    status: 'shipped',
    items: [
      { productId: 1, qty: 1 },
      { productId: 3, qty: 2 },
    ],
  },
  {
    id: 'SBZ-1042',
    date: '۳ مرداد ۱۴۰۴',
    status: 'delivered',
    items: [
      { productId: 7, qty: 1 },
      { productId: 15, qty: 1 },
    ],
  },
]

export const orderStatusMeta = {
  processing: { label: 'در حال پردازش', className: 'bg-mist text-forest border-line' },
  shipped: { label: 'ارسال شده', className: 'bg-sage/60 text-forest border-sage' },
  delivered: { label: 'تحویل شده', className: 'bg-orange text-ink border-orange' },
}
