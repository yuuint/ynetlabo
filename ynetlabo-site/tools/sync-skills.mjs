/**
 * 公開スキル集リポジトリ（claude-skills）の SKILL.md を、このサイトへ取り込む。
 *
 *   npm run sync:skills
 *
 * 原稿の「正」はあくまで claude-skills 側。ここで作られる
 *   src/content/skills/<name>.md
 * は毎回作り直される生成物なので、手で編集しないこと。
 *
 * 一覧に出すカテゴリと日本語の説明文は、claude-skills の README.md にある
 * スキル一覧テーブルから読む（説明文の二重管理を避けるため）。
 */
import { readFile, writeFile, mkdir, rm, readdir, stat } from "node:fs/promises";
import { execFile } from "node:child_process";
import { dirname, join, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const exec = promisify(execFile);

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
/** GitHub/ 直下に全リポジトリが並んでいる前提 */
const reposRoot = resolve(siteRoot, "../..");

const REPO_DIR = "claude-skills";
const REPO_URL = "https://github.com/yuuint/claude-skills";
/** 相対リンクの解決先（GitHub 上の実ファイル） */
const BLOB_BASE = `${REPO_URL}/blob/main/skills`;
const TREE_BASE = `${REPO_URL}/tree/main/skills`;

const repoRoot = join(reposRoot, REPO_DIR);
const skillsRoot = join(repoRoot, "skills");
const outDir = join(siteRoot, "src/content/skills");

/** SKILL.md 本体に添えるファイルを拾うディレクトリ（表示順） */
const BUNDLED_DIRS = ["references", "assets", "scripts", "examples"];

/** frontmatter 値のクォート（原稿由来の文字列が入るので最低限のエスケープをする） */
const yamlString = (s) => `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

/**
 * README.md のスキル一覧テーブルを読む。
 *   | [trip-planner](skills/trip-planner/) | 旅行 | 説明… |
 * @returns {Map<string, {category: string, description: string}>}
 */
async function readCatalog() {
  const readme = await readFile(join(repoRoot, "README.md"), "utf8");
  const rows = new Map();

  for (const line of readme.split("\n")) {
    const m = /^\|\s*\[([^\]]+)\]\(skills\/[^)]*\)\s*\|(.*)\|\s*$/.exec(line);
    if (!m) continue;
    const cells = m[2].split("|").map((c) => c.trim());
    if (cells.length < 2) continue;
    rows.set(m[1].trim(), { category: cells[0], description: cells[1] });
  }

  if (rows.size === 0) {
    throw new Error(
      `${REPO_DIR}/README.md からスキル一覧テーブルを読めなかった。テーブルの書式が変わっていないか確認すること。`
    );
  }
  return rows;
}

/** `---` で囲まれた frontmatter を { data, body } に割る（値は素朴に 1 行 1 キーで読む） */
function splitFrontmatter(markdown, label) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(markdown);
  if (!m) throw new Error(`${label}: frontmatter が見つからない`);

  const data = {};
  for (const line of m[1].split("\n")) {
    const kv = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
  }
  return { data, body: markdown.slice(m[0].length) };
}

/**
 * 先頭の H1 を取り出して落とす（ページ側がヘッダとして描くので本文には要らない）。
 * @returns {{title: string, body: string}}
 */
function extractTitle(body, fallback) {
  const lines = body.split("\n");
  const i = lines.findIndex((l) => /^#\s+/.test(l));
  if (i === -1) return { title: fallback, body };

  const title = lines[i].replace(/^#\s+/, "").trim();
  lines.splice(i, 1);
  return { title, body: lines.join("\n") };
}

/**
 * リポジトリ内の相対リンクを GitHub の URL に差し替える。
 * コードフェンスの中（サンプルの Markdown など）は書き換えない。
 */
function rewriteLinks(body, name) {
  const out = [];
  /** コードフェンスの中か */
  let fence = null;

  for (const line of body.split("\n")) {
    const fenceMark = /^\s*(```+|~~~+)/.exec(line)?.[1];
    if (fenceMark) {
      if (fence === null) fence = fenceMark[0];
      else if (fenceMark[0] === fence) fence = null;
      out.push(line);
      continue;
    }
    if (fence !== null) {
      out.push(line);
      continue;
    }

    out.push(
      line.replace(/\]\(([^)\s]+)\)/g, (whole, href) => {
        // 絶対 URL・ページ内アンカー・メールはそのまま
        if (/^(https?:|mailto:|#|\/)/.test(href)) return whole;
        const base = /\.[A-Za-z0-9]+$/.test(href) ? BLOB_BASE : TREE_BASE;
        return `](${base}/${name}/${href.replace(/\/$/, "")})`;
      })
    );
  }
  return out.join("\n");
}

