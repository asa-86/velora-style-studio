import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="velora-container flex h-16 items-center gap-3 md:h-20">
        <button
          type="button"
          aria-label="منو"
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 rounded-md p-2 text-foreground transition-colors hover:bg-secondary md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            V
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-extrabold tracking-tight text-primary">ولورا</span>
            <span className="block text-[10px] tracking-[0.35em] text-muted-foreground">VELORA</span>
          </span>
        </Link>

        <nav className="mx-auto hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="relative text-sm text-foreground/80 transition-colors hover:text-primary after:absolute after:-bottom-1.5 after:right-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full data-[status=active]:text-primary data-[status=active]:after:w-full"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="mr-auto flex shrink-0 items-center gap-1 md:mr-0">
          <Link to="/search" aria-label="جستجو" className="rounded-md p-2 transition-colors hover:bg-secondary">
            <Search className="size-5" />
          </Link>
          <Link to="/wishlist" aria-label="علاقه‌مندی‌ها" className="relative rounded-md p-2 transition-colors hover:bg-secondary">
            <Heart className="size-5" />
            {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
          </Link>
          <Link to="/cart" aria-label="سبد خرید" className="relative rounded-md p-2 transition-colors hover:bg-secondary">
            <ShoppingBag className="size-5" />
            {count > 0 && <Badge>{count}</Badge>}
          </Link>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-card md:hidden">
          <nav className="velora-container flex flex-col py-3">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2.5 text-sm">
                {n.label}
              </Link>
            ))}
            <span className="hairline my-2" />
            <span className="pb-1 text-xs text-muted-foreground">دسته‌بندی‌ها</span>
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-foreground/80"
              >
                {c.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -top-0.5 right-0 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
      {children}
    </span>
  );
}
