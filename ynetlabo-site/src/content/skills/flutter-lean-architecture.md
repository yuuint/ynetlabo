---
name: "flutter-lean-architecture"
title: "Flutter lean アーキテクチャ（コード生成なし）"
description: "コード生成を使わない Flutter 構成。feature-first + 軽量レイヤード、Riverpod の手書き provider、`--dart-define-from-file` による環境切替、余白・角丸・duration のトークン集約。コード生成を限定解禁する条件も規定。"
category: "アプリ開発"
trigger: "Flutter アプリを「コード生成なし」の軽量スタックで組む。feature-first + レイヤード構成、Riverpod の手書き provider、--dart-define-from-file による環境切替、余白・角丸・duration をトークンに集約する設計を適用する。ユーザーが Flutter アプリの新規作成・ディレクトリ構成・状態管理・テーマやテストの方針について話しているときに使う。Use when the user mentions Flutter, Riverpod, go_router, dart-define, Flutter project structure, or Flutter state management."
updated: 2026-08-04T13:46:59.000Z
files: ["references/codegen-policy.md", "references/config-and-flavors.md", "assets/app_metrics.dart"]
source: "claude-skills/skills/flutter-lean-architecture/SKILL.md"
---

<!-- 自動生成: claude-skills/skills/flutter-lean-architecture/SKILL.md から取り込んだもの。直接編集せず、原稿を直して `npm run sync:skills` を実行すること。 -->

## 概要

Flutter アプリを **build_runner 系のコード生成を使わずに**組む構成。
feature-first の縦割り + 軽量レイヤードで、状態管理と DI は Riverpod に一本化する。

AI 支援開発ではボイラープレートを直接生成できるため、コード生成の主なメリット（記述量削減）が薄い。
一方でコード生成は**依存グラフを重くし、SDK 更新時に真っ先に壊れる**。この構成はそのトレードオフを
「生成しない」側に倒している。

