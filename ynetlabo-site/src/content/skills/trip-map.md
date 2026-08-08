---
name: "trip-map"
title: "旅行地図ジェネレータ"
description: "旅程に載せる地図を SVG で生成。広域ルート図（Natural Earth）、海岸線つきエリア地図（OpenStreetMap）、路線模式図の3種類。Python 標準ライブラリのみで動作。"
category: "旅行"
trigger: "旅行計画書に載せる地図を SVG で生成する。空港間の移動を示す広域ルート図、海岸線つきのエリア地図、駅と宿の位置関係を示す路線模式図の3種類。ユーザーが旅程に地図を入れたい、ルート図を作りたい、観光地の位置関係や移動時間を図で示したいと言ったときに使う。外部パッケージ不要（Python 標準ライブラリのみ）。Use when the user wants a map, route diagram, or area map for a trip itinerary or travel document."
updated: 2026-08-03T17:27:11.000Z
files: ["references/spec.md", "scripts/area_map.py", "scripts/geo.py", "scripts/route_map.py", "scripts/transit_map.py", "examples/area.json", "examples/route.json", "examples/transit.json"]
source: "claude-skills/skills/trip-map/SKILL.md"
---

<!-- 自動生成: claude-skills/skills/trip-map/SKILL.md から取り込んだもの。直接編集せず、原稿を直して `npm run sync:skills` を実行すること。 -->

旅程に載せる地図を **SVG** で生成する。Python 標準ライブラリだけで動き、追加インストールは要らない。

SVG なのでそのまま HTML に埋め込め、`trip-planner-pdf` で PDF 化するとベクタのまま入る（拡大しても劣化しない）。

## 3種類の地図

| スクリプト | 何の図か | いつ使うか | 通信 |
|---|---|---|---|
| `route_map.py` | 空港間の移動を1枚で見せる広域図。緯度経度グリッド、便名と時刻つき | 複数の出発地から合流する旅程、離島を挟む旅程 | 初回のみ |
| `area_map.py` | 実際の海岸線に観光地と所要時間を重ねたエリア図 | 島・沿岸部の観光地の位置関係と移動時間を示す | bbox ごと初回のみ |
| `transit_map.py` | 駅を等間隔に並べた路線模式図。宿・目的地を引き出し線で示す | 市街地の動線（空港→宿→繁華街）を示す | 不要 |

**選び方**：地理的な正確さが要るなら `area_map`、順序と乗り換えが伝わればよいなら `transit_map`。
市街地の図に `area_map` を使うと、海岸線しか出ないうえ道路も鉄道も無いので役に立たない。

## 使い方

```bash
cd skills/trip-map
python3 scripts/route_map.py   examples/route.json   -o out/route-map.svg
python3 scripts/area_map.py    examples/area.json    -o out/area-map.svg
python3 scripts/transit_map.py examples/transit.json -o out/transit-map.svg
```

仕様ファイルの書き方は `references/spec.md`。**`examples/` をコピーして数値を差し替えるのが最短。**

海岸線が取れないとき（Overpass が混雑・オフライン）：

```bash
python3 scripts/area_map.py area.json --no-coast   # 位置関係だけの図になる
```

## 進め方

### 1. どの地図が要るか決める

計画書の内容から判断する。**地図は3枚まで。** 情報が同じ地図を角度を変えて並べても価値は増えない。

- 出発地が複数ある／飛行機や船で島を移動する → `route_map`
- 車で回る日がある → `area_map`（所要時間を `note` に入れる）
- 市街地を公共交通で動く日がある → `transit_map`

### 2. 座標を集める

地点ごとに経緯度が必要。**小数点以下4桁で十分。**
`references/spec.md` の「座標の調べ方」を参照。地名から座標を引くときは、必ず生成後の図で位置を確認する。

### 3. 仕様ファイルを書く

- `route_map` の `status` は工程表の区分（確定／未手配／提案）と一致させる。**計画書と図で情報が食い違わないこと**
- `area_map` の `note` には**車での所要時間**を入れる。「近そうに見えて2時間かかる」を図で潰せる
- 往復の便を描くときは片方の `bend` を負値にする。同じ線に重なって1本に見えてしまう

### 4. 生成して必ず目視する

**SVG を生成しただけで完了にしない。** ブラウザか以下のコマンドで画像にして確認する。

```bash
../trip-planner-pdf/scripts/build-pdf.sh --preview check.html preview.png
```

見るべき点：

- [ ] 点が意図した場所にあるか（座標の桁間違いは海の上に出るのですぐ分かる）
- [ ] ラベルが重なっていないか → `anchor` の向きを変える、`label_dy` でずらす
- [ ] 図の外にはみ出していないか → `bbox` を広げる、`size` を変える
- [ ] 出典表記が入っているか

### 5. 計画書に埋め込む

HTML（`trip-planner-pdf`）に入れる場合：

```html
<figure>
  <img src="images/area-map.svg" alt="エリア地図">
  <figcaption>海岸線: © OpenStreetMap contributors (ODbL)</figcaption>
</figure>
```

Markdown に入れる場合も同じく `<img>` タグで参照する（`![]()` でも表示されるが、キャプションを付けにくい）。

図の**すぐ下に読み方を1〜2文添える**。「破線は未手配の便」「北部の岬は片道70分なので日帰りは玉取崎まで」のように、図から読み取ってほしい結論を書く。

## 制約

- **道路・鉄道の線形は描けない。** OSM から取るのは海岸線のみ。道路網が要るなら地図サービスのスクリーンショットを使う（その場合は各サービスの利用規約に従うこと）
- **地名ラベルの自動配置はしない。** 重なったら `anchor` と `label_dy` で手動調整する
- `transit_map` は駅間を等間隔に描く。実距離は反映しない
- 縮尺バーは bbox 中央の緯度で計算している。南北に広い図では端で誤差が出る

## ライセンス

生成される SVG には出典表記が自動で入る。**消さないこと。**
Natural Earth はパブリックドメイン、OpenStreetMap は ODbL（帰属表示が義務）。
Overpass API は公共の無料サービスなので、bbox を絞りキャッシュを活かして負荷をかけない（`references/spec.md` の作法を参照）。
