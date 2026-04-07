"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { createBlog } from "../actions"

// Load markdown editor hanya di client
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

export default function BlogForm({
  initialData,
}: {
  initialData?: {
    id: string
    judul: string
    slug: string
    deskripsi: string
    content: string
    tags: string[]
    isPublished: boolean
  }
} = {}) {
  const router = useRouter()
  const [judul, setJudul] = useState(initialData?.judul ?? "")
  const [slug, setSlug] = useState(initialData?.slug ?? "")
  const [deskripsi, setDeskripsi] = useState(initialData?.deskripsi ?? "")
  const [content, setContent] = useState(initialData?.content ?? "")
  const [tagsStr, setTagsStr] = useState(initialData?.tags?.join(", ") ?? "")
  const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? false)
  const [loading, setLoading] = useState(false)

  // Auto-generate slug dari judul
  const handleJudulChange = (val: string) => {
    setJudul(val)
    if (!initialData) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .trim()
      )
    }
  }

  const handleSubmit = async () => {
    if (!judul || !slug || !content) return
    const tags = tagsStr.split(",").map(t => t.trim()).filter(Boolean)
    setLoading(true)
    if (initialData?.id) {
       const { updateBlog } = await import("../actions")
       await updateBlog(initialData.id, { judul, slug, deskripsi, content, tags, isPublished })
    } else {
       await createBlog({ judul, slug, deskripsi, content, tags, isPublished })
    }
    router.push("/admin/blog")
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-8">
        Tambah Blog
      </h1>

      <div className="space-y-4 max-w-3xl">
        {/* Judul */}
        <div>
          <label className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1 block">Judul</label>
          <input
            value={judul}
            onChange={(e) => handleJudulChange(e.target.value)}
            placeholder="Mengenal Docker untuk Pemula"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder:text-slate-400 font-medium outline-none focus:border-[#7c6dfa]/50"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1 block">Slug (URL)</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="mengenal-docker-untuk-pemula"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder:text-slate-400 font-medium outline-none focus:border-[#7c6dfa]/50"
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1 block">Deskripsi singkat</label>
          <input
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Ringkasan singkat artikel blog ini"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder:text-slate-400 font-medium outline-none focus:border-[#7c6dfa]/50"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1 block">Tags (pisahkan dengan koma)</label>
          <input
            value={tagsStr}
            onChange={(e) => setTagsStr(e.target.value)}
            placeholder="Docker, DevOps, Pemula"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder:text-slate-400 font-medium outline-none focus:border-[#7c6dfa]/50"
          />
        </div>

        {/* Markdown editor */}
        <div data-color-mode="dark">
          <label className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1 block">Konten (Markdown)</label>
          <MDEditor
            value={content}
            onChange={(val) => setContent(val ?? "")}
            height={400}
          />
        </div>

        {/* Publish toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="publish"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="publish" className="text-sm text-[#888]">
            Langsung publish
          </label>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#7c6dfa] text-white px-6 py-2 rounded-lg text-sm hover:bg-[#6a5ce8] transition-colors disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Blog"}
        </button>
      </div>
    </div>
  )
}
