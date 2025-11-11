import type { Metadata } from "next";
import { headers } from "next/headers";
import { I18Provider } from "@/providers/I18Provider";
import { GradientLinkButton } from "@/components/GradientLinkButton";
import "@/app/globals.css";

import en from "@/locales/en.json";
import uk from "@/locales/uk.json";
import pl from "@/locales/pl.json";

const translations = { en, uk, pl };

type TypeLang = "en" | "uk" | "pl";
type TypeGlobaNotFound = {
  metadata: {
    title: string;
    description: string;
  };
  title: string;
  subtitle: string;
  text: string;
  button: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const acceptLang = (await headersList).get("accept-language") || "";
  const rawLang = acceptLang.split(",")[0].split("-")[0];
  const lang: TypeLang = ["en", "uk", "pl"].includes(rawLang)
    ? (rawLang as TypeLang)
    : "uk";
  const localeData = translations[lang];
  const t: TypeGlobaNotFound = localeData.globalNotFound;

  return {
    title: t.metadata.title,
    description: t.metadata.description,
  };
}

export default async function GlobalNotFound() {
  const headersList = headers();
  const acceptLang = (await headersList).get("accept-language") || "";
  const rawLang = acceptLang.split(",")[0].split("-")[0];
  const lang: TypeLang = ["en", "uk", "pl"].includes(rawLang)
    ? (rawLang as TypeLang)
    : "uk";
  const localeData = translations[lang];
  const t: TypeGlobaNotFound = localeData.globalNotFound;

  return (
    <I18Provider lang={lang}>
      <html lang={lang}>
        <body className="bg-[#f5f3ff] min-h-screen flex flex-col">
          <main className="flex-grow flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl text-center max-w-lg w-full p-10 mx-4 border border-gray-200">
              <h1 className="text-6xl font-extrabold text-[#4B0082] mb-4">
                {t.title}
              </h1>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                {t.subtitle}
              </p>
              <p className="text-gray-500 mb-8">{t.text}</p>
              <GradientLinkButton href={`/${lang}`} label={t.button} />
            </div>
          </main>
        </body>
      </html>
    </I18Provider>
  );
}
