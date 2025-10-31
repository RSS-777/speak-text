"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "@/store/theme/themeSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const theme: string = useSelector((state: RootState) => state.theme.value);
  const dispatch: AppDispatch = useDispatch();
  const { t, i18n } = useTranslation();

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
    <nav className="flex justify-between">
      <span>SPEAK-TEXT</span>
      <div className="flex gap-2 items-center">
        <button onClick={handlerTheme} className="pointer">
          {theme === "light" ? "☾" : "☀︎"}
        </button>
        <select
          name="lang"
          id="lang"
          onChange={(e) => handleLang(e.target.value)}
          value={i18n.language}
        >
          <option value="uk">ua</option>
          <option value="pl">pl</option>
          <option value="en">en</option>
        </select>
        <button>Login</button>
      </div>
    </nav>
  );
};
