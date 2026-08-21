/** Shared helpers */

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ja-JP", {
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