/** references/ などに同梱されたファイルを、スキルからの相対パスで列挙する */
async function bundledFiles(skillDir) {
  const files = [];
  for (const dir of BUNDLED_DIRS) {
    let entries;
    try {
      entries = await readdir(join(skillDir, dir), { withFileTypes: true });
    } catch {
      continue; // そのディレクトリが無いスキルもある
    }
    for (const e of entries.filter((e) => e.isFile()).sort((a, b) => a.name.localeCompare(b.name))) {
      files.push(`${dir}/${e.name}`);
    }
  }
  return files;
}

/** 最終更新日。git の最終コミット日時を使い、取れなければファイルの mtime に落とす */
async function lastUpdated(skillDir) {
  const rel = relative(repoRoot, skillDir);
  try {
    const { stdout } = await exec("git", ["log", "-1", "--format=%cI", "--", rel], { cwd: repoRoot });
    if (stdout.trim()) return new Date(stdout.trim());
  } catch {
    // git が無い / リポジトリでない場合
  }
  const { mtime } = await stat(join(skillDir, "SKILL.md"));
  return mtime;
}

const catalog = await readCatalog();
const entries = (await readdir(skillsRoot, { withFileTypes: true }))
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const name of entries) {
  const skillDir = join(skillsRoot, name);
  const source = `${REPO_DIR}/skills/${name}/SKILL.md`;
  const raw = await readFile(join(skillDir, "SKILL.md"), "utf8");

  const { data, body: withTitle } = splitFrontmatter(raw, source);
  const { title, body: bare } = extractTitle(withTitle, name);
  const body = rewriteLinks(bare, name).replace(/\n{3,}/g, "\n\n").trim();

  const meta = catalog.get(name);
  if (!meta) {
    throw new Error(
      `${name}: ${REPO_DIR}/README.md のスキル一覧に行が無い。README に追記してから再実行すること。`
    );
  }

  const files = await bundledFiles(skillDir);
  const updated = await lastUpdated(skillDir);

  const frontmatter = [
    "---",
    `name: ${yamlString(data.name ?? name)}`,
    `title: ${yamlString(title)}`,
    `description: ${yamlString(meta.description)}`,
    `category: ${yamlString(meta.category)}`,
    // SKILL.md の description。Claude がこのスキルを読み込む判断に使う文
    `trigger: ${yamlString(data.description ?? "")}`,
    `updated: ${updated.toISOString()}`,
    `files: [${files.map(yamlString).join(", ")}]`,
    `source: ${yamlString(source)}`,
    "---",
    "",
    `<!-- 自動生成: ${source} から取り込んだもの。直接編集せず、原稿を直して \`npm run sync:skills\` を実行すること。 -->`,
    "",
    "",
  ].join("\n");

  await writeFile(join(outDir, `${name}.md`), `${frontmatter}${body}\n`, "utf8");
  console.log(
    `${name}: 本文 ${body.split("\n").length} 行 / 同梱 ${files.length} ファイル <- ${source}`
  );
}

console.log(`\n${entries.length} スキルを ${relative(siteRoot, outDir)} に取り込んだ。`);
