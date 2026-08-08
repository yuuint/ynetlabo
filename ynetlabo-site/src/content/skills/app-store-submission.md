---
name: "app-store-submission"
title: "ストア申請チェックリスト（iOS / Android）"
description: "App Store Connect / Google Play Console の全入力項目を、値付きのチェックリストに落とす。コード外の申請ブロッカー（プライバシーポリシー、プライバシーマニフェスト、フィーチャーグラフィック）を先に洗い出し、広告・解析 SDK とプライバシー申告の矛盾を潰す。一般アプリが実際に落ちるリジェクト条項の事例集つき。"
category: "アプリ開発"
trigger: "モバイルアプリを App Store / Google Play に申請するための全入力項目チェックリストを作成・管理し、申請ブロッカーとプライバシー申告の矛盾を先回りで潰す。ユーザーがアプリのストア申請・審査・リリース準備・プライバシー申告・データセーフティについて話しているときに使う。Use when the user mentions App Store Connect, Google Play Console, app submission, app review, store release, privacy manifest, data safety, or App Privacy."
updated: 2026-08-04T14:09:26.000Z
files: ["references/blockers.md", "references/google-play.md", "references/ios-app-store.md", "references/rejections.md", "assets/submission-checklist.md"]
source: "claude-skills/skills/app-store-submission/SKILL.md"
---

<!-- 自動生成: claude-skills/skills/app-store-submission/SKILL.md から取り込んだもの。直接編集せず、原稿を直して `npm run sync:skills` を実行すること。 -->

## 概要

App Store Connect と Google Play Console の**入力項目は 100 を超える**。その多くはコードの外側の成果物（プライバシーポリシーの公開 URL、フィーチャーグラフィック、アイコン）に依存し、それらは申請直前に用意しようとすると必ずブロッカーになる。

このスキルは、両ストアの全入力項目をアプリ固有の値付きで 1 枚の Markdown に落とし、**リリース計画を立てた時点で**未確定項目と成果物を洗い出す。申請直前ではなく、開発中盤に一度全部埋めるのが目的。

## いつ実行するか

- リリース計画を立てたとき（**推奨。申請直前ではない**）
- 「そろそろストアに出したい」「審査に出す」と言われたとき
- 広告 SDK・解析 SDK を追加したとき（→ プライバシー申告の全面見直しが要る）

## 手順

1. **前提の棚卸し**（ユーザーに確認する。推測で埋めない）
   - 表示名 / Bundle ID・パッケージ名 / 価格 / ログインの有無 / 対象地域
   - **広告 SDK・解析 SDK・トラッキング（ATT）の有無** ← 以降の申告すべてに波及する最重要項目
   - アカウント登録の有無、ユーザー生成コンテンツの有無、課金の有無

