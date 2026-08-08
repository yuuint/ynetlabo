---
name: "ui-sketch"
title: "UI ラフ画ジェネレータ"
description: "Flutter/Dart・SwiftUI/Swift の UI コードから、画面のラフ画（ワイヤーフレーム以上・モック未満）を SVG/PNG で生成。要素の採番、画面遷移の区別、長い画面の続き記号（A/B/C）に対応し、`--md` で図には UI と採番だけ残して文言・遷移先・表示/活性条件を Markdown に分離する。アイコンは MDI 名で指定（SF Symbols・`Icons.*` はエイリアスで解決）。Python 標準ライブラリのみ（PNG 化のみ Chrome）。"
category: "アプリ開発"
trigger: "Flutter/Dart や SwiftUI/Swift の UI コードから、画面のラフ画（ワイヤーフレーム以上・モック未満）を SVG/PNG で生成する。画面仕様書・手順書・README の挿絵として、番号付きの注釈や画面遷移の矢印つきの図を作る。ユーザーがコードから画面図・ワイヤーフレーム・画面遷移図・操作手順の図解を作りたいと言ったときに使う。外部パッケージ不要（Python 標準ライブラリ + 任意で Chrome）。Use when the user wants a wireframe, screen mockup, UI sketch, or screen-flow diagram generated from Dart, Flutter, Swift, or SwiftUI source code for documentation."
updated: 2026-08-07T14:46:06.000Z
files: ["references/mapping.md", "references/spec.md", "scripts/icons.py", "scripts/render_sketch.py", "scripts/sketch_core.py", "scripts/svg2png.sh", "examples/dashboard.json", "examples/flow.json", "examples/form.json", "examples/long-screen.json"]
source: "claude-skills/skills/ui-sketch/SKILL.md"
---

<!-- 自動生成: claude-skills/skills/ui-sketch/SKILL.md から取り込んだもの。直接編集せず、原稿を直して `npm run sync:skills` を実行すること。 -->

UI のソースコードを読んで**画面構造 JSON** に起こし、それを SVG のラフ画に描く。
ドキュメントの挿絵が目的なので、忠実な再現ではなく「どこに何があるか」が一目で分かることを優先する。

**狙う粒度**：ワイヤーフレームより上（実際の文言・ボタンの種類・一覧の構造・アイコン・意味のある色が入る）、モックより下（影・グラデーション・カスタムフォント・実画像は再現しない）。
デザインの確認用ではなく、**仕様や手順を説明するための図**である。

## 前提：コードは直接パースしない

Dart / Swift の UI は条件分岐・テーマ参照・別ファイルの子ウィジェットに散っているので、構文解析で図にはできない。
**Claude がコードを読んで JSON に要約し、スクリプトが決定論的に描く**という分担にする。JSON が中間成果物として残るので、あとから手で直せる。

## 使い方

```bash
cd skills/ui-sketch
python3 scripts/render_sketch.py examples/form.json -o out/form.svg --md
./scripts/svg2png.sh out/form.svg out/form.png 2      # PNG が要るときだけ
```

JSON の書き方は `references/spec.md`、コードとノードの対応は `references/mapping.md`。
**`examples/` をコピーして中身を差し替えるのが最短。**

### `--md`：画像には UI と採番だけ残す（推奨）

`--md` を付けると、**図には画面と番号バッジだけが残り**、見出し・キャプション・注釈の本文・注記は
同名の `.md` に分離される。ドキュメント側で文言だけ直せるので、図を作り直さずに済む。

```
out/form.svg   ← 画面 ＋ ①②③ の番号バッジのみ
out/form.md    ← 見出し・キャプション・番号と説明の対応表・注記
```

図の中に説明文まで焼き込みたいときだけ `--md` を外す。

## 進め方

### 1. 何の図が要るか決める

| 用途 | 作り方 |
|---|---|
| 画面仕様書の1画面 | screen 1つ + `annotations` で各要素に番号を振る |
| 1画面が長くて収まらない | 枠を分けて `continues: true`。A, B, C… の続き記号でつながる |
| 操作手順書 | `flow: true` + screen 複数 + `step` と `arrow` |
| 画面遷移の全体像 | `flow: true` + `annotations` なし。1画面あたりの情報を減らす |
| コンポーネント単体 | `device: "bare"` + `size` を小さく |

**1枚に3画面まで。** 4画面以上になったら図を分ける。横に伸びた図はドキュメントに貼ると読めない。

**枠が「上」「下」に分かれるときは必ず `continues` を使う。** 見出しに「上」「下」と書くだけでは、
枠が3つ以上になった時点で対応が取れなくなる。番号は自動で A, B, C… と振られる。

### 2. コードを読む

エントリ（`build()` / `var body`）から始めて、**別クラスに切り出された子ウィジェットも定義まで追う**。
分岐がある画面は**正常時の1状態**を選ぶ。ローディングやエラーも見せたいなら別の screen として並べる。

