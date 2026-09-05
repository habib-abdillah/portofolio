"use client"

import Link from "next/link"
import { ArrowUp, Mail, MessageSquare } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "./Icons"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="w-full border-t border-white/10 bg-[#08090d] relative z-10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-white"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-mono text-xs font-bold shadow-sm">
                H
              </span>
              <span>
                HABIB<span className="text-blue-500">.</span>dev
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Full-Stack Developer & Systems Architect berfokus pada sistem informasi modular, skalabilitas backend dengan Laravel, dan antarmuka modern Next.js.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-slate-400">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Based in Indonesia (UTC+7)</span>
              <span>·</span>
              <span>Zero Database (100% Static SSG)</span>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-slate-300 font-semibold mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Overview & Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Selected Works
                </Link>
              </li>
              <li>
                <Link href="/materi" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Materi Pembelajaran
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Catatan & Blog
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Tentang Saya
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Col */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-widest text-slate-300 font-semibold mb-4">
              Koneksi
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://github.com/habib-abdillah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-blue-500" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/mhabibabdillah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-500" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:muhabibabd@gmail.com"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>muhabibabd@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Direct</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Muhammad Habib Abdillah. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Crafted with Next.js 16, React 19 & Framer Motion</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
              aria-label="Kembali ke atas"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
