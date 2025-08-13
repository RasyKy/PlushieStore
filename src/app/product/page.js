"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import NavigationBar from "@/components/navigationbar";
import SearchBar from "@/components/searchbar";
import SortBy from "@/components/sortby";
import ProductCard from "@/components/productcard";
import CartSidebar from "@/components/cartsidebar";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log(
      "Key:",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + "..."
    );
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      console.error("Full error:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <NavigationBar onCartClick={() => setCartOpen(true)}/>
        <main>
          <div className="grid grid-cols-4 gap-6 mr-8 ml-8 mt-8">
            <SearchBar />
            <SortBy />
          </div>
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Loading products...</p>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavigationBar onCartClick={() => setCartOpen(true)}/>
        <main>
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-red-600">{error}</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <NavigationBar onCartClick={() => setCartOpen(true)}/>
      <main>
        <div className="grid grid-cols-4 gap-6 mr-8 ml-8 mt-8">
          <SearchBar />
          <SortBy />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mr-8 ml-8 mt-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg text-gray-600">No products found</p>
            </div>
          )}
        </div>
      </main>
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
