interface IActionButtonProps {
  onClick: () => void;
  children: string;
  className?: string;
}

export const ActionButton = ({
  children,
  onClick,
  className,
}: IActionButtonProps) => {
  return (
    <button onClick={onClick} className="cursor-pointer">
      <span className={`text-[24px] leading-none ${className || ""}`}>
        {children}
      </span>
    </button>
  );
};
