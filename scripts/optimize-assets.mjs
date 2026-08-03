import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import os from "node:os";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const siteRoot = path.join(root, "work", "endacopia-guide-hub");
const steamMediaDir = path.join(siteRoot, "assets", "steam-media");
const widths = [640, 960, 1280];
const sizes = "(max-width: 620px) calc(100vw - 48px), (max-width: 920px) calc(100vw - 64px), 720px";

function getRequire() {
  const candidates = [
    path.join(root, "node_modules"),
    process.env.NODE_PATH,
    path.join(os.homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "node", "node_modules")
  ].filter(Boolean);

  for (const nodeModules of candidates) {
    const sharpPackage = path.join(nodeModules, "sharp", "package.json");
    if (existsSync(sharpPackage)) {
      return createRequire(sharpPackage);
    }
  }

  throw new Error("Cannot find sharp. Set NODE_PATH to a node_modules folder that contains sharp.");
}

const require = getRequire();
const sharp = require("sharp");

async function listFiles(dir, extension) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(fullPath, extension));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(extension)) {
      files.push(fullPath);
    }
  }

  return files;
}

function toWebpName(jpgName, width) {
  return jpgName.replace(/\.jpe?g$/i, `-${width}.webp`);
}

async function optimizeSteamMedia() {
  const jpgs = await listFiles(steamMediaDir, ".jpg");
  const output = [];

  for (const file of jpgs) {
    const metadata = await sharp(file).metadata();
    const base = path.basename(file);

    for (const width of widths) {
      if (metadata.width && metadata.width < width) continue;

      const target = path.join(path.dirname(file), toWebpName(base, width));
      await sharp(file)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 72, effort: 4, smartSubsample: true })
        .toFile(target);

      const original = (await stat(file)).size / 1024;
      const optimized = (await stat(target)).size / 1024;
      output.push(`${path.basename(target)} ${optimized.toFixed(1)} KB from ${original.toFixed(1)} KB`);
    }
  }

  return output;
}

function wrapSteamImageTag(html, match, offset) {
  const before = html.slice(0, offset);
  const lastPictureOpen = before.lastIndexOf("<picture");
  const lastPictureClose = before.lastIndexOf("</picture>");
  if (lastPictureOpen > lastPictureClose) return match;

  const indent = match.match(/^\s*/)?.[0] ?? "";
  const src = match.match(/src="([^"]+)"/)?.[1];
  if (!src) return match;

  const fileName = path.basename(src);
  const srcset = widths
    .map((width) => `/assets/steam-media/${toWebpName(fileName, width)} ${width}w`)
    .join(", ");

  return [
    `${indent}<picture>`,
    `${indent}  <source type="image/webp" srcset="${srcset}" sizes="${sizes}">`,
    `${match}`,
    `${indent}</picture>`
  ].join("\n");
}

async function updateHtml() {
  const htmlFiles = await listFiles(siteRoot, ".html");
  let changed = 0;

  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    const next = html.replace(/^[ \t]*<img src="\/assets\/steam-media\/[^"]+\.jpg"[^>]*>/gm, (match, offset) => {
      return wrapSteamImageTag(html, match, offset);
    });

    if (next !== html) {
      await writeFile(file, next);
      changed += 1;
    }
  }

  return changed;
}

const optimized = await optimizeSteamMedia();
const changed = await updateHtml();

console.log(`Optimized ${optimized.length} WebP variants.`);
for (const line of optimized) console.log(line);
console.log(`Updated ${changed} HTML files.`);
