"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavigationBar({ onCartClick }) {
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/product" className="group">
              <div className="flex items-center space-x-1">
                <div className="text-2xl font-bold transition-colors duration-200 group-hover:scale-105 transform">
                  <span className="text-pink-600">Plushie</span>
                  <span className="text-gray-800">Store</span>
                </div>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="#"
              className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-pink-50"
            >
              Favorite
            </Link>
            <Link
              href="/account"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                pathname === "/account"
                  ? "text-pink-600 bg-pink-50 font-semibold"
                  : "text-gray-700 hover:text-pink-600 hover:bg-pink-50"
              }`}
            >
              Account
            </Link>
            <button
              onClick={onCartClick}
              className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-pink-50 flex items-center space-x-1"
            >
              <span>Cart</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"
                />
              </svg>
            </button>
          </nav>

          <div className="md:hidden">
            <button className="text-gray-700 hover:text-pink-600 p-2 rounded-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
