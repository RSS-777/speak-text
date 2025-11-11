import { useTranslation } from "react-i18next";

interface IPaginationProps {
  pages: string[][];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PaginationButtons = ({
  pages,
  currentPage,
  setCurrentPage,
}: IPaginationProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center w-full gap-2 select-none mt-2">
      <button
        onClick={(e) => setCurrentPage((p) => Math.max(0, p - 1))}
        disabled={currentPage === 0}
        className="w-28 flex items-center justify-center gap-1 cursor-pointer bg-indigo-500 text-white px-1 rounded shadow-[2px_2px_12px_-2px_rgba(128,128,128,0.7)] hover:opacity-90 active:scale-95 transition"
      >
        <span className="text-2xl leading-none h-[28px]">‹ </span>
        <span className="text-sm">{t("textBlock.button.backBtn")}</span>
      </button>
      <span className="whitespace-nowrap">
        {currentPage + 1} / {pages.length}
      </span>
      <button
        onClick={() => setCurrentPage((p) => Math.min(pages.length - 1, p + 1))}
        disabled={currentPage === pages.length - 1}
        className="w-28 flex items-center justify-center gap-1 cursor-pointer bg-indigo-500 text-white px-1 rounded shadow-[2px_2px_12px_-2px_rgba(128,128,128,0.7)] hover:opacity-90 active:scale-95 transition"
      >
        <span className="text-sm">{t("textBlock.button.nextBtn")}</span>
        <span className="text-2xl leading-none h-[28px]">›</span>
      </button>
    </div>
  );
};
