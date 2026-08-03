import { createFileRoute } from "@tanstack/react-router";
import { Clock, Copy, Instagram, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { Layout } from "@/components/velora/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تماس با ما و ثبت سفارش | ولورا" },
      {
        name: "description",
        content: "برای ثبت سفارش پوشاک ولورا از طریق اینستاگرام @velora_styl.ir یا روبیکا @velora__shoop با ما در ارتباط باشید.",
      },
      { property: "og:title", content: "تماس با ما و ثبت سفارش | ولورا" },
      { property: "og:description", content: "راه‌های ارتباط با ولورا برای ثبت سفارش." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const INSTAGRAM_ID = "@velora_styl.ir";
const RUBIKA_ID = "@velora__shoop";
// TODO: لینک کامل روبیکا بعداً اینجا قرار بگیرد
const RUBIKA_LINK = "";

function ContactPage() {
  const copy = (value: string) => {
    navigator.clipboard?.writeText(value);
    toast.success("کپی شد", { description: value });
  };

  return (
    <Layout>
      <div className="velora-container py-10 md:py-16">
        <h1 className="text-2xl font-extrabold md:text-3xl">تماس با ما</h1>
        <span className="hairline mt-4 block w-28" />

        <div className="mt-8 rounded-lg border border-primary/25 bg-sand p-6 md:p-8">
          <p className="text-sm font-bold leading-8 md:text-base">
            برای ثبت سفارش، لطفاً از طریق اینستاگرام یا روبیکا با ما در ارتباط باشید.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-lg border border-border bg-card p-6">
            <Instagram className="size-6 text-primary" />
            <h2 className="mt-4 text-base font-bold">اینستاگرام</h2>
            <p dir="ltr" className="mt-2 text-left text-sm text-muted-foreground">{INSTAGRAM_ID}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="https://instagram.com/velora_styl.ir"
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                رفتن به پیج
              </a>
              <button
                type="button"
                onClick={() => copy(INSTAGRAM_ID)}
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm transition-colors hover:border-primary"
              >
                <Copy className="size-4" /> کپی آی‌دی
              </button>
            </div>
          </article>

          <article className="rounded-lg border border-border bg-card p-6" id="rubika">
            <Send className="size-6 text-primary" />
            <h2 className="mt-4 text-base font-bold">روبیکا</h2>
            <p dir="ltr" className="mt-2 text-left text-sm text-muted-foreground">{RUBIKA_ID}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {RUBIKA_LINK ? (
                <a
                  href={RUBIKA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
                >
                  رفتن به روبیکا
                </a>
              ) : (
                <span className="rounded-md border border-dashed border-border px-4 py-2.5 text-xs text-muted-foreground">
                  لینک روبیکا به‌زودی تکمیل می‌شود
                </span>
              )}
              <button
                type="button"
                onClick={() => copy(RUBIKA_ID)}
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm transition-colors hover:border-primary"
              >
                <Copy className="size-4" /> کپی شناسه
              </button>
            </div>
          </article>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-6">
            <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <h3 className="text-sm font-bold">ساعات پاسخ‌گویی</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">هر روز از ساعت ۱۰ صبح تا ۹ شب</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-6">
            <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <h3 className="text-sm font-bold">ارسال</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">ارسال به تمام استان‌های ایران با پست پیشتاز</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
