"use client";
import i18n from "@/i18n/i18n";

export const I18Provider = ({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) => {
  i18n.changeLanguage(lang);

  return <>{children}</>;
};
