// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import rehypeGuideFigure from "./src/plugins/rehype-guide-figure.mjs";
import { buildLastmodMap } from "./tools/lastmod.mjs";
import { categorySlug } from "./src/consts.ts";

/**
 * sitemap の lastmod。原稿の日付から作るので、内容を変えていないページには
 * 付かない（毎ビルドで現在時刻を入れると検索側に信用されないため）。
 */
const lastmod = buildLastmodMap(categorySlug);

// https://astro.build/config
export default defineConfig({
  site: "https://ynetlabo.net",
  trailingSlash: "ignore",
  integrations: [
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname;
        const date = lastmod.get(path);
        return date ? { ...item, lastmod: date } : item;
      },
    }),
  ],
  markdown: {
    // mermaid は図として描くので、Shiki のシンタックスハイライトから外す
    // （既定の除外 'math' も残す）
    syntaxHighlight: { type: "shiki", excludeLangs: ["math", "mermaid"] },
    // ガイド本文（src/content/guide/）の画像・図・注釈表を整える
    rehypePlugins: [rehypeGuideFigure],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
