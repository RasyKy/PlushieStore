import NavigationBar from "@/components/navigationbar";
import SidebarButton from "@/components/sidebar-nav-button";
import InputBox from "@/components/inputbox";
import { CircleUserRound, SquarePen } from "lucide-react";

export default function AccountPage() {
  return (
    <>
      <NavigationBar />
      <main className="grid grid-cols-4 gap-20 mr-8 ml-8 mt-8">
        <div className="border rounded p-5">
          <SidebarButton activePage={true} text={"My Account"} />
          <SidebarButton activePage={false} text={"Order History"} />
          <SidebarButton activePage={false} text={"Settings"} />
          <SidebarButton activePage={false} text={"Contact Support"} />
        </div>
        <div className="grid grid-cols-3 col-span-3">
          <div className="col-span-3">
            <div className="flex mb-5 col-span-3 items-center gap-3">
              <CircleUserRound size={48}/>
              <div>
                <p>Username</p>
                <span className="flex items-center gap-1">
                  <SquarePen size={16}/>
                  <p className="underline">Edit username</p>
                </span>
              </div>
            </div>

            <hr />
          </div>

            <div className="mt-3">
              <div className="flex flex-col">
                <p>Email</p>
                <InputBox Type="text" displayText="example@gmail.com" />

                <p>Shipping Address</p>
                <InputBox Type="text" displayText="country" />
                <InputBox Type="text" displayText="address" />

                <p>Payment Method</p>
                <img src="/Visa.svg" className="w-12 h-auto mt-2 mb-2" />

                <InputBox Type="text" displayText="Card Number" />
                <InputBox Type="text" displayText="Expire Date" />
                <InputBox Type="text" displayText="Name on card" />
              </div>
            </div>
          </div>
      </main>
    </>
  );
}
