import MarkdownRenderer from "@/components/MarkdownRenderer"
import Link from "next/link"

const WORKER_URL = process.env.WORKER_URL

export default async function MateriDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const res = await fetch(`${WORKER_URL}/api/materi/${slug}`, {
    next: { revalidate: 86400 },
  })

  if (!res.ok) return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <h1 className="text-2xl text-white font-bold mb-4">Materi tidak ditemukan.</h1>
      <Link href="/materi" className="text-[#7c6dfa] hover:underline">
        ← Kembali ke daftar materi
      </Link>
    </div>
  )

  const materi = await res.json()

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <Link 
        href="/materi" 
        className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors mb-10"
      >
        <span>←</span> Kembali ke daftar Materi
      </Link>

      <p className="text-xs text-[#7c6dfa] mb-2 font-semibold tracking-wider uppercase">
        {materi.kelas?.nama}
      </p>
      <h1 className="font-display text-4xl font-bold text-white mb-4">
        {materi.judul}
      </h1>
      <p className="text-[#555] text-sm mb-12">
        Diperbarui pada {new Date(materi.updatedAt || materi.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <div className="prose prose-invert prose-slate max-w-none">
        <MarkdownRenderer content={materi.content} />
      </div>
    </main>
  )
}
