"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { speakText } from "@/utils/speak";
import { detectLanguage } from "@/utils/language";
import mammoth from "mammoth";
import { InstructionSection } from "@/components/InstructionSection";

export default function Home() {
  const [fileText, setFileText] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [fetchMessage, setFetchMessage] = useState<string>("");
  const [detectedLang, setDetectedLang] = useState<string>("en");
  const { t, i18n } = useTranslation();

  const [selectedText, setSelectedText] = useState<string>("");
  const [showButton, setShowButton] = useState(false);
  const [buttonPos, setButtonPos] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

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
        setFileText("");
        setFetchMessage(`Мова файлу (${lang}) не підтримується.`);
        setTimeout(() => setFetchMessage(""), 4000);
        return;
      }

      setDetectedLang(lang);
      setFileText(text);
    } catch (error: any) {
      console.error("Помилка при завантаженні файлу:", error);
      setFileText("");
      setFetchMessage(error.message || "Помилка при обробці файлу");
      setTimeout(() => setFetchMessage(""), 3000);
    }

    e.target.value = "";
  };

  const uploadText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Не вдалося прочитати TXT файл"));
      reader.readAsText(file);
    });
  };

  const uploadPDF = async (file: File): Promise<string> => {
    const { pdfjs } = await import("react-pdf");
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(" ");
      text += pageText + "\n";
    }

    return text.trim();
  };

  const uploadDocx = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const { value }: { value: string } = await mammoth.extractRawText({
      arrayBuffer,
    });
    return value;
  };

  const handleTranslateText = async (word: string) => {
    if (!word.trim()) return;
    setFetchMessage("");
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
  };

  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      let selectedText = selection.toString().trim();

      selectedText = selectedText
        .replace(/\u00A0/g, " ")
        .replace(/[\r\n]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      speakText(selectedText, detectedLang);
      handleTranslateText(selectedText);
    }
  };

  const updateSelectedTextMobile = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setButtonPos({
        top: rect.top + window.scrollY - 40,
        left: rect.left + window.scrollX,
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
    const preventContextMenu = (e: Event) => e.preventDefault();
    document.addEventListener("contextmenu", preventContextMenu);

    document.addEventListener("selectionchange", updateSelectedTextMobile);
    isMobileDevice();

    return () => {
      document.removeEventListener("selectionchange", updateSelectedTextMobile);
      document.removeEventListener("contextmenu", preventContextMenu);
    };
  }, []);

  return (
    <main className="flex flex-col items-center w-full flex-1 p-2">
      <InstructionSection />
      <section className="flex flex-col items-center gap-4">
        <label
          className="cursor-pointer select-none bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 px-6 mt-4 rounded-xl shadow-lg active:scale-95 transition-all"
        >
          Завантажити текст
          <input
            type="file"
            accept=".txt,.doc,.docx,.pdf"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <div
            className="file-text flex flex-wrap min-w-[60%]] p-2 border rounded-md 
             [user-select:text] 
             [-webkit-user-select:text] 
             [-ms-user-select:text] 
             [-webkit-touch-callout:none]"
            onMouseUp={handleSelection}
          >
            {showButton && isMobile && (
              <button
                style={{
                  position: "absolute",
                  top: buttonPos.top,
                  left: buttonPos.left,
                  zIndex: 9999,
                }}
                className="select-none cursor-pointer bg-indigo-500 text-white px-3 py-1 rounded shadow-lg hover:opacity-90 transition"
                onClick={() => {
                  if (selectedText) {
                    speakText(selectedText, detectedLang);
                    handleTranslateText(selectedText);
                  }
                  setShowButton(false);
                  window.getSelection()?.removeAllRanges();
                }}
              >
                🔊 Перекласти і озвучити
              </button>
            )}

            {fileText.length ? (
              fileText.split(/\s+/).map((word, idx) => (
                <span
                  key={idx}
                  onClick={() => {
                    speakText(word, detectedLang);
                    handleTranslateText(word);
                  }}
                  className="cursor-pointer hover:bg-violet-100 hover:underline hover:text-blue-700 transition-all rounded pr-1"
                >
                  {word}
                </span>
              ))
            ) : (
              <span
                className=" italic select-none"
                style={{ color: "var(--subtitle)" }}
              >
                "Виберіть файл з розширенням .txt, .pdf, .docx, щоб переглянути
                його вміст тут."
              </span>
            )}
          </div>
          {translation && !fetchMessage && (
            <div className="select-none min-w-[35%] p-2 border rounded-md relative">
              <div style={{ color: "var(--subtitle)" }}>{translation}</div>
              <button
                onClick={() => setTranslation("")}
                className="absolute top-1 right-1 text-sm text-gray-500 hover:text-gray-800 transition cursor-pointer"
                title="Очистити переклад"
              >
                ✖
              </button>
            </div>
          )}
        </div>
        {fetchMessage && (
          <p className="text-rose-700 text-center select-none">
            {fetchMessage}
          </p>
        )}
      </section>
    </main>
  );
}
