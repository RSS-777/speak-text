import { franc } from "franc";

const LANGUAGE_MAP: Record<string, string> = {
  ukr: "uk",
  pol: "pl",
  eng: "en",
};

export const detectLanguage = (text: string): string => {
  if (!text || text.trim().length < 30) return "en";

  const sample = text.slice(0, 200);
  const code3 = franc(sample, { minLength: 20 });

  return LANGUAGE_MAP[code3] || "en";
};
