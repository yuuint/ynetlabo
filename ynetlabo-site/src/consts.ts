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
  { label: "記事", href: "/article" },
  { label: "お知らせ", href: "/archives/category/notice" },
] as const;

export const SOCIAL = {
  github: "https://github.com/yuuint",
  x: "https://x.com/ynetlabo",
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
    site: "https://mapengu.ynetlabo.net/",
    appStore: "https://apps.apple.com/jp/app/mapengu/id6743026284",
  },
  {
    name: "hue",
    tagline: "感情記録アプリ",
    description:
      "4つの質問に答えるだけで、その日の感情を色で記録。言葉にしづらい気持ちを、やさしく可視化します。",
    accent: "#8b5cf6",
    appStore:
      "https://apps.apple.com/jp/app/%E6%84%9F%E6%83%85%E3%81%AE%E8%89%B2%E6%97%A5%E8%A8%98-hue/id6764466333",
  },
  {
    name: "soroe",
    tagline: "日程調整アプリ",
    description:
      "予定を「揃える」日程調整アプリ。第一弾はシフト制職場のシフト調整に対応。管理者・スタッフの希望をまとめて、ぴったりの日程を見つけます。Web版を先行公開中、iOS / Android 版も近日対応。",
    accent: "#10b981",
    site: "https://soroe.ynetlabo.net/",
    comingSoon: ["App Store", "Google Play"],
  },
];

export const PROFILE = {
  name: "yuuki",
  role: "System Engineer",
  bio: "シンプルで使いやすいアプリづくりが好きな個人開発者。業務システムからモバイルアプリまで、フロントからインフラまで一通り。",
  stack: ["Swift", "Vue", "Flutter", "Java"],
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
