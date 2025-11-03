import { franc } from "franc";

const LANGUAGE_MAP: Record<string, string> = {
  ukr: "uk",
  pol: "pl",
  eng: "en",
};

export const detectLanguage = (text: string): string => {
  if (!text || text.trim().length === 0) return "en";
  const sample = text.split(/\s+/).slice(0, 15).join(" ");
  const code3 = franc(sample);
  return LANGUAGE_MAP[code3] || code3;
};
