interface MathPreviewProps {
  html: string;
}

export function MathPreview({ html }: MathPreviewProps) {
  return (
    <div
      id="math-output"
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-black dark:text-white"
      style={{ lineHeight: 1.5 }}
    >
      <div
        className="overflow-hidden"
        dangerouslySetInnerHTML={{
          __html: html
            .split("<br />")
            .map((line) => `<p>${line}</p>`)
            .join(""),
        }}
      />
    </div>
  );
}
