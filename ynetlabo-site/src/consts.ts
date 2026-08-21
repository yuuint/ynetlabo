/** Site-wide constants for Y.NetLabo */

export const SITE = {
  name: "Y.NetLabo",
  title: "Y.NetLabo — シンプルなアプリに、少しのペンギンを",
  tagline: "シンプルなアプリに、少しのペンギンを",
  taglineEn: "Simple apps, with a touch of penguin.",
  description:
    "Y.NetLabo は、シンプルで使いやすいアプリを個人開発するラボです。不要な機能をそぎ落とし、本当に必要な機能だけを丁寧に作っています。",
  url: "https://ynetlabo.net",
  email: "ynetlabo@gmail.com",
  copyrightYear: 2026,
  /** Google Analytics 4 measurement ID */
  gaId: "G-LSBSP801C4",
} as const;

export const NAV = [
  { label: "ホーム", href: "/" },
  { label: "アプリ", href: "/apps/" },
  { label: "ツール", href: "/tools/" },
  { label: "使い方ガイド", href: "/guide/" },
  { label: "スキル", href: "/skills/" },
  { label: "記事", href: "/article/" },
  { label: "お知らせ", href: "/archives/category/notice/" },
] as const;

/** 公開スキル集（Claude Agent Skills）。/skills は tools/sync-skills.mjs で同期する */
export const SKILLS = {
  repo: "https://github.com/yuuint/claude-skills",
  /** git clone に使う URL */
  clone: "https://github.com/yuuint/claude-skills.git",
  /** 一覧でのカテゴリの並び。ここに無いカテゴリは末尾に回る */
  categoryOrder: ["アプリ開発", "設計・UX", "開発プロセス", "旅行", "学習"],
} as const;

export const SOCIAL = {
  github: "https://github.com/yuuint",
  x: "https://x.com/ynetlabo",
  qiita: "https://qiita.com/ynetlabo",
} as const;

/** Embedded Google Form for the contact page */
export const CONTACT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScUJp7S_EJATtij46twLon_iobL8GDMlGQwqNKNqRWMChGLuQ/viewform?embedded=true";

export type Project = {
  name: string;
  tagline: string;
  description: string;
  accent: string;
  site?: string;
  appStore?: string;
  googlePlay?: string;
  /** Stores where the app is announced but not yet released */
  comingSoon?: ("App Store" | "Google Play")[];
  icon?: string;
};

export const PROJECTS: Project[] = [
  {
    name: "wa/ri",
    tagline: "割り勘計算アプリ",
    description:
      "旅行や飲み会・パーティ後の精算をお手伝い。計算過程まで見える、信用できる割り勘アプリ。iOS / Android / Web / LINE に対応。",
    accent: "#f97316",
    icon: "/images/apps/wari.png",
    site: "https://wa-ri.ynetlabo.net/",
    appStore: "https://apps.apple.com/jp/app/wa-ri/id6743655018",
    googlePlay:
      "https://play.google.com/store/apps/details?id=ynetlabo.net.wari",
  },
  {
    name: "mapengu",
    tagline: "ペンギン検索アプリ",
    description:
      "日本国内でペンギンと出逢える水族館をマッチング。ペンギン判定カメラで種類をその場で見分けて、飼育施設を地図で探せる。",
    accent: "#0ea5e9",
    icon: "/images/apps/mapengu.png",
    site: "https://mapengu.ynetlabo.net/",
    appStore: "https://apps.apple.com/jp/app/mapengu/id6743026284",
  },
  {
    name: "hue",
    tagline: "感情記録アプリ",
    description:
      "4つの質問に答えるだけで、その日の感情を色で記録。言葉にしづらい気持ちを、やさしく可視化します。",
    accent: "#8b5cf6",
    icon: "/images/apps/hue.png",
    appStore:
      "https://apps.apple.com/jp/app/%E6%84%9F%E6%83%85%E3%81%AE%E8%89%B2%E6%97%A5%E8%A8%98-hue/id6764466333",
  },
  {
    name: "soroe",
    tagline: "日程調整アプリ",
    description:
      "予定を「揃える」日程調整アプリ。第一弾はシフト制職場のシフト調整に対応。管理者・スタッフの希望をまとめて、ぴったりの日程を見つけます。iOS / Android / Web に対応。",
    accent: "#10b981",
    icon: "/images/apps/soroe.png",
    site: "https://liff.line.me/2010192430-4jDXh7FD",
    appStore: "https://apps.apple.com/jp/app/soroe/id6785938952",
    googlePlay:
      "https://play.google.com/store/apps/details?id=net.ynetlabo.soroe",
  },
  {
    name: "tsutsum",
    tagline: "慶弔記録アプリ",
    description:
      "ご祝儀・香典の「贈った / もらった」からお返しまで記録する、完全オフラインの慶弔記録アプリ。記録は端末の中だけ。半返しの目安計算や関係性別の相場表も内蔵。iOS / Android に対応。",
    accent: "#a9663f",
    icon: "/images/apps/tsutsum.png",
    appStore:
      "https://apps.apple.com/jp/app/%E3%83%84%E3%83%84%E3%83%A0-%E5%86%A0%E5%A9%9A%E8%91%AC%E7%A5%AD%E3%81%AE%E3%81%94%E7%A5%9D%E5%84%80-%E9%A6%99%E5%85%B8-%E3%81%8A%E8%BF%94%E3%81%97%E8%A8%98%E9%8C%B2/id6793942449",
    googlePlay:
      "https://play.google.com/store/apps/details?id=net.ynetlabo.tsutsum",
  },
];

