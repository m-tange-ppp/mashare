import { ChangeEvent, useRef, useEffect, KeyboardEvent } from "react";

interface MathInputProps {
  value: string;
  onChange: (value: string) => void;
  onInsert?: (position: { start: number; end: number }) => void;
}

export function MathInput({ value, onChange, onInsert }: MathInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newValue = value.slice(0, start) + "\\\\\n" + value.slice(end);
        onChange(newValue);

        // カーソル位置を次の行に更新
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 3; // \\\n の後
          if (onInsert) {
            onInsert({ start: start + 3, end: start + 3 });
          }
        }, 0);
      }
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && onInsert) {
      onInsert({
        start: textarea.selectionStart,
        end: textarea.selectionEnd,
      });
    }
  }, [value, onInsert]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          LaTeX形式で数式を入力
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          ※自動で折り返さないので改行してください
        </p>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onMouseUp={() => {}}
          className="w-full h-32 p-4 border border-gray-200 dark:border-gray-700 rounded-lg 
                   text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors"
          placeholder="LaTeX形式で数式を入力してください"
        />
      </div>
    </div>
  );
}
