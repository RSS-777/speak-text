import { memo, useState, useEffect } from "react";
import { speakText } from "@/utils/speak";
import { LoadingIndicator } from "@/components/LoadingIndicator";

interface TextBlockProps {
  pages: string[][];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  detectedLang: string;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  handleTranslateText: (word: string) => void;
  loading: boolean;
  fetchMessage: string;
}

export const TextBlock = memo(
  ({
    pages,
    currentPage,
    setCurrentPage,
    detectedLang,
    isPlaying,
    setIsPlaying,
    handleTranslateText,
    loading,
    fetchMessage,
  }: TextBlockProps) => {
    const [selectedText, setSelectedText] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [buttonPos, setButtonPos] = useState({ top: 0, left: 0 });

    const handleSelection = () => {
      const selection = window.getSelection();

      if (!selection) {
        setShowButton(false);
        setSelectedText("");
        return;
      }

      const anchorNode = selection.anchorNode;
      const container = document.querySelector(".file-text");

      if (!container || !anchorNode || !container.contains(anchorNode)) {
        setShowButton(false);
        setSelectedText("");
        return;
      }

      const range = selection.getRangeAt(0);
      const rects = range.getClientRects();

      if (!rects || rects.length === 0) {
        setShowButton(false);
        setSelectedText("");
        return;
      }

      const firstRect = rects[0];
      const containerRect = container.getBoundingClientRect();

      let top = firstRect.top - containerRect.top - 40;
      let left = firstRect.left - containerRect.left;

      const maxLeft = containerRect.width - 60;
      if (left < 0) left = 0;
      if (left > maxLeft) left = maxLeft;

      const text = selection
        .toString()
        .replace(/\u00A0/g, " ")
        .replace(/[\r\n]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      setButtonPos({ top, left });
      setShowButton(true);
      setSelectedText(text);
    };

    useEffect(() => {
      document.addEventListener("selectionchange", handleSelection);
      return () =>
        document.removeEventListener("selectionchange", handleSelection);
    }, []);

    useEffect(() => {
      window.getSelection()?.removeAllRanges();
      setSelectedText("");
      setShowButton(false);
    }, [currentPage]);

    return (
      <div className="min-w-[60%] max-w-[900px] p-2 pb-1 border rounded-md">
        <div
          className="relative file-text flex flex-wrap
                      [user-select:text] 
                      [-webkit-user-select:text] 
                      [-ms-user-select:text] 
                      [-webkit-touch-callout:none]"
          onClick={(e) => {
            const target = (e.target as HTMLElement).closest(
              "[data-word]"
            ) as HTMLElement | null;
            const word = target?.dataset.word;
            if (!word) return;

            speakText(word, detectedLang, setIsPlaying);
            handleTranslateText(word);
          }}
          onContextMenu={(e) => e.preventDefault()}
        >
          {showButton && selectedText && (
            <div
              style={{
                position: "absolute",
                top: buttonPos.top,
                left: buttonPos.left,
                zIndex: 9999,
              }}
              className="flex gap-2 select-none bg-indigo-500/90 px-2 py-1 rounded shadow-lg transition"
            >
              <button
                onClick={() => {
                  speakText(selectedText, detectedLang, setIsPlaying);
                  setShowButton(false);
                  window.getSelection()?.removeAllRanges();
                }}
                className="cursor-pointer"
              >
                <span className=" text-[24px] leading-none">🔊</span>
              </button>
              <button
                onClick={() => {
                  handleTranslateText(selectedText);
                  setShowButton(false);
                  window.getSelection()?.removeAllRanges();
                }}
                className="cursor-pointer"
              >
                <span className="text-[24px] leading-none">🌐</span>
              </button>
            </div>
          )}

          {isPlaying && (
            <button
              onClick={() => {
                window.speechSynthesis.cancel();
                setIsPlaying(false);
              }}
              className="absolute top-1 right-1 active:scale-95 transition cursor-pointer"
            >
              <span className=" text-[24px] leading-none">🔇</span>
            </button>
          )}

          {pages.length > 0 ? (
            pages[currentPage].map((word, idx) => (
              <span
                key={idx}
                className="cursor-pointer hover:bg-violet-100 hover:underline hover:text-blue-700 transition-all rounded mr-1"
                data-word={word}
              >
                {word}
              </span>
            ))
          ) : loading && !fetchMessage ? (
            <LoadingIndicator text="Завантаження файлу..." />
          ) : (
            <span
              className="italic select-none"
              style={{ color: "var(--subtitle)" }}
            >
              Виберіть файл з розширенням .txt, .pdf, .docx, щоб переглянути
              його вміст тут.
            </span>
          )}
        </div>

        {pages.length > 1 && (
          <div className="flex justify-center items-center w-full gap-2 select-none mt-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="select-none w-32 cursor-pointer bg-indigo-500 text-white px-2 rounded shadow-lg hover:opacity-90 active:scale-95 transition"
            >
              ⬅ Попередня
            </button>
            <span className="select-none">
              {currentPage + 1} / {pages.length}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(pages.length - 1, p + 1))
              }
              disabled={currentPage === pages.length - 1}
              className="select-none w-32 cursor-pointer bg-indigo-500 text-white px-2 rounded shadow-lg hover:opacity-90 active:scale-95 transition"
            >
              Наступна ➡
            </button>
          </div>
        )}
      </div>
    );
  }
);