コード生成が本当に必要になったときの例外条件は [references/codegen-policy.md](https://github.com/yuuint/claude-skills/blob/main/skills/flutter-lean-architecture/references/codegen-policy.md)。

## 構成

```
lib/
  main.dart
  app.dart               # MaterialApp.router / ProviderScope
  core/                  # 機能横断（どの feature にも依存しない）
    config/              # AppConfig（環境値）、app_constants.dart
    router/              # go_router 設定、RouteObserver
    theme/               # app_theme.dart / app_metrics.dart
    responsive/          # ブレークポイント、最大幅ラッパ
    utils/               # 日付フォーマット等
    widgets/             # 汎用 UI（dialogs / loading / save_bar 等）
  features/<name>/       # 機能ごとに縦割り
    data/                # repository 実装、データソース
    domain/              # entity、repository インターフェース
    presentation/        # Riverpod Notifier、画面 Widget
config/                  # dev.json / stg.json / prod.json
docs/                    # → spec-driven-dev スキル
test/
```

### 依存方向（これだけは崩さない）

```
presentation (Notifier / Widget)
      ↓ watch / read
domain (entity, repository インターフェース)
      ↑ implements
data (repository 実装, データソース = HTTP クライアント / ローカルストレージ)
```

- **UI からデータソースを直接触らない。** 必ず repository インターフェース越し。
  これを守るとテストで repository をモックするだけで済む。
- `core/` は features に依存しない。逆は可。
- feature 間の直接依存を作らない。共有が必要になったものは `core/` へ上げる。

## 実装の規約

1. **provider は手書き**。`@riverpod` アノテーションと生成コードを使わない。
   ```dart
   final itemsRepositoryProvider = Provider<ItemsRepository>((ref) => ItemsRepositoryImpl(ref.watch(apiClientProvider)));
   final itemsProvider = AsyncNotifierProvider<ItemsNotifier, List<Item>>(ItemsNotifier.new);
   ```
2. **モデルは手書きの `fromJson` / `toJson`**。`copyWith` と `==` も必要な分だけ手で書く。
3. **HTTP クライアントは直書き**（retrofit のような生成レイヤを挟まない）。
4. **環境切替は `--dart-define-from-file`**。`config/{dev,stg,prod}.json` を作り、`AppConfig` で 1 か所から読む。
   → [references/config-and-flavors.md](https://github.com/yuuint/claude-skills/blob/main/skills/flutter-lean-architecture/references/config-and-flavors.md)
5. **数値を画面に散らさない**。余白・角丸・アニメーション時間は `core/theme/app_metrics.dart` に集約し、
   `AppTheme` と各画面が**同じトークン**を参照する。→ [assets/app_metrics.dart](https://github.com/yuuint/claude-skills/blob/main/skills/flutter-lean-architecture/assets/app_metrics.dart)
   `const EdgeInsets.all(13)` のような一点物を書かない。
6. **エラーは型付き例外**。`print` を使わない。
7. アプリ固有の定数（表示名・プロダクトキー等）は `core/config/app_constants.dart` に集約。

## 手順

### 新規プロジェクトを組むとき

1. `flutter create` の直後に上記のディレクトリを作る。
2. `config/{dev,stg,prod}.json` と `AppConfig` を置く。
3. `app_metrics.dart` を置き、`AppTheme` から参照させる（[assets/app_metrics.dart](https://github.com/yuuint/claude-skills/blob/main/skills/flutter-lean-architecture/assets/app_metrics.dart) をコピー）。
4. `go_router` のルート定義を `core/router/` に置く。
5. 最初の feature を `features/<name>/{data,domain,presentation}` で作る。
6. `docs/` を初期化する（→ `spec-driven-dev` スキル）。
7. UI/UX の方針を 1 枚にする（→ `app-design-philosophy` スキル）。ここが無いと生成コードが Material のデフォルトに落ちる。

### 既存プロジェクトに適用するとき

一度に作り替えない。**次に触る feature から**縦割りに直し、`core/` に共通物を吸い上げる。
先に `app_metrics.dart` を導入して数値の散らばりを止めるのが、最も費用対効果が高い。

## テスト方針

- **純ロジックの単体テストを主戦場にする**: モデルの `fromJson`、バリデーション関数、集計ヘルパー、Notifier の状態遷移。
- モックは `mocktail`（コード生成なし）。**repository インターフェースをモックし、HTTP クライアントは直接触らない。**
- Widget テストは画面遷移のスモークを 1 本に留める。ゴールデンテストは費用対効果を見てから。
- 「何が自動テストで守られ、何が手動確認なのか」を 1 枚の spec にまとめる（→ `spec-driven-dev`）。

## コマンド

```bash
flutter run --dart-define-from-file=config/dev.json
flutter run -d chrome --dart-define-from-file=config/dev.json
flutter build apk --dart-define-from-file=config/prod.json
flutter analyze                                          # コミット前に必須
flutter test --dart-define-from-file=config/dev.json
```

## ルール

- **`freezed` / `*_generator` / `build_runner` を安易に追加しない。** 追加したくなったら
  [references/codegen-policy.md](https://github.com/yuuint/claude-skills/blob/main/skills/flutter-lean-architecture/references/codegen-policy.md) の条件を確認し、ADR を 1 枚書いてから。
- **UI から `dio` などのデータソースを直接呼ばない。**
- **画面に数値リテラルを書かない**（`AppMetrics` を参照する）。
- `analyze` が通らないコードをコミットしない。

## 参考

- [references/codegen-policy.md](https://github.com/yuuint/claude-skills/blob/main/skills/flutter-lean-architecture/references/codegen-policy.md) — コード生成を禁止する根拠と、限定解禁の条件
- [references/config-and-flavors.md](https://github.com/yuuint/claude-skills/blob/main/skills/flutter-lean-architecture/references/config-and-flavors.md) — 環境切替と `AppConfig`
- [assets/app_metrics.dart](https://github.com/yuuint/claude-skills/blob/main/skills/flutter-lean-architecture/assets/app_metrics.dart) — 余白・角丸・duration トークン
- 関連スキル: `spec-driven-dev` / `app-design-philosophy` / `app-store-submission`
