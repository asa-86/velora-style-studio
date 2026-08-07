import { Link } from "@tanstack/react-router";
import { Instagram, Send, Truck, ShieldCheck, RefreshCcw } from "lucide-react";
import { categories } from "@/lib/products";

export function Footer() {
  return (
    <footer className="gradient-emerald relative mt-24 overflow-hidden text-primary-foreground">
      <span className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-gold/15 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-28 -right-16 size-80 rounded-full bg-emerald-bright/25 blur-3xl" />

      <div className="velora-container relative grid gap-10 py-16 md:grid-cols-4">
        <div>
          <h3 className="text-gold-gradient text-2xl font-extrabold">ولورا | VELORA</h3>
          <p className="mt-4 text-sm leading-7 text-primary-foreground/70">
            پوشاک زنانه با دوخت ایرانی و پارچه‌های منتخب. سادگی، کیفیت و ماندگاری؛ سه اصل همیشگی ولورا.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href="https://instagram.com/velora_styl.ir"
              target="_blank"
              rel="noreferrer"
              aria-label="اینستاگرام ولورا"
              className="grid size-11 place-items-center rounded-2xl border border-gold/40 transition-all hover:-translate-y-1 hover:bg-primary-foreground/10"
            >
              <Instagram className="size-5 text-gold-light" />
            </a>
            {/* TODO: لینک نهایی روبیکا در آینده تکمیل شود */}
            <a
              href="#rubika"
              aria-label="روبیکا ولورا"
              className="grid size-11 place-items-center rounded-2xl border border-gold/40 transition-all hover:-translate-y-1 hover:bg-primary-foreground/10"
            >
              <Send className="size-5 text-gold-light" />
            </a>
          </div>
        </div>

        <nav aria-label="دسته‌بندی‌ها">
          <h4 className="mb-4 text-sm font-bold text-gold-light">دسته‌بندی‌ها</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/75">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="transition-all hover:pr-1.5 hover:text-gold-light"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="دسترسی سریع">
          <h4 className="mb-4 text-sm font-bold text-gold-light">دسترسی سریع</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/75">
            <li><Link to="/shop" className="transition-all hover:pr-1.5 hover:text-gold-light">فروشگاه</Link></li>
            <li><Link to="/search" className="transition-all hover:pr-1.5 hover:text-gold-light">جستجوی محصولات</Link></li>
            <li><Link to="/wishlist" className="transition-all hover:pr-1.5 hover:text-gold-light">علاقه‌مندی‌ها</Link></li>
            <li><Link to="/cart" className="transition-all hover:pr-1.5 hover:text-gold-light">سبد خرید</Link></li>
            <li><Link to="/contact" className="transition-all hover:pr-1.5 hover:text-gold-light">تماس و ثبت سفارش</Link></li>
          </ul>
        </nav>

        <div>
          <h4 className="mb-4 text-sm font-bold text-gold-light">خدمات ولورا</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/75">
            <li className="flex items-center gap-2 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-3 py-2.5">
              <Truck className="size-4 shrink-0 text-gold-light" /> ارسال به سراسر ایران
            </li>
            <li className="flex items-center gap-2 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-3 py-2.5">
              <RefreshCcw className="size-4 shrink-0 text-gold-light" /> ۷ روز مهلت تعویض
            </li>
            <li className="flex items-center gap-2 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-3 py-2.5">
              <ShieldCheck className="size-4 shrink-0 text-gold-light" /> ضمانت اصالت پارچه
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-gold/20 py-5 text-center text-xs text-primary-foreground/55">
        © {new Date().toLocaleDateString("fa-IR", { year: "numeric" }).slice(0, 4)} تمام حقوق برای برند ولورا محفوظ است.
      </div>
    </footer>
  );
}
