import { connection } from "next/server"
import AddToCartButton from "@/components/AddToCartButton"
import { getProductBySlug } from "@/lib/store/products"
import Image from "next/image"

export default async function ProductPageInner({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // ✅ tells Next: this part is request-time
  await connection()

  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) return <main className="p-6">Product not found</main>

  return (
    <main className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      <div className="relative w-full aspect-square">
        <Image
          src={product.image_url ?? "/placeholder.png"}
          alt={product.title}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div>
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p className="mt-2 text-muted-foreground">{product.description}</p>

        <div className="mt-4 text-lg font-bold">
          {product.price} {product.currency}
        </div>

        <div className="mt-4">
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </main>
  )
}