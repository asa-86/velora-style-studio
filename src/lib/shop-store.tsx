import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartItem = { id: string; size: string; color: string; qty: number };

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  setQty: (index: number, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWished: (id: string) => boolean;
  total: number;
  count: number;
  cartProducts: { item: CartItem; product: Product }[];
};

const ShopContext = createContext<ShopState | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(read<CartItem[]>("velora_cart", []));
    setWishlist(read<string[]>("velora_wishlist", []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("velora_cart", JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem("velora_wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const value = useMemo<ShopState>(() => {
    const cartProducts = cart
      .map((item) => ({ item, product: products.find((p) => p.id === item.id)! }))
      .filter((x) => Boolean(x.product));
    return {
      cart,
      wishlist,
      cartProducts,
      addToCart: (item) =>
        setCart((prev) => {
          const i = prev.findIndex((p) => p.id === item.id && p.size === item.size && p.color === item.color);
          const existing = prev[i];
          if (existing) {
            const next = [...prev];
            next[i] = { ...existing, qty: existing.qty + item.qty };
            return next;
          }
          return [...prev, item];
        }),
      removeFromCart: (index) => setCart((prev) => prev.filter((_, i) => i !== index)),
      setQty: (index, qty) =>
        setCart((prev) => prev.map((p, i) => (i === index ? { ...p, qty: Math.max(1, qty) } : p))),
      clearCart: () => setCart([]),
      toggleWishlist: (id) =>
        setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
      isWished: (id) => wishlist.includes(id),
      total: cartProducts.reduce((sum, x) => sum + x.product.price * x.item.qty, 0),
      count: cart.reduce((s, i) => s + i.qty, 0),
    };
  }, [cart, wishlist]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
