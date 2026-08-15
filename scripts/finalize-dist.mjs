// Flattens the static build so `dist/` itself is the deployable folder:
//   dist/client/** -> dist/**   (and drops the unused dist/server bundle)
// Also writes dist/404.html so static hosts fall back to the app shell.
// No-op inside Lovable's managed build, which expects dist/client + dist/server.
import { cp, readdir, rename, rm, stat } from "node:fs/promises";
import path from "node:path";

const isLovableBuild =
  process.env["LOVABLE_SANDBOX"] === "1" || !!process.env["DEV_SERVER__PROJECT_PATH"];

if (isLovableBuild) {
  console.log("[finalize-dist] Lovable build detected — leaving dist/ untouched.");
  process.exit(0);
}

const dist = path.resolve("dist");
const client = path.join(dist, "client");

const clientExists = await stat(client).catch(() => null);
if (!clientExists) {
  console.log("[finalize-dist] dist/client not found — nothing to flatten.");
  process.exit(0);
}

for (const entry of await readdir(client)) {
  await rm(path.join(dist, entry), { recursive: true, force: true });
  await rename(path.join(client, entry), path.join(dist, entry));
}

await rm(client, { recursive: true, force: true });
await rm(path.join(dist, "server"), { recursive: true, force: true });

const index = path.join(dist, "index.html");
if (await stat(index).catch(() => null)) {
  await cp(index, path.join(dist, "404.html"));
}

console.log("[finalize-dist] Static site ready in dist/");
