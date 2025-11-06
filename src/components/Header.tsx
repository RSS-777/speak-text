"use client";
import { Navbar } from "./Navbar";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="select-none">
      <Navbar />
      <h1 className="mx-auto mt-6 text-center max-w-lg">
        {t("header.title")}
        <span
          className="block text-base pt-1 font-normal"
          style={{
            fontFamily: "var(--font-accent)",
            fontStyle: "italic",
            color: "var(--subtitle)",
          }}
        >
          {t("header.subtitle")}
        </span>
      </h1>
    </header>
  );
};
