import type { Metadata } from "next";
import en from "@/locales/en.json";
import uk from "@/locales/uk.json";
import pl from "@/locales/pl.json";

const resources = { en, uk, pl };
type TypeLang = "en" | "uk" | "pl";
type TypeMetadata = {
  title: string;
  description: string;
  keywords: string[];
  openGraph: { title: string; description: string };
  twitter: { title: string; description: string };
};

export function generateLocalizedMetadata(lang: TypeLang): Metadata {
  const localeData = resources[lang] || uk;
  const seo: TypeMetadata = localeData.metadata;

  return {
    metadataBase: new URL("https://speak-text-alpha.vercel.app/"),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: "Riadysh Serhii", url: "https://github.com/RSS-777" }],
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      url: "https://speak-text-alpha.vercel.app/",
      siteName: "Speak-Text",
      images: [
        {
          url: "/images/book.webp",
          width: 600,
          height: 600,
          alt: "TextReader & Translator",
        },
      ],
      locale: lang === "uk" ? "uk_UA" : lang === "en" ? "en_US" : "pl_PL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitter.title,
      description: seo.twitter.description,
      images: ["/images/book.webp"],
    },
  };
}
