import "server-only";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { getMyCart } from "@/lib/store/cart";

export default function CartPage() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const supabase = createSupabaseBrowserClient();

  const load = async () => {
    setLoading(true);
    setError("");

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    if (!token) {
      window.location.href = `/login?next=${encodeURIComponent("/cart")}`;
      return;
    }

    try {
      const c = await getMyCart(token);
      setCart(c);
    } catch (e: any) {
      setError(e.message ?? "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const setQty = async (cartItemId: string, qty: number) => {
    const { error } = await supabase.rpc("set_cart_item_qty", {
      p_cart_item_id: cartItemId,
      p_qty: qty,
    });

    if (error) alert(error.message);
    else load();
  };

  const removeItem = async (cartItemId: string) => {
    const { error } = await supabase.rpc("remove_from_cart", {
      p_cart_item_id: cartItemId,
    });

    if (error) alert(error.message);
    else load();
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <main style={{ padding: 24 }}>Loading cart...</main>;
  if (error) return <main style={{ padding: 24 }}>Error: {error}</main>;

  const items =
    cart?.cart_itemsCollection?.edges?.map((e: any) => e.node) ?? [];

  const total = items.reduce((sum: number, it: any) => {
    return sum + Number(it.product?.price ?? 0) * Number(it.quantity ?? 0);
  }, 0);

  return (
    <main style={{ padding: 24 }}>
      <h1>Cart</h1>

      {items.length === 0 ? (
        <p>Cart empty.</p>
      ) : (
        <>
          <div style={{ display: "grid", gap: 12 }}>
            {items.map((it: any) => (
              <div
                key={it.id}
                style={{
                  border: "1px solid #ddd",
                  padding: 12,
                  borderRadius: 8,
                }}
              >
                <Link href={`/product/${it.product.slug}`}>
                  <b>{it.product.title}</b>
                </Link>

                <div style={{ marginTop: 6 }}>
                  {it.product.price} {it.product.currency}
                </div>

                <div
                  style={{
                    marginTop: 8,
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <button onClick={() => setQty(it.id, Math.max(1, it.quantity - 1))}>
                    −
                  </button>
                  <span>{it.quantity}</span>
                  <button onClick={() => setQty(it.id, it.quantity + 1)}>+</button>

                  <button style={{ marginLeft: 12 }} onClick={() => removeItem(it.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <b>
              Total: {total.toFixed(2)} {items[0]?.product?.currency ?? ""}
            </b>
          </div>

          <div style={{ marginTop: 12 }}>
            <Link href="/checkout">Go to checkout →</Link>
          </div>
        </>
      )}
    </main>
  );
}