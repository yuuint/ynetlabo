---
name: "spec-driven-dev"
title: "spec / ADR 駆動開発"
description: "実装前に仕様書（spec）を書き、設計判断は ADR に1枚ずつ残す進め方。spec は常に「現在の仕様」だけを書き、変更時は差分を追記せず本文を書き換える。テンプレートと運用ルールつき。"
category: "開発プロセス"
trigger: "実装の前に仕様書（spec）を書き、設計判断は ADR に 1 枚ずつ残す進め方を運用する。spec は常に「現在の仕様」だけを書き、変更時は差分を追記せず本文を書き換える。ユーザーが新機能の実装を始めるとき、仕様書やドキュメントの書き方・更新について話しているとき、技術選定の理由を残したいときに使う。Use when the user mentions spec, specification, design doc, ADR, architecture decision record, feature planning, or asks to document a decision."
updated: 2026-08-04T13:46:59.000Z
files: ["references/operations.md", "assets/adr-readme.md", "assets/adr-template.md", "assets/spec-template.md", "assets/specs-readme.md"]
source: "claude-skills/skills/spec-driven-dev/SKILL.md"
---

<!-- 自動生成: claude-skills/skills/spec-driven-dev/SKILL.md から取り込んだもの。直接編集せず、原稿を直して `npm run sync:skills` を実行すること。 -->

## 概要

機能ごとに `docs/specs/NNNN-<feature>.md` を 1 枚、設計判断ごとに `docs/adr/NNNN-<decision>.md` を 1 枚。
この 2 つは役割が違い、**混ぜると両方が腐る**。

| | 書くもの | 時制 | 変更時 |
|---|---|---|---|
| **spec** | 現在の仕様（何がどう動くか） | 常に「今」 | 本文を**書き換える** |
| **ADR** | 決定の経緯（なぜそうしたか） | 決定した時点 | 書き換えず**新番号で起票**し、旧 ADR を「廃止」にする |

AI にコード生成を任せるほど、この 2 つの価値が上がる。spec は生成の入力になり、ADR は「なぜ前回そう決めたのか」を次のセッションに伝える唯一の手段になる。

## 手順

### 新機能を実装するとき

1. **spec を作る**（[assets/spec-template.md](https://github.com/yuuint/claude-skills/blob/main/skills/spec-driven-dev/assets/spec-template.md) から次の番号で）
   既存の機能領域に関わる変更なら、**新規作成せず該当 spec を書き換える**。まず `docs/specs/README.md` の一覧を見る。
2. **spec をユーザーと合意する**（ステータス `draft` → `approved`）。
   受け入れ条件が曖昧なまま実装に入らない。
3. **spec を起点に実装する**（+ テスト）。
4. **静的解析とテストを通す**。
5. **spec の受け入れ条件を更新する**（`[x]` / `[ ]` の規約は下記）。ステータスを `done` に。
6. アーキテクチャに関わる判断をしたら **ADR を 1 枚**（[assets/adr-template.md](https://github.com/yuuint/claude-skills/blob/main/skills/spec-driven-dev/assets/adr-template.md)）。

### 既存の振る舞いを変えるとき

1. 該当 spec を探す（`docs/specs/README.md` の一覧）。
2. **spec の本文を「今の姿」に書き換える。差分・変更履歴を追記しない。**
   「旧仕様は〜だった」「〜から変更」は書かない。履歴は git log / git blame が持っている。
3. 実装 → テスト → 受け入れ条件を更新。
4. 判断の理由を残したいなら ADR。

### 技術選定・規約を決めるとき

ADR を 1 枚書く。背景 / 決定 / 理由 / 影響とトレードオフ / **再検討の条件**。
最後の「再検討の条件」を必ず書く — これが無い ADR は、後から見たときに覆してよいのか分からず、判断を縛り続ける。

## ルール

- **spec に履歴を書かない。** 差分の追記は spec を読めなくする最大の原因。
- **ADR を書き換えて決定を覆さない。** 新しい番号で起票し、旧 ADR のステータスを「廃止（→ ADR NNNN で置換）」にする。
- **ADR の「理由」には具体的な事実を書く。** 「モダンだから」ではなく、依存の衝突・計測値・制約を書く。理由が具体的であるほど、後から**その理由が当たらないケース**を見分けられる。
- **1 機能領域 = 1 spec。** 画面単位で細切れにしない。番号は通し番号で、欠番にしてもよいが再利用しない。
- **テストも spec 1 枚にする**（例 `00NN-testing.md`）。「何が自動テストで守られていて、何が手動確認なのか」の一覧を持つ。テストを追加・変更したら、機能側の spec ではなくこの spec の一覧を更新する。
- **受け入れ条件のチェック規約**:
  - `[x]` = 実装完了。コードで実現済みで、自動テスト・静的解析で確認できる。
  - `[ ]` = 実機・実値・ネイティブ設定・生成アセット配置など、**実装後の手動確認が残る**もの。
  - ステータスが `done` でも `[ ]` が残ることはある（実機確認待ちの意味）。
- **spec を更新せずに振る舞いを変えない。** 実装と spec がずれた瞬間から、spec は読まれなくなる。

## ディレクトリ構成

```
docs/
  specs/
    README.md          # 一覧 + 運用ルール（原則・番号の付け方・チェック規約）
    _template.md       # 新規 spec のひな形
    0001-<feature>.md
    0002-<feature>.md
  adr/
    README.md          # 一覧 + 運用ルール（ADR と spec の役割分担）
    _template.md
    0001-<decision>.md
```

`README.md` の一覧は**新規追加のたびに更新する**。ここが古くなると「既存 spec を書き換える」判断ができず、重複した spec が増える。

## 出力形式

spec / ADR ともに Markdown 1 ファイル。テンプレートは:

- [assets/spec-template.md](https://github.com/yuuint/claude-skills/blob/main/skills/spec-driven-dev/assets/spec-template.md)
- [assets/adr-template.md](https://github.com/yuuint/claude-skills/blob/main/skills/spec-driven-dev/assets/adr-template.md)
- [assets/specs-readme.md](https://github.com/yuuint/claude-skills/blob/main/skills/spec-driven-dev/assets/specs-readme.md) — `docs/specs/README.md` の雛形
- [assets/adr-readme.md](https://github.com/yuuint/claude-skills/blob/main/skills/spec-driven-dev/assets/adr-readme.md) — `docs/adr/README.md` の雛形

書き方の判断に迷ったら [references/operations.md](https://github.com/yuuint/claude-skills/blob/main/skills/spec-driven-dev/references/operations.md)（粒度・番号・ステータス・アンチパターン）。

## 参考

- 関連スキル: `app-design-philosophy`（spec に書ききれない UI/UX 判断の基準）
