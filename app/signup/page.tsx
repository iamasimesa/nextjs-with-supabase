import { Suspense } from "react"
import SignUpForm from "./SignUpForm"

export default function SignUpPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
      <SignUpForm />
    </Suspense>
  )
}