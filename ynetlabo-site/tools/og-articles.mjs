/**
 * ヒーロー画像を持たない記事の OG 画像を作る。
 *
 *   npm run og:articles           まだ無いものだけ作る
 *   npm run og:articles -- --force   すべて作り直す
 *
 * ヒーロー画像がある記事はそれが og:image になる（archives/[id].astro）。
 * 無い記事は共通の /og.png になっていたため、SNS に流したときどれも
 * 同じ絵になっていた。タイトルを焼き込んだ画像を用意して差し替える。
 *
 * 生成先: public/images/og/<wpId>.png（1200x630）
 * 仕組みは `npm run og` と同じで、Chrome ヘッドレスで HTML を撮るだけ。
 */
import { readdir, readFile, mkdir, access } from "node:fs/promises";
import { execFile } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const exec = promisify(execFile);

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = join(siteRoot, "src/content/blog");
const template = join(siteRoot, "tools/og-article.html");
const outDir = join(siteRoot, "public/images/og");

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const force = process.argv.includes("--force");

const exists = (p) =>
  access(p).then(
    () => true,
    () => false
  );

/** frontmatter から 1 つのキーを拾う */
function field(raw, key) {
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return null;
  const m = fm[1].match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : null;
}

function firstCategory(raw) {
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  const m = fm?.[1].match(/^categories:\s*\[(.*)\]$/m);
  if (!m) return "";
  const first = m[1].split(",")[0]?.trim().replace(/^["']|["']$/g, "");
  return first ?? "";
}

if (!(await exists(CHROME))) {
  console.error(`[og:articles] Chrome が見つかりません: ${CHROME}`);
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

const files = (await readdir(blogDir)).filter((f) => f.endsWith(".md"));
let made = 0;
let skipped = 0;

for (const file of files.sort()) {
  const raw = await readFile(join(blogDir, file), "utf8");
  // ヒーロー画像がある記事はそれを使うので作らない
  if (field(raw, "heroImage")) {
    skipped++;
    continue;
  }
  const wpId = field(raw, "wpId");
  const title = field(raw, "title");
  if (!wpId || !title) continue;

  const out = join(outDir, `${wpId}.png`);
  if (!force && (await exists(out))) {
    skipped++;
    continue;
  }

  const url =
    `file://${template}?t=${encodeURIComponent(title)}` +
    `&c=${encodeURIComponent(firstCategory(raw))}`;

  await exec(CHROME, [
    "--headless",
    "--disable-gpu",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    "--force-device-scale-factor=1",
    "--window-size=1200,630",
    // Web フォントの読み込みを待たせる。短いと明朝にフォールバックした絵が撮れる
    "--virtual-time-budget=8000",
    `--screenshot=${out}`,
    url,
  ]);
  made++;
  console.log(`  ${wpId}.png  ${title.slice(0, 40)}`);
}

console.log(`[og:articles] ${made} 件生成 / ${skipped} 件スキップ`);
