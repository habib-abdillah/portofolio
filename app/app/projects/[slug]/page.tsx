import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import { getAllProjects, getProjectBySlug } from "@/lib/content"
import MarkdownRenderer from "@/components/MarkdownRenderer"

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((p) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: "Proyek Tidak Ditemukan" }

  return {
    title: `${project.title} — Studi Kasus Rekayasa`,
    description: project.deskripsi,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Navigation Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Katalog Proyek</span>
        </Link>

        {/* Case Study Header Card */}
        <header className="p-6 sm:p-10 rounded-3xl bg-[#11131a] border border-white/10 shadow-xl relative overflow-hidden mb-12">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono font-medium">
                {project.category || "Case Study"}
              </span>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.date || "2024"}
                </span>
                <span>·</span>
                <span>Role: {project.role || "Lead Architect"}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              {project.deskripsi}
            </p>

            {/* Metrics if present */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#0c0d14] border border-white/10"
                  >
                    <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">
                      {m.label}
                    </p>
                    <p className="text-lg sm:text-xl font-display font-bold text-emerald-400">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-[#161922] text-slate-300 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Case Study Content */}
        <section className="p-6 sm:p-10 rounded-3xl bg-[#11131a] border border-white/10 mb-16">
          <MarkdownRenderer content={project.content} />
        </section>

        {/* Bottom Call to Action */}
        <div className="p-8 rounded-3xl bg-[#11131a] border border-white/10 text-center space-y-4">
          <h3 className="text-2xl font-display font-bold text-white">
            Tertarik Mengembangkan Arsitektur Serupa?
          </h3>
          <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Mari jadwalkan diskusi teknis mengenai kebutuhan sistem informasi, modularitas ERP, atau otomatisasi cloud server Anda.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/#contact"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase font-bold tracking-wider transition-colors shadow-sm"
            >
              Mulai Diskusi Teknis →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
