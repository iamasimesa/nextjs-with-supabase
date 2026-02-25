import HeroBanner from "@/components/home/HeroBanner";
import { Suspense } from "react";
import ProductsServer from "@/components/home/ProductsServer";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <Suspense fallback={<div className="mx-auto w-full max-w-6xl px-4 py-6">Loading products...</div>}>
        <ProductsServer />
      </Suspense>
    </main>
  );
}