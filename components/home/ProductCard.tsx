import Link from "next/link"
import Image from "next/image"

type Product = {
  id: string
  slug: string
  title: string
  price: string | number
  image_url: string | null
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group overflow-hidden rounded-lg border border-border transition hover:shadow-sm">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square w-full">
          <Image
            src={product.image_url ?? "/placeholder.png"}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>

        <div className="p-3">
          <h3 className="line-clamp-2 text-sm font-medium group-hover:underline">
            {product.title}
          </h3>
          <div className="mt-2 text-sm text-muted-foreground">
            AED {product.price}
          </div>
        </div>
      </Link>
    </div>
  )
}