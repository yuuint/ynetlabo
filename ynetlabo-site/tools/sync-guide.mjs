/**
 * アプリ側リポジトリの docs/ にあるユーザガイド原稿を、このサイトへ取り込む。
 *
 *   npm run sync:guide
 *
 * 原稿の「正」はあくまでアプリ側。ここで作られる
 *   src/content/guide/<slug>.md
 *   public/images/guide/<slug>/*.svg
 * は毎回作り直される生成物なので、手で編集しないこと。
 */
import { readFile, writeFile, mkdir, rm, readdir, copyFile, stat } from "node:fs/promises";
import { dirname, join, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
/** GitHub/ 直下に全リポジトリが並んでいる前提 */
const reposRoot = resolve(siteRoot, "../..");

/** @type {{slug: string, app: string, title: string, description: string, src: string, images: string, draft: boolean}[]} */
const GUIDES = [
  {
    slug: "soroe",
    // consts.ts の PROJECTS[].name と一致させる（アイコン・ストアリンクを引くため）
    app: "soroe",
    title: "soroe 使い方ガイド",
    description:
      "シフト調整アプリ soroe の使い方ガイド。グループ作成・メンバー招待・シフト希望の募集と提出・承認と確定まで、画面図つきで説明します。",
    src: "soroe/docs/user-guide.md",
    images: "soroe/docs/images",
    draft: false,
  },
  {
    slug: "wa-ri",
    app: "wa/ri",
    title: "wa/ri 使い方ガイド",
    description:
      "割り勘アプリ wa/ri の使い方ガイド。ルーム作成・メンバー登録・支払いの記録・割り勘結果の見方から、招待・外貨ルーム・CSV／PDF出力まで、画面図つきで説明します。",
    src: "wari-ios/docs/user-guide/user-guide.md",
    images: "wari-ios/docs/user-guide/images",
    draft: false,
  },
];

/**
 * 公開ページには出さない節（見出しの文言で指定）。
 * - 図の作り直し方: 開発者向け
 * - 目次: ページ側の追従目次と重複する
 */
const DROP_SECTIONS = ["図の作り直し方", "目次"];

/** 開発ドキュメントへの参照。この文字列を含む行は落とす */
const DEV_ONLY_LINK_PATTERNS = [
  "](specs/",
  "](adr/",
  "](prd.md",
  "](architecture.md",
  "](README.md",
  "-screen-inventory.md",
  "-transition-audit.md",
  "-fidelity-review.md",
];

/** 見出し行なら { level, text } を返す */
function parseHeading(line) {
  const m = /^(#{1,6})\s+(.*)$/.exec(line);
  return m ? { level: m[1].length, text: m[2].trim() } : null;
}

/**
 * 開発者向けの節・行を落として、画像パスをサイト内の絶対パスに直す。
 * 併せて、ページ側でヘッダとして描く先頭の H1 を取り除く。
 */
function transform(markdown, slug) {
  const out = [];
  /** 除去中の節のレベル（0 = 除去していない） */
  let skipLevel = 0;
  let h1Dropped = false;
  /** コードフェンスの中か（mermaid 等の中身を見出し・リンクとして誤判定しないため） */
  let fence = null;

  for (const line of markdown.split("\n")) {
    const fenceMark = /^\s*(```+|~~~+)/.exec(line)?.[1];
    if (fenceMark) {
      if (fence === null) fence = fenceMark[0];
      else if (fenceMark[0] === fence) fence = null;
    }
    if (fence !== null || fenceMark) {
      if (!skipLevel) out.push(line.replaceAll("](images/", `](/images/guide/${slug}/`));
      continue;
    }

    const heading = parseHeading(line);

    if (heading) {
      // 除去中の節は、同じか浅いレベルの見出しが来たら抜ける
      if (skipLevel && heading.level <= skipLevel) skipLevel = 0;

      if (!skipLevel && DROP_SECTIONS.includes(heading.text)) {
        skipLevel = heading.level;
        continue;
      }
      // 先頭の H1 はページヘッダと重複するので落とす
      if (!skipLevel && heading.level === 1 && !h1Dropped) {
        h1Dropped = true;
        continue;
      }
    }
    if (skipLevel) continue;

    if (DEV_ONLY_LINK_PATTERNS.some((p) => line.includes(p))) continue;

    out.push(line.replaceAll("](images/", `](/images/guide/${slug}/`));
  }

  return out
    .join("\n")
    // 節を落とした跡に空行が溜まるので詰める
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** frontmatter 値のクォート（原稿由来の文字列が入るので最低限のエスケープをする） */
const yamlString = (s) => `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

async function syncImages(fromDir, toDir) {
  await rm(toDir, { recursive: true, force: true });
  await mkdir(toDir, { recursive: true });

  const entries = await readdir(fromDir, { withFileTypes: true });
  const images = entries.filter(
    (e) => e.isFile() && [".svg", ".png", ".jpg", ".jpeg", ".webp"].includes(extname(e.name).toLowerCase())
  );
  for (const image of images) {
    await copyFile(join(fromDir, image.name), join(toDir, image.name));
  }
  return images.length;
}

for (const guide of GUIDES) {
  const srcPath = join(reposRoot, guide.src);
  const raw = await readFile(srcPath, "utf8");
  const { mtime } = await stat(srcPath);

  const body = transform(raw, guide.slug);
  const frontmatter = [
    "---",
    `title: ${yamlString(guide.title)}`,
    `description: ${yamlString(guide.description)}`,
    `app: ${yamlString(guide.app)}`,
    `updated: ${mtime.toISOString()}`,
    `draft: ${guide.draft}`,
    `source: ${yamlString(guide.src)}`,
    "---",
    "",
    `<!-- 自動生成: ${guide.src} から取り込んだもの。直接編集せず、原稿を直して \`npm run sync:guide\` を実行すること。 -->`,
    "",
    "",
  ].join("\n");

  const outPath = join(siteRoot, "src/content/guide", `${guide.slug}.md`);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, `${frontmatter}${body}\n`, "utf8");

  const imageCount = await syncImages(
    join(reposRoot, guide.images),
    join(siteRoot, "public/images/guide", guide.slug)
  );

  console.log(`${guide.slug}: 本文 ${body.split("\n").length} 行 / 図 ${imageCount} 枚 <- ${guide.src}`);
}
