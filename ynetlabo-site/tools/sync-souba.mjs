/**
 * 慶弔記録アプリ tsutsum の「相場の目安」データを、このサイトへ取り込む。
 *
 *   npm run sync:souba
 *
 * データの「正」はあくまで tsutsum 側
 * （lib/features/market_price/data/market_price_data.dart と
 *   lib/core/storage/app_enums.dart）。
 * ここで作られる
 *   src/data/souba.ts
 * は毎回作り直される生成物なので、手で編集しないこと。
 *
 * アプリと Web で数字がずれると「アプリでは3〜5万、サイトでは5〜10万」という
 * 一番まずい形の不一致になるため、二重管理は最初からしない。
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
/** GitHub/ 直下に全リポジトリが並んでいる前提（sync-skills.mjs と同じ） */
const reposRoot = resolve(siteRoot, "../..");

const appRoot = join(reposRoot, "tsutsum");
const ENUMS = join(appRoot, "lib/core/storage/app_enums.dart");
const TABLE = join(appRoot, "lib/features/market_price/data/market_price_data.dart");
const outFile = join(siteRoot, "src/data/souba.ts");

/** `wedding('結婚', EventCategory.celebration),` → { key, label, category } */
function parseEventTypes(src) {
  const body = section(src, "enum EventType {");
  const out = [];
  const re = /^\s*(\w+)\('([^']+)',\s*EventCategory\.(\w+)\)/gm;
  for (const m of body.matchAll(re)) {
    out.push({ key: m[1], label: m[2], category: m[3] });
  }
  return out;
}

/** `family('家族'),` → { key, label } */
function parseRelations(src) {
  const body = section(src, "enum Relation {");
  const out = [];
  const re = /^\s*(\w+)\('([^']+)'\)/gm;
  for (const m of body.matchAll(re)) out.push({ key: m[1], label: m[2] });
  return out;
}

/** `celebration('慶事'),` → { celebration: '慶事', ... } */
function parseCategories(src) {
  const body = section(src, "enum EventCategory {");
  const out = {};
  for (const m of body.matchAll(/^\s*(\w+)\('([^']+)'\)/gm)) out[m[1]] = m[2];
  return out;
}

/**
 * `EventType.wedding: { Relation.family: (50000, 100000), ... },`
 * → { wedding: { family: [50000, 100000], ... } }
 */
function parseTable(src) {
  const start = src.indexOf("_table = {");
  if (start === -1) throw new Error("_table が見つからない");
  const body = braced(src, src.indexOf("{", start));
  const out = {};
  const re = /EventType\.(\w+):\s*\{([^}]*)\}/g;
  for (const m of body.matchAll(re)) {
    const rows = {};
    for (const r of m[2].matchAll(/Relation\.(\w+):\s*\((\d+),\s*(\d+)\)/g)) {
      rows[r[1]] = [Number(r[2]), Number(r[3])];
    }
    out[m[1]] = rows;
  }
  return out;
}

/** 相場表に出す名目の並び（marketPriceEventTypes のリテラル順） */
function parseOrder(src) {
  const start = src.indexOf("marketPriceEventTypes = [");
  if (start === -1) throw new Error("marketPriceEventTypes が見つからない");
  const body = braced(src, src.indexOf("[", start), "[", "]");
  return [...body.matchAll(/EventType\.(\w+)/g)].map((m) => m[1]);
}

/** `header` の直後から対応する `}` までを返す */
function section(src, header) {
  const i = src.indexOf(header);
  if (i === -1) throw new Error(`${header} が見つからない`);
  return braced(src, i + header.length - 1);
}

/** open の位置から対応する閉じ括弧までの中身を返す */
function braced(src, open, o = "{", c = "}") {
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === o) depth++;
    else if (src[i] === c && --depth === 0) return src.slice(open + 1, i);
  }
  throw new Error("括弧が閉じていない");
}

const ts = (v) => JSON.stringify(v);

const enums = await readFile(ENUMS, "utf8");
const table = await readFile(TABLE, "utf8");

const categories = parseCategories(enums);
const eventTypes = parseEventTypes(enums);
const relations = parseRelations(enums);
const souba = parseTable(table);
const order = parseOrder(table);

const events = order.map((key) => {
  const e = eventTypes.find((t) => t.key === key);
  if (!e) throw new Error(`EventType.${key} の定義が見つからない`);
  if (!souba[key]) throw new Error(`EventType.${key} の相場データが無い`);
  return { key, label: e.label, category: categories[e.category] ?? e.category };
});

// 相場を持つ関係性だけに絞る（全名目で同じ7区分が入っている前提の確認も兼ねる）
const used = relations.filter((r) => events.every((e) => souba[e.key][r.key]));
if (used.length !== relations.length) {
  const missing = relations.filter((r) => !used.includes(r)).map((r) => r.key);
  console.warn(`[sync:souba] 一部の名目に無い関係性を除外: ${missing.join(", ")}`);
}

const out = `// 生成物 — 手で編集しないこと。\`npm run sync:souba\`（tools/sync-souba.mjs）が
// 慶弔記録アプリ tsutsum から取り込む。データの正は
//   tsutsum/lib/features/market_price/data/market_price_data.dart
//   tsutsum/lib/core/storage/app_enums.dart
// 金額は一般的なマナー資料の通説レンジをもとにした「目安」であり、
// 地域やお付き合いの深さで変わる（断定できるものではない）。

/** 金額の目安（円）。[下限, 上限] */
export type SoubaRange = readonly [low: number, high: number];

export type SoubaEvent = {
  /** EventType の名前（URL や data 属性に使う） */
  readonly key: string;
  /** 表示名（例: 結婚） */
  readonly label: string;
  /** 大分類（慶事 / 弔事 / お見舞い） */
  readonly category: string;
};

export type SoubaRelation = {
  readonly key: string;
  readonly label: string;
};

/** 相場の目安を持つ名目（アプリの表示順） */
export const SOUBA_EVENTS: readonly SoubaEvent[] = ${ts(events)} as const;

/** 関係性の区分（アプリの表示順） */
export const SOUBA_RELATIONS: readonly SoubaRelation[] = ${ts(used)} as const;

/** 名目 × 関係性 → 金額の目安 */
export const SOUBA: Record<string, Record<string, SoubaRange>> = ${ts(souba)};

/** 弔事（香典）の名目か。表に香典の補足を添えるのに使う */
export const CONDOLENCE_EVENTS: readonly string[] = ${ts(
  events.filter((e) => e.category === (categories.condolence ?? "弔事")).map((e) => e.key)
)};

export const soubaOf = (event: string, relation: string): SoubaRange | undefined =>
  SOUBA[event]?.[relation];
`;

await mkdir(dirname(outFile), { recursive: true });
await writeFile(outFile, out, "utf8");
console.log(
  `[sync:souba] ${events.length} 名目 × ${used.length} 関係性 → ${resolve(outFile)}`
);
