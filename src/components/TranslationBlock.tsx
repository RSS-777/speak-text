import { memo } from "react";
import { useTranslation } from "react-i18next";
import { LoadingIndicator } from "./LoadingIndicator";
import { ActionButton } from "./ActionButton";

interface ITranslationProps {
  loading: boolean;
  translation: string;
  onClick: () => void;
}

export const TranslationBlock = memo(
  ({ loading, translation, onClick }: ITranslationProps) => {
    const { t } = useTranslation();
    return (
      <div className="select-none min-w-[35%] p-2 border rounded-md relative">
        {loading ? (
          <LoadingIndicator text={t("translationBlock.loading")} />
        ) : (
          <>
            <div style={{ color: "var(--subtitle)" }}>{translation}</div>
            <div className="absolute top-2 right-2 text-red-600 font-black active:scale-95 transition cursor-pointer">
              <ActionButton onClick={onClick}>⨉</ActionButton>
            </div>
          </>
        )}
      </div>
    );
  }
);
