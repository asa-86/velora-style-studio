import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isWished } = useShop();
  const wished = isWished(product.id);

  return (
    <article className="card-hover group relative overflow-hidden rounded-lg border border-border bg-card">
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
          {product.badge && (
            <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">
              {product.badge}
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute inset-x-0 bottom-0 bg-forest-deep/85 py-2 text-center text-xs text-primary-foreground">
              ناموجود
            </span>
          )}
        </div>
      </Link>

      <button
        type="button"
        aria-label="افزودن به علاقه‌مندی‌ها"
        onClick={() => toggleWishlist(product.id)}
        className="absolute left-3 top-3 grid size-9 place-items-center rounded-full bg-card/85 backdrop-blur transition-colors hover:bg-card"
      >
        <Heart className={cn("size-4 transition-colors", wished ? "fill-primary text-primary" : "text-foreground/70")} />
      </button>

      <div className="p-4">
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="truncate text-sm font-bold md:text-base">{product.name}</h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-extrabold text-primary md:text-base">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">{product.oldPrice.toLocaleString("fa-IR")}</span>
          )}
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="size-3.5 rounded-full border border-border"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
