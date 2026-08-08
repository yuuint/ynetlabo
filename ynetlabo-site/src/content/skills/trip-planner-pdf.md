---
name: "trip-planner-pdf"
title: "旅行計画書 → 提案書 PDF"
description: "上記の Markdown 一式を A4 の提案書スタイル PDF に組み上げる。印刷用 CSS とコンポーネント集つき。Chrome のヘッドレス印刷を使うため追加インストール不要。"
category: "旅行"
trigger: "trip-planner が作成した旅行計画書の Markdown 一式を、A4 の提案書スタイル PDF に組み上げる。ユーザーが旅行計画書を PDF にしたい、印刷したい、清書して配りたい、しおりの形にまとめたいと言ったときに使う。HTML+CSS を組み立て、Chrome のヘッドレス印刷で PDF 化する。Use when the user wants to turn a trip plan into a printable PDF or a formatted proposal document."
updated: 2026-08-03T17:27:11.000Z
files: ["references/components.md", "assets/proposal.css", "assets/template.html", "scripts/build-pdf.js", "scripts/build-pdf.sh"]
source: "claude-skills/skills/trip-planner-pdf/SKILL.md"
---

<!-- 自動生成: claude-skills/skills/trip-planner-pdf/SKILL.md から取り込んだもの。直接編集せず、原稿を直して `npm run sync:skills` を実行すること。 -->

`trip-planner` が出力した Markdown 一式を、**そのまま印刷して配れる A4 の計画書**にする。

## 変換ではなく、組み直し

Markdown を機械的に HTML へ変換しない。**内容を読み、提案書のコンポーネントに割り当て直す。**
Markdown の表をそのまま流し込んだだけの PDF は、元の Markdown を印刷したものと変わらない。

| Markdown 側 | 提案書側 |
|---|---|
| `00_サマリー.md` の冒頭 | 表紙（タイトル・期間・サマリーバッジ・参加者・Rev） |
| 基本情報の表 ＋ 時期の説明 | `.two-col` で横並び |
| 「この日ならでは」 | `.cards` で3枚並べる |
| `01_日別工程表.md` の DAY 見出し | `.day` ブロック（濃紺のヘッダ＋工程表） |
| `` `確定` `` `` `未手配` `` `` `提案` `` | `.st-fixed` / `.st-todo` / `.st-idea` バッジ |
| 引用ブロックの注意書き | `.callout` / `.callout.warn` / `.callout.conclusion` |
| 予算表 | `td.num` で桁揃え、`tr.total` で合計を強調 |
| カレンダー | `.calendar` テーブル |
| TODO の 🔴🟡🟢 | `.prio` 見出し＋優先度別の表 |

**内容は足さない・減らさない。** 元の Markdown に無い予定・金額・評価を書かない。逆に、紙面の都合で情報を落とすときは必ずユーザーに確認する。

## 手順

### 1. 入力を確認する

`trip-planner` の出力ディレクトリを読む。全ファイルに目を通してから構成を決める。

- どの章が揃っているか（未作成の章は収録しない）
- Rev 番号と作成日
- 表紙に使える写真・地図があるか（無ければ写真ブロックは削除する）
- 地図が欲しい場合は `trip-map` スキルで生成する。SVG のままベクタで PDF に入る

### 2. 収録範囲を決める

全部を1つの PDF に入れる必要はない。**用途を確認してから決める。**

| 用途 | 収録する章 |
|---|---|
| メンバー配布用（既定） | サマリー・工程表・予算・精算・グルメ・アクティビティ・TODO |
| 当日の携帯用 | サマリー・工程表・グルメ・緊急連絡先のみ（薄く） |
| 幹事の作業用 | 上記＋宿とレンタカーの候補比較・TODO を厚く |

### 3. HTML を組み立てる

`assets/template.html` をコピーして作業を始める。`assets/proposal.css` を同じ階層に置き、相対パスで読み込む。
使えるクラスは `references/components.md` にすべて載っている。**新しい CSS を書き足す前にそこを見る。**

```
<出力先>/
├── 計画書.html
├── proposal.css        # assets/ からコピー
└── images/             # 写真・地図（あれば）
```

守ること：

- **1ファイルにまとめる。** 章ごとに HTML を分けない（ページ番号と目次が破綻する）
- **章の順序は Markdown の番号順**を維持する。並べ替えるならユーザーに確認する
- 章の先頭で改ページするかは分量で判断する。1ページに満たない章を毎回改ページすると余白だらけになる
- 数値は Markdown からコピーする。**合計は必ず検算**し、合わなければ Markdown 側の誤りとして報告する

### 4. ビルドする

既定は Chrome のヘッドレス印刷。追加インストール不要。

```bash
./scripts/build-pdf.sh 計画書.html 計画書_Rev3.pdf
```

ページ番号・全ページ共通フッタが必要な場合のみ puppeteer-core を使う。

```bash
npm install puppeteer-core
node ./scripts/build-pdf.js 計画書.html 計画書_Rev3.pdf --footer "X市・Y島 旅行計画書 Rev.3"
```

レイアウト確認用の PNG（1枚に全体を縦長で描画）：

```bash
./scripts/build-pdf.sh --preview 計画書.html preview.png
```

### 5. 検品する

**PDF を作って終わりにしない。** 必ず PNG プレビューを見て、次を確認する。

- [ ] ページ数が妥当か（ビルドスクリプトが出力する）。空白ページが混ざっていないか
- [ ] 見出しがページ末尾に取り残されていないか
- [ ] 表が右にはみ出していないか。列が多すぎる表は列を減らすか文字を小さくする
- [ ] 区分バッジが Markdown の区分と一致しているか（`確定` を `提案` にしていないか）
- [ ] 金額の小計・合計が Markdown と一致しているか
- [ ] 画像のリンク切れがないか（枠だけ表示されていたら破綻）
- [ ] 文字化けがないか（フォント指定を消していないか）

崩れていたら HTML を直して再ビルドする。**CSS の数値を場当たりに変えない** — まず構造（列数・入れ子）を見直す。

### 6. 共有時の個人情報

計画書には予約番号・電話番号・宿の住所・割り勘ルームの共有 URL・参加者の本名が入る。

- **メンバー内で配る PDF** はそのままでよい
- **メンバー以外に見せる／公開する場合**は、これらを伏せた版を別に作る。`確定` 行の予約番号、宿の連絡先、共有 URL、フルネームが対象
- PDF は本文テキストを抽出できる。黒塗りではなく、**HTML 側から削除**して作り直すこと

## 環境

| 必要なもの | 用途 |
|---|---|
| Google Chrome / Chromium / Edge | PDF・PNG 生成。`CHROME_PATH` で場所を上書きできる |
| 日本語フォント | macOS はヒラギノが標準で入っている。Linux は Noto Sans JP を入れる |
| Node.js ＋ puppeteer-core | 任意。ページ番号・共通フッタが必要な場合のみ |

Chrome のバージョンによっては出力後もプロセスが終了しないため、`build-pdf.sh` は
**出力ファイルのサイズが安定した時点で完了とみなして**プロセスを終了させている。
処理が長引く場合は `TIMEOUT=120 ./scripts/build-pdf.sh ...` で上限を延ばす。
