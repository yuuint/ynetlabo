/**
 * ガイド本文の画像を figure にし、注釈表に印を付ける rehype プラグイン。
 *
 * 画像1枚だけの段落を
 *   <figure class="guide-figure">
 *     <a href="…" target="_blank" rel="noopener">…<img …></a>
 *     <figcaption>alt テキスト</figcaption>
 *   </figure>
 * に置き換える。ラフ画は最大 1374px 幅あって本文カラムに収まらないので、
 * 原寸を別タブで開けるようにしておく。
 *
 * 画像とテキストが混ざった段落（`… ![x](y) …`）はそのまま残す。
 *
 * あわせて次の2つを行う。
 * - ```mermaid のコードブロックを、クライアント側で描くための `<pre class="mermaid">` に変える
 * - 1列目が「No.」の表（図の番号と対応する注釈表）に `guide-table--numbered` を付ける
 *   （用語表などと見せ方を分けるため）
 */
const isElement = (node, tagName) => node?.type === "element" && node.tagName === tagName;

/** 空白だけのテキストノードは無視して、段落の中身を1件に絞る */
const meaningfulChildren = (node) =>
  (node.children ?? []).filter((c) => !(c.type === "text" && c.value.trim() === ""));

function toFigure(paragraph) {
  const [image] = meaningfulChildren(paragraph);
  const src = image.properties?.src;
  if (typeof src !== "string") return null;

  const caption = image.properties?.alt;

  return {
    type: "element",
    tagName: "figure",
    properties: { className: ["guide-figure"] },
    children: [
      {
        type: "element",
        tagName: "a",
        properties: {
          href: src,
          target: "_blank",
          rel: ["noopener"],
          className: ["guide-figure__frame"],
          // スクリーンリーダーには figcaption と二重に読ませない
          "aria-label": caption ? `${caption}（原寸で開く）` : "図を原寸で開く",
        },
        children: [image],
      },
      ...(caption
        ? [
            {
              type: "element",
              tagName: "figcaption",
              properties: {},
              children: [{ type: "text", value: caption }],
            },
          ]
        : []),
    ],
  };
}

/** ノード配下のテキストを連結する */
function textOf(node) {
  if (node.type === "text") return node.value;
  return (node.children ?? []).map(textOf).join("");
}

/** 1列目の見出しが「No.」なら、図の番号と対応する注釈表とみなす */
function markNumberedTable(table) {
  const thead = (table.children ?? []).find((c) => isElement(c, "thead"));
  const row = thead && meaningfulChildren(thead).find((c) => isElement(c, "tr"));
  const firstCell = row && meaningfulChildren(row)[0];
  if (!firstCell) return;

  if (textOf(firstCell).trim().replace(/[.．]$/, "") !== "No") return;

  table.properties ??= {};
  const className = table.properties.className ?? [];
  table.properties.className = [
    ...(Array.isArray(className) ? className : [className]),
    "guide-table--numbered",
  ];
}

/** ```mermaid のコードブロックか（Astro の syntaxHighlight.excludeLangs で素の pre/code のまま来る） */
function mermaidSource(pre) {
  const code = meaningfulChildren(pre).find((c) => isElement(c, "code"));
  const className = code?.properties?.className ?? [];
  const classes = Array.isArray(className) ? className : [className];
  if (!classes.includes("language-mermaid")) return null;
  return textOf(code);
}

/**
 * mermaid は描画に DOM を要するのでビルド時には SVG にできない。
 * 素のテキストを残した `<pre class="mermaid">` を置き、ページ側の script で描く。
 * JS が動かない環境では、いまと同じくテキストのまま読める。
 */
function toMermaidFigure(pre) {
  const source = mermaidSource(pre);
  if (source === null) return null;

  return {
    type: "element",
    tagName: "figure",
    properties: { className: ["guide-figure", "guide-figure--diagram"] },
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: { className: ["mermaid"] },
        children: [{ type: "text", value: source }],
      },
    ],
  };
}

/** rehype プラグインは全 Markdown に適用されるので、対象を絞る */
const sourcePath = (file) => (file?.history?.[0] ?? file?.path ?? "").replace(/\\/g, "/");
/**
 * 図として扱うのは、ガイド本文と、frontmatter に `figures: true` を書いた記事。
 * 記事を丸ごと対象にすると、本文中の小さなスクリーンショットまで「紙」の枠と
 * キャプションが付いてしまうので、ラフ画を載せる記事だけが明示的に opt-in する。
 */
const hasFigures = (file) => {
  const path = sourcePath(file);
  if (path.includes("/src/content/guide/")) return true;
  return (
    path.includes("/src/content/blog/") && file?.data?.astro?.frontmatter?.figures === true
  );
};
/** mermaid を描く script はガイドページにしか無いので、変換もガイドだけ */
const hasDiagrams = (file) => sourcePath(file).includes("/src/content/guide/");

export default function rehypeGuideFigure() {
  return (tree, file) => {
    if (!hasFigures(file)) return;
    const diagrams = hasDiagrams(file);

    const walk = (node) => {
      if (!Array.isArray(node.children)) return;

      node.children = node.children.map((child) => {
        if (isElement(child, "p")) {
          const inner = meaningfulChildren(child);
          if (inner.length === 1 && isElement(inner[0], "img")) {
            return toFigure(child) ?? child;
          }
        }
        if (diagrams && isElement(child, "pre")) {
          const diagram = toMermaidFigure(child);
          if (diagram) return diagram;
        }
        if (isElement(child, "table")) markNumberedTable(child);
        walk(child);
        return child;
      });
    };
    walk(tree);
  };
}
