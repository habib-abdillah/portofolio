"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { createMateri } from "../actions"

// Load markdown editor hanya di client
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

interface Kelas {
  id: string
  nama: string
}

export default function MateriForm({
  kelasList,
  initialData
}: {
  kelasList: Kelas[]
  initialData?: {
    id: string
    judul: string
    slug: string
    deskripsi: string
    content: string
    kelasId: string
    isPublished: boolean
  }
}) {
  const router = useRouter()
  const [judul, setJudul] = useState(initialData?.judul ?? "")
  const [slug, setSlug] = useState(initialData?.slug ?? "")
  const [deskripsi, setDeskripsi] = useState(initialData?.deskripsi ?? "")
  const [content, setContent] = useState(initialData?.content ?? "")
  const [kelasId, setKelasId] = useState(initialData?.kelasId ?? (kelasList[0]?.id ?? ""))
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
    if (!judul || !slug || !content || !kelasId) return
    setLoading(true)
    if (initialData?.id) {
       // Need to import updateMateri in standard actions, assuming it exists
       const { updateMateri } = await import("../actions")
       await updateMateri(initialData.id, { judul, slug, deskripsi, content, kelasId, isPublished })
    } else {
       await createMateri({ judul, slug, deskripsi, content, kelasId, isPublished })
    }
    router.push("/admin/materi")
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-8">
        Tambah Materi
      </h1>

      <div className="space-y-4 max-w-3xl">
        {/* Judul */}
        <div>
          <label className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1 block">Judul</label>
          <input
            value={judul}
            onChange={(e) => handleJudulChange(e.target.value)}
            placeholder="Pengenalan Laravel"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder:text-slate-400 font-medium outline-none focus:border-[#7c6dfa]/50"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1 block">Slug (URL)</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="pengenalan-laravel"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder:text-slate-400 font-medium outline-none focus:border-[#7c6dfa]/50"
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1 block">Deskripsi singkat</label>
          <input
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Ringkasan singkat materi ini"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder:text-slate-400 font-medium outline-none focus:border-[#7c6dfa]/50"
          />
        </div>

        {/* Kelas */}
        <div>
          <label className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1 block">Kelas</label>
          <select
            value={kelasId}
            onChange={(e) => setKelasId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white outline-none focus:border-[#7c6dfa]/50"
          >
            {kelasList.map((k) => (
              <option key={k.id} value={k.id}>{k.nama}</option>
            ))}
          </select>
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
          {loading ? "Menyimpan..." : "Simpan Materi"}
        </button>
      </div>
    </div>
  )
}
