"use client";
import { useState } from "react";
import { SlArrowDown } from "react-icons/sl"

export default function SortBy({ onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");

  const sortOptions = [
    { label: "Price (Low to High)", value: "price-asc" },
    { label: "Price (High to Low)", value: "price-desc" },
    { label: "Name (A-Z)", value: "name-asc" },
    { label: "Name (Z-A)", value: "name-desc" },
  ];

  const handleSortSelect = (option) => {
    setSelectedSort(option.label);
    setIsOpen(false);
    if (onSortChange) {
      onSortChange(option.value);
    }
  };

  return (
    <div className="flex grow-0 col-end-5 justify-self-end relative">
      <div 
        className="flex gap-3 items-center p-1 border border-transparent hover:border-black cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>Sort By: {selectedSort}</p>
        <SlArrowDown 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <>
          {/* Overlay to close dropdown when clicking outside */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                  selectedSort === option.label ? 'bg-gray-100 font-medium' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}