export default function CartSidebar({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b flex-shrink-0">
          <h2 className="text-lg font-bold">Added To Cart</h2>
          <button onClick={onClose} className="text-xl hover:text-gray-600">
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="p-3 border-b flex justify-between">
            <span>Sleepy Bear</span>
            <span>$19.99</span>
          </div>
        </div>

        {/* Checkout Footer */}
        <div className="border-t p-4 flex-shrink-0 bg-gray-50">
          <div className="mb-3">
            <div className="flex justify-between mb-2">
              <span className="font-bold">Subtotal:</span>
              <span className="font-bold">$19.99</span>
            </div>
          </div>
          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Checkout
          </button>
          <span className="font-light text-gray-700 text-sm items-center">
            {" "}
            Shipping and taxes calculated at checkout
          </span>
        </div>
      </div>
    </>
  );
}
