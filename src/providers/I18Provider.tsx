"use client";
import "@/i18n/i18n";

export const I18Provider = ({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) => {
  import("@/i18n/i18n").then(({ default: i18n }) => {
    i18n.changeLanguage(lang);
  });

  return <>{children}</>;
};
