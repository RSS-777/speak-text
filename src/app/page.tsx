"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { speakText } from "@/utils/speak";
import { detectLanguage } from "@/utils/language";
import mammoth from "mammoth";

export default function Home() {
  const [fileText, setFileText] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [fetchMessage, setFetchMessage] = useState<string>("");
  const [detectedLang, setDetectedLang] = useState<string>("en");
  const { t, i18n } = useTranslation();

  /////////////////////////////////////////////////////////////////////
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

// текстовий файл
const uploadText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Не вдалося прочитати TXT файл"));
    reader.readAsText(file);
  });
};

// PDF файл
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

// DOCX файл
const uploadDocx = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const { value }: { value: string } = await mammoth.extractRawText({ arrayBuffer });
  return value;
};
//////////////////////////////////////////////////////////////


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

  return (
    <main className="flex flex-col items-center gap-4 w-full flex-1 p-2">
      <label className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 px-6 mt-4 rounded-xl shadow-lg hover:opacity-90 transition">
        Завантажити текст
        <input
          type="file"
          accept=".txt,.doc,.docx,.pdf"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
      <div
        className="w-full p-2 border rounded-md flex flex-wrap"
        onMouseUp={handleSelection}
        // onTouchEnd={handleSelection}
      >
       <button className="cursor-pointer" onClick={handleSelection}>🔊</button>
        {fileText.length ? (
          fileText.split(/\s+/).map((word, idx) => (
            <span
              key={idx}
              onClick={() => {
                speakText(word, detectedLang);
                handleTranslateText(word);
              }}
              className="cursor-pointer hover:bg-violet-100 hover:underline hover:text-blue-700 transition-all rounded px-1"
            >
              {word}
            </span>
          ))
        ) : (
          <span className="text-gray-400 italic">
            "Виберіть файл з розширенням .txt, .pdf, .docx, щоб переглянути
            його вміст тут"
          </span>
        )}
      </div>
      {translation && !fetchMessage && <div>{translation}</div>}
      {fetchMessage && <p className="text-rose-700">{fetchMessage}</p>}
    </main>
  );
}
