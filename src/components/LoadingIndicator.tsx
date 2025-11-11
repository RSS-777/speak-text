interface ILoadingIndicatorProps {
  text: string;
}

export const LoadingIndicator = ({text}: ILoadingIndicatorProps) => {
  return (
    <div className="inline-flex items-center gap-2 text-base font-semibold text-indigo-600 p-2">
      <span className="animate-spin w-5 h-5 border-4 border-indigo-500 border-t-transparent rounded-full"></span>
      <span>{text}</span>
    </div>
  );
};
