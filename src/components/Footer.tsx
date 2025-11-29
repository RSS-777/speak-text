"use client";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-violet-950 to-violet-900 text-white mt-0 p-6 select-none">
      <div className="flex flex-col min-[400px]:flex-row">
        <div className="w-full md:col-span-2 flex items-start">
          <div className="w-[120px] h-[120px] flex items-center justify-center max-[400px]:m-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-full h-full text-white"
              aria-hidden="true"
            >
              <title>Book with sound waves</title>
              <g fill="none" stroke="currentColor" strokeWidth="1.6">
                <path
                  d="M6 12c8-4 18-4 26 0 8-4 18-4 26 0v36c-8-4-18-4-26 0-8-4-18-4-26 0V12z"
                  fill="rgba(255,255,255,0.03)"
                />
                <path d="M10 14c6-3 14-3 20 0v34c-6-3-14-3-20 0V14z" />
                <path d="M54 14c-6-3-14-3-20 0v34c6-3 14-3 20 0V14z" />
                <g className="opacity-90">
                  <path
                    className="animate-pulse"
                    d="M44 22c2 1.5 3.5 4.5 3.5 8s-1.5 6.5-3.5 8"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <path
                    className="animate-pulse delay-150"
                    d="M48 20c3 2 5 6 5 10s-2 8-5 10"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-end gap-4">
          <div>
            <h4 className="text-lg font-semibold mb-2 text-white">
              {t("footer.projects")}
            </h4>
            <div className="text-sm text-white">
              <Link
                href="https://github.com/RSS-777"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-violet-200 transition-colors"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.93 3.19 9.11 7.61 10.58.56.1.76-.24.76-.53 0-.26-.01-.96-.01-1.88-3.09.67-3.75-1.49-3.75-1.49-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.67.08-.67 1.09.08 1.66 1.12 1.66 1.12.97 1.66 2.55 1.18 3.17.9.1-.7.38-1.18.69-1.45-2.47-.28-5.07-1.24-5.07-5.52 0-1.22.44-2.22 1.16-3.01-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.12 1.15.9-.25 1.86-.37 2.82-.37.96 0 1.92.12 2.82.37 2.17-1.45 3.12-1.15 3.12-1.15.61 1.54.23 2.68.11 2.96.72.79 1.16 1.79 1.16 3.01 0 4.29-2.61 5.24-5.09 5.52.39.34.74 1.01.74 2.04 0 1.48-.01 2.67-.01 3.04 0 .29.2.64.77.53 4.42-1.47 7.61-5.65 7.61-10.58C23.25 5.48 18.27.5 12 .5z" />
                </svg>
                <span className="text-sm">{t("footer.github")}</span>
              </Link>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 text-white">
              {t("footer.contact")}
            </h4>
            <div className="text-sm">
              <a
                href={`mailto:${t("footer.email")}`}
                className="inline-flex items-center gap-2 text-white hover:text-violet-200 transition-colors"
                aria-label="Email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeWidth="1.5"
                    d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13a2.5 2.5 0 0 0 2.5-2.5v-7"
                  />
                  <path strokeWidth="1.5" d="M21 8.5l-9 6-9-6" />
                </svg>
                <span className="text-sm">{t("footer.email")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-violet-700 pt-6">
        <div className="text-center text-sm text-white">
          {t("footer.copyright", { year: currentYear })}
        </div>
      </div>
    </footer>
  );
};
