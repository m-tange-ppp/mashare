"use client";

import "katex/dist/katex.min.css";
import { useState, useEffect } from "react";
import katex from "katex";
import * as htmlToImage from "html-to-image";
import { MathInput } from "@/components/MathInput";
import { MathPreview } from "@/components/MathPreview";
import { SaveImageButton } from "@/components/SaveImageButton";
import { MathExamples } from "@/components/MathExamples";

export default function Home() {
  const [mathInput, setMathInput] = useState(
    "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}"
  );
  const [renderedMath, setRenderedMath] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });

  // 入力が変更されるたびに数式をレンダリング
  useEffect(() => {
    try {
      const lines = mathInput.split("\\\\");
      const renderedLines = lines.map((line) => {
        const hasJapaneseText =
          /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf]/.test(
            line
          );
        return katex.renderToString(line.trim(), {
          displayMode: !hasJapaneseText,
          throwOnError: false,
          strict: false, // LaTeXの厳密なチェックを無効化
        });
      });
      setRenderedMath(renderedLines.join("<br />"));
    } catch (e) {
      console.error("数式のレンダリングに失敗しました:", e);
    }
  }, [mathInput]);

  const handleSaveImage = async () => {
    const element = document.getElementById("math-output");
    if (!element || !mathInput) return;

    try {
      // 現在の要素のスタイルを取得
      const computedStyle = window.getComputedStyle(element);

      // 高品質な画像を生成
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: computedStyle.backgroundColor,
        style: {
          transform: "none",
          margin: "0",
          padding: computedStyle.padding,
          color: computedStyle.color,
          borderRadius: computedStyle.borderRadius,
          border: computedStyle.border,
        },
        filter: (node) => {
          // KaTeX関連の要素のスタイルを保持
          if (
            node instanceof HTMLElement &&
            (node.classList.contains("katex") ||
              node.classList.contains("katex-html") ||
              node.classList.contains("katex-display"))
          ) {
            // 現在の表示スタイルを保持
            const style = window.getComputedStyle(node);
            node.style.color = style.color;
            return true;
          }
          return true;
        },
      });

      // 画像をダウンロード
      const link = document.createElement("a");
      link.download = "math.png";
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("画像の保存に失敗しました:", e);
    }
  };

  const handleInsert = (formula: string) => {
    const before = mathInput.slice(0, cursorPosition.start);
    const after = mathInput.slice(cursorPosition.end);
    setMathInput(before + formula + after);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
          MaShare
        </h1>
        <h2 className="text-center text-gray-600 dark:text-gray-400 mb-4">
          ～綺麗な数式を画像で共有しよう～
        </h2>

        <div className="space-y-4">
          <div>
            <h2 className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              数式の例
            </h2>
            <MathExamples onSelect={handleInsert} />
          </div>
          <MathInput
            value={mathInput}
            onChange={setMathInput}
            onInsert={setCursorPosition}
          />
          <div className="flex justify-center">
            <SaveImageButton onSave={handleSaveImage} />
          </div>
          <MathPreview html={renderedMath} />
        </div>
      </div>
    </main>
  );
}
