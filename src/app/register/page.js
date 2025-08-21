"use client"

import { useState } from "react"
import LoginForm from "@/components/auth/login-form"
import SignupForm from "@/components/auth/signup-form"

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-pink-600">Plushie</div>
          <div className="text-2xl font-bold text-gray-800">Store</div>
        </div>
      </div>

      <div className="w-full max-w-md">
        {showLogin ? (
          <LoginForm onToggleForm={() => setShowLogin(false)} />
        ) : (
          <SignupForm onToggleForm={() => setShowLogin(true)} />
        )}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>© 2025 Plushie Store.</p>
      </div>
    </div>
  )
}
