import { NextResponse } from "next/server";
import translate from "translate";
import logger from "@/lib/logger";

translate.engine = "google";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get("word") || "";
  const to = searchParams.get("to") || "en";
  const from = searchParams.get("from") || "uk";

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
