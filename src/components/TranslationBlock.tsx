import { memo } from "react";
import { LoadingIndicator } from "./LoadingIndicator";

interface ITranslationProps {
  loading: boolean;
  translation: string;
  onClick: () => void;
}

export const TranslationBlock = memo(
  ({ loading, translation, onClick }: ITranslationProps) => {
    return (
      <div className="select-none min-w-[35%] p-2 border rounded-md relative">
        {loading ? (
          <LoadingIndicator text="Переклад завантажується..." />
        ) : (
          <>
            <div style={{ color: "var(--subtitle)" }}>{translation}</div>
            <button
              onClick={onClick}
              className="absolute top-1 right-1 active:scale-95 transition cursor-pointer"
              title="Очистити переклад"
            >
              <span className="text-[24px] leading-none text-indigo-500">
                ✖
              </span>
            </button>
          </>
        )}
      </div>
    );
  }
);
