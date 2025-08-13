"use client";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const discountedPrice =
    product.discount_percent > 0
      ? product.price * (1 - product.discount_percent / 100)
      : product.price;


  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };


  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow relative">

      {/* Favorite Button */}
      <button
        onClick={handleFavoriteToggle}
        className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white transition-colors group"
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isFavorite
              ? "fill-red-500 text-red-500"
              : "text-gray-400 hover:text-red-500"
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative w-full h-48 mb-8 mt-6">
        <img
          src={
            product.image_url ||
            "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={product.name}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Product Info */}
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
        {product.name}
      </h3>

      {/* Price */}
      <div className="flex items-center gap-2">
        {product.discount_percent > 0 ? (
          <>
            <span className="text-xl font-bold text-red-600">
              ${discountedPrice.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ${product.price}
            </span>
          </>
        ) : (
          <span className="text-xl font-bold">${product.price}</span>
        )}
      </div>

      {/* Add to Cart Button */}
      <button className="w-full mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors">
        Add to Cart
      </button>
    </div>
  );
}
