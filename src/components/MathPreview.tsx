interface MathPreviewProps {
  html: string;
}

export function MathPreview({ html }: MathPreviewProps) {
  return (
    <div
      id="math-output"
      className="p-4 bg-white rounded-lg shadow-md text-black"
      style={{ lineHeight: 1.5 }}
    >
      <div
        className="katex-container"
        style={{ display: "block" }}
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
