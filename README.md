# MaShare - 数式共有アプリ

LaTeX 形式の数式を画像として共有できる Web アプリです。

## 機能

- LaTeX 形式での数式入力
- 日本語と数式の混在表示
- よく使う数式の例を簡単に挿入
- ライト/ダークモード切替可能な画像出力
- 画像のプレビューと保存

## 特徴

- 自動改行機能（Enter キーで`\\`を挿入）
- 日本語テキストは自動的に文中モードで表示
- 純粋な数式は中央寄せで表示
- 画像出力時にモードを切り替え可能
- 高品質な画像出力（2 倍のピクセル比）

## 技術スタック

- Framework: Next.js 14 (App Router)
- 数式レンダリング: KaTeX
- スタイリング: Tailwind CSS
- 画像生成: html-to-image
- デプロイ: Vercel

## プロジェクト構成

```
src/
  ├── app/
  │   ├── page.tsx       # メインページ
  │   ├── layout.tsx     # レイアウト設定
  │   └── globals.css    # グローバルスタイル
  ├── components/
  │   ├── MathInput.tsx      # 数式入力コンポーネント
  │   ├── MathPreview.tsx    # プレビューコンポーネント
  │   ├── MathExamples.tsx   # 数式例コンポーネント
  │   ├── SaveImageButton.tsx # 保存ボタン
  │   └── ImagePreviewModal.tsx # 画像プレビューモーダル
  └── utils/
      └── imageGenerator.ts   # 画像生成ユーティリティ
```

## 開発環境のセットアップ

```bash
# パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開いて確認できます。

## 使用方法

1. テキストエリアに LaTeX 形式で数式を入力
2. 必要に応じて「数式の例」から数式を挿入
3. 「画像として保存」ボタンをクリック
4. プレビューモーダルで確認
5. 必要に応じてライト/ダークモードを切り替え
6. 「ダウンロード」ボタンで画像を保存

---
