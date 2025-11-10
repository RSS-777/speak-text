import type { Metadata } from "next";
import { generateLocalizedMetadata } from "@/i18n/seo";
import { Roboto, Merriweather } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { I18Provider } from "@/providers/I18Provider";
import "@/app/globals.css";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700", "900"],
  variable: "--font-roboto",
});

const merriweather = Merriweather({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-merriweather",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "uk" | "en" | "pl" }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return generateLocalizedMetadata(lang || "uk");
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang || "uk"}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="alternate"
          href="https://speak-text-alpha.vercel.app/uk"
          hrefLang="uk"
        />
        <link
          rel="alternate"
          href="https://speak-text-alpha.vercel.app/en"
          hrefLang="en"
        />
        <link
          rel="alternate"
          href="https://speak-text-alpha.vercel.app/pl"
          hrefLang="pl"
        />
      </head>
      <body
        className={`${roboto.variable} ${merriweather.variable} antialiased min-h-screen`}
        style={{
          backgroundColor: `var(--background)`,
          color: "var(--text-color)",
        }}
      >
        <ReduxProvider>
          <I18Provider lang={lang || "uk"}>
            <div className="flex flex-col min-h-screen max-w-[1440px] mx-auto">
              <Header />
              {children}
              <Footer />
            </div>
          </I18Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
