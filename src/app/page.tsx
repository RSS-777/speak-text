"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { InstructionSection } from "@/components/InstructionSection";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { FetchMessage } from "@/components/FetchMessage";
import { FileUploadButton } from "@/components/FileUploadButton";

import { detectLanguage } from "@/utils/language";
import { speakText } from "@/utils/speak";
import { uploadText } from "@/utils/files/uploadText";
import { uploadPDF } from "@/utils/files/uploadPDF";
import { uploadDocx } from "@/utils/files/uploadDocx";

const paginateText = (text: string, chunkSize = 2000) => {
  const words = text.split(/\s+/);
  const pagesArr: string[][] = [];
  let temp: string[] = [];
  let currentLength = 0;

  for (const word of words) {
    if (currentLength + word.length + 1 > chunkSize) {
      pagesArr.push(temp);
      temp = [];
      currentLength = 0;
    }
    temp.push(word);
    currentLength += word.length + 1;
  }

  if (temp.length > 0) pagesArr.push(temp);
  return pagesArr;
};

export default function Home() {
  const [translation, setTranslation] = useState<string>("");
  const [fetchMessage, setFetchMessage] = useState<string>("");
  const [detectedLang, setDetectedLang] = useState<string>("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const [selectedText, setSelectedText] = useState<string>("");
  const [showButton, setShowButton] = useState(false);
  const [buttonPos, setButtonPos] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const [pages, setPages] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const resetTranslationAndSpeech = () => {
    setTranslation("");
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    resetTranslationAndSpeech();
    setLoading(true);
    const file = e.target.files[0];
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext) return;

    try {
      let text = "";

      switch (ext) {
        case "txt":
          text = await uploadText(file);
          break;
        case "pdf":
          text = await uploadPDF(file);
          break;
        case "docx":
          text = await uploadDocx(file);
          break;
        default:
          throw new Error("Непідтримуваний тип файлу");
      }
      const lang = detectLanguage(text);
      if (!["uk", "en", "pl"].includes(lang)) {
        setPages([]);
        setFetchMessage(`Мова файлу (${lang}) не підтримується.`);
        setTimeout(() => setFetchMessage(""), 4000);
        return;
      }
      setDetectedLang(lang);
      const chunkSize = isMobile ? 900 : 2000;
      const paginated = paginateText(text, chunkSize);
      setPages(paginated);
      setCurrentPage(0);
    } catch (error: any) {
      console.error("Помилка при завантаженні файлу:", error);
      setPages([]);
      setFetchMessage(error.message || "Помилка при обробці файлу");
      setTimeout(() => setFetchMessage(""), 3000);
    } finally {
      setLoading(false);
    }

    e.target.value = "";
  };

  const handleTranslateText = async (word: string) => {
    if (!word.trim()) return;

    setLoading(true);
    setFetchMessage("");
    try {
      const res = await fetch(
        `/api/translate?word=${word}&to=${i18n.language}&from=${detectedLang}`
      );
      const data = await res.json();

      if (!res.ok) {
        setFetchMessage(t("fetchMessage.translateError") || data.error);
        setTimeout(() => setFetchMessage(""), 5000);
        return;
      }

      setTranslation(data.translation);
    } finally {
      setLoading(false);
    }
  };

  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const anchorNode = selection.anchorNode;
      if (!anchorNode) {
        setShowButton(false);
        setSelectedText("");
        return;
      }

      const container = document.querySelector(".file-text");
      if (!container || !container.contains(anchorNode)) {
        setShowButton(false);
        setSelectedText("");
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setButtonPos({
        top: rect.top - containerRect.top - 40,
        left: rect.left - containerRect.left,
      });
      setShowButton(true);

      const text = selection
        .toString()
        .replace(/\u00A0/g, " ")
        .replace(/[\r\n]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      setSelectedText(text);
    } else {
      setShowButton(false);
      setSelectedText("");
    }
  };

  const isMobileDevice = () => {
    const checkMobile = () => {
      const ua = navigator.userAgent;
      const isTouchDevice = window.matchMedia(
        "(hover: none) and (pointer: coarse)"
      ).matches;
      return /android|iphone|ipad|ipod/i.test(ua) || isTouchDevice;
    };

    setIsMobile(checkMobile());
  };

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelection);
    isMobileDevice();

    return () => {
      document.removeEventListener("selectionchange", handleSelection);
    };
  }, []);

  return (
    <main className="flex flex-col items-center w-full flex-1 p-2">
      <InstructionSection />
      <section className="flex flex-col items-center gap-4">
        <FileUploadButton
          label="Завантажити текст"
          onChange={handleFileUpload}
        />

        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <div
            className="relative file-text flex flex-wrap min-w-[60%]] max-w-[900px] p-2 pb-1 border rounded-md 
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
                className="flex gap-1 select-none bg-indigo-500/90 text-white px-1 rounded shadow-lg hover:bg-indigo-500 transition"
              >
                <button
                  onClick={() => {
                    speakText(selectedText, detectedLang, setIsPlaying);

                    setShowButton(false);
                    window.getSelection()?.removeAllRanges();
                  }}
                  className="cursor-pointer"
                >
                  🔊
                </button>
                <button
                  onClick={() => {
                    handleTranslateText(selectedText);

                    setShowButton(false);
                    window.getSelection()?.removeAllRanges();
                  }}
                  className="cursor-pointer"
                >
                  🌐
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
                title="Зупинити озвучення"
              >
                <span className="block w-5 h-5 text-indigo-600 text-[18px] leading-none flex items-center justify-center">
                  🔇
                </span>
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

          {translation && !fetchMessage && (
            <div className="select-none min-w-[35%] p-2 border rounded-md relative">
              {loading ? (
                <LoadingIndicator text="Переклад завантажується..." />
              ) : (
                <>
                  <div style={{ color: "var(--subtitle)" }}>{translation}</div>
                  <button
                    onClick={() => resetTranslationAndSpeech()}
                    className="absolute top-1 right-1 active:scale-95 transition cursor-pointer"
                    title="Очистити переклад"
                  >
                    <span className="block w-5 h-5 text-indigo-500 text-[18px] leading-none flex items-center justify-center">
                      ✖
                    </span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        {fetchMessage && <FetchMessage text={fetchMessage} />}
      </section>
    </main>
  );
}
