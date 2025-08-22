"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ProductTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;

      setProducts(data || []);
    } catch {
      console.error("Error fetching products:", error.message);
      console.error("Full error:", error);
      setError("Failed to load products");
    }
  }

  console.log(products);
  return (
    <div className="mr-20">
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Labels</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>$ {p.price}</td>
              <td>{p.discount_percent}%</td>
              <td>{p.label}</td>
              <td>{p.status}</td>
              <td>
                <Link
                  href="/admin/product-edit"
                  className="text-blue-600 font-bold underline"
                >
                  edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
