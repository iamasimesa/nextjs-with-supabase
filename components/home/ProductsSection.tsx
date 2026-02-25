"use client";

import { useEffect, useState } from "react";
import ProductGrid from "@/components/home/ProductGrid";
import { getActiveProducts } from "@/lib/store/products";

export default function ProductsSection() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError("");

        // Simple timeout guard (prevents endless spinner)
        const timeout = new Promise((_, rej) =>
          setTimeout(() => rej(new Error("Products request timed out")), 8000)
        );

        const p: any = await Promise.race([getActiveProducts(), timeout]);
        if (!mounted) return;

        setProducts(Array.isArray(p) ? p : []);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? "Failed to load products");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-8 text-sm text-muted-foreground">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="rounded-xl border p-4 text-sm">
          <div className="font-medium">Couldn’t load products</div>
          <div className="mt-1 text-muted-foreground">{error}</div>
        </div>
      </div>
    );
  }

  return <ProductGrid products={products} />;
}