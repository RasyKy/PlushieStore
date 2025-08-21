"use client"

import { useState } from "react"
import Link from "next/link"

export default function CartSidebar({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Octopus",
      price: 6.49,
      originalPrice: 12.99,
      quantity: 1,
      image: "/placeholder-65x2s.png",
    },
    {
      id: 2,
      name: "Sharky",
      price: 16.99,
      quantity: 2,
      image: "/cute-gray-shark-plushie.png",
    },
  ])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose} />

      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b flex-shrink-0">
          <h2 className="text-lg font-semibold">Added To Cart</h2>
          <button onClick={onClose} className="text-2xl hover:text-gray-600 w-8 h-8 flex items-center justify-center">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3 pb-4 border-b border-gray-100">
              {/* Product Image */}
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {item.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">${item.originalPrice}</span>
                  )}
                  <span className="text-sm font-medium">${item.price}</span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="font-medium min-w-[20px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Item Total */}
              <div className="text-right">
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-4 flex-shrink-0 bg-white">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Subtotal:</span>
              <span className="font-semibold text-lg">${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <Link href="/checkout">
            <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              CHECKOUT
            </button>
          </Link>
          <p className="text-xs text-gray-500 text-center mt-2">Shipping and taxes calculated at checkout</p>
        </div>
      </div>
    </>
  )
}
