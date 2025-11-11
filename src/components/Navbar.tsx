"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "@/store/theme/themeSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useTranslation } from "react-i18next";
import { ActionButton } from "./ActionButton";
import { LanguageSelect } from "./LanguageSelect";

export const Navbar = () => {
  const theme: string = useSelector((state: RootState) => state.theme.value);
  const dispatch: AppDispatch = useDispatch();
  const { i18n } = useTranslation();

  const handlerTheme = () => {
    dispatch(changeTheme());
  };

  const handleLang = (value: string) => {
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <nav className="flex justify-between bg-gradient-to-r from-violet-950 to-violet-900 px-2 py-2 text-white">
      <span>SPEAK-TEXT</span>
      <div className="flex gap-2 items-center">
        <ActionButton onClick={handlerTheme} className="!text-lg h-full flex">
          {theme === "light" ? "☾" : "☀︎"}
        </ActionButton>
        <LanguageSelect value={i18n.language} onChange={handleLang} />
      </div>
    </nav>
  );
};