2. **ブロッカーを先に確定する**（[references/blockers.md](https://github.com/yuuint/claude-skills/blob/main/skills/app-store-submission/references/blockers.md)）
   コード外の成果物はリードタイムが長い。ここを最初に洗い出して、担当と期日をユーザーに提示する。

3. **チェックリストを生成する**
   [assets/submission-checklist.md](https://github.com/yuuint/claude-skills/blob/main/skills/app-store-submission/assets/submission-checklist.md) をプロジェクトの `docs/store-submission-checklist.md` にコピーし、`{{...}}` を実値に置き換える。
   詳細な項目の意味は [references/ios-app-store.md](https://github.com/yuuint/claude-skills/blob/main/skills/app-store-submission/references/ios-app-store.md) と [references/google-play.md](https://github.com/yuuint/claude-skills/blob/main/skills/app-store-submission/references/google-play.md) を必要になったときだけ読む。

4. **技術タスクを実装側に落とす**
   `Info.plist` / `PrivacyInfo.xcprivacy` / `AndroidManifest.xml` / リリースビルド設定。チェックリストの「申請前の技術タスク」節。

5. **リジェクト事例と突き合わせる**（[references/rejections.md](https://github.com/yuuint/claude-skills/blob/main/skills/app-store-submission/references/rejections.md)）
   このアプリに該当しそうな条項を拾い、チェックリストに項目として足す。
   **ログイン・課金・広告・権限のどれかがあるなら必ず読む。**
   すでに落ちている場合は、リジェクト文面の条項番号でこのファイルを引く。

6. **未確定項目を残す**
   埋まらなかったものは消さずに「判断が要るもの」節に残し、ユーザーへ質問として提示して終わる。

掲載コピー本文（アプリ名・説明文・キーワード）はこのスキルの対象外。→ `aso-store-copy` スキル。

## ルール

- **記号を使って状態を可視化する**: ✅=確定値あり ／ ⚠️=要決定 ／ 🛠=成果物の作成が必要 ／ ⛔=申請ブロッカー
- **推測で埋めない。** 連絡先・URL・地域・カテゴリはユーザーに聞く。分からない項目は ⚠️ のまま残す。
- **プライバシーポリシー URL や連絡先メールを勝手に生成しない**（実在しない URL を書くと審査で落ちる）。
- **申告と掲載文の整合を必ず検算する**（下記「典型的な事故」）。
- 署名鍵・パスワード・API キーはチェックリストに書かない。必要な項目名だけを列挙し、値の作成はユーザーに任せる。

## 典型的な事故（これを毎回チェックする）

| 事故 | 内容 |
|---|---|
| **「完全オフライン」と広告 SDK の矛盾** | アプリ本体がデータを送らないことと、SDK が端末 ID・利用状況を送ることは**別の話**。広告/解析を入れたら掲載文に「完全オフライン」とは書けない。「オフライン・ファースト」と表現する。 |
| **申告と実装の食い違い** | 両ストアで最頻のリジェクト理由。**自分のコードが送っていなくても SDK が送っていれば申告対象**。Android は `AD_ID` 権限がマニフェストマージで勝手に入る。 |
| **アカウント削除の導線が無い** | アカウント登録できるなら、iOS は**アプリ内に削除機能**が必須（5.1.1(v)）、Play は**アプリ内＋公開 Web ページ**の両方。「メールで依頼」は不可。 |
| プライバシーマニフェスト漏れ | iOS は広告・解析 SDK を使うなら `PrivacyInfo.xcprivacy` が実質必須。無いとビルドアップロード時に警告 → 審査で指摘。 |
| サポート URL がトップページ | iOS 1.5。連絡手段の書かれた**アプリ専用ページ**が要る。使わないマーケティング URL は空欄にする。 |
| フィーチャーグラフィック忘れ | Google Play は 1024×500 が**必須**。これが無いと公開できない。 |
| 暗号化申告の質問ループ | `ITSAppUsesNonExemptEncryption` を `Info.plist` に入れておかないと、毎回の申請で質問される。 |
| スクショに広告が写る | 広告表示ビルドで撮ると審査・見栄えの両方で不利。**広告を隠すビルドフラグで撮る**。 |
| スクショが実画面でない | iOS 2.3.3。タイトルアート・ログイン画面・スプラッシュだけは不可。Play は順位や価格の表記も不可。 |
| アイコンの透過 | iOS の 1024×1024 は**透過なし**。透過 PNG はアップロードで弾かれる。 |
| バージョン 0.x での申請 | 申請時は `1.0.0` 以上を推奨。 |
| **手続き側で止まる** | 機能に問題が無くても、年齢レーティング質問票の再回答・EU トレーダー情報・ビルド SDK 要件・Play のクローズドテスト要件・Target API level のどれかで公開できないことがある。→ [references/rejections.md](https://github.com/yuuint/claude-skills/blob/main/skills/app-store-submission/references/rejections.md) |

## 出力形式

プロジェクトの `docs/store-submission-checklist.md` に、以下の構成で 1 ファイル。

```
0. 先に用意すべき共通の成果物（両ストア）   ← ⛔🛠 が集まる節
1. App Store Connect（iOS）
2. Google Play Console（Android）
3. 申請前の技術タスク（コード / 設定側）
4. リジェクト予防（提出ボタンを押す前に通す）
5. 未確定で判断が要るもの
```

チェックリストを更新したら、残っている ⛔ と ⚠️ の件数をユーザーに報告して終わる。

## 参考

- [assets/submission-checklist.md](https://github.com/yuuint/claude-skills/blob/main/skills/app-store-submission/assets/submission-checklist.md) — そのままコピーして使うテンプレート
- [references/blockers.md](https://github.com/yuuint/claude-skills/blob/main/skills/app-store-submission/references/blockers.md) — 申請をブロックするコード外成果物の一覧
- [references/rejections.md](https://github.com/yuuint/claude-skills/blob/main/skills/app-store-submission/references/rejections.md) — **リジェクト事例集**（一般アプリが実際に落ちる条項・回避策・落ちたときの動き方）
- [references/ios-app-store.md](https://github.com/yuuint/claude-skills/blob/main/skills/app-store-submission/references/ios-app-store.md) — App Store Connect の項目詳細
- [references/google-play.md](https://github.com/yuuint/claude-skills/blob/main/skills/app-store-submission/references/google-play.md) — Google Play Console の項目詳細
- 関連スキル: `aso-store-copy`（掲載コピーとキーワード）
