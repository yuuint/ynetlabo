/**
 * 記事（src/content/blog）から Qiita / Zenn への投稿原稿を作る。
 *
 *   npm run crosspost
 *
 * 出力先は リポジトリ直下の crosspost/{qiita,zenn}/。
 * 生成物なので手で直さず、直すなら元記事か この スクリプトを直して作り直すこと。
 *
 * 方針:
 * - 原文は ynetlabo.net が正。Qiita / Zenn には**冒頭と末尾に出典リンク**を付けた
 *   全文を載せる（Qiita / Zenn は canonical タグを持てないため、リンクで示す）。
 * - 相対パスの画像・内部リンクは絶対 URL に直す（外部サイトでは / から始まる
 *   パスが解決できないため）。
 * - お知らせ記事とプロダクト紹介記事は対象外（技術記事だけを出す）。
 */
import { readFile, writeFile, mkdir, rm, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(siteRoot, "..");
const blogDir = join(siteRoot, "src/content/blog");
const outRoot = join(repoRoot, "crosspost");

const SITE_URL = "https://ynetlabo.net";

/** 出さない記事（お知らせ・プロダクト紹介） */
const EXCLUDE_CATEGORIES = ["お知らせ"];
const EXCLUDE_IDS = [186];

/**
 * 記事ごとのタグ。Qiita は5個まで、Zenn は5個まで。
 * カテゴリからの自動生成だと「wa/ri割り勘アプリ」のような自サイト用語が
 * 混ざるので、投稿先で意味のあるタグを明示で持つ。
 */
const TAGS = {
  193: ["Flutter", "SwiftUI", "iOS", "Android", "個人開発"],
  199: ["設計", "アーキテクチャ", "NestJS", "API", "個人開発"],
  202: ["GitHubCopilot", "Flutter", "SwiftUI", "AI", "プロンプト"],
  209: ["CoreML", "CreateML", "Vision", "Swift", "iOS"],
  215: ["Claude", "ClaudeCode", "設計", "ADR", "AI"],
  216: ["Claude", "ClaudeCode", "AI", "ドキュメント", "個人開発"],
  217: ["Claude", "Flutter", "SwiftUI", "Riverpod", "AI"],
  219: ["Claude", "AWS", "資格", "学習", "AI"],
  220: ["Claude", "ClaudeCode", "AI", "個人開発", "OSS"],
  221: ["Claude", "ClaudeCode", "SVG", "ドキュメント", "個人開発"],
};

/** Zenn の記事アイコン */
const EMOJI = {
  193: "🧩",
  199: "🧮",
  202: "🖼️",
  209: "🐧",
  215: "🗂️",
  216: "📝",
  217: "🔁",
  219: "📚",
  220: "🛠️",
  221: "✏️",
};

/** ごく素朴な frontmatter パーサ（この用途では十分） */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error("frontmatter が無い");
  const data = {};
  let key = null;
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) {
      key = kv[1];
      const v = kv[2].trim();
      data[key] = v === "" ? [] : unquote(v);
    } else if (key && /^\s*-\s+/.test(line)) {
      if (!Array.isArray(data[key])) data[key] = [];
      data[key].push(unquote(line.replace(/^\s*-\s+/, "").trim()));
    }
  }
  return { data, body: m[2] };
}

const unquote = (v) => {
  const s = v.trim();
  if (s.startsWith("[") && s.endsWith("]")) {
    return s
      .slice(1, -1)
      .split(",")
      .map((x) => unquote(x))
      .filter(Boolean);
  }
  return s.replace(/^["']|["']$/g, "");
};

/** /images/... や /archives/... を絶対 URL にする */
function absolutize(body) {
  return body
    .replace(/(!?\[[^\]]*\]\()(\/(?!\/)[^)\s]*)/g, `$1${SITE_URL}$2`)
    .replace(/(<img[^>]+src=")(\/(?!\/)[^"]*)/g, `$1${SITE_URL}$2`);
}

