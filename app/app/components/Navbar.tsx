"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Code2,
  Menu,
  X,
  ArrowUpRight,
  Terminal,
  BookOpen,
  Briefcase,
  Layers,
  Send,
} from "lucide-react"

const navItems = [
  { name: "Overview", href: "/", icon: Terminal },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Skills", href: "/#skills", icon: Layers },
  { name: "Materi", href: "/materi", icon: BookOpen },
  { name: "Blog", href: "/blog", icon: Code2 },
  { name: "Contact", href: "/#contact", icon: Send },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (pathname?.startsWith("/admin")) return null

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-3 pb-2">
        <div
          className={`relative flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl transition-all duration-300 ${
            scrolled
              ? "bg-[#0c101d]/85 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/40"
              : "bg-[#0c101d]/40 backdrop-blur-md border border-white/5"
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-display text-base sm:text-lg font-bold tracking-tight text-white focus:outline-none"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-white text-xs font-mono font-black">H</span>
            </span>
            <span className="flex items-center">
              HABIB
              <span className="text-blue-500">.</span>
              <span className="text-xs font-mono font-normal text-slate-400 ml-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/5">
                dev
              </span>
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/5">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href) && item.href !== "/#skills" && item.href !== "/#contact"

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-pill"
                      className="absolute inset-0 rounded-lg bg-blue-600/20 border border-blue-500/30 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Right Action: Status indicator & Quick Contact */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available</span>
            </div>

            <Link
              href="/#contact"
              className="group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
            >
              <span>Hubungi</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 p-4 rounded-2xl bg-[#0e1220]/95 backdrop-blur-2xl border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                <span className="text-xs text-slate-400 font-mono">Navigasi Utama</span>
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Work
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-blue-500" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
                >
                  Hubungi Sekarang
                </Link>
                <a
                  href="/cv.pdf"
                  download
                  className="w-full text-center py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Download CV
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
