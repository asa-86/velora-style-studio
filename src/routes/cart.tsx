import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Layout } from "@/components/velora/Layout";
import { formatPrice } from "@/lib/products";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "سبد خرید | ولورا" },
      { name: "description", content: "مرور سبد خرید، محاسبه مجموع قیمت و ثبت سفارش پوشاک ولورا." },
      { property: "og:title", content: "سبد خرید | ولورا" },
      { property: "og:description", content: "مرور سبد خرید و ثبت سفارش پوشاک ولورا." },
      { property: "og:url", content: "/cart" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartProducts, removeFromCart, setQty, total, clearCart } = useShop();
  const shipping = total > 5000000 || total === 0 ? 0 : 89000;

  return (
    <Layout>
      <div className="velora-container py-10 md:py-14">
        <h1 className="text-2xl font-extrabold md:text-3xl">سبد خرید</h1>
        <span className="hairline mt-4 block w-28" />

        {cartProducts.length === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed border-border py-20 text-center">
            <ShoppingBag className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">سبد خرید شما خالی است.</p>
            <Link
              to="/shop"
              className="mt-6 inline-block rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
            >
              رفتن به فروشگاه
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <ul className="space-y-4">
              {cartProducts.map(({ item, product }, index) => (
                <li
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-4 rounded-lg border border-border bg-card p-4"
                >
                  <Link to="/product/$id" params={{ id: product.id }} className="shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      className="size-24 rounded-md object-cover md:size-28"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                      <h2 className="truncate text-sm font-bold md:text-base">{product.name}</h2>
                      <button
                        type="button"
                        aria-label="حذف"
                        onClick={() => removeFromCart(index)}
                        className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      سایز {item.size} · رنگ {item.color}
                    </p>
                    <div className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                      <div className="flex items-center rounded-md border border-border">
                        <button type="button" aria-label="کاهش" onClick={() => setQty(index, item.qty - 1)} className="p-2">
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.qty.toLocaleString("fa-IR")}</span>
                        <button type="button" aria-label="افزایش" onClick={() => setQty(index, item.qty + 1)} className="p-2">
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <span className="truncate text-left text-sm font-extrabold text-primary">
                        {formatPrice(product.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
              <li>
                <button type="button" onClick={clearCart} className="text-xs text-muted-foreground hover:text-destructive">
                  خالی کردن سبد خرید
                </button>
              </li>
            </ul>

            <aside className="h-fit rounded-lg border border-border bg-card p-6 lg:sticky lg:top-24">
              <h2 className="text-base font-bold">خلاصه سفارش</h2>
              <span className="hairline my-4 block" />
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">مجموع کالاها</dt>
                  <dd className="font-bold">{formatPrice(total)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">هزینه ارسال</dt>
                  <dd className="font-bold">{shipping === 0 ? "رایگان" : formatPrice(shipping)}</dd>
                </div>
                <span className="hairline block" />
                <div className="flex justify-between text-base">
                  <dt className="font-bold">مبلغ قابل پرداخت</dt>
                  <dd className="font-extrabold text-primary">{formatPrice(total + shipping)}</dd>
                </div>
              </dl>

              <Link
                to="/contact"
                className="mt-6 block rounded-md bg-primary py-3.5 text-center text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                ثبت سفارش
              </Link>
              <p className="mt-3 text-center text-xs leading-6 text-muted-foreground">
                ثبت سفارش از طریق اینستاگرام یا روبیکا انجام می‌شود.
              </p>
            </aside>
          </div>
        )}
      </div>
    </Layout>
  );
}
