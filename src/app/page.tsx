"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { InstructionSection } from "@/components/InstructionSection";
import { FetchMessage } from "@/components/FetchMessage";
import { FileUploadButton } from "@/components/FileUploadButton";
import { TranslationBlock } from "@/components/TranslationBlock";
import { TextBlock } from "@/components/TextBlock";
import { detectLanguage } from "@/utils/language";
import { uploadText } from "@/utils/files/uploadText";
import { uploadPDF } from "@/utils/files/uploadPDF";
import { uploadDocx } from "@/utils/files/uploadDocx";
import { paginateText } from "@/utils/paginateText";

export const Home = () => {
  const [translation, setTranslation] = useState<string>("");
  const [fetchMessage, setFetchMessage] = useState<string>("");
  const [detectedLang, setDetectedLang] = useState<string>("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingTranslate, setLoadingTranslate] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const { t, i18n } = useTranslation();

  const [pages, setPages] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const resetTranslationAndSpeech = () => {
    setTranslation("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    resetTranslationAndSpeech();
    setLoadingFile(true);
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
          throw new Error(t("fetchMessage.unsupportedFile"));
      }

      const lang = detectLanguage(text);
      if (!["uk", "en", "pl"].includes(lang)) {
        setPages([]);
        setFetchMessage(t("fetchMessage.unsupportedLang", { lang }));
        setTimeout(() => setFetchMessage(""), 4000);
        return;
      }

      setDetectedLang(lang);
      const chunkSize = isMobile ? 900 : 2000;
      const paginated = paginateText({ text, chunkSize });
      setPages(paginated);
      setCurrentPage(0);
    } catch (error: any) {
      console.error(t("fetchMessage.fileLoadError"), error);
      setPages([]);
      setFetchMessage(error.message || t("fetchMessage.fileProcessError"));
      setTimeout(() => setFetchMessage(""), 3000);
    } finally {
      setLoadingFile(false);
    }

    e.target.value = "";
  };

  const handleTranslateText = async (word: string) => {
    if (!word.trim()) return;

    setLoadingTranslate(true);
    setFetchMessage("");
    try {
      const res = await fetch(
        `/api/translate?word=${encodeURIComponent(word)}&to=${
          i18n.language
        }&from=${detectedLang}`
      );
      const data = await res.json();

      if (!res.ok) {
        setFetchMessage(t("fetchMessage.translateError") || data.error);
        setTimeout(() => setFetchMessage(""), 5000);
        return;
      }

      setTranslation(data.translation);
    } finally {
      setLoadingTranslate(false);
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
    isMobileDevice();
  }, []);

  return (
    <main className="flex flex-col items-center w-full flex-1 p-2">
      <InstructionSection />
      <section className="flex flex-col items-center gap-4">
        <FileUploadButton
          label={t("home.uploadButton")}
          onChange={handleFileUpload}
        />

        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <TextBlock
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            detectedLang={detectedLang}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleTranslateText={handleTranslateText}
            loading={loadingFile}
            fetchMessage={fetchMessage}
          />

          {translation && !fetchMessage && (
            <TranslationBlock
              loading={loadingTranslate}
              translation={translation}
              onClick={() => resetTranslationAndSpeech()}
            />
          )}
        </div>

        {fetchMessage && <FetchMessage text={fetchMessage} />}
      </section>
    </main>
  );
};

export default Home;
