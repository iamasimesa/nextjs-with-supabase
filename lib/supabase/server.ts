// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

// /**
//  * Especially important if using Fluid compute: Don't put this client in a
//  * global variable. Always create a new client within each function when using
//  * it.
//  */
// export async function createClient() {
//   const cookieStore = await cookies();

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll();
//         },
//         setAll(cookiesToSet) {
//           try {
//             cookiesToSet.forEach(({ name, value, options }) =>
//               cookieStore.set(name, value, options),
//             );
//           } catch {
//            //Hide it yaha se  // The `setAll` method was called from a Server Component.
//             // This can be ignored if you have proxy refreshing
//             // user sessions. yaha tak.
//           }
//         },
//       },
//     },
//   );
// }
import { createClient } from "@supabase/supabase-js";

export function createSupabaseServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}