import { NextResponse } from "next/server";
import translate from "translate";
import logger from "@/lib/logger";
import { SUPPORTED_LANGUAGES } from "@/config/supportedLanguages";

translate.engine = "google";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get("word") || "";
  const to = searchParams.get("to") || "en";
  const from = searchParams.get("from") || "uk";

  if (!SUPPORTED_LANGUAGES.includes(from) || !SUPPORTED_LANGUAGES.includes(to)) {
    return NextResponse.json(
      { error: `Unsupported language: from='${from}', to='${to}'` },
      { status: 400 }
    );
  }

  try {
    const translated = await translate(word, { from, to });

    return NextResponse.json({ translation: translated }, { status: 200 });
  } catch (err) {
    logger.error("Translation error for word '%s': %o", word, err);
    return NextResponse.json(
      { error: "Server error: translation failed" },
      { status: 500 }
    );
  }
}
