"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase/browser"
import { getOrderById } from "@/lib/store/orders"
import Link from "next/link"

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id

  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<any>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) return

    const load = async () => {
      setLoading(true)
      setError("")

      const supabase = createSupabaseBrowserClient()
      const { data: sessionData } = await supabase.auth.getSession()
      const token = sessionData.session?.access_token

      if (!token) {
        window.location.href = `/login?next=${encodeURIComponent(`/account/orders/${id}`)}`
        return
      }

      try {
        const o = await getOrderById(token, id)
        setOrder(o)
      } catch (e: any) {
        setError(e.message ?? "Failed to load order")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  if (!id) return <main style={{ padding: 24 }}>Loading...</main>
  if (loading) return <main style={{ padding: 24 }}>Loading order...</main>
  if (error) return <main style={{ padding: 24 }}>Error: {error}</main>
  if (!order) return <main style={{ padding: 24 }}>Order not found.</main>

  const items = order.order_itemsCollection?.edges?.map((e: any) => e.node) ?? []

  return (
    <main style={{ padding: 24 }}>
      <Link href="/account/orders">← Back</Link>
      <h1>Order</h1>

      <div style={{ marginTop: 12 }}>
        <div><b>ID:</b> {order.id}</div>
        <div><b>Status:</b> {order.status}</div>
        <div><b>Total:</b> {order.total_amount} {order.currency}</div>
      </div>

      <h2 style={{ marginTop: 18 }}>Items</h2>
      {items.length === 0 ? (
        <p>No items.</p>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {items.map((it: any) => (
            <div key={it.id} style={{ border: "1px solid #ddd", padding: 10, borderRadius: 8 }}>
              <b>{it.title}</b>
              <div>Qty: {it.quantity}</div>
              <div>Unit: {it.unit_price}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}