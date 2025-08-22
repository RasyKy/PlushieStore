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
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {

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
    }
  }

const handleSortChange = (sortType) => {
  let sorted = [...products];

  switch (sortType) {
    case "price-asc":
      sorted.sort((a, b) => {
        const priceA =
          a.discount_percent > 0
            ? a.price * (1 - a.discount_percent / 100)
            : a.price;
        const priceB =
          b.discount_percent > 0
            ? b.price * (1 - b.discount_percent / 100)
            : b.price;
        return priceA - priceB;
      });
      break;
    case "price-desc":
      sorted.sort((a, b) => {
        const priceA =
          a.discount_percent > 0
            ? a.price * (1 - a.discount_percent / 100)
            : a.price;
        const priceB =
          b.discount_percent > 0
            ? b.price * (1 - b.discount_percent / 100)
            : b.price;
        return priceB - priceA;
      });
      break;
    case "name-asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  setProducts(sorted);
};

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
      return updatedToasts.slice(0, 3);
    });

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
          <SortBy onSortChange={handleSortChange} />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mr-8 ml-8 mt-8">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart}/>
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
