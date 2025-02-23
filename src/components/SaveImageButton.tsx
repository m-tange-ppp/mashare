interface SaveImageButtonProps {
  onSave: () => void;
}

export function SaveImageButton({ onSave }: SaveImageButtonProps) {
  return (
    <button
      onClick={onSave}
      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
    >
      画像として保存
    </button>
  );
}
