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
      <option value="uk">uk</option>
      <option value="pl">pl</option>
      <option value="en">en</option>
    </select>
  );
};
