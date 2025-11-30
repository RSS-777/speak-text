import { SUPPORTED_LANGUAGES } from "@/config/supportedLanguages";

interface ILanguageProps {
  value: string;
  onChange: (value: string) => void;
}

export const LanguageSelect = ({ value, onChange }: ILanguageProps) => {
  return (
    <select
      name="lang"
      id="lang"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="cursor-pointer bg-violet-900 text-center outline-none text-lg"
    >
      {SUPPORTED_LANGUAGES.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};
