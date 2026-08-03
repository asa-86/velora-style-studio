import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Instagram, Scissors, Sparkles, Truck } from "lucide-react";
import { Layout } from "@/components/velora/Layout";
import { ProductCard } from "@/components/velora/ProductCard";
import { categories, products } from "@/lib/products";
import heroImage from "@/assets/velora-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ولورا | فروشگاه پوشاک زنانه لوکس" },
      {
        name: "description",
        content:
          "ولورا؛ برند پوشاک زنانه با دوخت ایرانی و پارچه‌های منتخب. خرید مانتو، پیراهن، بافت، شلوار و لباس مجلسی با ارسال به سراسر ایران.",
      },
      { property: "og:title", content: "ولورا | فروشگاه پوشاک زنانه لوکس" },
      { property: "og:description", content: "خرید آنلاین پوشاک زنانه ولورا؛ مینیمال، شیک و باکیفیت." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.badge).slice(0, 4);
  const newest = products.slice(4, 8);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sand">
        <div className="velora-container grid items-center gap-8 py-12 md:grid-cols-2 md:py-20">
          <div className="fade-up">
            <p className="text-xs tracking-[0.4em] text-muted-foreground">VELORA · SS26</p>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight md:text-5xl">
              پوشاکی که <span className="text-primary">آرامش</span> را می‌پوشد
            </h1>
            <p className="mt-5 max-w-md text-sm leading-8 text-muted-foreground md:text-base">
              کلکسیون جدید ولورا با الهام از رنگ‌های طبیعت؛ کرِم گرم و سبز عمیق. پارچه‌های منتخب، دوخت دقیق و برش‌هایی که
              روی هر اندامی زیبا می‌نشیند.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-soft transition-all hover:opacity-90"
              >
                مشاهده کلکسیون
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link
                to="/category/$slug"
                params={{ slug: "dress" }}
                className="rounded-md border border-primary/30 px-7 py-3.5 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
              >
                لباس مجلسی
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-center">
              {[
                ["۱۰۰٪", "پارچه منتخب"],
                ["۷ روز", "مهلت تعویض"],
                ["۳۱", "استان ارسال"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-md border border-border/70 bg-card/60 py-3">
                  <dt className="text-base font-extrabold text-primary">{v}</dt>
                  <dd className="mt-1 text-[11px] text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-lift">
              <img
                src={heroImage}
                alt="استایل کلکسیون جدید ولورا؛ پالتو کتان کرم و شلوار سبز تیره"
                width={1408}
                height={1760}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 right-4 hidden rounded-md bg-card px-5 py-4 shadow-soft md:block">
              <p className="text-xs text-muted-foreground">ست پیشنهادی هفته</p>
              <p className="mt-1 text-sm font-bold text-primary">پالتو کتان + شلوار بگ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="velora-container grid gap-4 py-10 md:grid-cols-3 md:py-14">
        {[
          { icon: Scissors, title: "دوخت ایرانی", text: "تولید در کارگاه اختصاصی با کنترل کیفیت مرحله‌ای." },
          { icon: Sparkles, title: "طراحی مینیمال", text: "برش‌های ساده و بی‌زمان که سال‌ها همراهتان می‌مانند." },
          { icon: Truck, title: "ارسال سریع", text: "بسته‌بندی شکیل و ارسال به تمام نقاط ایران." },
        ].map((f) => (
          <div key={f.title} className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40">
            <f.icon className="size-6 text-primary" />
            <h3 className="mt-4 text-base font-bold">{f.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="velora-container py-8 md:py-12">
        <SectionHead title="دسته‌بندی‌ها" subtitle="از میان کلکسیون‌های ولورا انتخاب کنید" />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group relative overflow-hidden rounded-lg"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:aspect-[3/2]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent" />
              <span className="absolute bottom-4 right-4 text-base font-bold text-primary-foreground md:text-lg">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="velora-container py-8 md:py-12">
        <SectionHead title="منتخب ولورا" subtitle="پرفروش‌ترین و محدودترین محصولات این فصل" href="/shop" />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Editorial band */}
      <section className="mt-8 bg-forest text-primary-foreground">
        <div className="velora-container grid gap-6 py-14 md:grid-cols-2 md:items-center">
          <h2 className="text-2xl font-extrabold leading-relaxed md:text-3xl">
            «لباس خوب، آرام است.»
          </h2>
          <p className="text-sm leading-8 text-primary-foreground/75">
            در ولورا به‌جای دنبال‌کردن هر ترند، روی جزئیات کار می‌کنیم: کیفیت پارچه، ماندگاری رنگ، فرم‌گیری دوخت و
            راحتی در طول روز. هر قطعه پیش از ارسال، دوباره بازرسی می‌شود.
          </p>
        </div>
      </section>

      {/* New arrivals */}
      <section className="velora-container py-12 md:py-16">
        <SectionHead title="تازه‌رسیده‌ها" subtitle="جدیدترین قطعات اضافه‌شده به ویترین" href="/shop" />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {newest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="velora-container pb-4">
        <div className="rounded-lg border border-primary/20 bg-sand p-8 text-center md:p-12">
          <h2 className="text-xl font-extrabold md:text-2xl">ثبت سفارش با پیام مستقیم</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            سفارش‌ها فعلاً از طریق اینستاگرام و روبیکا ثبت می‌شود. کافیست سبد خریدتان را ببندید و برای ما پیام بدهید.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Instagram className="size-4" />
            راه‌های ارتباطی
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function SectionHead({ title, subtitle, href }: { title: string; subtitle: string; href?: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <h2 className="text-xl font-extrabold md:text-2xl">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        <span className="hairline mt-4 block w-24" />
      </div>
      {href === "/shop" && (
        <Link to="/shop" className="shrink-0 text-sm font-bold text-primary transition-opacity hover:opacity-70">
          همه محصولات
        </Link>
      )}
    </div>
  );
}
