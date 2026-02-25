import { getGqlClient } from "@/lib/gql/client";
import { PRODUCTS_LIST, PRODUCT_BY_SLUG } from "@/lib/gql/queries/products";

export async function getActiveProducts() {
  const client = getGqlClient(); // public read

  const data: any = await client.request(PRODUCTS_LIST);

  // Support both shapes:
  if (data.productsCollection) {
    return data.productsCollection.edges.map((e: any) => e.node);
  }
  return data.products ?? [];
}

export async function getProductBySlug(slug: string) {
  const client = getGqlClient();
  const data: any = await client.request(PRODUCT_BY_SLUG, { slug });

  if (data.productsCollection) {
    return data.productsCollection.edges?.[0]?.node ?? null;
  }
  return data.products?.[0] ?? null;
}