interface IActionButtonProps {
  onClick: () => void;
  children: string;
}

export const ActionButton = ({ children, onClick }: IActionButtonProps) => {
  return (
    <button onClick={onClick} className="cursor-pointer">
      <span className="text-[24px] leading-none">{children}</span>
    </button>
  );
};
