import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center gap-5 text-sm">
      <Link className="hover:opacity-80" href="/">Home</Link>
      <Link className="hover:opacity-80" href="/cart">Cart</Link>
      <Link className="hover:opacity-80" href="/account">Account</Link>
    </nav>
  );
}