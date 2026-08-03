import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Layout } from "@/components/velora/Layout";
import { ProductCard } from "@/components/velora/ProductCard";
import { products } from "@/lib/products";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "علاقه‌مندی‌ها | ولورا" },
      { name: "description", content: "فهرست محصولات مورد علاقه شما در فروشگاه پوشاک ولورا." },
      { property: "og:title", content: "علاقه‌مندی‌ها | ولورا" },
      { property: "og:description", content: "فهرست محصولات مورد علاقه شما در ولورا." },
      { property: "og:url", content: "/wishlist" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/wishlist" }],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <Layout>
      <div className="velora-container py-10 md:py-14">
        <h1 className="text-2xl font-extrabold md:text-3xl">علاقه‌مندی‌ها</h1>
        <span className="hairline mt-4 block w-28" />

        {items.length === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed border-border py-20 text-center">
            <Heart className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید.</p>
            <Link to="/shop" className="mt-6 inline-block rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
