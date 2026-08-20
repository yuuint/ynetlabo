// 生成物 — 手で編集しないこと。`npm run sync:souba`（tools/sync-souba.mjs）が
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
export const SOUBA_EVENTS: readonly SoubaEvent[] = [{"key":"wedding","label":"結婚","category":"慶事"},{"key":"childbirth","label":"出産","category":"慶事"},{"key":"entrance","label":"入学・入園","category":"慶事"},{"key":"newHome","label":"新築・引越","category":"慶事"},{"key":"funeral","label":"葬儀","category":"弔事"},{"key":"memorialService","label":"法要","category":"弔事"},{"key":"sickness","label":"お見舞い","category":"お見舞い"}] as const;

/** 関係性の区分（アプリの表示順） */
export const SOUBA_RELATIONS: readonly SoubaRelation[] = [{"key":"family","label":"家族"},{"key":"relative","label":"親戚"},{"key":"friend","label":"友人"},{"key":"coworker","label":"同僚"},{"key":"boss","label":"上司・目上"},{"key":"neighbor","label":"ご近所"},{"key":"other","label":"その他"}] as const;

/** 名目 × 関係性 → 金額の目安 */
export const SOUBA: Record<string, Record<string, SoubaRange>> = {"wedding":{"family":[50000,100000],"relative":[30000,100000],"friend":[30000,50000],"coworker":[30000,50000],"boss":[30000,50000],"neighbor":[20000,30000],"other":[30000,30000]},"childbirth":{"family":[10000,30000],"relative":[10000,30000],"friend":[5000,10000],"coworker":[3000,10000],"boss":[5000,10000],"neighbor":[3000,5000],"other":[3000,5000]},"entrance":{"family":[10000,30000],"relative":[5000,10000],"friend":[3000,5000],"coworker":[3000,5000],"boss":[5000,10000],"neighbor":[3000,3000],"other":[3000,5000]},"newHome":{"family":[30000,100000],"relative":[10000,30000],"friend":[5000,10000],"coworker":[5000,10000],"boss":[10000,10000],"neighbor":[3000,5000],"other":[5000,10000]},"funeral":{"family":[30000,100000],"relative":[10000,30000],"friend":[5000,10000],"coworker":[5000,10000],"boss":[5000,10000],"neighbor":[3000,5000],"other":[3000,5000]},"memorialService":{"family":[10000,30000],"relative":[10000,30000],"friend":[5000,10000],"coworker":[5000,10000],"boss":[5000,10000],"neighbor":[3000,5000],"other":[3000,5000]},"sickness":{"family":[5000,10000],"relative":[5000,10000],"friend":[3000,5000],"coworker":[3000,5000],"boss":[5000,10000],"neighbor":[3000,3000],"other":[3000,5000]}};

/** 弔事（香典）の名目か。表に香典の補足を添えるのに使う */
export const CONDOLENCE_EVENTS: readonly string[] = ["funeral","memorialService"];

export const soubaOf = (event: string, relation: string): SoubaRange | undefined =>
  SOUBA[event]?.[relation];
