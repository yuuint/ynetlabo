import { getCollection } from "astro:content";
import { isPublished } from "../tools/published.mjs";

/**
 * 公開済みの記事。ページ・一覧・RSS は getCollection("blog") ではなくこれを使う。
 *
 * 公開日（pubDate）が来ていない記事は外す（tools/published.mjs）。
 * ただし `npm run dev` では下書きを確かめられるよう、未来日の記事も出す。
 */
export async function getPosts() {
  // 並びを固定する（新しい wpId が先）。getCollection の順はファイルを読む順で、
  // Mac と GitHub Actions（Linux）とで違う。各ページは pubDate で並べ直すが、
  // 公開日が同じ記事どうしの順がここで決まらないと、組み立てるたびに入れ替わる
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.wpId - a.data.wpId
  );
  if (import.meta.env.DEV) return posts;
  return posts.filter((post) => isPublished(post.data.pubDate));
}
