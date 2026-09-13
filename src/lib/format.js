const faNumber = new Intl.NumberFormat('fa-IR')

/** ۱۲۳۴۵۶ → «۱۲۳٬۴۵۶» */
export const toFa = (value) => faNumber.format(value)

/** 385000 → «۳۸۵٬۰۰۰ تومان» */
export const formatPrice = (value) => `${faNumber.format(value)} تومان`

/** درصد تخفیف گردشده؛ اگر تخفیف نیست ۰ */
export const discountPercent = (price, oldPrice) =>
  oldPrice && oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : 0

export const FREE_SHIPPING_THRESHOLD = 1_000_000
export const SHIPPING_COST = 49_000
