import { memo, useState, useEffect, forwardRef } from "react";
import { FileText } from "lucide-react";
import { speakText } from "@/utils/speak";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ActionButton } from "./ActionButton";
import { useTranslation } from "react-i18next";
import { PaginationButtons } from "@/components/PaginationButtons";

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
  forwardRef<HTMLDivElement, TextBlockProps>(
    (
      {
        pages,
        currentPage,
        setCurrentPage,
        detectedLang,
        isPlaying,
        setIsPlaying,
        handleTranslateText,
        loading,
        fetchMessage,
      },
      ref
    ) => {
      const [selectedText, setSelectedText] = useState("");
      const [showButton, setShowButton] = useState(false);
      const [buttonPos, setButtonPos] = useState({ top: 0, left: 0 });
      const { t } = useTranslation();

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
        <div
          ref={ref}
          className="relative min-w-[320px] max-w-[900px] p-2 pt-0 pb-1 border border-gray-200 dark:border-gray-700 rounded-md self-start"
        >
          {pages.length > 0 && (
            <h2 className="flex items-center gap-2 mb-1 pb-1 pt-1 border-b border-gray-200 dark:border-gray-700 select-none">
              <FileText className="w-5 h-5 text-indigo-500" />{" "}
              {t("textBlock.title")}
            </h2>
          )}
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
                className="flex gap-2 select-none bg-indigo-500/90 px-2 py-1 rounded shadow-[2px_2px_12px_-2px_rgba(128,128,128,0.7)] transition"
              >
                <ActionButton
                  onClick={() => {
                    speakText(selectedText, detectedLang, setIsPlaying);
                  }}
                >
                  🔊
                </ActionButton>
                <ActionButton
                  onClick={() => {
                    handleTranslateText(selectedText);
                  }}
                >
                  🌐
                </ActionButton>
              </div>
            )}
            {pages.length > 0 ? (
              pages[currentPage].map((word, idx) => (
                <span
                  key={idx}
                  className="word-highlight cursor-pointer transition-all rounded mr-1"
                  data-word={word}
                >
                  {word}
                </span>
              ))
            ) : loading && !fetchMessage ? (
              <div className="text-center w-full">
                <LoadingIndicator text={t("textBlock.loading")} />
              </div>
            ) : (
              <span
                className="italic select-none"
                style={{ color: "var(--subtitle)" }}
              >
                {t("textBlock.noText")}
              </span>
            )}
          </div>
          {isPlaying && (
            <div
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
              className="absolute top-1 right-1 active:scale-95 transition cursor-pointer"
            >
              <ActionButton
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setIsPlaying(false);
                }}
              >
                🔇
              </ActionButton>
            </div>
          )}
          {pages.length > 1 && (
            <PaginationButtons
              pages={pages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      );
    }
  )
);
