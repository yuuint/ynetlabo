---
name: "app-design-philosophy"
title: "デザイン哲学ドキュメントを作る"
description: "アプリの UI/UX 判断の基準を1枚のドキュメントにまとめる。ヒアリングからトレードオフ表・避ける語彙・良い文言/悪い文言の実例を引き出し、生成される UI がフレームワークのデフォルトに落ちるのを防ぐ。"
category: "設計・UX"
trigger: "アプリの UI/UX 判断の基準となる「デザイン哲学」を 1 枚のドキュメントにまとめる。ユーザーへのヒアリングからトレードオフ表・避ける語彙・良い文言/悪い文言の実例を引き出し、実装トークンに接続する。ユーザーがアプリの世界観・トーン・UI の方針を決めたいとき、生成される UI が没個性的になると感じているときに使う。Use when the user mentions design philosophy, design principles, brand tone, UI direction, look and feel, or says the UI feels generic or like a default template."
updated: 2026-08-04T13:46:59.000Z
files: ["references/example.md", "assets/design-philosophy-template.md"]
source: "claude-skills/skills/app-design-philosophy/SKILL.md"
---

<!-- 自動生成: claude-skills/skills/app-design-philosophy/SKILL.md から取り込んだもの。直接編集せず、原稿を直して `npm run sync:skills` を実行すること。 -->

## 概要

画面ごとの判断は無数にあり、仕様書には書ききれない。「余白は広めか詰めるか」「この完了メッセージの
文言は」といった細部が積み上がって、アプリの印象が決まる。そこを**毎回その場の気分で決めない**ための
基準を 1 枚にする。

AI に実装を任せるほど、この 1 枚が効く。**曖昧な判断の分岐を先に言語化しておくと、指示していない
細部まで揃う**。逆にこれが無いと、生成された UI はフレームワークのデフォルト（Material の青、
均一な密度、事務的な文言）に落ちる。「なんか普通」の正体はここ。

**成果物は `docs/design-philosophy.md` 1 枚。**「なぜ」だけを書き、具体の色・フォント・数値は
テーマ/トークン側に置く。

## 手順

### 1. ヒアリング（推測で書かない）

ユーザーに次を聞く。**一度に全部聞かず、答えを見ながら 3〜4 問ずつ**。
抽象的な答え（「シンプルで使いやすく」）が返ってきたら、比較で聞き直す（下記「効く質問」）。

- このアプリは**何ではないか**（「これは生産性アプリではない」のように否定形で）
- ユーザーが開いた瞬間に**感じてほしい形容詞**を 3〜5 個。逆に**感じてほしくない**もの
- 効率と◯◯が対立したらどちらを取るか（→ トレードオフ表の素材）
- 参照したい**質感**（例: 手漉きの紙 / 朝の光 / 工具箱 / 図書館の静けさ）
- 避けたい既存アプリ・避けたい印象
- 「完了しました」系のメッセージを**この人ならどう書くか**

### 2. 執筆

[assets/design-philosophy-template.md](https://github.com/yuuint/claude-skills/blob/main/skills/app-design-philosophy/assets/design-philosophy-template.md) を
`docs/design-philosophy.md` にコピーし、ヒアリングの答えで埋める。

- 埋まらなかった節は**削る**（空のプレースホルダを残さない。読まれなくなる）。
- 抽象語だけの節を作らない。**必ず実例か対比を入れる**。
- 実例が書けた [references/example.md](https://github.com/yuuint/claude-skills/blob/main/skills/app-design-philosophy/references/example.md) を参考にしてよい。

### 3. 実装への接続

- 色・タイポ・角丸・余白・duration は**トークン側に集約**し、このドキュメントからは参照だけする
  （Flutter なら `core/theme/`。→ `flutter-lean-architecture` スキル）。
- ドキュメントで決めた「避ける語彙」を、コピーライティングの実装（メッセージ定数）に反映する。
- プロジェクトの `CLAUDE.md` から「UI/UX の細部で迷ったら `docs/design-philosophy.md` に従う」と参照させる。

### 4. 維持

アプリの方向が変わったら**本文を書き換える**（差分を追記しない。履歴は git）。

## 必須の 3 節（これが無いと機能しない）

| 節 | なぜ必須か |
|---|---|
| **トレードオフ表**（A か B で迷ったら B） | 実装時に**一番参照される**。判断の分岐そのもの |
| **避けるもの / 避ける語彙** | 「〜しない」は「〜する」より判断に効く。禁止リストが無いと平均に戻る |
| **良い文言 / 避ける文言の実例** | 抽象語（「温かい」）だけでは文章は揃わない。実例が唯一の伝達手段 |

## ルール

- **ユーザーの言葉で書く。** ヒアリングで出た比喩・言い回しをそのまま使う。こちらの語彙で言い換えない。
- **推測で埋めない。** 分からない節は質問として残す。
- **「なぜ」だけを書き、実装値を書かない**（`#6C4FD6` のような具体値はトークン側に置く。
  ここに書くと二重管理になり、必ずずれる）。
- **1 文が長くならないようにする。** このドキュメントは実装中に流し読みされる。1 行 1 判断。
- **A4 で 2〜4 ページに収める。** 網羅より「迷ったときに開いて答えが出る」ことを優先する。

## 効く質問（抽象的な答えが返ってきたとき）

| 抽象的な答え | 聞き直し方 |
|---|---|
| 「シンプルで使いやすく」 | 「情報が 1 画面に多く見えるのと、スクロールが増えるのはどちらがマシですか」 |
| 「モダンな感じ」 | 「3 年後に見て古く見えるのと、今すこし地味に見えるのはどちらが困りますか」 |
| 「親しみやすく」 | 「操作が完了したとき、褒めてほしいですか、静かに終わってほしいですか」 |
| 「速さが大事」 | 「1 タップ減らすために画面が複雑になるのは、どこまで許容できますか」 |
| （形容詞が出てこない） | 「このアプリを人にたとえると、どういう職業・年齢の人ですか」 |

## 出力形式

`docs/design-philosophy.md` 1 ファイル。節の構成は
[assets/design-philosophy-template.md](https://github.com/yuuint/claude-skills/blob/main/skills/app-design-philosophy/assets/design-philosophy-template.md) を参照。
最後に **One-Sentence Brand Principle**（「すべての画面をこう作れ」と一文で言い切る）を必ず置く。

## 参考

- [assets/design-philosophy-template.md](https://github.com/yuuint/claude-skills/blob/main/skills/app-design-philosophy/assets/design-philosophy-template.md) — 空のテンプレート
- [references/example.md](https://github.com/yuuint/claude-skills/blob/main/skills/app-design-philosophy/references/example.md) — 埋めた例（架空のアプリ）
- 関連スキル: `spec-driven-dev`（spec に書ききれない判断がここに来る） / `flutter-lean-architecture`（トークンの置き場）
