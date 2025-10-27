import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4">
      <Link href="/">Головна</Link>
      <Link href="/login">Логін</Link>
    </nav>
  );
}
