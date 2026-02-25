import "server-only"

import Container from "@/components/layout/Container"
import { useEffect, useState } from "react"

export default function Footer() {
  const [year, setYear] = useState("")

  useEffect(() => {
    setYear(String(new Date().getFullYear()))
  }, [])

  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="py-8 text-sm text-muted-foreground">
          © {year} MyStore. All rights reserved.
        </div>
      </Container>
    </footer>
  )
}