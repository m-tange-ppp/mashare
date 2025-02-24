import katex from "katex";

interface MathExampleProps {
  onSelect: (formula: string) => void;
}

export function MathExamples({ onSelect }: MathExampleProps) {
  const examples = [
    {
      title: "分数",
      formula: "\\frac{a}{b}",
    },
    {
      title: "累乗根",
      formula: "\\sqrt{x}, \\sqrt[n]{x}",
    },
    {
      title: "累乗",
      formula: "x^n, x_n",
    },
    {
      title: "角度",
      formula: "90^\\circ, \\angle ABC",
    },
    {
      title: "三角関数",
      formula: "\\sin x, \\cos x",
    },
    {
      title: "順列組合せ",
      formula: "{}_nP_r, {}_nC_r",
    },
    {
      title: "総和・総積",
      formula: "\\sum_{i=1}^n, \\prod_{i=1}^n",
    },
    {
      title: "積分",
      formula: "\\int_a^b f(x)dx",
    },
    {
      title: "極限",
      formula: "\\lim_{x \\to a} f(x)",
    },
    {
      title: "不等号",
      formula: "\\leqq, \\geqq, \\neq",
    },
    {
      title: "ギリシャ文字",
      formula: "\\alpha, \\beta, \\theta, \\pi",
    },
    {
      title: "集合記号",
      formula: "\\in, \\subset, \\cup, \\cap",
    },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
      {examples.map((example) => (
        <button
          key={example.title}
          onClick={() => onSelect(example.formula)}
          className="border rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <div
            className="scale-75 transform md:scale-100"
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(example.formula, {
                displayMode: true,
                throwOnError: false,
              }),
            }}
          />
        </button>
      ))}
    </div>
  );
}
