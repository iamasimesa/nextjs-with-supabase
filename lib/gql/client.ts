import { GraphQLClient } from "graphql-request";

export function getGqlClient(accessToken?: string) {
  const endpoint = process.env.NEXT_PUBLIC_SUPABASE_GRAPHQL_URL;
  const apikey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!endpoint) throw new Error("Missing NEXT_PUBLIC_SUPABASE_GRAPHQL_URL");
  if (!apikey) throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");

  const headers: Record<string, string> = { apikey };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  return new GraphQLClient(endpoint, { headers });
}