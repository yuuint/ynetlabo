/**
 * 公開日が来たのに、まだ docs/ に出ていない記事を挙げる。
 *
 *   node ynetlabo-site/tools/pending-posts.mjs
 *
 * .github/workflows/publish.yml が毎朝これを実行し、1 件でもあれば
 * ビルドし直して docs/ をコミットする。「今日が公開日の記事」ではなく
 * 「公開日を過ぎて、まだ出ていない記事」を見るので、実行が 1 日抜けても取りこぼさない。
 *
 * GitHub Actions の中では、結果を GITHUB_OUTPUT の `pending` に書く（空なら無し）。
 */
import { readdirSync, readFileSync, existsSync, appendFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { isPublished } from "./published.mjs";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(siteRoot, "..");
const blogDir = join(siteRoot, "src/content/blog");

function field(raw, key) {
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return null;
  const m = fm[1].match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : null;
}

const pending = readdirSync(blogDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => readFileSync(join(blogDir, f), "utf8"))
  .map((raw) => ({ wpId: field(raw, "wpId"), pubDate: field(raw, "pubDate") }))
  .filter((p) => p.wpId && isPublished(p.pubDate))
  .filter((p) => !existsSync(join(repoRoot, "docs/archives", p.wpId, "index.html")))
  .map((p) => p.wpId);

if (pending.length === 0) {
  console.log("[pending-posts] 公開待ちの記事はありません");
} else {
  console.log(`[pending-posts] 公開日を過ぎて未公開: ${pending.join(", ")}`);
}

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `pending=${pending.join(" ")}\n`);
}
