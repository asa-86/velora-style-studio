import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ShopProvider } from "@/lib/shop-store";
import { Layout } from "@/components/velora/Layout";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <Layout>
      <div className="velora-container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-7xl font-extrabold text-primary md:text-8xl">۴۰۴</p>
        <span className="hairline my-6 w-40" />
        <h1 className="text-xl font-bold">این صفحه در ویترین ولورا پیدا نشد</h1>
        <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
          ممکن است نشانی را اشتباه وارد کرده باشید یا محصول از دسترس خارج شده باشد. از فروشگاه دیدن کنید.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/shop"
            className="rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            رفتن به فروشگاه
          </Link>
          <Link to="/" className="rounded-md border border-border px-6 py-3 text-sm font-bold transition-colors hover:bg-secondary">
            صفحه اصلی
          </Link>
        </div>
      </div>
    </Layout>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold text-foreground">این صفحه بارگذاری نشد</h1>
        <p className="mt-2 text-sm text-muted-foreground">لطفاً صفحه را دوباره بارگذاری کنید یا به خانه بازگردید.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
          >
            تلاش دوباره
          </button>
          <a href="/" className="rounded-md border border-input px-4 py-2 text-sm font-bold">
            صفحه اصلی
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ولورا | پوشاک زنانه لوکس" },
      { name: "description", content: "فروشگاه اینترنتی پوشاک ولورا؛ مانتو، پیراهن، بافت و لباس مجلسی با دوخت ایرانی." },
      { property: "og:site_name", content: "ولورا | VELORA" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ClothingStore",
          name: "ولورا",
          alternateName: "VELORA",
          description: "فروشگاه پوشاک زنانه ولورا",
          sameAs: ["https://instagram.com/velora_styl.ir"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ShopProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <Toaster position="top-center" />
      </ShopProvider>
    </QueryClientProvider>
  );
}
