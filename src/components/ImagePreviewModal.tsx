import Image from "next/image";

interface ImagePreviewModalProps {
  imageUrl: string;
  isDark: boolean;
  onClose: () => void;
  onDownload: () => void;
  onToggleMode: () => void;
}

export function ImagePreviewModal({
  imageUrl,
  isDark,
  onClose,
  onDownload,
  onToggleMode,
}: ImagePreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">生成された画像</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="flex items-center justify-end mb-2">
          <button
            onClick={onToggleMode}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            {isDark ? "ライトモードで生成" : "ダークモードで生成"}
          </button>
        </div>
        <div className="relative w-full h-[400px]">
          <p className="text-sm">※長押しで保存できます</p>
          <Image
            src={imageUrl}
            alt="Generated Math"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ダウンロード
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
