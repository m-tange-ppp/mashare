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
    <div>
      <label className="block text-sm font-medium mb-2">
        LaTeX形式で数式を入力
      </label>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onMouseUp={() => {}}
        className="w-full h-32 p-3 border rounded-lg text-black"
        placeholder="LaTeX形式で数式を入力してください"
      />
    </div>
  );
}
