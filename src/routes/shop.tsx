import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/velora/Layout";
import { ShopBrowser } from "@/components/velora/ShopBrowser";
import { products } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "فروشگاه ولورا | خرید پوشاک زنانه" },
      { name: "description", content: "همه محصولات ولورا با فیلتر قیمت، سایز و رنگ؛ مانتو، پیراهن، بافت، شلوار و لباس مجلسی." },
      { property: "og:title", content: "فروشگاه ولورا | خرید پوشاک زنانه" },
      { property: "og:description", content: "همه محصولات ولورا با فیلتر قیمت، سایز و رنگ." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <Layout>
      <div className="velora-container py-10 md:py-14">
        <header className="mb-8">
          <h1 className="text-2xl font-extrabold md:text-3xl">فروشگاه ولورا</h1>
          <span className="hairline mt-4 block w-32" />
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            مجموعه کامل پوشاک ولورا؛ با فیلترهای قیمت، سایز و رنگ سریع‌تر به انتخاب دلخواهتان برسید.
          </p>
        </header>
        <ShopBrowser items={products} />
      </div>
    </Layout>
  );
}
