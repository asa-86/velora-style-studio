import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Check, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "@/components/velora/Layout";
import { ProductCard } from "@/components/velora/ProductCard";
import { categoryName, formatPrice, getProduct, relatedProducts, type Product } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "محصول یافت نشد | ولورا" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    const title = `${p.name} | ولورا`;
    const image = p.images[0];
    return {
      meta: [
        { title },
        { name: "description", content: p.description.slice(0, 150) },
        { property: "og:title", content: title },
        { property: "og:description", content: p.description.slice(0, 150) },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${params.id}` },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
      ],
      links: [{ rel: "canonical", href: `/product/${params.id}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.description,
            image: p.images,
            offers: {
              "@type": "Offer",
              price: p.price,
              priceCurrency: "IRR",
              availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { addToCart, toggleWishlist, isWished } = useShop();
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [qty, setQty] = useState(1);

  const add = () => {
    addToCart({ id: product.id, size, color, qty });
    toast.success("به سبد خرید اضافه شد", { description: `${product.name} — سایز ${size} / ${color}` });
  };

  return (
    <Layout>
      <div className="velora-container py-8 md:py-12">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">خانه</Link> /{" "}
          <Link to="/shop" className="hover:text-primary">فروشگاه</Link> /{" "}
          <Link to="/category/$slug" params={{ slug: product.category }} className="hover:text-primary">
            {categoryName(product.category)}
          </Link>{" "}
          / <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <div className="overflow-hidden rounded-lg border border-border bg-secondary">
              <img
                src={product.images[active]}
                alt={product.name}
                width={1000}
                height={1333}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`تصویر ${i + 1}`}
                  className={cn(
                    "overflow-hidden rounded-md border transition-colors",
                    i === active ? "border-primary" : "border-border hover:border-primary/50",
                  )}
                >
                  <img src={src} alt="" loading="lazy" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold md:text-3xl">{product.name}</h1>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xl font-extrabold text-primary">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
              )}
            </div>

            <span className="hairline my-6 block" />

            <p className="text-sm leading-8 text-muted-foreground">{product.description}</p>

            <div className="mt-7">
              <h2 className="text-sm font-bold">سایز</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={cn(
                      "min-w-12 rounded-md border px-4 py-2 text-sm transition-colors",
                      s === size ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-sm font-bold">رنگ</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.name)}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-3 py-2 text-xs transition-colors",
                      c.name === color ? "border-primary bg-secondary" : "border-border hover:border-primary",
                    )}
                  >
                    <span className="size-4 rounded-full border border-border" style={{ backgroundColor: c.hex }} />
                    {c.name}
                    {c.name === color && <Check className="size-3.5 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            <p className={cn("mt-6 text-sm font-bold", product.stock > 0 ? "text-primary" : "text-destructive")}>
              {product.stock > 0 ? `موجودی: ${product.stock.toLocaleString("fa-IR")} عدد` : "این محصول ناموجود است"}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-md border border-border bg-card">
                <button type="button" aria-label="کاهش" onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3">
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold">{qty.toLocaleString("fa-IR")}</span>
                <button
                  type="button"
                  aria-label="افزایش"
                  onClick={() => setQty((q) => Math.min(product.stock || 1, q + 1))}
                  className="p-3"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <button
                type="button"
                disabled={product.stock === 0}
                onClick={add}
                className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <ShoppingBag className="size-4" />
                افزودن به سبد خرید
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label="علاقه‌مندی"
                className="grid size-12 place-items-center rounded-md border border-border transition-colors hover:border-primary"
              >
                <Heart className={cn("size-5", isWished(product.id) && "fill-primary text-primary")} />
              </button>
            </div>

            <ul className="mt-8 grid gap-3 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><Truck className="size-4 text-primary" /> ارسال به سراسر ایران، ۲ تا ۴ روز کاری</li>
              <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> ضمانت اصالت پارچه و امکان تعویض سایز</li>
            </ul>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-xl font-extrabold">محصولات مرتبط</h2>
          <span className="hairline mt-4 block w-24" />
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {relatedProducts(product).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
