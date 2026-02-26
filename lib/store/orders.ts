export async function getOrderById(token: string, id: string) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  };

  // 1️⃣ Order header only
  const orderRes = await fetch(
    process.env.NEXT_PUBLIC_SUPABASE_GRAPHQL_URL!,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: `
          query OrderById($id: UUID!) {
            ordersCollection(filter: { id: { eq: $id } }, first: 1) {
              edges {
                node {
                  id
                  status
                  total_amount
                  currency
                  created_at
                }
              }
            }
          }
        `,
        variables: { id },
      }),
    }
  );

  const orderJson = await orderRes.json();
  const order =
    orderJson?.data?.ordersCollection?.edges?.[0]?.node ?? null;

  if (!order) return null;

  // 2️⃣ Fetch order items separately
  const itemsRes = await fetch(
    process.env.NEXT_PUBLIC_SUPABASE_GRAPHQL_URL!,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: `
          query OrderItems($orderId: UUID!) {
            order_itemsCollection(filter: { order_id: { eq: $orderId } }) {
              edges {
                node {
                  id
                  title
                  unit_price
                  quantity
                }
              }
            }
          }
        `,
        variables: { orderId: id },
      }),
    }
  );

  const itemsJson = await itemsRes.json();
  const items =
    itemsJson?.data?.order_itemsCollection?.edges ?? [];

  // Merge manually
  return {
    ...order,
    order_itemsCollection: {
      edges: items,
    },
  };
}