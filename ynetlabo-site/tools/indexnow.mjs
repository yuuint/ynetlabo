/**
 * IndexNow に更新を知らせる。
 *
 *   npm run indexnow          直近のコミットで docs/ が変わった URL だけ送る
 *   npm run indexnow -- --all sitemap にある全 URL を送る（初回・大きな作り直しのとき）
 *   npm run indexnow -- --dry 送らずに対象だけ表示する
 *
 * IndexNow は Bing / Yandex / Seznam などが対応する更新通知の仕組みで、
 * クロールを待たずにインデックスを促せる（Bing Webmaster の
 * 「IndexNow が採用されていません」への対応）。Google は非対応。
 *
 * **公開後に実行すること。** 送った URL を相手がすぐ取りに来るので、
 * GitHub Pages への反映（push 後 1〜2分）を待ってから叩く。
 *
 * 変更のない URL を毎回投げるのは推奨されないため、既定では
 * 直近コミットの docs/ の差分だけを送る。
 */
import { readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const exec = promisify(execFile);

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(siteRoot, "..");

const HOST = "ynetlabo.net";
const KEY = "452f20d7e5f3335996b14f3d2bcf9891";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
/** 1リクエストの上限は 10,000 URL */
const MAX_URLS = 10000;

const args = process.argv.slice(2);
const all = args.includes("--all");
const dry = args.includes("--dry");

/** noindex のページは送らない（404 ページ） */
const SKIP = new Set(["docs/404.html"]);

/** docs/ の出力パスを公開 URL に直す（trailingSlash: ignore なので / 付きで揃える） */
function toUrl(docsPath) {
  if (SKIP.has(docsPath)) return null;
  const rel = docsPath.replace(/^docs\//, "");
  if (!rel.endsWith(".html")) return null; // 画像・CSS は送らない
  const path = rel === "index.html" ? "" : rel.replace(/index\.html$/, "");
  return `https://${HOST}/${path}`;
}

async function urlsFromSitemap() {
  const xml = await readFile(join(repoRoot, "docs/sitemap-0.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function urlsFromLastCommit() {
  const { stdout } = await exec(
    "git",
    ["diff", "--name-only", "--diff-filter=d", "HEAD~1", "HEAD", "--", "docs/"],
    { cwd: repoRoot }
  );
  return [
    ...new Set(
      stdout
        .split("\n")
        .filter(Boolean)
        .map(toUrl)
        .filter(Boolean)
    ),
  ];
}

const urls = all ? await urlsFromSitemap() : await urlsFromLastCommit();

if (urls.length === 0) {
  console.log("[indexnow] 送る URL がありません（docs/ の HTML に変更なし）");
  process.exit(0);
}
if (urls.length > MAX_URLS) {
  console.error(`[indexnow] URL が多すぎます（${urls.length} > ${MAX_URLS}）`);
  process.exit(1);
}

console.log(`[indexnow] ${urls.length} 件${dry ? "（--dry / 送信しない）" : ""}`);
for (const u of urls) console.log(`  ${u}`);
if (dry) process.exit(0);

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }),
});

/**
 * 200 / 202 が成功。202 は「鍵をこれから検証する」の意味で、
 * 鍵ファイルが公開されていれば問題ない。
 */
const body = await res.text().catch(() => "");
if (res.ok) {
  console.log(`[indexnow] OK (${res.status})`);
} else {
  console.error(`[indexnow] 失敗 (${res.status}) ${body}`);
  if (res.status === 403) {
    console.error(`  鍵ファイルを確認してください: ${KEY_LOCATION}`);
  }
  process.exit(1);
}
