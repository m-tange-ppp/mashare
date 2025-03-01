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

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