export const PROFILE = {
  name: "yuuki",
  role: "System Engineer",
  bio: "シンプルで使いやすいアプリづくりが好きな個人開発者。業務システムからモバイルアプリまで、フロントからインフラまで一通り。",
  /** Qiita のプロフィール画像を取り込んだもの（https://qiita.com/ynetlabo） */
  avatar: "/images/profile.jpg",
  /**
   * 技術バッジ。Qiita の投稿タグから起こしている。
   * 既存の Swift / Vue / Flutter / Java に、Qiita 側のタグを足したもの。
   */
  stack: [
    "Swift",
    "SwiftUI",
    "Flutter",
    "iOS",
    "Android",
    "Vue",
    "Nuxt3",
    "Vuetify",
    "NestJS",
    "Prisma",
    "PostgreSQL",
    "Docker",
    "Firebase",
    "Java",
  ],
};

/**
 * Category display name -> clean URL slug, used for
 * /archives/category/<slug> (mirrors the original WordPress permalinks).
 */
export const CATEGORY_SLUGS: Record<string, string> = {
  "お知らせ": "notice",
  "アプリ開発": "app-develop",
  "wa/ri割り勘アプリ": "wa-ri",
  "maPengu ペンギン検索アプリ": "mapengu",
  "tsutsum慶弔記録アプリ": "tsutsum",
  "soroe日程調整アプリ": "soroe",
  "claude": "claude",
  "Github Copilot": "github-copilot",
  "慶弔マナー": "manner",
};

/**
 * カテゴリ一覧ページ（/archives/category/<slug>）の meta description。
 *
 * 「<名前> に関する記事の一覧です。」の自動生成だと 20 字前後にしかならず、
 * Bing の SEO 分析で「Meta descriptions are too short」として全カテゴリが
 * 指摘された。検索結果に出る文なので、そのカテゴリで何が読めるかを書く。
 */
export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "お知らせ":
    "Y.NetLabo からのお知らせ。アプリの新規公開・アップデート内容・仕様変更のご案内をまとめています。wa/ri・soroe・tsutsum など各アプリの更新履歴はこちらから。",
  "アプリ開発":
    "個人開発でアプリをつくる過程で分かったことの記録。設計の判断とその理由、技術選定で迷ったところ、AI コーディングツールの実践的な使い方まで、実際に手を動かして得た知見を書いています。",
  "claude":
    "Claude・Claude Code を個人開発の現場でどう使っているかの記録。CLAUDE.md の書き方、spec と ADR による仕様管理、Agent Skills の作り方まで、実プロジェクトでの運用をまとめています。",
  "Github Copilot":
    "GitHub Copilot を使ったアプリ開発の記録。UI 実装を任せるときのプロンプトの渡し方や、スクリーンショットを併用して移植の精度を上げた話などをまとめています。",
  "wa/ri割り勘アプリ":
    "割り勘アプリ wa/ri の記事。端数や立て替えの精算をどう計算するかといった実用の話から、4クライアント構成や計算過程を見せる設計といったつくり方の裏側、アップデート情報までまとめています。",
  "maPengu ペンギン検索アプリ":
    "ペンギン検索アプリ mapengu の開発記録。Create ML と Core ML でペンギン種別判定カメラを実装した過程や、水族館を地図で探せるようにするまでの工夫をまとめています。",
  "tsutsum慶弔記録アプリ":
    "慶弔記録アプリ tsutsum の開発記録。完全オフライン設計の考え方、お返し管理と相場表のつくり方、AI と進める仕様管理（spec / ADR）の実践をまとめています。",
  "慶弔マナー":
    "ご祝儀・香典まわりの決めごとを、迷ったときに引ける形でまとめた記事。表書きの選び方、水引、お札の入れ方、内祝い・快気祝いの文例など、正解を断定せず「こういわれています」の形で書いています。",
  "soroe日程調整アプリ":
    "シフト調整アプリ soroe の記事。シフト希望の集め方や運用の工夫といった実務の話から、SwiftUI アプリを設計図にして Flutter へ移植した開発記録、アップデート情報までまとめています。",
};

export function categorySlug(name: string): string {
  return (
    CATEGORY_SLUGS[name] ??
    name
      .toLowerCase()
      .replace(/[^\w぀-ヿ一-龯]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}

export function categoryHref(name: string): string {
  // 末尾スラッシュは canonical / sitemap と揃えるため（articleHref と同じ理由）
  return `/archives/category/${categorySlug(name)}/`;
}
