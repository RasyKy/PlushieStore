import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ul className="flex space-x-20 text-2xl list-none">
          <li><Link className="hover:underline" href="/register">Register</Link></li>
          <li><Link className="hover:underline" href="/account">Account</Link></li>
          <li><Link className="hover:underline" href="/product">ProductPage</Link></li>
          <li><Link className="hover:underline" href="/checkout">Checkout</Link></li>
          <li><Link className="hover:underline text-gray-400" href="/admin">AdminLogin</Link></li>
          <li><Link className="hover:underline" href="/admin/product">AdminProductPage</Link></li>
        </ul>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>PlushieStore</p>
      </footer>
    </div>
  );
}
