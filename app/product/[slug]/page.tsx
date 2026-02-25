import AddToCartButton from "@/components/AddToCartButton";
import { getProductBySlug } from "@/lib/store/products";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  return (
    <main style={{ padding: 24 }}>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <div>
        <b>
          {product.price} {product.currency}
        </b>
      </div>
      <div style={{ marginTop: 12 }}>
        <AddToCartButton productId={product.id} />
      </div>
    </main>
  );
}