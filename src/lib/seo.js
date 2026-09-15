const SITE_NAME = 'اکازیون'
const DEFAULT_TITLE = 'اکازیون | هر روز، یک فرصت تازه'
const DEFAULT_DESCRIPTION =
  'فروشگاه آنلاین اکازیون؛ ماگ، اکسسوری، هدیه، دکور و لوازم رومیزی منتخب با قیمت‌های ویژه.'
const BASE_URL = 'https://ekazion.ir' // در صورت تغییر دامنه فقط همین خط عوض شود

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * تنظیم متادیتای صفحه — عنوان، توضیحات، canonical و Open Graph.
 * برای SPA بدون SSR؛ خزشگرهای مدرن متای تزریق‌شده را هم می‌خوانند.
 */
export function setMeta({ title, description, path = '', image }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE
  const desc = description || DEFAULT_DESCRIPTION
  const url = `${BASE_URL}${path}`

  document.title = fullTitle
  upsertMeta('name', 'description', desc)
  upsertLink('canonical', url)

  upsertMeta('property', 'og:title', fullTitle)
  upsertMeta('property', 'og:description', desc)
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:site_name', SITE_NAME)
  upsertMeta('property', 'og:locale', 'fa_IR')
  if (image) upsertMeta('property', 'og:image', `${BASE_URL}${image}`)

  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', fullTitle)
  upsertMeta('name', 'twitter:description', desc)
  if (image) upsertMeta('name', 'twitter:image', `${BASE_URL}${image}`)
}

/** دادهٔ ساختاریافتهٔ Product برای صفحهٔ محصول */
export function productJsonLd(product, brandName) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: `${BASE_URL}${product.image}`,
    description: product.description,
    brand: { '@type': 'Brand', name: brandName ?? 'اکازیون' },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/product/${product.slug}`,
      priceCurrency: 'IRT',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
  }
}

/** تزریق/به‌روزرسانی یک اسکریپت JSON-LD با شناسهٔ یکتا */
export function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (data == null) {
    el?.remove()
    return
  }
  const payload = JSON.stringify(data)
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  if (el.textContent !== payload) el.textContent = payload
}
