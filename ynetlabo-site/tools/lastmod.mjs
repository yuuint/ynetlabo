/**
 * sitemap の <lastmod> を作る。astro.config.mjs から使う。
 *
 * lastmod は「本当に更新した日」でなければ意味がない（毎ビルドで現在時刻を
 * 入れると、検索側は信用しなくなる）。そのため:
 *
 *   - 記事・ガイド・スキル … 原稿の frontmatter の日付をそのまま使う
 *   - 一覧ページ           … そこに載っている中で一番新しい日付を使う
 *   - それ以外             … lastmod を付けない（分からないものは書かない）
 *
 * astro.config.mjs からは astro:content が使えないので、ここでは
 * src/content/ の Markdown を直接読んで frontmatter を拾う。
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = join(siteRoot, "src/content");

/** frontmatter から 1 つのキーの値を取り出す（この用途には十分な素朴さ） */
function field(raw, key) {
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return null;
  const m = fm[1].match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : null;
}

function listField(raw, key) {
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return [];
  const m = fm[1].match(new RegExp(`^${key}:\\s*\\[(.*)\\]$`, "m"));
  if (!m) return [];
  return m[1]
    .split(",")
    .map((s) => s.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

const readAll = (dir) =>
  existsSync(dir)
    ? readdirSync(dir)
        .filter((f) => f.endsWith(".md"))
        .map((f) => readFileSync(join(dir, f), "utf8"))
    : [];

/** ISO 8601 の日付文字列に揃える（sitemap の lastmod は W3C Datetime） */
const iso = (v) => {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
};

const newest = (dates) => {
  const valid = dates.filter(Boolean).sort();
  return valid.length ? valid[valid.length - 1] : null;
};

/**
 * パス（末尾スラッシュあり）→ ISO 日付 の対応表を作る。
 * @param {(name: string) => string} categorySlug consts.ts と同じ変換
 */
export function buildLastmodMap(categorySlug) {
  const map = new Map();

  // ── 記事 ──
  const posts = readAll(join(contentRoot, "blog")).map((raw) => ({
    wpId: field(raw, "wpId"),
    date: iso(field(raw, "updatedDate") ?? field(raw, "pubDate")),
    categories: listField(raw, "categories"),
  }));
  for (const p of posts) {
    if (p.wpId && p.date) map.set(`/archives/${p.wpId}/`, p.date);
  }

  // ── カテゴリ一覧 … そのカテゴリで一番新しい記事の日付 ──
  const byCategory = new Map();
  for (const p of posts) {
    for (const c of p.categories) {
      byCategory.set(c, [...(byCategory.get(c) ?? []), p.date]);
    }
  }
  for (const [name, dates] of byCategory) {
    const d = newest(dates);
    if (d) map.set(`/archives/category/${categorySlug(name)}/`, d);
  }

  // ── ガイド・スキル ──
  for (const [dir, prefix] of [
    ["guide", "/guide/"],
    ["skills", "/skills/"],
  ]) {
    const entries = readdirSync(join(contentRoot, dir)).filter((f) =>
      f.endsWith(".md")
    );
    const dates = [];
    for (const f of entries) {
      const raw = readFileSync(join(contentRoot, dir, f), "utf8");
      const d = iso(field(raw, "updated"));
      if (!d) continue;
      dates.push(d);
      map.set(`${prefix}${f.replace(/\.md$/, "")}/`, d);
    }
    const n = newest(dates);
    if (n) map.set(prefix, n);
  }

  // ── トップと記事一覧 … 一番新しい記事の日付 ──
  const newestPost = newest(posts.map((p) => p.date));
  if (newestPost) {
    map.set("/", newestPost);
    map.set("/article/", newestPost);
  }

  return map;
}
