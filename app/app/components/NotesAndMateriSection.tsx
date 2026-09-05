"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Code2,
  Search,
  Calendar,
  Clock,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react"
import type { BlogPostData, MateriData } from "@/lib/content"

interface NotesAndMateriSectionProps {
  posts: BlogPostData[]
  materi: MateriData[]
}

export default function NotesAndMateriSection({
  posts,
  materi,
}: NotesAndMateriSectionProps) {
  const [activeTab, setActiveTab] = useState<"blog" | "materi">("blog")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredMateri = materi.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.kelas.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <section id="notes" className="relative py-24 scroll-mt-16 bg-[#0c0d14]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Knowledge Hub</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Catatan & Materi Rekayasa
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
              Dokumentasi pengalaman lapangan, insight backend, dan panduan belajar teknis terbuka seputar ekosistem web modern.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/blog"
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white border border-white/10 transition-colors"
            >
              Semua Blog →
            </Link>
            <Link
              href="/materi"
              className="px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-xs font-mono text-blue-300 hover:text-white border border-blue-500/30 transition-colors"
            >
              Semua Materi →
            </Link>
          </div>
        </motion.div>

        {/* Tab Switcher & Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-[#11131a] border border-white/10 mb-8"
        >
          <div className="flex items-center gap-1 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("blog")}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer w-full sm:w-auto justify-center ${
                activeTab === "blog" ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {activeTab === "blog" && (
                <motion.span
                  layoutId="hub-tab-pill"
                  className="absolute inset-0 rounded-xl bg-blue-600 shadow-sm -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Code2 className="w-3.5 h-3.5" />
              <span>Engineering Blog ({posts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("materi")}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer w-full sm:w-auto justify-center ${
                activeTab === "materi" ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {activeTab === "materi" && (
                <motion.span
                  layoutId="hub-tab-pill"
                  className="absolute inset-0 rounded-xl bg-blue-600 shadow-sm -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Materi Terbuka ({materi.length})</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Cari dalam ${activeTab}...`}
              className="w-full pl-9 pr-3 py-1.5 text-xs font-mono bg-[#0c0d14] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </motion.div>

        {/* Content List with Scroll Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="wait">
            {activeTab === "blog" && (
              <>
                {filteredPosts.map((post, idx) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="group p-6 rounded-2xl bg-[#11131a] border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between shadow-lg shadow-black/30"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                          <Clock className="w-3 h-3" />
                          {post.readingTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-display font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4">
                        {post.deskripsi}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 group-hover:underline"
                      >
                        <span>Baca Artikel</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
                {filteredPosts.length === 0 && (
                  <div className="col-span-full py-12 text-center text-slate-400 font-mono text-xs border border-dashed border-white/10 rounded-2xl">
                    Tidak ada artikel yang cocok dengan pencarian &quot;{searchQuery}&quot;.
                  </div>
                )}
              </>
            )}

            {activeTab === "materi" && (
              <>
                {filteredMateri.map((mat, idx) => (
                  <motion.article
                    key={mat.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="group p-6 rounded-2xl bg-[#11131a] border border-white/10 hover:border-sky-500/40 transition-all flex flex-col justify-between shadow-lg shadow-black/30"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 font-semibold">
                          {mat.kelas}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                          <Clock className="w-3 h-3" />
                          {mat.readingTime}
                        </span>
                      </div>

                      <h3 className="text-lg font-display font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                        <Link href={`/materi/${mat.slug}`}>{mat.title}</Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4">
                        {mat.deskripsi}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">{mat.date}</span>
                      <Link
                        href={`/materi/${mat.slug}`}
                        className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 group-hover:underline"
                      >
                        <span>Buka Silabus</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
                {filteredMateri.length === 0 && (
                  <div className="col-span-full py-12 text-center text-slate-400 font-mono text-xs border border-dashed border-white/10 rounded-2xl">
                    Tidak ada modul materi yang cocok dengan pencarian &quot;{searchQuery}&quot;.
                  </div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
