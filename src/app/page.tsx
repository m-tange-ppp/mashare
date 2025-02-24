"use client";

import "katex/dist/katex.min.css";
import { useState, useEffect } from "react";
import katex from "katex";
import * as htmlToImage from "html-to-image";
import { MathInput } from "@/components/MathInput";
import { MathPreview } from "@/components/MathPreview";
import { SaveImageButton } from "@/components/SaveImageButton";
import { MathExamples } from "@/components/MathExamples";
import Image from "next/image";

export default function Home() {
  const [mathInput, setMathInput] = useState(
    "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}"
  );
  const [renderedMath, setRenderedMath] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

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
      const computedStyle = window.getComputedStyle(element);

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
          if (
            node instanceof HTMLElement &&
            (node.classList.contains("katex") ||
              node.classList.contains("katex-html") ||
              node.classList.contains("katex-display"))
          ) {
            const style = window.getComputedStyle(node);
            node.style.color = style.color;
            return true;
          }
          return true;
        },
      });

      setGeneratedImage(dataUrl);
    } catch (e) {
      console.error("画像の生成に失敗しました:", e);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.download = "math.png";
    link.href = generatedImage;
    link.click();
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

          {/* 生成された画像のプレビュー */}
          {generatedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 max-w-2xl w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">生成された画像</h3>
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="relative w-full h-[400px]">
                  <Image
                    src={generatedImage}
                    alt="Generated Math"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    ダウンロード
                  </button>
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
