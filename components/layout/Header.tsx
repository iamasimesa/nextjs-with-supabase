import Link from "next/link";
import Container from "./Container";
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle"


export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            MyStore
          </Link>

          <div className="flex items-center gap-4">
            <Navbar />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}