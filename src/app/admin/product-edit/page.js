"use client";

import SidebarButton from "@/components/sidebar-nav-button";
import SearchBar from "@/components/searchbar";
import ImageUpload from "@/components/imageupload";
import { Heart } from "lucide-react";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function ProductEditInner() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    discount: "",
    label: "",
    status: "draft",
    imageUrl: "",
    images: [],
  });
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productId, setProductId] = useState(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const imageUploadRef = useRef(null);

  // Load product data if editing
  useEffect(() => {
    if (id) {
      setProductId(id);
      loadProductData(id);
    }
  }, [id]);

  const loadProductData = async (id) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        const existingImages = [];
        if (data.image_urls && Array.isArray(data.image_urls)) {
          data.image_urls.forEach((url, index) =>
            existingImages.push({ url, name: `Existing image ${index + 1}`, isLocal: false })
          );
        } else if (data.image_url) {
          existingImages.push({ url: data.image_url, name: "Main image", isLocal: false });
        }

        setProduct({
          name: data.name || "",
          price: data.price || "",
          discount: data.discount_percent || "",
          label: data.label || "",
          status: data.status || "draft",
          imageUrl: data.image_url || "",
          images: existingImages,
        });
      }
    } catch (error) {
      console.error("Error loading product:", error);
      alert(`Error loading product: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  // You can include all your buttons, inputs, ImageUpload, and preview JSX here
  return (
    <main className="flex gap-20 h-screen">
      <div className="w-1/4 border p-6">
        <p className="text-center mb-6">PlushieStore</p>
        <SearchBar />
        <SidebarButton activePage={false} text={"Dashboard"} />
        <SidebarButton activePage={true} text={"Product Management"} />
        <SidebarButton activePage={false} text={"Settings"} />
      </div>
      <div className="pt-10 w-3/4 pr-6">
        <h1 className="text-center mb-2">{productId ? "Edit Product" : "Add New Product"}</h1>
        {/* ...rest of your form/buttons/preview JSX */}
      </div>
    </main>
  );
}

export default function ProductEdit() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductEditInner />
    </Suspense>
  );
}
