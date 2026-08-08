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

export const collections = { blog, guide };
