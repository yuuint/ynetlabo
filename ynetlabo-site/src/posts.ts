import { getCollection } from "astro:content";
import { isPublished } from "../tools/published.mjs";

/**
 * 公開済みの記事。ページ・一覧・RSS は getCollection("blog") ではなくこれを使う。
 *
 * 公開日（pubDate）が来ていない記事は外す（tools/published.mjs）。
 * ただし `npm run dev` では下書きを確かめられるよう、未来日の記事も出す。
 */
export async function getPosts() {
  const posts = await getCollection("blog");
  if (import.meta.env.DEV) return posts;
  return posts.filter((post) => isPublished(post.data.pubDate));
}
