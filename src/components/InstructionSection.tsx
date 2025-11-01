import imgClick from "../assets/images/click.webp";
import imgHighlight from "../assets/images/highlight.webp";
import imgLanguage from "../assets/images/language.webp";
import { CardInstruction } from "./CardInstruction";

export const InstructionSection = () => {
  return (
    <section className="flex justify-around gap-2 w-full max-w-[650px] p-2 mb-4  space-y-1">
      <CardInstruction
        src={imgClick}
        alt="Клік на слові"
        text="Клік на слово для перекладу та озвучення"
      />
      <CardInstruction
        src={imgHighlight}
        alt="Виділення тексту"
        text="Виділіть речення для перекладу та озвучення"
      />

      <CardInstruction
        src={imgLanguage}
        alt="Вибір мови перекладу"
        text="Оберіть мову для перекладу та озвучення"
      />
    </section>
  );
};
