# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

React 19 + TypeScript + Vite 8 による Todo アプリ。現在は Vite テンプレートのスキャフォールド段階。

## 開発コマンド

```bash
pnpm dev          # 開発サーバー起動（Vite HMR）
pnpm build        # 型チェック（tsc -b）+ プロダクションビルド
pnpm preview      # ビルド済みアプリのプレビュー

pnpm lint         # Biome でリント
pnpm lint:fix     # Biome でリント + 自動修正
pnpm format       # Biome でフォーマット
pnpm fix          # Biome で lint + format を一括実行（check --write）
```

パッケージマネージャ: **pnpm**

## 技術スタック

- **React 19** — StrictMode 有効、JSX transform (`react-jsx`)
- **TypeScript 5.9** — strict モード (`tsconfig.app.json`)
- **Vite 8** — `@vitejs/plugin-react`（Oxc ベース）
- **Biome 2** — メインの linter / formatter（スペースインデント、ダブルクォート、import 自動整理）
- **ESLint** — react-hooks / react-refresh ルールの補助的な利用

## コードスタイル

Biome が主要ツール。`biome.json` の主なカスタマイズ:
- `noNonNullAssertion`: off
- クォートスタイル: ダブルクォート
- インデント: スペース

`jj fix` コマンドでも Biome が実行される（`jjconfig.toml` で設定済み）。

## Version Control — 必須手順

このプロジェクトは **Jujutsu (jj)** でバージョン管理している。詳細なルールは `.claude/rules/jujutsu-rules.md` を参照。

**コード編集を開始する前に、必ず以下の手順を実行すること:**

1. `jj log --ignore-working-copy -r @` で現在の change を確認する
2. description が空かつ diff が空（empty）→ `jj describe -m "<description>"` で description を設定して作業開始
3. それ以外（すでに作業中 or 完了済み）→ `jj new -m "<description>"` で新しい change を作成
4. description は Conventional Commits 形式、英語で記述

**禁止事項:** `git` コマンドの直接使用（`jj git` サブコマンドおよび `gh` CLI は許可）
