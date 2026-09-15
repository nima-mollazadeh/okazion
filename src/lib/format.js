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

/**
 * نرمال‌سازی متن فارسی برای جستجو و مقایسه:
 * ‌ی/ک عربی → فارسی، حذف اعراب و نویسه‌های کنترلی،
 * یکسان‌سازی فاصله و نیم‌فاصله، و حروف کوچک لاتین.
 */
export function normalizeFa(input = '') {
  return input
    .replace(/[\u064A\u0649]/g, '\u06CC') /* ي → ی */
    .replace(/\u0643/g, '\u06A9') /* ك → ک */
    .replace(/[\u064B-\u065F\u0670]/g, '') /* اعراب */
    .replace(/\u200C|\u200F|\u200E/g, ' ') /* نیم‌فاصله و جهت‌دهی → فاصله */
    .replace(/[\u0000-\u001F]/g, ' ') /* کنترلی */
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

/** کلید مقایسه: نرمال‌شده بدون هیچ فاصله‌ای — «م اگ» و «ماگ» یکسان می‌شوند */
const matchKey = (input) => normalizeFa(input).replace(/ /g, '')

/** جستجوی نرمال‌شدهٔ includes — برای فیلتر محصولات */
export const faIncludes = (haystack, needle) =>
  matchKey(haystack).includes(matchKey(needle))
