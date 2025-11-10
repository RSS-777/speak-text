import { memo } from "react";
import { Languages } from "lucide-react";
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
        className="select-none min-w-[35%] p-2 pt-0 border border-gray-200 dark:border-gray-700 rounded-md relative flex flex-col"
        style={height ? { height: `${height}px` } : undefined}
      >
        {loading ? (
          <div className="text-center">
            <LoadingIndicator text={t("translationBlock.loading")} />
          </div>
        ) : (
          <>
            <h2 className="flex items-center gap-2 mb-1 pb-1 pt-1 border-b border-gray-200 dark:border-gray-700 select-none">
              <Languages className="w-5 h-5 text-indigo-500" />{" "}
              {t("translationBlock.title")}
            </h2>
            <div
              style={{ color: "var(--subtitle)" }}
              className="md:overflow-y-auto md:h-full"
            >
              {translation}
            </div>
            <div className="absolute top-1 right-1 text-red-600 font-black active:scale-95 transition cursor-pointer">
              <ActionButton onClick={onClick}>⨉</ActionButton>
            </div>
          </>
        )}
      </div>
    );
  }
);
