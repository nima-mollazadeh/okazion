export const categories = [
  { slug: 'mug', name: 'ماگ', image: '/images/categories/cat-mug.svg', tint: 'bg-mist' },
  {
    slug: 'accessory',
    name: 'اکسسوری',
    image: '/images/categories/cat-accessory.svg',
    tint: 'bg-sage/60',
  },
  {
    slug: 'gift',
    name: 'هدیه',
    image: '/images/categories/cat-gift.svg',
    tint: 'bg-mint/25',
  },
  { slug: 'decor', name: 'دکور', image: '/images/categories/cat-decor.svg', tint: 'bg-mist' },
  {
    slug: 'desk',
    name: 'لوازم رومیزی',
    image: '/images/categories/cat-desk.svg',
    tint: 'bg-sage/60',
  },
  {
    slug: 'sticker',
    name: 'استیکر',
    image: '/images/categories/cat-sticker.svg',
    tint: 'bg-mint/25',
  },
  {
    slug: 'keychain',
    name: 'جاکلیدی',
    image: '/images/categories/cat-keychain.svg',
    tint: 'bg-mist',
  },
  {
    slug: 'special',
    name: 'محصولات خاص',
    image: '/images/categories/cat-special.svg',
    tint: 'bg-sage/60',
  },
]

export const getCategory = (slug) => categories.find((c) => c.slug === slug)
