import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowUpDown, SearchX, SlidersHorizontal, X } from 'lucide-react'
import { products } from '../data/products'
import { getBrand } from '../data/brands'
import { getCategory } from '../data/categories'
import ProductCard from '../components/product/ProductCard'
import FilterPanel from '../components/shop/FilterPanel'
import SortSelect, { sortOptions } from '../components/shop/SortSelect'
import Reveal from '../components/ui/Reveal'
import { toFa, faIncludes } from '../lib/format'
import { setMeta } from '../lib/seo'

function BottomSheet({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={title}>
      <div
        className="absolute inset-0 animate-fade-in bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 flex max-h-[82vh] animate-sheet-up flex-col rounded-t-3xl bg-white shadow-lift">
        <div className="flex justify-center pt-3">
          <span className="h-1 w-10 rounded-full bg-line" />
        </div>
        <div className="flex items-center justify-between px-5 pb-2 pt-3">
          <h3 className="text-base font-black text-ink">{title}</h3>
          <button
            type="button"
            aria-label="بستن"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-mist text-forest"
          >
            <X size={16} strokeWidth={2.4} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-4">{children}</div>
        {footer && (
          <div className="border-t border-line p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ShopPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const cat = params.get('cat') ?? ''
  const sort = params.get('sort') ?? 'popular'
  const selectedBrands = (params.get('brand') ?? '')
    .split(',')
    .filter(Boolean)
  const minPrice = params.get('min') ?? ''
  const maxPrice = params.get('max') ?? ''

  const [priceDraft, setPriceDraft] = useState({ min: minPrice, max: maxPrice })
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  useEffect(() => {
    const catName = cat ? getCategory(cat)?.name : null
    setMeta({
      title: catName ? `فروشگاه ${catName}` : 'فروشگاه',
      description: catName
        ? `خرید آنلاین ${catName} از اکازیون؛ محصولات منتخب با قیمت ویژه و ارسال سریع.`
        : 'همهٔ محصولات اکازیون در یک صفحه؛ فیلتر دسته، برند و قیمت.',
      path: cat ? `/shop?cat=${cat}` : '/shop',
    })
  }, [cat])

  useEffect(() => {
    setPriceDraft({ min: minPrice, max: maxPrice })
  }, [minPrice, maxPrice])

  const updateParams = (patch) => {
    const next = new URLSearchParams(params)
    for (const [key, value] of Object.entries(patch)) {
      if (value === null || value === undefined || value === '') next.delete(key)
      else next.set(key, value)
    }
    setParams(next, { replace: true })
  }

  const toggleBrand = (slug) => {
    const next = selectedBrands.includes(slug)
      ? selectedBrands.filter((b) => b !== slug)
      : [...selectedBrands, slug]
    updateParams({ brand: next.join(',') })
  }

  const applyPrice = (e) => {
    e.preventDefault()
    updateParams({ min: priceDraft.min, max: priceDraft.max })
  }

  const resetFilters = () =>
    setParams(new URLSearchParams(), { replace: true })

  const hasFilters = Boolean(
    q || cat || selectedBrands.length || minPrice || maxPrice,
  )

  const filtered = useMemo(() => {
    let list = [...products]
    if (q.trim()) {
      const match = (p) =>
        faIncludes(p.name, q) ||
        faIncludes(getBrand(p.brand)?.name ?? '', q) ||
        faIncludes(getCategory(p.category)?.name ?? '', q)
      list = list.filter(match)
    }
    if (cat) list = list.filter((p) => p.category === cat)
    if (selectedBrands.length)
      list = list.filter((p) => selectedBrands.includes(p.brand))
    if (minPrice) list = list.filter((p) => p.price >= Number(minPrice))
    if (maxPrice) list = list.filter((p) => p.price <= Number(maxPrice))

    const score = (p) => p.rating * 20 + Math.log10(p.sold + 1) * 10
    switch (sort) {
      case 'newest':
        list.sort((a, b) => b.isNew - a.isNew || b.id - a.id)
        break
      case 'bestselling':
        list.sort((a, b) => b.sold - a.sold)
        break
      case 'cheap':
        list.sort((a, b) => a.price - b.price)
        break
      case 'expensive':
        list.sort((a, b) => b.price - a.price)
        break
      default:
        list.sort((a, b) => score(b) - score(a))
    }
    return list
  }, [q, cat, selectedBrands.join(','), minPrice, maxPrice, sort])

  const activeFilterCount =
    (cat ? 1 : 0) +
    selectedBrands.length +
    (minPrice || maxPrice ? 1 : 0) +
    (q ? 1 : 0)

  const currentSort =
    sortOptions.find((s) => s.value === sort)?.label ?? 'محبوب‌ترین'

  const filterProps = {
    q,
    onQ: (v) => updateParams({ q: v }),
    cat,
    onCat: (v) => updateParams({ cat: v }),
    selectedBrands,
    onToggleBrand: toggleBrand,
    priceDraft,
    onPriceDraft: (key, v) => setPriceDraft((d) => ({ ...d, [key]: v })),
    onApplyPrice: applyPrice,
    hasFilters,
    onReset: resetFilters,
  }

  return (
    <div className="mx-auto max-w-[1320px] px-4 py-6 md:px-6 md:py-8 lg:px-8">
      {/* سربرگ */}
      <Reveal>
        <nav className="text-[11px] text-mute" aria-label="مسیر صفحه">
          <Link to="/" className="transition-colors hover:text-orange">
            خانه
          </Link>
          <span className="mx-1.5">/</span>
          <span className="font-semibold text-ink">فروشگاه</span>
          {cat && (
            <>
              <span className="mx-1.5">/</span>
              <span className="font-semibold text-ink">
                {getCategory(cat)?.name}
              </span>
            </>
          )}
        </nav>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-2">
          <h1 className="text-[1.75rem] font-black tracking-tight text-ink md:text-[2rem]">
            {cat ? getCategory(cat)?.name : 'فروشگاه اکازیون'}
          </h1>
          <p className="text-[12.5px] font-semibold text-mute">
            {toFa(filtered.length)} محصول
          </p>
        </div>
      </Reveal>

      {/* نوار چسبان موبایل و تبلت */}
      <div
        className="sticky top-[var(--mh,148px)] z-30 -mx-4 mt-4 border-b border-line/70 bg-cream/95 px-4 py-2.5 backdrop-blur-md lg:hidden"
        style={{ top: 'var(--mh, 148px)' }}
      >
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line bg-white text-[13.5px] font-bold text-ink transition-colors hover:border-orange"
          >
            <SlidersHorizontal size={15} strokeWidth={2.2} className="text-orange" />
            فیلترها
            {activeFilterCount > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[10px] font-black text-orange">
                {toFa(activeFilterCount)}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setSortOpen(true)}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line bg-white text-[13.5px] font-bold text-ink transition-colors hover:border-orange"
          >
            <ArrowUpDown size={15} strokeWidth={2.2} className="text-orange" />
            {currentSort}
          </button>
        </div>
      </div>

      <div className="mt-6 gap-8 lg:mt-8 lg:grid lg:grid-cols-[250px_1fr] lg:gap-10">
        {/* سایدبار دسکتاپ */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-line bg-white p-5">
            <FilterPanel {...filterProps} />
          </div>
        </aside>

        <div>
          {/* نوار ابزار دسکتاپ */}
          <div className="mb-5 hidden items-center justify-between lg:flex">
            <p className="text-[13px] font-semibold text-mute">
              {hasFilters
                ? `نمایش ${toFa(filtered.length)} نتیجه`
                : `${toFa(filtered.length)} محصول برای کشف کردن`}
            </p>
            <SortSelect
              value={sort}
              onChange={(v) => updateParams({ sort: v === 'popular' ? '' : v })}
            />
          </div>

          {/* شبکهٔ محصولات */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-y-9 md:grid-cols-3 md:gap-x-6 md:gap-y-14">
              {filtered.map((product, i) => (
                <Reveal key={product.id} delay={(i % 4) * 50}>
                  <ProductCard product={product} eager={i < 6} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-line bg-white/60 px-6 py-16 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-mist text-orange">
                <SearchX size={26} strokeWidth={1.7} />
              </span>
              <div>
                <p className="font-black text-ink">چیزی پیدا نشد</p>
                <p className="mt-1 text-[12.5px] leading-6 text-mute">
                  فیلترها را عوض کن یا عبارت دیگری را جستجو کن.
                </p>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full bg-primary px-6 py-2.5 text-[12.5px] font-black text-white transition-colors hover:bg-forest"
              >
                حذف فیلترها
              </button>
            </div>
          )}
        </div>
      </div>

      {/* شیت فیلترها (موبایل) */}
      <BottomSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="فیلترها"
        footer={
          <div className="flex gap-2.5">
            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="h-12 shrink-0 rounded-full border border-line px-5 text-[13px] font-bold text-mute"
              >
                حذف
              </button>
            )}
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="h-12 flex-1 rounded-full bg-primary text-[13px] font-black text-white"
            >
              مشاهدهٔ {toFa(filtered.length)} محصول
            </button>
          </div>
        }
      >
        <FilterPanel {...filterProps} />
      </BottomSheet>

      {/* شیت مرتب‌سازی (موبایل) */}
      <BottomSheet
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        title="مرتب‌سازی"
      >
        <div className="space-y-1 pb-2">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                updateParams({ sort: opt.value === 'popular' ? '' : opt.value })
                setSortOpen(false)
              }}
              className={`w-full rounded-xl px-4 py-3 text-start text-[14px] transition-colors ${
                opt.value === sort
                  ? 'bg-mist font-black text-ink'
                  : 'font-semibold text-ink/80 hover:bg-mist'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  )
}
