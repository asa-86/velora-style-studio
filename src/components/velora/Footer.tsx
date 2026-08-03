import { Link } from "@tanstack/react-router";
import { Instagram, Send, Truck, ShieldCheck, RefreshCcw } from "lucide-react";
import { categories } from "@/lib/products";

export function Footer() {
  return (
    <footer className="mt-20 bg-forest-deep text-primary-foreground">
      <div className="velora-container grid gap-10 py-14 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-extrabold">ولورا | VELORA</h3>
          <p className="mt-3 text-sm leading-7 text-primary-foreground/70">
            پوشاک زنانه با دوخت ایرانی و پارچه‌های منتخب. سادگی، کیفیت و ماندگاری؛ سه اصل همیشگی ولورا.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href="https://instagram.com/velora_styl.ir"
              target="_blank"
              rel="noreferrer"
              aria-label="اینستاگرام ولورا"
              className="grid size-10 place-items-center rounded-full border border-primary-foreground/25 transition-colors hover:bg-primary-foreground/10"
            >
              <Instagram className="size-5" />
            </a>
            {/* TODO: لینک نهایی روبیکا در آینده تکمیل شود */}
            <a
              href="#rubika"
              aria-label="روبیکا ولورا"
              className="grid size-10 place-items-center rounded-full border border-primary-foreground/25 transition-colors hover:bg-primary-foreground/10"
            >
              <Send className="size-5" />
            </a>
          </div>
        </div>

        <nav aria-label="دسته‌بندی‌ها">
          <h4 className="mb-4 text-sm font-bold text-gold">دسته‌بندی‌ها</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/75">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/category/$slug" params={{ slug: c.slug }} className="transition-colors hover:text-gold">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="دسترسی سریع">
          <h4 className="mb-4 text-sm font-bold text-gold">دسترسی سریع</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/75">
            <li>
              <Link to="/shop" className="transition-colors hover:text-gold">فروشگاه</Link>
            </li>
            <li>
              <Link to="/search" className="transition-colors hover:text-gold">جستجوی محصولات</Link>
            </li>
            <li>
              <Link to="/wishlist" className="transition-colors hover:text-gold">علاقه‌مندی‌ها</Link>
            </li>
            <li>
              <Link to="/cart" className="transition-colors hover:text-gold">سبد خرید</Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-gold">تماس و ثبت سفارش</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h4 className="mb-4 text-sm font-bold text-gold">خدمات ولورا</h4>
          <ul className="space-y-3.5 text-sm text-primary-foreground/75">
            <li className="flex items-center gap-2"><Truck className="size-4 shrink-0 text-gold" /> ارسال به سراسر ایران</li>
            <li className="flex items-center gap-2"><RefreshCcw className="size-4 shrink-0 text-gold" /> ۷ روز مهلت تعویض</li>
            <li className="flex items-center gap-2"><ShieldCheck className="size-4 shrink-0 text-gold" /> ضمانت اصالت پارچه</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/55">
        © {new Date().toLocaleDateString("fa-IR", { year: "numeric" }).slice(0, 4)} تمام حقوق برای برند ولورا محفوظ است.
      </div>
    </footer>
  );
}
