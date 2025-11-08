import { memo } from "react";
import { useTranslation } from "react-i18next";
import { LoadingIndicator } from "./LoadingIndicator";
import { ActionButton } from "./ActionButton";

interface ITranslationProps {
  loading: boolean;
  translation: string;
  height?: number;
  onClick: () => void;
}

export const TranslationBlock = memo(
  ({ loading, translation, height, onClick }: ITranslationProps) => {
    const { t } = useTranslation();

    return (
      <div
        style={height ? { height: `${height}px` } : undefined}
        className="select-none min-w-[35%] p-2 border rounded-md relative"
      >
        {loading ? (
          <LoadingIndicator text={t("translationBlock.loading")} />
        ) : (
          <>
            <div
              style={{ color: "var(--subtitle)" }}
              className="md:overflow-y-auto md:h-full"
            >
              {translation}
            </div>
            <div className="absolute top-2 right-2 text-red-600 font-black active:scale-95 transition cursor-pointer">
              <ActionButton onClick={onClick}>⨉</ActionButton>
            </div>
          </>
        )}
      </div>
    );
  }
);
