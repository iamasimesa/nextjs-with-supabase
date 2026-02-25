"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-lg font-semibold">Something went wrong</h1>
      <pre className="mt-3 whitespace-pre-wrap rounded-xl border p-4 text-sm">
        {error.message}
      </pre>
    </main>
  );
}