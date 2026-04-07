"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut()
    router.push("/admin/login")
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-medium text-slate-500 hover:text-red-400 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-all w-full text-left"
    >
      Logout
    </button>
  )
}
