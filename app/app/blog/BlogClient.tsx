"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Search, BookOpen } from "lucide-react"
import type { BlogPostData } from "@/lib/content"

export default function BlogClient({
  initialPosts,
}: {
  initialPosts: BlogPostData[]
}) {
  const [search, setSearch] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Extract all unique tags
  const allTags = Array.from(new Set(initialPosts.flatMap((p) => p.tags)))

  const filtered = initialPosts.filter((post) => {
    const matchTag = !selectedTag || post.tags.includes(selectedTag)
    const matchSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    return matchTag && matchSearch
  })

  return (
    <main className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">
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
            <BookOpen className="w-3.5 h-3.5" />
            <span>Engineering Notes</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Catatan & Tulisan Rekayasa
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
            Berbagi pengalaman implementasi arsitektur sistem, migrasi database ke static markdown, performa web, dan best practices software engineering.
          </p>
        </div>

        {/* Search & Tag Filter */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul artikel atau topik..."
              className="w-full pl-10 pr-4 py-2.5 text-xs font-mono bg-[#11131a] border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-mono text-slate-500 mr-1">Filter Tag:</span>
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  selectedTag === null
                    ? "bg-blue-600 text-white font-medium"
                    : "bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                Semua
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    selectedTag === tag
                      ? "bg-blue-600 text-white font-medium"
                      : "bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Posts List with Scroll Animation */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, delay: idx * 0.06, ease: "easeOut" }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group p-6 rounded-2xl bg-[#11131a] border border-white/10 hover:border-blue-500/40 shadow-xl shadow-black/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20"
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

                  <h2 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {post.deskripsi}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold group-hover:underline"
                  >
                    <span>Baca Artikel Penuh</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl">
              <p className="text-slate-400 font-mono text-xs">
                Tidak ada artikel yang cocok dengan filter saat ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
