"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase/browser"

export default function SignUpForm() {
  const supabase = createSupabaseBrowserClient()
  const sp = useSearchParams()
  const next = sp.get("next") || "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const signUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) alert(error.message)
    else window.location.href = `/login?next=${encodeURIComponent(next)}`
  }

  return (
    <main style={{ padding: 24, maxWidth: 420 }}>
      <h1>Create account</h1>

      <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, border: "1px solid #ccc", borderRadius: 8 }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, border: "1px solid #ccc", borderRadius: 8 }}
        />

        <button disabled={loading} onClick={signUp} style={{ padding: 10 }}>
          {loading ? "Loading..." : "Create account"}
        </button>
      </div>
    </main>
  )
}