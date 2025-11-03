interface IFetchMessageProps {
  text: string;
};

export const FetchMessage = ({text}: IFetchMessageProps) => {
  return (
    <p className="text-rose-700 text-center select-none">{text}</p>
  );
};
