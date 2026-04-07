import MarkdownRenderer from "@/components/MarkdownRenderer"
import Link from "next/link"
const WORKER_URL = process.env.WORKER_URL

function readingTime(content: string): string {
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} menit baca`
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const res = await fetch(`${WORKER_URL}/api/blog/${slug}`, {
    next: { revalidate: 86400 },
  })

  if (!res.ok) return <div className="text-white p-20">Artikel tidak ditemukan.</div>

  const blog = await res.json()

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <Link 
        href="/blog" 
        className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors mb-10"
      >
        <span>←</span> Kembali ke daftar Blog
      </Link>

      <div className="flex gap-2 mb-4">
        {blog.tags?.map((tag: string) => (
          <span
            key={tag}
            className="text-[10px] bg-[#7c6dfa]/15 text-[#a99ff7] px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className="font-display text-4xl font-bold text-white mb-4">
        {blog.judul}
      </h1>
      <p className="text-[#555] text-sm mb-12">
        {new Date(blog.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        {" · "}
        {readingTime(blog.content)}
      </p>

      <MarkdownRenderer content={blog.content} />
    </main>
  )
}
