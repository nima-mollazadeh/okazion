import { Check, Search, X } from 'lucide-react'
import { categories } from '../../data/categories'
import { brands } from '../../data/brands'
import { products } from '../../data/products'
import { toFa } from '../../lib/format'

function Section({ title, children }) {
  return (
    <div className="border-b border-line py-5 first:pt-0 last:border-0">
      <h3 className="mb-3.5 text-[13px] font-black text-ink">{title}</h3>
      {children}
    </div>
  )
}

/**
 * بدنهٔ فیلترها — هم در سایدبار دسکتاپ و هم در شیت موبایل استفاده می‌شود.
 */
export default function FilterPanel({
  q,
  onQ,
  cat,
  onCat,
  selectedBrands,
  onToggleBrand,
  priceDraft,
  onPriceDraft,
  onApplyPrice,
  hasFilters,
  onReset,
}) {
  const countByCategory = (slug) =>
    products.filter((p) => p.category === slug).length
  const countByBrand = (slug) =>
    products.filter((p) => p.brand === slug).length

  return (
    <div className="px-1">
      <Section title="جستجو">
        <div className="relative">
          <Search
            size={15}
            strokeWidth={2}
            className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-mute"
          />
          <input
            value={q}
            onChange={(e) => onQ(e.target.value)}
            type="search"
            placeholder="نام محصول یا برند…"
            className="h-10 w-full rounded-full border border-line bg-white ps-9 pe-8 text-[13px] outline-none transition-colors placeholder:text-mute focus:border-orange"
          />
          {q && (
            <button
              type="button"
              aria-label="پاک کردن جستجو"
              onClick={() => onQ('')}
              className="absolute end-2.5 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-line text-mute"
            >
              <X size={11} strokeWidth={2.6} />
            </button>
          )}
        </div>
      </Section>

      <Section title="دسته‌بندی">
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onCat('')}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-[13px] transition-colors ${
              !cat
                ? 'bg-mist font-black text-ink'
                : 'font-semibold text-ink/80 hover:bg-mist'
            }`}
          >
            همهٔ محصولات
            <span className="text-[10.5px] text-mute">{toFa(products.length)}</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => onCat(cat === c.slug ? '' : c.slug)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-[13px] transition-colors ${
                cat === c.slug
                  ? 'bg-mist font-black text-ink'
                  : 'font-semibold text-ink/80 hover:bg-mist'
              }`}
            >
              {c.name}
              <span className="text-[10.5px] text-mute">
                {toFa(countByCategory(c.slug))}
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="برند">
        <div className="space-y-0.5">
          {brands.map((b) => {
            const checked = selectedBrands.includes(b.slug)
            return (
              <label
                key={b.slug}
                className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-mist/60"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={`grid h-[18px] w-[18px] place-items-center rounded-[6px] border transition-all ${
                      checked
                        ? 'border-orange bg-orange text-ink'
                        : 'border-line bg-white'
                    }`}
                  >
                    {checked && <Check size={12} strokeWidth={3} />}
                  </span>
                  <span className="text-[13px] font-semibold text-ink/85">
                    {b.name}
                  </span>
                </span>
                <span className="text-[10.5px] text-mute">
                  {toFa(countByBrand(b.slug))}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => onToggleBrand(b.slug)}
                />
              </label>
            )
          })}
        </div>
      </Section>

      <Section title="محدودهٔ قیمت (تومان)">
        <form onSubmit={onApplyPrice} className="space-y-2.5">
          <div className="flex items-center gap-2">
            <input
              value={priceDraft.min}
              onChange={(e) => onPriceDraft('min', e.target.value)}
              inputMode="numeric"
              placeholder="از"
              className="h-10 w-full rounded-xl border border-line bg-white px-3 text-center text-[13px] tabular-nums outline-none placeholder:text-mute focus:border-orange"
            />
            <span className="text-mute">—</span>
            <input
              value={priceDraft.max}
              onChange={(e) => onPriceDraft('max', e.target.value)}
              inputMode="numeric"
              placeholder="تا"
              className="h-10 w-full rounded-xl border border-line bg-white px-3 text-center text-[13px] tabular-nums outline-none placeholder:text-mute focus:border-orange"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-mist py-2.5 text-[12px] font-black text-orange transition-colors hover:bg-sage/70"
          >
            اعمال قیمت
          </button>
        </form>
      </Section>

      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full border border-line py-2.5 text-[12px] font-bold text-mute transition-colors hover:border-red-200 hover:text-red-500"
        >
          <X size={13} strokeWidth={2.4} />
          حذف فیلترها
        </button>
      )}
    </div>
  )
}
