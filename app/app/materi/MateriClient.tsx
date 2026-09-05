"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowUpRight,
  GraduationCap,
  Clock,
  Search,
} from "lucide-react"
import type { MateriData } from "@/lib/content"

export default function MateriClient({
  initialMateri,
}: {
  initialMateri: MateriData[]
}) {
  const [search, setSearch] = useState("")
  const [selectedKelas, setSelectedKelas] = useState<string | null>(null)

  const allClasses = Array.from(new Set(initialMateri.map((m) => m.kelas)))

  const filtered = initialMateri.filter((m) => {
    const matchKelas = !selectedKelas || m.kelas === selectedKelas
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
      m.kelas.toLowerCase().includes(search.toLowerCase())
    return matchKelas && matchSearch
  })

  return (
    <main className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Overview</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Open Learning Materials</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Materi Pembelajaran Terbuka
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
            Modul ringkas dan panduan praktis dari pengalaman nyata untuk membantu Anda memahami konsep inti backend dan web development modern.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari materi pembelajaran..."
              className="w-full pl-10 pr-4 py-2.5 text-xs font-mono bg-[#11131a] border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {allClasses.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-mono text-slate-500 mr-1">Kelas:</span>
              <button
                onClick={() => setSelectedKelas(null)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  selectedKelas === null
                    ? "bg-blue-600 text-white font-medium"
                    : "bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                Semua Kelas
              </button>
              {allClasses.map((kelas) => (
                <button
                  key={kelas}
                  onClick={() => setSelectedKelas(selectedKelas === kelas ? null : kelas)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    selectedKelas === kelas
                      ? "bg-blue-600 text-white font-medium"
                      : "bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  {kelas}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cards Grid with Scroll In-View Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((m, idx) => (
              <motion.article
                key={m.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, delay: idx * 0.06, ease: "easeOut" }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group p-6 sm:p-7 rounded-2xl bg-[#11131a] border border-white/10 hover:border-blue-500/40 shadow-xl shadow-black/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 font-semibold">
                      {m.kelas}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                      <Clock className="w-3 h-3" />
                      {m.readingTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-display font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                    <Link href={`/materi/${m.slug}`}>{m.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                    {m.deskripsi}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">{m.date}</span>
                  <Link
                    href={`/materi/${m.slug}`}
                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold group-hover:underline"
                  >
                    <span>Mulai Belajar</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="col-span-full py-16 text-center border border-dashed border-white/10 rounded-2xl">
              <p className="text-slate-400 font-mono text-xs">
                Tidak ada materi yang cocok dengan pencarian saat ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
