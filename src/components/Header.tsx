"use client";
import { Navbar } from "./Navbar";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t, i18n } = useTranslation();
  return (
    <header>
      <Navbar />
      <h1 className="mx-auto mt-6 text-center max-w-lg text-2xl">
        {t("header.title")}
        <span
          className="block text-base pt-1 font-normal"
          style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", color: "var(--subtitle)"}}
        >
          {t("header.subtitle")}
        </span>
      </h1>
    </header>
  );
};
