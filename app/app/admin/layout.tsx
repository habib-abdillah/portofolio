import Sidebar from "./_components/Sidebar"

export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-200">
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
