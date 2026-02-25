import { getGqlClient } from "@/lib/gql/client";
import { MY_ACTIVE_CART } from "@/lib/gql/queries/cart";

export async function getMyCart(accessToken: string) {
  const client = getGqlClient(accessToken);
  const data: any = await client.request(MY_ACTIVE_CART);
  return data.cartsCollection?.edges?.[0]?.node ?? null;
}