対応表は `references/mapping.md` にある。**推測で埋めず、コードに書かれている文言をそのまま使う。**

### 3. JSON を書く

- 注釈を付けたい要素に `id` を振り、`annotations` の `target` から参照する
- **別画面・シート・ダイアログへ移る導線には注釈の `to` を付ける**（バッジが四角＋緑になり、Markdown に「遷移先」列が出る）
- **条件付きで表示/非表示・活性/非活性になる要素にだけ `show_if` / `enable_if` を書く**（Markdown に条件表が出る。常時表示の要素には書かない）
- アイコンは `name` に MDI 名を書く。SF Symbols や `Icons.*` の名前もそのまま書ける
- ボタンの色・形・寄せは `bg` / `fg` / `shape` / `align` で指定する（グラデーションは非対応）
- 文言が未確定の段落は `filler`、中身を描く必要がない領域は `box` を使う
- `body` の最後に `{"type":"spacer","flex":true}` を置くと、下部のボタンが画面下に貼り付く

### 4. 生成して必ず目視する

**SVG を出しただけで完了にしない。** PNG にして自分の目で見る。

```bash
./scripts/svg2png.sh out/form.svg out/form.png 1
```

**警告は SVG の中ではなく標準エラー出力に出る。** 画像を grep しても見つからないので、
まとめて確認するときは stderr を拾う。

```bash
for f in sketches/*.json; do
  msg=$(python3 scripts/render_sketch.py "$f" -o /tmp/x.svg 2>&1 >/dev/null)
  [ -n "$msg" ] && echo "[$(basename $f)] $msg"
done
```

見るべき点：

- [ ] 本文が枠からはみ出していないか（はみ出すと「◯px はみ出しています」と出る。要素を削るか `scroll: true` を付ける）
- [ ] 引き出し線が隣の要素を横切っていないか（横切るなら注釈に `"side": "left"` を付ける）
- [ ] 文字が `…` で切れていないか（切れるなら文言を短くするか `size` を広げる）
- [ ] 未収録のアイコン名の警告が出ていないか（出たら近い名前に置き換える）
- [ ] 画面が変わる要素がすべて四角（緑）のバッジになっているか
- [ ] 分割した枠が続き記号（A, B…）でつながっているか
- [ ] 注釈の番号が図全体で 1 から通しになっているか（画面をまたいで振り直さない）
- [ ] 図だけ見て「どの画面の話か」が分かるか

### 5. ドキュメントに組み込む

`--md` で出た Markdown が、そのまま挿絵つきの節になる。文言はこちらで直す（図の再生成は不要）。

```markdown
## 3.2 支払い登録画面

![支払い登録画面](images/form.svg)

| No. | 対象 | 説明 |
|---|---|---|
| 1 | `kind` | 支払い種別。既定は「立替」。 |
```

Markdown・HTML なら SVG のまま貼る（拡大しても劣化しない）。Word や Confluence など SVG を扱えないツールには `svg2png.sh` で PNG にする。

**図の近くに必ず「ラフ画である」と書く。** 実装済み画面のモックと誤読されると、配色や余白の指摘が仕様レビューに混ざる。

## ルール

- **コードに無い要素を足さない。** 「あった方が自然」で描き足すと仕様書が嘘になる
- **実データを入れない。** 実在の人名・金額・住所・予約番号などはサンプル値に置き換える（生成した図はドキュメントとして配布される）
- **色は「意味を持つ要素」だけ。** 全体のテーマは `accent` の1色、あとは削除＝赤のようにボタン単位で `bg` / `fg` を指定する。背景や文字色まで塗るとモックに見え、粒度の合意が崩れる
- **アイコンは近い線画で足りる。** 厳密な再現は狙わない。無ければ角丸の面のままでよい
- 1つの図に1つの状態。状態を並べたいときは screen を増やす

## 出力

```
out/form.svg     ラフ画本体（--md なら画面と番号バッジだけ）
out/form.md      見出し・キャプション・番号の説明表・注記
out/form.png     貼り付け用（scale 2 で Retina/印刷向け）
form.json        画面構造（あとで直せるよう残す）
```

**JSON は消さずに残す。** 仕様が変わったときに JSON を直して再生成するのが一番早い。

## 参考

- `references/spec.md` — JSON の全項目とノード一覧
- `references/mapping.md` — Flutter / SwiftUI / UIKit のウィジェットとノードの対応表、分岐の扱い方
- `examples/form.json` — 注釈付きの1画面（画面仕様書向け）
- `examples/flow.json` — 3画面の手順図（手順書向け）
- `examples/long-screen.json` — 長い画面を2枠に分けて続き記号でつなぐ例
- `examples/dashboard.json` — ブラウザ枠・表・カード（Web 画面）
- `scripts/icons.py` の `ICONS` — 収録アイコン名の一覧
