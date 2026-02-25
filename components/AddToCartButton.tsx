"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function AddToCartButton({ productId }: { productId: string }) {
  const add = async () => {
    const supabase = createSupabaseBrowserClient();

    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      window.location.href = "/login";
      return;
    }

    const { error } = await supabase.rpc("add_to_cart", {
      p_product_id: productId,
      p_qty: 1,
    });

    if (error) alert(error.message);
    else alert("Added to cart ✅");
  };

  return <button onClick={add}>Add to cart</button>;
}