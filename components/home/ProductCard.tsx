import Link from "next/link";

export default function ProductCard({ p }: { p: any }) {
  return (
    <div className="group rounded-2xl border bg-card p-4 transition hover:shadow-sm">
      <Link href={`/product/${p.slug}`} className="block">
        <div className="aspect-[4/3] w-full rounded-xl bg-muted" />
        <div className="mt-3 flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-medium group-hover:underline">
            {p.title}
          </h3>
        </div>
      </Link>

      <div className="mt-2 text-sm text-muted-foreground">
        {p.price} {p.currency}
      </div>

      <div className="mt-4">
        <Link
          href={`/product/${p.slug}`}
          className="inline-flex w-full items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          View
        </Link>
      </div>
    </div>
  );
}