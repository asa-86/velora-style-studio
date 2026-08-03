import { createFileRoute, Link } from "@tanstack/react-router";
import { Search as SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Layout } from "@/components/velora/Layout";
import { ProductCard } from "@/components/velora/ProductCard";
import { categories, products } from "@/lib/products";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "جستجوی محصولات | ولورا" },
      { name: "description", content: "جستجوی لحظه‌ای در میان محصولات پوشاک ولورا بر اساس نام، توضیحات و دسته‌بندی." },
      { property: "og:title", content: "جستجوی محصولات | ولورا" },
      { property: "og:description", content: "جستجوی لحظه‌ای در میان محصولات پوشاک ولورا." },
      { property: "og:url", content: "/search" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const term = q.trim();
    if (!term) return [];
    return products.filter(
      (p) =>
        p.name.includes(term) ||
        p.description.includes(term) ||
        (categories.find((c) => c.slug === p.category)?.name ?? "").includes(term),
    );
  }, [q]);

  return (
    <Layout>
      <div className="velora-container py-10 md:py-16">
        <h1 className="text-2xl font-extrabold md:text-3xl">جستجوی محصولات</h1>
        <span className="hairline mt-4 block w-32" />

        <div className="relative mt-7 max-w-xl">
          <SearchIcon className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="مثلاً مانتو، بافت، مجلسی..."
            className="w-full rounded-md border border-input bg-card py-4 pr-12 pl-4 text-sm outline-none transition-colors focus:border-primary"
          />
        </div>

        <div className="mt-10">
          {!q.trim() ? (
            <div>
              <p className="text-sm text-muted-foreground">دسته‌بندی‌های پیشنهادی:</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to="/category/$slug"
                    params={{ slug: c.slug }}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
              نتیجه‌ای برای «{q}» پیدا نشد.
            </p>
          ) : (
            <>
              <p className="mb-5 text-sm text-muted-foreground">{results.length.toLocaleString("fa-IR")} نتیجه</p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {results.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
