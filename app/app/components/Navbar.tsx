"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  // Sembunyikan navbar di area admin
  if (pathname?.startsWith("/admin")) return null

  return (
    <nav className="
      sticky top-0 z-50
      flex justify-between items-center
      px-6 md:px-16 py-4
      border-b border-white/5
      backdrop-blur-md bg-[#0a0a0f]/80
    ">
      <Link href="/" className="font-display font-extrabold text-lg tracking-tight text-white">
        DEV<span className="text-[#7c6dfa]">.</span>portofolio
      </Link>

      <ul className="hidden md:flex gap-8 list-none">
        {['About', 'Skills', 'Projects', 'Materi', 'Blog', 'Contact'].map((item) => (
          <li key={item}>
            <Link
              href={
                item === 'Materi' ? '/materi' :
                item === 'Blog' ? '/blog' :
                `/#${item.toLowerCase()}`
              }
              className="
                text-sm text-[#888] tracking-widest uppercase
                hover:text-white transition-colors duration-200
              "
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
