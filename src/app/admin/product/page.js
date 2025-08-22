import SidebarButton from "@/components/sidebar-nav-button";
import SearchBar from "@/components/searchbar";
import ProductTable from "@/components/product-table";
import Link from "next/link";


export default function AdminProductPage() {

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
          <h1 className="text-center">Product Management</h1>

          <p>Add Product</p>
          <Link href="/admin/product-edit">
            <button className="p-3 w-30 bg-blue-600 text-white rounded-2xl mb-4 mt-2">
              Add
            </button>
          </Link>

          <p className="mb-2">Product List</p>
          <ProductTable />
        </div>
      </main>
    </>
  );
}
