import Link from "next/link";

export default function ProductCard({ p }: { p: any }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <Link href={`/product/${p.slug}`}>
        <b>{p.title}</b>
      </Link>
      <div>
        {p.price} {p.currency}
      </div>
    </div>
  );
}