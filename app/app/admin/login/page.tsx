"use client"

import { authClient } from "@/lib/auth-client"

export default function LoginPage() {
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/admin",
    })
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-[#111118] border border-white/7 rounded-2xl p-10 text-center w-full max-w-md">
        <h1 className="font-display text-2xl font-bold text-white mb-2">Admin Login</h1>
        <p className="text-[#555] text-sm mb-8">Login untuk mengelola konten</p>
        <button
          onClick={handleLogin}
          className="bg-[#7c6dfa] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#6a5ce8] transition-colors"
        >
          Login dengan GitHub
        </button>
      </div>
    </div>
  )
}