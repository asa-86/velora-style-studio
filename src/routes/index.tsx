import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Instagram, Scissors, Sparkles, Truck } from "lucide-react";
import { Layout } from "@/components/velora/Layout";
import { ProductCard } from "@/components/velora/ProductCard";
import { categories, formatPrice, products } from "@/lib/products";
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
  const spotlight = products.find((p) => p.id === "velora-dress-emerald") ?? products[0]!;

  return (
    <Layout>
      {/* ==== Bento Hero ==== */}
      <section className="velora-container py-6 md:py-12">
        <div className="grid auto-rows-min gap-4 md:grid-cols-6 md:gap-5">
          {/* Headline tile */}
          <div className="fade-up ornament glass relative overflow-hidden rounded-[2rem] p-7 md:col-span-4 md:p-12">
            <span className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-gold/20 blur-3xl" />
            <span className="pointer-events-none absolute -bottom-20 right-0 size-64 rounded-full bg-emerald-bright/15 blur-3xl" />
            <p className="text-gold-gradient relative text-[11px] font-bold tracking-[0.5em]">VELORA · SS۲۶</p>
            <h1 className="relative mt-5 text-3xl font-extrabold leading-[1.35] md:text-6xl">
              زمرد را
              <span className="mx-2 inline-block bg-primary px-3 py-1 text-primary-foreground [border-radius:1rem_0.25rem_1rem_0.25rem]">
                بپوش
              </span>
              <br />
              درخشش را زندگی کن
            </h1>
            <p className="relative mt-6 max-w-xl text-sm leading-8 text-muted-foreground md:text-base">
              کلکسیون جدید ولورا با الهام از سنگ زمرد و طلا؛ سبز عمیق، ایوُری گرم و جزئیاتی که در نور می‌درخشند. پارچه‌های
              منتخب، دوخت دقیق و برش‌هایی که روی هر اندامی زیبا می‌نشیند.
            </p>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="group gradient-emerald gold-ring inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-gold-light transition-transform hover:-translate-y-1"
              >
                مشاهده کلکسیون
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1.5" />
              </Link>
              <Link
                to="/category/$slug"
                params={{ slug: "dress" }}
                className="rounded-full border border-gold/50 px-7 py-3.5 text-sm font-bold text-primary transition-all hover:-translate-y-1 hover:bg-secondary"
              >
                لباس مجلسی
              </Link>
            </div>
          </div>

          {/* Hero image tile */}
          <div className="fade-up relative overflow-hidden rounded-[2rem] shadow-lift md:col-span-2 md:row-span-2">
            <img
              src={heroImage}
              alt="استایل کلکسیون جدید ولورا؛ پالتو کتان کرم و شلوار سبز تیره"
              width={1408}
              height={1760}
              className="aspect-[4/5] size-full object-cover transition-transform duration-[1200ms] hover:scale-105 md:aspect-auto"
            />
            <div className="glass absolute inset-x-4 bottom-4 rounded-2xl p-4">
              <p className="text-[11px] text-muted-foreground">ست پیشنهادی هفته</p>
              <p className="mt-1 text-sm font-extrabold text-primary">پالتو کتان + شلوار بگ</p>
            </div>
          </div>

          {/* Stat tiles */}
          {[
            ["۱۰۰٪", "پارچه منتخب"],
            ["۷ روز", "مهلت تعویض"],
            ["۳۱", "استان ارسال"],
          ].map(([v, l], i) => (
            <div
              key={l}
              className="glass card-hover rounded-[1.5rem] p-5 text-center md:col-span-1"
              style={{ animation: `velora-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) ${0.1 * i + 0.2}s both` }}
            >
              <p className="text-xl font-extrabold text-primary md:text-2xl">{v}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{l}</p>
            </div>
          ))}

          {/* Spotlight tile */}
          <Link
            to="/product/$id"
            params={{ id: spotlight.id }}
            className="gradient-emerald card-hover group relative col-span-2 overflow-hidden rounded-[1.5rem] p-5 text-primary-foreground md:col-span-1"
          >
            <Sparkles className="float-slow size-6 text-gold-light" />
            <p className="mt-3 text-xs text-primary-foreground/70">ستاره کلکسیون</p>
            <p className="mt-1 truncate text-sm font-extrabold text-gold-light">{spotlight.name}</p>
            <p className="mt-2 text-[11px] text-primary-foreground/70">{formatPrice(spotlight.price)}</p>
          </Link>
        </div>
      </section>

      {/* ==== Values bento ==== */}
      <section className="velora-container grid gap-4 py-8 md:grid-cols-3 md:gap-5 md:py-12">
        {[
          { icon: Scissors, title: "دوخت ایرانی", text: "تولید در کارگاه اختصاصی با کنترل کیفیت مرحله‌ای." },
          { icon: Sparkles, title: "طراحی فانتزی مینیمال", text: "برش‌های بی‌زمان با جزئیات درخشان و دست‌ساز." },
          { icon: Truck, title: "ارسال سریع", text: "بسته‌بندی شکیل و ارسال به تمام نقاط ایران." },
        ].map((f) => (
          <div key={f.title} className="glass card-hover group rounded-[1.75rem] p-7">
            <span className="gradient-emerald grid size-12 place-items-center rounded-2xl">
              <f.icon className="size-5 text-gold-light" />
            </span>
            <h3 className="mt-5 text-base font-extrabold">{f.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </section>

      {/* ==== Categories bento ==== */}
      <section className="velora-container py-8 md:py-12">
        <SectionHead title="دسته‌بندی‌ها" subtitle="از میان کلکسیون‌های ولورا انتخاب کنید" />
        <div className="mt-8 grid auto-rows-[11rem] grid-cols-2 gap-4 md:auto-rows-[13rem] md:grid-cols-4 md:gap-5">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className={`sheen card-hover group relative overflow-hidden rounded-[1.75rem] ${
                i === 0 ? "col-span-2 row-span-2" : i === 3 ? "md:col-span-2" : ""
              }`}
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="size-full object-cover transition-transform duration-[1100ms] group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/20 to-transparent" />
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 text-base font-extrabold text-primary-foreground md:text-lg">
                {c.name}
                <ArrowLeft className="size-4 text-gold-light transition-transform group-hover:-translate-x-1.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ==== Featured ==== */}
      <section className="velora-container py-8 md:py-12">
        <SectionHead title="منتخب ولورا" subtitle="پرفروش‌ترین و محدودترین محصولات این فصل" href="/shop" />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ==== Editorial band ==== */}
      <section className="velora-container mt-10">
        <div className="gradient-emerald ornament relative overflow-hidden rounded-[2.5rem] px-6 py-14 text-primary-foreground md:px-14">
          <span className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
            <h2 className="text-2xl font-extrabold leading-relaxed md:text-4xl">
              <span className="text-gold-gradient">«لباس خوب، آرام است.»</span>
            </h2>
            <p className="text-sm leading-8 text-primary-foreground/75">
              در ولورا به‌جای دنبال‌کردن هر ترند، روی جزئیات کار می‌کنیم: کیفیت پارچه، ماندگاری رنگ، فرم‌گیری دوخت و
              راحتی در طول روز. هر قطعه پیش از ارسال، دوباره بازرسی می‌شود.
            </p>
          </div>
        </div>
      </section>

      {/* ==== New arrivals ==== */}
      <section className="velora-container py-12 md:py-16">
        <SectionHead title="تازه‌رسیده‌ها" subtitle="جدیدترین قطعات اضافه‌شده به ویترین" href="/shop" />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {newest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ==== CTA ==== */}
      <section className="velora-container pb-4">
        <div className="glass ornament rounded-[2.5rem] p-8 text-center md:p-14">
          <span className="text-gold-gradient text-[11px] font-bold tracking-[0.4em]">VELORA CONCIERGE</span>
          <h2 className="mt-4 text-xl font-extrabold md:text-3xl">ثبت سفارش با پیام مستقیم</h2>
          <span className="hairline mx-auto mt-5 block w-40" />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
            سفارش‌ها فعلاً از طریق اینستاگرام و روبیکا ثبت می‌شود. کافیست سبد خریدتان را ببندید و برای ما پیام بدهید.
          </p>
          <Link
            to="/contact"
            className="gradient-emerald gold-ring mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-gold-light transition-transform hover:-translate-y-1"
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
        <h2 className="text-xl font-extrabold md:text-3xl">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        <span className="hairline mt-4 block w-24" />
      </div>
      {href === "/shop" && (
        <Link
          to="/shop"
          className="shrink-0 rounded-full border border-gold/40 px-4 py-2 text-xs font-bold text-primary transition-all hover:-translate-y-0.5 hover:bg-secondary md:text-sm"
        >
          همه محصولات
        </Link>
      )}
    </div>
  );
}
