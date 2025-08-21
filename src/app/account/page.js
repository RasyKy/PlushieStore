import NavigationBar from "@/components/navigationbar"
import SidebarButton from "@/components/sidebar-nav-button"
import InputBox from "@/components/inputbox"
import { CircleUserRound, SquarePen, CreditCard, MapPin, Mail } from "lucide-react"
import Image from "next/image";

export default function AccountPage() {
  return (
    <>
      <NavigationBar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Menu</h2>
              <div className="space-y-2">
                <SidebarButton activePage={true} text={"My Account"} />
                <SidebarButton activePage={false} text={"Order History"} />
                <SidebarButton activePage={false} text={"Settings"} />
                <SidebarButton activePage={false} text={"Contact Support"} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <CircleUserRound size={32} className="text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900">Username</h1>
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                      <SquarePen size={14} />
                      <span className="text-sm underline">Edit username</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Mail size={20} className="text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <InputBox Type="text" displayText="example@gmail.com" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={20} className="text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <InputBox Type="text" displayText="country" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <InputBox Type="text" displayText="address" />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard size={20} className="text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Image src="/Visa.svg" className="w-8 h-auto" alt="Visa" />
                    <span className="text-sm text-gray-600">Visa ending in ****</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <InputBox Type="text" displayText="Card Number" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <InputBox Type="text" displayText="Expire Date" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                      <InputBox Type="text" displayText="Name on card" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