const yaml = (s) => `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

await rm(outRoot, { recursive: true, force: true });
await mkdir(join(outRoot, "qiita"), { recursive: true });
await mkdir(join(outRoot, "zenn"), { recursive: true });

const files = (await readdir(blogDir)).filter((f) => f.endsWith(".md"));
const made = [];

for (const file of files) {
  const raw = await readFile(join(blogDir, file), "utf8");
  const { data, body } = parseFrontmatter(raw);
  const wpId = Number(data.wpId);
  const categories = Array.isArray(data.categories) ? data.categories : [];

  if (EXCLUDE_IDS.includes(wpId)) continue;
  if (categories.some((c) => EXCLUDE_CATEGORIES.includes(c))) continue;

  const canonical = `${SITE_URL}/archives/${wpId}`;
  const tags = TAGS[wpId] ?? ["個人開発"];
  const text = absolutize(body.trim());

  const header = `> この記事は、自分のサイト [Y.NetLabo](${SITE_URL}) に書いたものの再掲です。\n> 原文: ${canonical}\n`;
  const footer = `\n\n---\n\n個人開発でつくったアプリと、その裏側を [Y.NetLabo](${SITE_URL}) に書いています。\nこの記事の原文はこちら: ${canonical}\n`;

  // ── Qiita（Qiita CLI の frontmatter） ──
  const qiita = `---
title: ${yaml(data.title)}
tags:
${tags.map((t) => `  - ${t}`).join("\n")}
private: false
updated_at: ''
id: null
organization_url_name: null
slide: false
ignorePublish: false
---

${header}
${text}${footer}`;

  // ── Zenn（zenn-cli の frontmatter） ──
  const zenn = `---
title: ${yaml(data.title)}
emoji: ${yaml(EMOJI[wpId] ?? "📝")}
type: "tech"
topics: [${tags.map((t) => yaml(t.toLowerCase())).join(", ")}]
published: false
---

${header}
${text}${footer}`;

  const name = `${wpId}.md`;
  await writeFile(join(outRoot, "qiita", name), qiita, "utf8");
  await writeFile(join(outRoot, "zenn", name), zenn, "utf8");
  made.push({ wpId, title: data.title, pubDate: data.pubDate, tags });
}

made.sort((a, b) => String(b.pubDate).localeCompare(String(a.pubDate)));

const readme = `# クロス投稿の原稿

\`npm run crosspost\`（ynetlabo-site/tools/build-crosspost.mjs）が
\`ynetlabo-site/src/content/blog/*.md\` から作った生成物。**手で直さない**。
直すときは元記事を直して作り直す。

## 使い方

### Qiita
1. [Qiita CLI](https://github.com/increments/qiita-cli) を入れる（\`npx qiita init\` / \`npx qiita login\`）
2. \`qiita/<id>.md\` を \`public/\` に置いて \`npx qiita publish <id>\`
3. Web から貼るだけでもよい。その場合は frontmatter を除いた本文を貼り、タグを手で設定する

### Zenn
1. [zenn-cli](https://zenn.dev/zenn/articles/install-zenn-cli) を入れて GitHub 連携する
2. \`zenn/<id>.md\` を \`articles/\` に置く
3. 内容を確認してから frontmatter の \`published\` を \`true\` にして push する

## 注意

- Qiita / Zenn は canonical タグを持てないため、**冒頭と末尾の原文リンク**で出典を示している。
  この形なら、検索側は原文を一次情報として扱いやすく、Qiita / Zenn 側の流入も取れる。
- 出す順番は**1日1本まで**。同日に複数出すと、どちらもタイムラインで埋もれる。
- 画像は \`${SITE_URL}\` の絶対 URL を参照している。サイト側の画像を消すと投稿先でも消える。

## 生成された原稿（${made.length}本）

| 記事 | 公開日 | タグ |
|---|---|---|
${made
  .map(
    (m) =>
      `| [${m.title}](${SITE_URL}/archives/${m.wpId}) | ${m.pubDate} | ${m.tags.join(
        " / "
      )} |`
  )
  .join("\n")}
`;

await writeFile(join(outRoot, "README.md"), readme, "utf8");
console.log(`[crosspost] ${made.length} 本 → ${outRoot}`);
for (const m of made) console.log(`  ${m.wpId}  ${m.title}`);
