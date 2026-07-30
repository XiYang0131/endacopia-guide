import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = path.join(root, "work", "endacopia-guide-hub");
const output = path.join(root, "dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, {
  recursive: true,
  filter: (src) => {
    const base = path.basename(src);
    return base !== "package.json" && base !== "vercel.json";
  }
});

console.log(`Static site copied to ${output}`);
