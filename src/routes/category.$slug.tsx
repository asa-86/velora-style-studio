import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Layout } from "@/components/velora/Layout";
import { ShopBrowser } from "@/components/velora/ShopBrowser";
import { categories, products } from "@/lib/products";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "دسته‌بندی یافت نشد | ولورا" }, { name: "robots", content: "noindex" }] };
    const title = `${loaderData.category.name} | ولورا`;
    return {
      meta: [
        { title },
        { name: "description", content: `خرید ${loaderData.category.name} از فروشگاه پوشاک ولورا با تنوع رنگ و سایز.` },
        { property: "og:title", content: title },
        { property: "og:description", content: `خرید ${loaderData.category.name} از فروشگاه پوشاک ولورا.` },
        { property: "og:url", content: `/category/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/category/${params.slug}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const items = products.filter((p) => p.category === category.slug);

  return (
    <Layout>
      <section className="relative h-56 overflow-hidden md:h-72">
        <img src={category.image} alt={category.name} loading="lazy" className="size-full object-cover" />
        <div className="absolute inset-0 bg-forest-deep/55" />
        <div className="velora-container absolute inset-0 flex flex-col justify-center text-primary-foreground">
          <nav className="text-xs text-primary-foreground/75">
            <Link to="/" className="hover:text-gold">خانه</Link> / <Link to="/shop" className="hover:text-gold">فروشگاه</Link> /{" "}
            <span>{category.name}</span>
          </nav>
          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">{category.name}</h1>
        </div>
      </section>

      <div className="velora-container py-10 md:py-14">
        <ShopBrowser items={items} />
      </div>
    </Layout>
  );
}
