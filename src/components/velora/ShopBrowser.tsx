import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { allColors, allSizes, formatPrice, type Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

type Sort = "newest" | "cheap" | "expensive" | "name";

export function ShopBrowser({ items, maxPrice = 6000000 }: { items: Product[]; maxPrice?: number }) {
  const [query, setQuery] = useState("");
  const [price, setPrice] = useState(maxPrice);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("newest");
  const [openFilters, setOpenFilters] = useState(false);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const result = useMemo(() => {
    const filtered = items.filter((p) => {
      const q = query.trim();
      if (q && !p.name.includes(q) && !p.description.includes(q)) return false;
      if (p.price > price) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c.name))) return false;
      return true;
    });
    const sorted = [...filtered];
    if (sort === "cheap") sorted.sort((a, b) => a.price - b.price);
    if (sort === "expensive") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name, "fa"));
    return sorted;
  }, [items, query, price, sizes, colors, sort]);

  const filters = (
    <div className="space-y-7">
      <div>
        <h3 className="mb-3 text-sm font-bold">جستجوی لحظه‌ای</h3>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="نام محصول..."
          className="w-full rounded-full border border-gold/30 bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold">حداکثر قیمت</h3>
        <input
          type="range"
          min={500000}
          max={maxPrice}
          step={50000}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full accent-[var(--forest)]"
        />
        <p className="mt-2 text-xs text-muted-foreground">تا {formatPrice(price)}</p>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold">سایز</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggle(sizes, setSizes, s)}
              className={cn(
                "min-w-11 rounded-full border px-3 py-1.5 text-xs transition-all hover:-translate-y-0.5",
                sizes.includes(s) ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold">رنگ</h3>
        <div className="flex flex-wrap gap-2">
          {allColors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => toggle(colors, setColors, c.name)}
              title={c.name}
              className={cn(
                "flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs transition-colors",
                colors.includes(c.name) ? "border-primary bg-secondary" : "border-border hover:border-primary",
              )}
            >
              <span className="size-3.5 rounded-full border border-border" style={{ backgroundColor: c.hex }} />
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <button
          type="button"
          onClick={() => setOpenFilters((v) => !v)}
          className="glass flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold lg:hidden"
        >
          فیلترها
          <SlidersHorizontal className="size-4" />
        </button>
        <div className={cn("glass mt-4 rounded-[1.75rem] p-6 lg:mt-0 lg:block", openFilters ? "block" : "hidden")}>
          {filters}
        </div>
      </aside>

      <div>
        <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <p className="truncate text-sm text-muted-foreground">{result.length.toLocaleString("fa-IR")} محصول</p>
          <select
            aria-label="مرتب‌سازی"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="shrink-0 rounded-full border border-gold/30 bg-card px-4 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="newest">جدیدترین</option>
            <option value="cheap">ارزان‌ترین</option>
            <option value="expensive">گران‌ترین</option>
            <option value="name">نام (الفبا)</option>
          </select>
        </div>

        {result.length === 0 ? (
          <p className="rounded-[1.75rem] border border-dashed border-gold/40 py-16 text-center text-sm text-muted-foreground">
            محصولی با این مشخصات پیدا نشد.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {result.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
