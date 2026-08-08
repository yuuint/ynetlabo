import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Original WordPress post id — preserves /archives/<id> URLs */
    wpId: z.number(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    /**
     * true にすると、本文中の画像だけの段落がガイドと同じ figure（白い枠 +
     * キャプション + 原寸表示リンク）になる。画面図を載せる記事で使う。
     */
    figures: z.boolean().default(false),
  }),
});

/**
 * アプリの使い方ガイド。本文はアプリ側リポジトリの docs/ が正で、
 * `npm run sync:guide`（tools/sync-guide.mjs）が生成する。
 */
const guide = defineCollection({
  loader: glob({ base: "./src/content/guide", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** consts.ts の PROJECTS[].name と対応（アイコン・ストアリンクを引く） */
    app: z.string(),
    updated: z.coerce.date(),
    /** true の間は noindex かつ一覧に出さない */
    draft: z.boolean().default(false),
    /** 生成元のパス（GitHub/ からの相対） */
    source: z.string().optional(),
  }),
});

/**
 * 公開している Claude Agent Skills。本文は claude-skills リポジトリの
 * skills/<name>/SKILL.md が正で、`npm run sync:skills`（tools/sync-skills.mjs）が生成する。
 */
const skills = defineCollection({
  loader: glob({ base: "./src/content/skills", pattern: "**/*.md" }),
  schema: z.object({
    /** スキル名（= ディレクトリ名 = ページの slug） */
    name: z.string(),
    /** SKILL.md の H1（日本語の見出し） */
    title: z.string(),
    /** README のスキル一覧テーブルにある説明文 */
    description: z.string(),
    category: z.string(),
    /** SKILL.md の description。Claude がスキルを読み込む判断に使う文 */
    trigger: z.string().default(""),
    updated: z.coerce.date(),
    /** references/ assets/ scripts/ examples/ に同梱されたファイル */
    files: z.array(z.string()).default([]),
    /** 生成元のパス（GitHub/ からの相対） */
    source: z.string(),
  }),
});

export const collections = { blog, guide, skills };
