import { Suspense } from "react"
import ProductPageInner from "./ProductPageInner"

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <ProductPageInner params={params} />
    </Suspense>
  )
}