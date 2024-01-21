// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);
export default defineNuxtConfig({
  ssr: false,
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Y.NetLabo | アプリ開発の情報発信ラボ",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "Y.NetLabo | アプリ開発の情報発信ラボ",
        },
        { property: "og:url", content: "https://web.ynetlabo.net" },
        { property: "og:locale", content: "ja_JP" },
        { property: "og:site_name", content: "Y.NetLabo" },
        {
          property: "og:description",
          content:
            "はじめまして、Y.NetLaboです。私たちは企業ではありません。アプリ開発好きな個人が作品を作ってます。",
        },
        {
          property: "og:image",
          content: "https://web.ynetlabo.net/laboicon.png",
        },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:site", content: "Y.NetLabo_JP" },
        {
          property: "twitter:title",
          content: "Y.NetLabo | アプリ開発の情報発信ラボ",
        },
        {
          property: "twitter:description",
          content:
            "はじめまして、Y.NetLaboです。私たちは企業ではありません。アプリ開発好きな個人が作品を作ってます。",
        },
        {
          property: "twitter:image",
          content: "https://web.ynetlabo.net/laboicon.png",
        },
      ],
    },
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@vite-pwa/nuxt",
    "nuxt-simple-sitemap",
  ],
  site: {
    url: "https://web.ynetlabo.net",
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Y.NetLabo",
      lang: "ja",
      short_name: "Y.NetLabo",
      description: "Y.NetLabo | アプリ開発の情報発信ラボ",
      theme_color: "#272727",
      background_color: "#272727",
      start_url: "/",
      display: "standalone",
      icons: [
        {
          src: "icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
      navigateFallback: "/",
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
  devtools: { enabled: false },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "@/assets/stylesheets/vuetify/custom.scss",
    "@/assets/main.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    define: {
      "process.env.DEBUG": false,
    },
  },
  googleFonts: {
    families: {
      Comfortaa: true,
      Yomogi: true,
      "Noto+Sans+JP": true,
      download: false, //追加
      inject: true,
    },
  },
});
