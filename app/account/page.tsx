import Link from "next/link";

export default function AccountPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Account</h1>
      <ul>
        <li>
          <Link href="/account/orders">My Orders</Link>
        </li>
        <li>
          <Link href="/cart">Cart</Link>
        </li>
      </ul>
    </main>
  );
}