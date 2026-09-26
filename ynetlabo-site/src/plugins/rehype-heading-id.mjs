/**
 * 見出しの末尾に書いた `{#id}` を、その見出しの id にする rehype プラグイン。
 *
 *   ## 15. バックアップと復元 {#backup}
 *   → <h2 id="backup">15. バックアップと復元</h2>
 *
 * 既定の id は見出しの文言から作られるので、番号や言い回しを変えると
 * アプリからのリンク（…/guide/tsutsum/#backup）が切れる。固定の id を書けるようにする。
 * id を付けた見出しは Astro の目次（headings）にもその id で載る
 * （Astro の見出し id 付けは、既に付いている id をそのまま使うため）。
 */
const ID_SUFFIX = /\s*\{#([A-Za-z0-9_-]+)\}\s*$/;

const HEADINGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

/** 見出しの中の、最後のテキストノードを探す（強調などの入れ子の中も見る） */
function lastText(node) {
  const children = node.children ?? [];
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];
    if (child.type === "text") {
      if (child.value.trim() === "") continue;
      return child;
    }
    const inner = lastText(child);
    if (inner) return inner;
  }
  return null;
}

function walk(node) {
  if (node.type === "element" && HEADINGS.has(node.tagName)) {
    const text = lastText(node);
    const m = text && ID_SUFFIX.exec(text.value);
    if (m) {
      text.value = text.value.slice(0, m.index);
      node.properties = { ...node.properties, id: m[1] };
    }
    return;
  }
  for (const child of node.children ?? []) walk(child);
}

export default function rehypeHeadingId() {
  return (tree) => walk(tree);
}
