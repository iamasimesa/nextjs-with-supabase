import Link from "next/link";
import Container from "@/components/layout/Container";

export default function HeroBanner() {
  return (
    <section className="py-8">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-muted/40 to-background p-6 md:p-10">
          <div className="max-w-xl">
            <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">
              Shop the latest deals
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Fast delivery • Secure payments • Great prices
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
              >
                Browse Products
              </Link>
              <Link
                href="/cart"
                className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                View Cart
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-foreground/5 blur-3xl" />
        </div>
      </Container>
    </section>
  );
}