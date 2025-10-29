"use client";
import { Navbar } from "./Navbar";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="p-4">
      <Navbar />
      <h1 className="mx-auto mt-6 text-center sm:mx-0 sm:text-left max-w-lg text-2xl">
        {t("header.title")}
        <span
          className="block text-base"
          style={{ fontFamily: "var(--font-accent)", fontStyle: "italic" }}
        >
          {t("header.subtitle")}
        </span>
      </h1>
    </header>
  );
};
