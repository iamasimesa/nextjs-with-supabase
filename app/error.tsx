"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <main style={{ padding: 24 }}>
      <h1>App Error</h1>
      <pre style={{ whiteSpace: "pre-wrap" }}>{error.message}</pre>
    </main>
  );
}