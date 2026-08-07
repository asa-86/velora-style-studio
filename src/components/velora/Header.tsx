import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useShop } from "@/lib/shop-store";
import { categories } from "@/lib/products";

const nav = [
  { to: "/", label: "خانه" },
  { to: "/shop", label: "فروشگاه" },
  { to: "/contact", label: "تماس با ما" },
] as const;

export function Header() {
  const { count, wishlist } = useShop();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      <div className="gradient-emerald text-primary-foreground">
        <div className="velora-container flex h-8 items-center overflow-hidden text-[11px]">
          <span className="marquee-track">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="inline-flex gap-12">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="size-3 text-gold-light" /> ارسال به سراسر ایران
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="size-3 text-gold-light" /> کلکسیون زمرد · SS۲۶
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="size-3 text-gold-light" /> ۷ روز مهلت تعویض
                </span>
              </span>
            ))}
          </span>
        </div>
      </div>

      <header className="glass border-x-0 border-t-0 shadow-soft">
        <div className="velora-container flex h-16 items-center gap-3 md:h-20">
          <button
            type="button"
            aria-label="منو"
            onClick={() => setOpen((v) => !v)}
            className="shrink-0 rounded-full p-2 text-foreground transition-colors hover:bg-secondary md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="gradient-emerald grid size-10 shrink-0 place-items-center rounded-2xl text-sm font-bold text-gold-light gold-ring">
              V
            </span>
            <span className="min-w-0">
              <span className="block truncate text-lg font-extrabold tracking-tight text-primary">ولورا</span>
              <span className="text-gold-gradient block text-[10px] font-bold tracking-[0.4em]">VELORA</span>
            </span>
          </Link>

          <nav className="mx-auto hidden items-center gap-1 rounded-full border border-gold/25 bg-card/60 p-1.5 backdrop-blur md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="rounded-full px-5 py-2 text-sm text-foreground/75 transition-all hover:text-primary data-[status=active]:gradient-emerald data-[status=active]:text-gold-light"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="mr-auto flex shrink-0 items-center gap-1 md:mr-0">
            <Link
              to="/search"
              aria-label="جستجو"
              className="rounded-full p-2.5 transition-colors hover:bg-secondary"
            >
              <Search className="size-5" />
            </Link>
            <Link
              to="/wishlist"
              aria-label="علاقه‌مندی‌ها"
              className="relative rounded-full p-2.5 transition-colors hover:bg-secondary"
            >
              <Heart className="size-5" />
              {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
            </Link>
            <Link
              to="/cart"
              aria-label="سبد خرید"
              className="relative rounded-full p-2.5 transition-colors hover:bg-secondary"
            >
              <ShoppingBag className="size-5" />
              {count > 0 && <Badge>{count}</Badge>}
            </Link>
          </div>
        </div>

        {open && (
          <div className="border-t border-gold/20 bg-card/95 backdrop-blur md:hidden">
            <nav className="velora-container flex flex-col py-3">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2.5 text-sm font-bold">
                  {n.label}
                </Link>
              ))}
              <span className="hairline my-2" />
              <span className="pb-1 text-xs text-muted-foreground">دسته‌بندی‌ها</span>
              <div className="grid grid-cols-2 gap-2 pb-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    to="/category/$slug"
                    params={{ slug: c.slug }}
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-xs text-foreground/80"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -top-0.5 right-0.5 grid size-4.5 place-items-center rounded-full bg-gold text-[10px] font-bold text-accent-foreground shadow-soft">
      {children}
    </span>
  );
}
