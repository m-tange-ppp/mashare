import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MaShare",
  description: "LaTeX形式の数式を画像として共有できるWebアプリです。",
  keywords: ["数式", "LaTeX", "KaTeX", "数学"],
  authors: [
    {
      name: "m-tange-ppp",
      url: "https://github.com/m-tange-ppp",
    },
  ],
  openGraph: {
    title: "MaShare",
    description: "LaTeX形式の数式を画像として共有できるWebアプリです。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MaShare",
    description: "LaTeX形式の数式を画像として共有できるWebアプリです。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
