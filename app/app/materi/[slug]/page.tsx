import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar } from "lucide-react"
import { getAllMateri, getMateriBySlug } from "@/lib/content"
import MarkdownRenderer from "@/components/MarkdownRenderer"

export async function generateStaticParams() {
  const list = getAllMateri()
  return list.map((m) => ({
    slug: m.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const materi = getMateriBySlug(slug)
  if (!materi) return { title: "Materi Tidak Ditemukan" }

  return {
    title: `${materi.title} — Silabus Pembelajaran`,
    description: materi.deskripsi,
  }
}

export default async function MateriDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const materi = getMateriBySlug(slug)

  if (!materi) {
    notFound()
  }

  return (
    <main className="min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Navigation Back */}
        <Link
          href="/materi"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Daftar Materi</span>
        </Link>

        {/* Header */}
        <header className="space-y-4 mb-10 pb-8 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-semibold">
              {materi.kelas}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            {materi.title}
          </h1>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              {materi.date}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              {materi.readingTime}
            </span>
            <span>·</span>
            <span>Materi Pembelajaran Terbuka</span>
          </div>
        </header>

        {/* Body */}
        <article className="mb-16">
          <MarkdownRenderer content={materi.content} />
        </article>

        {/* Footer Navigation */}
        <div className="p-6 rounded-2xl bg-[#11131a] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/materi"
            className="text-xs font-mono text-blue-400 hover:text-blue-300 font-semibold"
          >
            ← Kembali ke Silabus Lengkap
          </Link>
          <Link
            href="/#contact"
            className="text-xs font-mono text-slate-400 hover:text-white"
          >
            Tanya Seputar Materi Ini →
          </Link>
        </div>
      </div>
    </main>
  )
}