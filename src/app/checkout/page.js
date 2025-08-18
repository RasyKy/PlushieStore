import InputBox from "@/components/inputbox";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="text-center border-b p-5">
        <Link href="/">PlushieStore</Link>
      </header>

      <main className="flex flex-1">
        <div className="w-1/2 pt-6 pl-20 pr-20 border-r flex flex-col">
          <h2 className="font-semibold">Contact</h2>
          <InputBox displayText="Email" />

          <h2 className="font-semibold mt-4">Shipping Address</h2>
          <InputBox displayText="Country" />
          <div className="flex gap-5">
            <input
              type="text"
              placeholder="First Name"
              className="border p-2 rounded mb-2 mt-2 grow"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border p-2 rounded mb-2 mt-2 grow"
            />
          </div>
          <InputBox displayText="Address" />
          <InputBox displayText="Apartment, suite, etc. (Optional)" />
          <InputBox displayText="Phone" />

          <h2 className="font-semibold mt-4 mb-2">Payment Method</h2>
          <div className="border border-gray-300 rounded mb-10">
            <div className="border-b border-gray-300 p-4 bg-gray-100">
              <p>Credit Card</p>
            </div>
            <div className="bg-gray-100 p-4 flex flex-col">
              <InputBox displayText="Card Number" />
              <div className="flex gap-5">
                <input
                  type="text"
                  placeholder="Expiration date (MM / YY)"
                  className="border p-2 rounded mb-2 mt-2 grow bg-white"
                />
                <input
                  type="text"
                  placeholder="Security code"
                  className="border p-2 rounded mb-2 mt-2 grow bg-white"
                />
              </div>
              <InputBox displayText="Cardholder Name" />
            </div>
            <div className="p-4">
              <p>Other</p>
            </div>
          </div>
        </div>

        <div className="w-1/2 p-6 pl-20 pr-20 flex flex-col">
          <div className="flex justify-between">
            <div className="flex">
              <img src="https://via.placeholder.com/150" className="mr-5"/>
              <p>Octupus</p>
            </div>

            <p>$12.99</p>
          </div>
          <div className="flex justify-between mt-4">
            <input
              type="text"
              placeholder="Discount code"
              className="border p-2 rounded mb-2 mt-2 grow bg-white"
            />
            <button className="bg-black text-white p-2 mb-2 mt-2 ml-4 rounded grow">
              Apply
            </button>
          </div>

          <div className="flex justify-between mt-4">
            <p>Subtotal</p>
            <p>$12.99</p>
          </div>
          <div className="flex justify-between mt-4">
            <p>Tax</p>
            <p>$0.13</p>
          </div>
          <div className="flex justify-between mt-4">
            <p>Shipping</p>
            <p>Enter shipping address</p>
          </div>
          <div className="flex justify-between mt-14">
            <b className="text-xl">Total</b>
            <b className="text-xl">$13.12</b>
          </div>
          <div className="flex justify-between mt-5">
            <button className="bg-black text-white p-2 rounded grow">
              Confirm Payment
            </button>
          </div>
          <div></div>
        </div>
      </main>
    </div>
  );
}
