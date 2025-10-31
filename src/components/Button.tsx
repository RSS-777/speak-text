interface IButtonProps {
  onClick: () => void;
  type?: "button" | "submit";
  children: string;
  variant: "settings" | "main";
  disabled?: boolean;
}

export const Button = ({
  onClick,
  type = "button",
  children,
  variant = "main",
  disabled = false,
}: IButtonProps) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors";

  const variantClasses = variant === "main"
    ? "bg-violet-600 text-white hover:bg-violet-700"
    : "bg-teal-600 text-white hover:bg-teal-700";

  const disabledClasses = disabled ? "bg-gray-400 text-gray-200 cursor-not-allowed hover:bg-gray-400" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : variantClasses}`}
    >
      {children}
    </button>
  );
};
