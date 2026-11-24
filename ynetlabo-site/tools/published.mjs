/**
 * 記事の公開日の判定。公開日（frontmatter の pubDate）が来ていない記事は
 * ページを作らず、一覧・RSS・sitemap からも外す。
 *
 * 日付は**日本時間の日付**で比べる。pubDate: 2026-11-27 は UTC の 0 時として
 * 読まれるので、UTC のまま比べると日本時間の 0〜9 時に公開されない。
 *
 * 公開日になった記事を実際に出すのは .github/workflows/publish.yml
 * （毎朝ビルドし直して docs/ をコミットする）。
 *
 * astro.config.mjs（tools/lastmod.mjs）からも使うので、TypeScript ではなく
 * 素の JavaScript にしてある。
 */

const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

/** 日時を日本時間の日付（YYYY-MM-DD）にする */
export function jstDateKey(value) {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return new Date(d.getTime() + JST_OFFSET_MS).toISOString().slice(0, 10);
}

/** 公開日が今日（日本時間）以前なら true */
export function isPublished(pubDate, now = new Date()) {
  const key = jstDateKey(pubDate);
  return key !== null && key <= jstDateKey(now);
}
