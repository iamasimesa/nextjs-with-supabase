import AddToCartButton from "@/components/AddToCartButton"
import { getProductBySlug } from "@/lib/store/products"
import Image from "next/image"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return <main style={{ padding: 24 }}>Product not found</main>
  }

  return (
    <main className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* Image Section */}
      <div className="relative w-full aspect-square">
        <Image
          src={product.image_url ?? "/placeholder.png"}
          alt={product.title}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Info Section */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">
          {product.title}
        </h1>

        <p className="text-muted-foreground mb-4">
          {product.description}
        </p>

        <div className="text-lg font-bold mb-4">
          {product.price} {product.currency}
        </div>

        <AddToCartButton productId={product.id} />
      </div>
    </main>
  )
}