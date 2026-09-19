import { cp, mkdir, rm, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = path.join(root, "work", "endacopia-guide-hub");
const output = path.join(root, "dist");

// Rebuild only this project's generated output, never the source workspace.
if (path.resolve(output) !== path.join(root, "dist") || output === root) {
  throw new Error("Unsafe static output directory");
}
const sitemap = await readFile(path.join(source, "sitemap.xml"), "utf8");
const pages = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => {
  const url = new URL(match[1]);
  if (url.origin !== "https://www.endacopiaguide.com" || !url.pathname.endsWith("/")) {
    throw new Error(`Unexpected public route: ${url.href}`);
  }
  const relative = path.join(decodeURIComponent(url.pathname).replace(/^\/+/, ""), "index.html");
  if (!path.resolve(source, relative).startsWith(source + path.sep)) throw new Error("Unsafe page path");
  return relative;
});
if (!pages.length || new Set(pages).size !== pages.length) throw new Error("Invalid page manifest");
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
// Internal reports, test scripts, manifests and repository notes are not public assets.
for (const relative of [...pages, "robots.txt", "sitemap.xml", "llms.txt"]) {
  await mkdir(path.dirname(path.join(output, relative)), { recursive: true });
  await cp(path.join(source, relative), path.join(output, relative));
}
await cp(path.join(source, "assets"), path.join(output, "assets"), {
  recursive: true,
  filter: (src) => {
    const base = path.basename(src);
    return !base.startsWith(".") && !/\.(?:md|map|jsonl?)$/i.test(base);
  }
});

console.log(`Published ${pages.length} canonical pages and assets to ${output}; internal files excluded`);
