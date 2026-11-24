/** Shared helpers */

export function formatDate(date: Date): string {
  // 組み立てる機械のタイムゾーンに左右されないよう、日本時間に固定する
  // （GitHub Actions は UTC なので、時刻付きの日付が前日になっていた）
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Preserve original WordPress permalink: /archives/<id>
 * 末尾スラッシュ付きで返す。canonical と sitemap がその形なので、
 * 揃えないと内部リンクのたびに 301 が挟まる。
 */
export function articleHref(wpId: number): string {
  return `/archives/${wpId}/`;
}
