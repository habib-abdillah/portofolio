"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react"
import type { ProjectData } from "@/lib/content"

interface ProjectsSectionProps {
  projects: ProjectData[]
}

const categories = ["Semua", "Full-Stack", "Backend & ERP", "DevOps & Cloud"]

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("Semua")

  const filteredProjects =
    selectedCategory === "Semua"
      ? projects
      : projects.filter(
          (p) =>
            p.category?.toLowerCase() === selectedCategory.toLowerCase() ||
            p.tags.some((t) => t.toLowerCase().includes(selectedCategory.toLowerCase()))
        )

  return (
    <section id="projects" className="relative py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header with Scroll In-View Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Proyek & Rekayasa Sistem
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
              Koleksi sistem informasi nyata, modul enterprise, dan infrastruktur container yang dirancang modular, scalable, dan maintainable.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-blue-300 group"
          >
            <span>Lihat Semua Proyek</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs font-medium font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  isSelected
                    ? "text-white"
                    : "text-slate-400 hover:text-white bg-[#11131a] border border-white/10"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="project-cat-pill"
                    className="absolute inset-0 rounded-xl bg-blue-600 shadow-sm -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            )
          })}
        </motion.div>

        {/* Projects Grid with Scroll Animation */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#11131a] border border-white/10 hover:border-blue-500/40 shadow-xl shadow-black/40 transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Category & Year */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-300 font-medium">
                      {project.category || "Full-Stack"}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                      <Calendar className="w-3 h-3" />
                      {project.date || "2024"}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-blue-400 transition-colors mb-2.5">
                    <Link href={`/projects/${project.slug}`} className="focus:outline-none">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
                    {project.deskripsi}
                  </p>

                  {/* Metrics if available */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6 p-3 rounded-xl bg-[#0d0e14] border border-white/10">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="text-left">
                          <p className="text-[10px] uppercase font-mono text-slate-400">{m.label}</p>
                          <p className="text-xs font-mono font-bold text-emerald-400">{m.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
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

                {/* Bottom Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold group-hover:underline"
                  >
                    <span>Pelajari Studi Kasus</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <span className="text-slate-400 text-[11px]">
                    Role: {project.role || "Lead Engineer"}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
