import "server-only";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const checkout = async () => {
    setLoading(true);

    const supabase = createSupabaseBrowserClient();

    const { error, data } = await supabase.rpc("create_order_from_cart");

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Order created ✅");
      window.location.href = `/account/orders/${data}`;
    }
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Checkout</h1>

      <button onClick={checkout} disabled={loading}>
        {loading ? "Processing..." : "Place Order"}
      </button>
    </main>
  );
}