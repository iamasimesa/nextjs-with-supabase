import { getGqlClient } from "@/lib/gql/client";
import { MY_ORDERS, ORDER_BY_ID } from "@/lib/gql/queries/orders";

export async function getMyOrders(accessToken: string) {
  const client = getGqlClient(accessToken);
  const data: any = await client.request(MY_ORDERS);
  return data.ordersCollection?.edges?.map((e: any) => e.node) ?? [];
}

export async function getOrderById(accessToken: string, id: string) {
  const client = getGqlClient(accessToken);
  const data: any = await client.request(ORDER_BY_ID, { id });
  return data.ordersCollection?.edges?.[0]?.node ?? null;
}