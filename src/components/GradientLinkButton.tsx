import Link from "next/link";

interface IGradientLinkButtonProps {
  href: string;
  label: string
}

export const GradientLinkButton = ({
  href,
  label,
}: IGradientLinkButtonProps) => {
  return (
    <Link
      href={href}
      className="inline-block select-none cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500  py-3 px-6 mt-4 rounded-xl shadow-[2px_2px_12px_-2px_rgba(128,128,128,0.7)] hover:opacity-90 active:scale-95 transition-all"
      style={{ textDecoration: "none" }}
    >
      <span className="text-white font-semibold">{label}</span>
    </Link>
  );
};
