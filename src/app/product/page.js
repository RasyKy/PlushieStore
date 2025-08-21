"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import NavigationBar from "@/components/navigationbar";
import SearchBar from "@/components/searchbar";
import SortBy from "@/components/sortby";
import ProductCard from "@/components/productcard";
import CartSidebar from "@/components/cartsidebar";
import Toast from "@/components/toast";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
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

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    const newToast = {
      id: Date.now(),
      message: `${product.name} added to cart!`,
    };

    setToasts((prevToasts) => {
      const updatedToasts = [newToast, ...prevToasts];
      // Keep only the 3 most recent toasts
      return updatedToasts.slice(0, 3);
    });

    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== newToast.id)
      );
    }, 1000);
  };

  return (
    <>
      <NavigationBar
        onCartClick={() => {
          setCartOpen(true);
          setToasts([]);
        }}
      />
      <main>
        <div className="grid grid-cols-4 gap-6 mr-8 ml-8 mt-8">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <SortBy />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mr-8 ml-8 mt-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg text-gray-600">
                {searchTerm
                  ? `No products found for "${searchTerm}"`
                  : "No products found"}
              </p>
            </div>
          )}
        </div>
      </main>
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
      <Toast
        toasts={toasts}
        onClose={(toastId) =>
          setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== toastId)
          )
        }
      />
    </>
  );
}
