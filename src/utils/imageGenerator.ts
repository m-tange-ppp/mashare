import * as htmlToImage from "html-to-image";

export async function generateMathImage(element: HTMLElement, isDark: boolean) {
  const computedStyle = window.getComputedStyle(element);

  return await htmlToImage.toPng(element, {
    quality: 1.0,
    pixelRatio: 2,
    backgroundColor: isDark ? "#1f2937" : "#ffffff",
    style: {
      transform: "none",
      margin: "0",
      padding: computedStyle.padding,
      color: isDark ? "#ffffff" : "#000000",
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
        node.style.color = isDark ? "#ffffff" : "#000000";
        return true;
      }
      return true;
    },
  });
}
