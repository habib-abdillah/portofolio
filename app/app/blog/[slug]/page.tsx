import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { getAllPosts, getPostBySlug } from "@/lib/content"
import MarkdownRenderer from "@/components/MarkdownRenderer"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((p) => ({
    slug: p.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Artikel Tidak Ditemukan" }

  return {
    title: `${post.title} — Blog Rekayasa`,
    description: post.deskripsi,
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Navigation Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Daftar Tulisan</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4 mb-10 pb-8 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              {post.date}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              {post.readingTime}
            </span>
            <span>·</span>
            <span>Ditulis oleh Muhammad Habib Abdillah</span>
          </div>
        </header>

        {/* Article Body */}
        <article className="mb-16">
          <MarkdownRenderer content={post.content} />
        </article>

        {/* Author Bio Box */}
        <div className="p-6 rounded-2xl bg-[#11131a] border border-white/10 flex flex-col sm:flex-row items-center gap-5 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-display font-black text-2xl shrink-0 shadow-sm">
            H
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-display font-bold text-white">
              Muhammad Habib Abdillah
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full-Stack Developer & Systems Architect. Berfokus pada sistem informasi modular, Laravel, Next.js, dan optimasi arsitektur cloud.
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs font-mono">
          <Link
            href="/blog"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            ← Lihat Tulisan Lainnya
          </Link>
          <Link
            href="/#contact"
            className="text-slate-400 hover:text-white"
          >
            Diskusi Pertanyaan Teknis →
          </Link>
        </div>
      </div>
    </main>
  )
}