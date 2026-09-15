export const brands = [
  {
    slug: 'studio-sabz',
    name: 'استودیو سبز',
    tagline: 'سرامیک و لعاب دست‌ساز',
  },
  {
    slug: 'khane-tarh',
    name: 'خانه‌طرح',
    tagline: 'چوب و وسایل مینیمال روزمره',
  },
  {
    slug: 'design-lab',
    name: 'دیزاین‌لب',
    tagline: 'استیکر، پوستر و اقلام کاغذی',
  },
  {
    slug: 'art-home',
    name: 'آرت‌هوم',
    tagline: 'دکور و وسایل تزیینی خانه',
  },
  {
    slug: 'nora',
    name: 'نورا',
    tagline: 'اکسسوری و چرم گیاهی',
  },
  {
    slug: 'dast-saz',
    name: 'دست‌ساز',
    tagline: 'مجموعه‌های محدود صنایع دستی',
  },
  {
    slug: 'ekazion',
    name: 'اکازیون',
    tagline: 'مجموعهٔ اختصاصی اکازیون',
    inShowcase: false,
  },
]

export const getBrand = (slug) => brands.find((b) => b.slug === slug)

export const showcaseBrands = brands.filter((b) => b.inShowcase !== false)
