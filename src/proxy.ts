import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LANGS = ["uk", "en", "pl"];
const DEFAULT_LANG = "uk";

const proxy = (req: NextRequest) => {
  const url = req.nextUrl.clone();
  const pathLang = url.pathname.split("/")[1];

  if (SUPPORTED_LANGS.includes(pathLang)) {
    return NextResponse.next();
  }

  const browserLang =
    req.headers.get("accept-language")?.slice(0, 2) || DEFAULT_LANG;
  const lang = SUPPORTED_LANGS.includes(browserLang)
    ? browserLang
    : DEFAULT_LANG;

  url.pathname = `/${lang}${url.pathname}`;
  return NextResponse.redirect(url);
};

export default proxy;

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png).*)",
  ],
};
