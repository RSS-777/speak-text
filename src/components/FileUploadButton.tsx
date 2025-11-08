interface IFileUploadButtonProps  {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const FileUploadButton = ({label, onChange}: IFileUploadButtonProps) => {
  return (
    <label className="cursor-pointer select-none bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 px-6 mt-4 rounded-xl shadow-[2px_2px_12px_-2px_rgba(128,128,128,0.7)] hover:opacity-90 active:scale-95 transition-all">
      {label}
      <input
        type="file"
        accept=".txt,.docx,.pdf"
        className="hidden"
        onChange={onChange}
      />
    </label>
  );
};
