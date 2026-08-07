import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isWished } = useShop();
  const wished = isWished(product.id);

  return (
    <article className="card-hover glass group relative overflow-hidden rounded-3xl">
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="sheen relative aspect-[3/4] overflow-hidden rounded-3xl bg-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
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
          <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-deep/70 to-transparent" />
          {product.badge && (
            <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-[11px] font-bold text-accent-foreground shadow-soft">
              {product.badge}
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute inset-x-0 bottom-0 bg-forest-deep/85 py-2 text-center text-xs text-primary-foreground backdrop-blur">
              ناموجود
            </span>
          )}
        </div>
      </Link>

      <button
        type="button"
        aria-label="افزودن به علاقه‌مندی‌ها"
        onClick={() => toggleWishlist(product.id)}
        className="absolute left-3 top-3 grid size-9 place-items-center rounded-full border border-gold/30 bg-card/80 backdrop-blur transition-all hover:scale-110 hover:bg-card"
      >
        <Heart className={cn("size-4 transition-colors", wished ? "fill-gold text-gold" : "text-foreground/70")} />
      </button>

      <div className="p-4">
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="truncate text-sm font-bold transition-colors group-hover:text-primary md:text-base">
            {product.name}
          </h3>
        </Link>
        <span className="hairline mt-3 block" />
        <div className="mt-3 flex items-center gap-2">
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
              className="size-3.5 rounded-full ring-1 ring-gold/40 ring-offset-1 ring-offset-card"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
