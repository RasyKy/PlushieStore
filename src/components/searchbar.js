"use client"

import { IoIosSearch } from "react-icons/io"

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="flex border border-gray-300 items-center p-2 rounded-2xl bg-white shadow-sm">
      <IoIosSearch className="ml-2 mr-2 text-gray-500" />
      <input
        id="search-product"
        type="text"
        placeholder="Search products..."
        className="outline-none flex-1 text-gray-700"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}
