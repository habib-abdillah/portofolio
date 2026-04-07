"use client"

import Sidebar from "./_components/Sidebar"
import { usePathname } from "next/navigation"

export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-200">
      {!isLoginPage && <Sidebar />}

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
