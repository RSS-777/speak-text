import { CardInstruction } from "./CardInstruction";
import { useTranslation } from "react-i18next";
import imgClick from "../assets/images/click.png";
import imgHighlight from "../assets/images/highlight.png";
import imgLanguage from "../assets/images/language.png";

export const InstructionSection = () => {
  const { t } = useTranslation();

  return (
    <section className="flex justify-around gap-2 w-full max-w-[650px] p-2 mb-4  space-y-1">
      <CardInstruction
        src={imgClick}
        alt={t("instruction.clickAlt")}
        text={t("instruction.clickText")}
      />
      <CardInstruction
        src={imgHighlight}
        alt={t("instruction.highlightAlt")}
        text={t("instruction.highlightText")}
      />

      <CardInstruction
        src={imgLanguage}
        alt={t("instruction.languageAlt")}
        text={t("instruction.languageText")}
      />
    </section>
  );
};
