if(!self.define){let n,e={};const i=(i,o)=>(i=new URL(i+".js",o).href,e[i]||new Promise((e=>{if("document"in self){const n=document.createElement("script");n.src=i,n.onload=e,document.head.appendChild(n)}else n=i,importScripts(i),e()})).then((()=>{let n=e[i];if(!n)throw new Error(`Module ${i} didn’t register its module`);return n})));self.define=(o,r)=>{const s=n||("document"in self?document.currentScript.src:"")||location.href;if(e[s])return;let c={};const l=n=>i(n,s),u={module:{uri:s},exports:c,require:l};e[s]=Promise.all(o.map((n=>u[n]||l(n)))).then((n=>(r(...n),c)))}}define(["./workbox-3e911b1d"],(function(n){"use strict";self.skipWaiting(),n.clientsClaim(),n.precacheAndRoute([{url:"_nuxt/default.JbqgSXv7.js",revision:null},{url:"_nuxt/entry.d0ZjQxxO.css",revision:null},{url:"_nuxt/entry.pbjVHHWJ.js",revision:null},{url:"_nuxt/index.pTvIyFZC.js",revision:null},{url:"_nuxt/index.SgP9PIAa.css",revision:null},{url:"_nuxt/laboicon.y1ER8D6G.png",revision:null},{url:"_nuxt/workbox-window.prod.es5.prqDwDSL.js",revision:null},{url:"_nuxt/ynetlabo-logo.hs8YBibW.png",revision:null},{url:"200",revision:"9a60dd4d6618cd4d697b18afc8ca459e"},{url:"404",revision:"9a60dd4d6618cd4d697b18afc8ca459e"},{url:"css/nuxt-google-fonts.css",revision:"3875736fdfa63f047146b6bc59ead1eb"},{url:"favicon.ico",revision:"88785e93c2f98e48cce2d6b0f45dce6c"},{url:"icons/icon-128x128.png",revision:"7c0bf29638ee613502d2a492ba8f6f85"},{url:"icons/icon-144x144.png",revision:"c8b39b19998623840f4d8a9e24f8642f"},{url:"icons/icon-152x152.png",revision:"46c6573d7eaacd8ed4601eae1b2c8f06"},{url:"icons/icon-192x192.png",revision:"09d8f5ec3b0764f8ba0adf15695c482a"},{url:"icons/icon-384x384.png",revision:"72d57a51dd8632b5f36e18e21b913c1d"},{url:"icons/icon-48x48.png",revision:"c5354d4bac7d8d77601f2085f0cca8c4"},{url:"icons/icon-512x512.png",revision:"19bc2e6820346567b37592588933255b"},{url:"icons/icon-72x72.png",revision:"02842e22835dd97718a958a2f880459c"},{url:"icons/icon-96x96.png",revision:"9186e8a7739ea12c74fd9f732f03a499"},{url:"/",revision:"9a60dd4d6618cd4d697b18afc8ca459e"},{url:"laboicon.png",revision:"7b4db31706363c170bd7ea664775a76d"},{url:"_nuxt/builds/latest.json",revision:"4d5c2b3ff240b0eaa12f8350942cb10a"},{url:"_nuxt/builds/meta/1ba44e4a-1270-46f1-95e8-5ea402808f7a.json",revision:null},{url:"manifest.webmanifest",revision:"d8a9b8e3e5aa55444c2a6e21b3f5a06b"}],{}),n.cleanupOutdatedCaches(),n.registerRoute(new n.NavigationRoute(n.createHandlerBoundToURL("/")))}));
