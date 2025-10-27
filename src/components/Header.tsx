import Navbar from "./Navbar";

type TypeHeaderProps = {
  title?: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: TypeHeaderProps) => {
  return (
    <header className="p-4">
      <Navbar />
      <h1 className="text-xl font-bold">{title}<br /><span>{subtitle}</span></h1>
    </header>
  )
};