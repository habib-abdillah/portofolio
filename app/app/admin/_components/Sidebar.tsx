"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import LogoutButton from "./LogoutButton"

export default function Sidebar() {
  const pathname = usePathname()

  const navLinks = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      )
    },
    {
      name: "Kelas",
      href: "/admin/kelas",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 12 12 17 22 12" />
          <polyline points="2 17 12 22 22 17" />
        </svg>
      )
    },
    {
      name: "Materi",
      href: "/admin/materi",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      )
    },
    {
      name: "Blog",
      href: "/admin/blog",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
      )
    }
  ]

  return (
    <aside className="w-64 border-r border-slate-800 p-6 flex flex-col gap-2 bg-slate-900/40 backdrop-blur-md relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7c6dfa] to-blue-500 flex items-center justify-center shadow-lg shadow-[#7c6dfa]/20">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <p className="text-sm text-slate-200 font-bold uppercase tracking-widest font-display">
          Admin Panel
        </p>
      </div>

      <div className="flex flex-col gap-1.5 flex-1 mt-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href))

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-sm font-medium
                ${isActive 
                  ? 'bg-gradient-to-r from-[#7c6dfa]/15 to-transparent text-white border border-[#7c6dfa]/20 shadow-[inset_2px_0_0_#7c6dfa]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:shadow-sm border border-transparent'}
              `}
            >
              <div className={isActive ? "text-[#7c6dfa]" : "text-slate-500"}>
                {link.icon}
              </div>
              {link.name}
            </Link>
          )
        })}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-800/50">
        <LogoutButton />
      </div>
    </aside>
  )
}
