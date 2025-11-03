interface ILoadingIndicatorProps {
  text: string;
}

export const LoadingIndicator = ({text}: ILoadingIndicatorProps) => {
  return (
    <div className="flex items-center gap-3 text-lg font-semibold text-indigo-600 flex-1 w-full">
      <span className="animate-spin w-5 h-5 border-4 border-indigo-500 border-t-transparent rounded-full"></span>
      <span>{text}</span>
    </div>
  );
};
