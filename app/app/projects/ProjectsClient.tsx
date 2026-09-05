"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ArrowLeft, ArrowUpRight, Sparkles, Calendar } from "lucide-react"
import type { ProjectData } from "@/lib/content"

export default function ProjectsClient({
  initialProjects,
}: {
  initialProjects: ProjectData[]
}) {
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [search, setSearch] = useState("")

  const categories = ["Semua", "Full-Stack", "Backend & ERP", "DevOps & Cloud"]

  const filtered = initialProjects.filter((p) => {
    const matchCategory =
      selectedCategory === "Semua" ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase() ||
      p.tags.some((t) => t.toLowerCase().includes(selectedCategory.toLowerCase()))

    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))

    return matchCategory && matchSearch
  })

  return (
    <main className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumb Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Overview</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Katalog Lengkap</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Karya & Rekayasa Sistem
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Eksplorasi portofolio arsitektur backend, aplikasi web full-stack, modul HRIS & ERP terintegrasi, serta orkestrasi container berbasis Docker Swarm.
          </p>
        </div>

        {/* Controls: Category + Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-[#11131a] border border-white/10 mb-10">
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => {
              const active = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    active
                      ? "bg-blue-600 text-white font-bold shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter teknologi / judul..."
              className="w-full pl-9 pr-3 py-1.5 text-xs font-mono bg-[#0c0d14] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Projects Grid with Scroll In-View Animation */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.article
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative flex flex-col justify-between p-7 rounded-2xl bg-[#11131a] border border-white/10 hover:border-blue-500/40 shadow-xl shadow-black/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-300 font-medium">
                      {project.category || "Full-Stack"}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                      <Calendar className="w-3 h-3" />
                      {project.date || "2024"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.deskripsi}
                  </p>

                  {/* Metrics if available */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-6 p-3 rounded-xl bg-[#0c0d14] border border-white/10">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="text-left">
                          <p className="text-[9px] uppercase font-mono text-slate-400">{m.label}</p>
                          <p className="text-xs font-mono font-bold text-emerald-400">{m.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#161922] text-slate-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold group-hover:underline"
                  >
                    <span>Pelajari Studi Kasus</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <span className="text-slate-400 text-[11px]">
                    Role: {project.role || "Lead Engineer"}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl">
            <p className="text-slate-400 font-mono text-sm">
              Tidak ada proyek yang cocok dengan kata kunci &quot;{search}&quot;.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
