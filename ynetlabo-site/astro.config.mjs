// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import rehypeGuideFigure from "./src/plugins/rehype-guide-figure.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://ynetlabo.net",
  trailingSlash: "ignore",
  integrations: [sitemap()],
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
