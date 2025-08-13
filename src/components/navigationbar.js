import Link from "next/link";

export default function NavigationBar({ onCartClick }) {
  return (
    <header className="flex justify-between border p-4">
      <h1>PlushieStore</h1>
      <ul className="flex gap-10">
        <li>
          <Link className="hover:underline" href="#">
            Favorite
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/account">
            Account
          </Link>
        </li>
        <li>
          <button className="hover:underline" onClick={onCartClick}>
            Cart
          </button>
        </li>
      </ul>
    </header>
  );
}
