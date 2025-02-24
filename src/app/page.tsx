"use client";

import "katex/dist/katex.min.css";
import { useState, useEffect } from "react";
import katex from "katex";
import { MathInput } from "@/components/MathInput";
import { MathPreview } from "@/components/MathPreview";
import { SaveImageButton } from "@/components/SaveImageButton";
import { MathExamples } from "@/components/MathExamples";
import { ImagePreviewModal } from "@/components/ImagePreviewModal";
import { generateMathImage } from "@/utils/imageGenerator";

export default function Home() {
  const [mathInput, setMathInput] = useState(
    "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}"
  );
  const [renderedMath, setRenderedMath] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isDarkImage, setIsDarkImage] = useState(false);

  // システムのダークモード設定を検出
  useEffect(() => {
    setIsDarkImage(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  // 入力が変更されるたびに数式をレンダリング
  useEffect(() => {
    try {
      const lines = mathInput.split("\\\\");
      const renderedLines = lines.map((line) => {
        // 入力をサニタイズ
        const sanitizedLine = line.trim().replace(/[&"']/g, (char) => {
          const entities: { [key: string]: string } = {
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#x27;",
          };
          return entities[char];
        });

        const hasJapaneseText =
          /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf]/.test(
            sanitizedLine
          );

        return katex.renderToString(sanitizedLine, {
          displayMode: !hasJapaneseText,
          throwOnError: false,
          strict: false,
          trust: false, // KaTeXのセキュリティ設定を有効化
        });
      });
      setRenderedMath(renderedLines.join("<br />"));
    } catch (e) {
      console.error("数式のレンダリングに失敗しました:", e);
    }
  }, [mathInput]);

  const handleSaveImage = async (forceDark?: boolean) => {
    const element = document.getElementById("math-output");
    if (!element || !mathInput) return;

    try {
      const isDark = forceDark ?? isDarkImage;
      const dataUrl = await generateMathImage(element, isDark);
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

          {generatedImage && (
            <ImagePreviewModal
              imageUrl={generatedImage}
              isDark={isDarkImage}
              onClose={() => setGeneratedImage(null)}
              onDownload={handleDownload}
              onToggleMode={() => {
                setIsDarkImage(!isDarkImage);
                handleSaveImage(!isDarkImage);
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
