interface SaveImageButtonProps {
  onSave: () => void;
}

export function SaveImageButton({ onSave }: SaveImageButtonProps) {
  return (
    <button
      onClick={onSave}
      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg shadow-lg hover:from-blue-700 hover:to-cyan-600 focus:ring-4 focus:ring-blue-300 transition-all duration-200"
    >
      画像として保存
    </button>
  );
}
