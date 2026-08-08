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
  { label: "使い方ガイド", href: "/guide" },
  { label: "スキル", href: "/skills" },
  { label: "記事", href: "/article" },
  { label: "お知らせ", href: "/archives/category/notice" },
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
  return `/archives/category/${categorySlug(name)}`;
}
