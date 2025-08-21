"use client"
import SidebarButton from "@/components/sidebar-nav-button";
import SearchBar from "@/components/searchbar";
import InputBox from "@/components/inputbox";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function ProductEdit() {
  const [status, setStatus] = useState(false);

  return (
    <>
      <main className="flex gap-20 h-screen">
        <div className="w-1/4 border p-6">
          <p className="text-center mb-6">PlushieStore</p>
          <SearchBar />
          <SidebarButton activePage={false} text={"Dashboard"} />
          <SidebarButton activePage={true} text={"Product Management"} />
          <SidebarButton activePage={false} text={"Settings"} />
        </div>
        <div className="pt-10 w-3/4">
          <h1 className="text-center mb-2">Product Management</h1>

          <button className="p-4 border rounded-l-2xl font-semibold shadow">Published</button>
          <button className="p-4 border-t border-b border-r rounded-r-2xl text-gray-300 shadow">Draft</button>

          <h3 className="mt-4">Product Name</h3>
          <InputBox displayText="Octopus" />

          <h3 className="mt-4">Pricing</h3>
          <InputBox displayText="12.99" />

          <h3 className="mt-4">Label</h3>
          <p className="font-semibold text-blue-600">+ Edit Label</p>

          <h3 className="mt-4">Product Image</h3>
          <p className="font-semibold text-blue-600">+ Add Image</p>
          <p className="border p-10 mt-2 mr-20">Drag image to upload or click to add image</p>

          <button className="mt-4 p-4 w-30 bg-blue-500 text-white font-semibold rounded">Save</button>

          <h3 className="mt-4">Preview</h3>
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow relative">

            <button className="absolute top-2 right-2 z-10 p-1 hover:bg-white">
              <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
            </button>

            <div className="relative w-full h-48 mb-8 mt-6">
              <img src="https://via.placeholder.com/150" className="w-full h-full object-cover rounded" alt="Product Item"/>
            </div>

            <h3 className="text-lg font-semibold mb-2 line-clamp-2">Octopus</h3>

            <div className="flex items-center gap-2">$12.99</div>
          </div>
        </div>
      </main>
    </>
  );
}
