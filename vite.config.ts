// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Inside Lovable (preview/publish) the managed Nitro build must stay untouched.
// Outside it, we skip Nitro entirely so `npm run build` emits a plain static
// site into `dist/` instead of a server bundle in `.output/`.
const isLovableBuild =
  process.env["LOVABLE_SANDBOX"] === "1" || !!process.env["DEV_SERVER__PROJECT_PATH"];

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // The app has no server functions, so every route is prerendered to static
    // HTML — the result can be hosted on any ordinary static host.
    prerender: { enabled: true, crawlLinks: true },
  },
  ...(isLovableBuild ? {} : { nitro: false as const }),
});
