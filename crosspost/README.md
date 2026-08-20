# クロス投稿の原稿

`npm run crosspost`（ynetlabo-site/tools/build-crosspost.mjs）が
`ynetlabo-site/src/content/blog/*.md` から作った生成物。**手で直さない**。
直すときは元記事を直して作り直す。

## 使い方

### Qiita
1. [Qiita CLI](https://github.com/increments/qiita-cli) を入れる（`npx qiita init` / `npx qiita login`）
2. `qiita/<id>.md` を `public/` に置いて `npx qiita publish <id>`
3. Web から貼るだけでもよい。その場合は frontmatter を除いた本文を貼り、タグを手で設定する

### Zenn
1. [zenn-cli](https://zenn.dev/zenn/articles/install-zenn-cli) を入れて GitHub 連携する
2. `zenn/<id>.md` を `articles/` に置く
3. 内容を確認してから frontmatter の `published` を `true` にして push する

## 注意

- Qiita / Zenn は canonical タグを持てないため、**冒頭と末尾の原文リンク**で出典を示している。
  この形なら、検索側は原文を一次情報として扱いやすく、Qiita / Zenn 側の流入も取れる。
- 出す順番は**1日1本まで**。同日に複数出すと、どちらもタイムラインで埋もれる。
- 画像は `https://ynetlabo.net` の絶対 URL を参照している。サイト側の画像を消すと投稿先でも消える。

## 生成された原稿（10本）

| 記事 | 公開日 | タグ |
|---|---|---|
| [Claude のスキルを10個まとめて公開した ── 毎回書いていた指示を SKILL.md に固めた話](https://ynetlabo.net/archives/220) | 2026-08-08 | Claude / ClaudeCode / AI / 個人開発 / OSS |
| [使い方ガイドの画面図は、1枚もスクショを撮っていない ── ui-sketch で作れるもの](https://ynetlabo.net/archives/221) | 2026-08-08 | Claude / ClaudeCode / SVG / ドキュメント / 個人開発 |
| [試験前日にClaudeで一夜漬けした ── 間違いの「型」を分析させて、そこだけ潰す学習ループ](https://ynetlabo.net/archives/219) | 2026-08-03 | Claude / AWS / 資格 / 学習 / AI |
| [specとADRで、Claudeの「記憶喪失」を設計でカバーする ── 毎セッション記憶ゼロのAIと開発する仕組み](https://ynetlabo.net/archives/215) | 2026-07-25 | Claude / ClaudeCode / 設計 / ADR / AI |
| [毎セッション読まれるCLAUDE.mdをどう書くか ── Claudeの「推論の深さ」まで設計する](https://ynetlabo.net/archives/216) | 2026-07-25 | Claude / ClaudeCode / AI / ドキュメント / 個人開発 |
| [既存アプリを「設計図」にして、AIで別スタックへ移植する ── SwiftUIアプリをFlutterに作り直した話](https://ynetlabo.net/archives/217) | 2026-07-25 | Claude / Flutter / SwiftUI / Riverpod / AI |
| [iOSアプリにペンギン種別判定AIを組み込む — Create ML × Core ML × Vision の実装全解説](https://ynetlabo.net/archives/209) | 2026-06-04 | CoreML / CreateML / Vision / Swift / iOS |
| [Flutter一本化しなかった理由 ── 割り勘アプリで「UIの文化的整合性」を選んだ話](https://ynetlabo.net/archives/193) | 2026-06-02 | Flutter / SwiftUI / iOS / Android / 個人開発 |
| [フロントで計算させない設計 ── 4クライアントのロジックをバックエンドに集約した話](https://ynetlabo.net/archives/199) | 2026-06-02 | 設計 / アーキテクチャ / NestJS / API / 個人開発 |
| [AIにUI実装を任せるなら「テキストだけ」は損をする ── Visual Promptingでスクショ併用したらFlutter移植の精度が上がった話](https://ynetlabo.net/archives/202) | 2026-06-02 | GitHubCopilot / Flutter / SwiftUI / AI / プロンプト |
