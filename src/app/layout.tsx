import type { Metadata } from "next";
import { Roboto, Merriweather } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const merriweather = Merriweather({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
});


export const metadata: Metadata = {
  title: "Читач текстів та перекладач з озвученням",
  description: "Завантажуйте тексти, перекладайте їх на різні мови та слухайте правильну вимову слів онлайн.",
  keywords: ["текст онлайн", "переклад тексту", "озвучення слів", "читання книг", "мовні інструменти"],
  authors: [{ name: "Riadysh Serhii", url: "https://github.com/RSS-777" }],
  openGraph: {
    title: "Читач текстів та перекладач з озвученням",
    description: "Завантажуйте тексти, перекладайте їх та слухайте вимову слів онлайн.",
    url: "https://github.com/RSS-777",
    siteName: "Speak-Text",
    images: [
      {
        url: "/images/book.webp",
        width: 600,
        height: 600,
        alt: "TextReader & Translator",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Читач текстів та перекладач з озвученням",
    description: "Завантажуйте тексти, перекладайте їх та слухайте вимову слів онлайн.",
    images: ["/images/book.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${roboto.variable} ${merriweather.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
