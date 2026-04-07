import Link from "next/link"
import { neon } from "@neondatabase/serverless"
import { deleteBlog, togglePublishBlog } from "./actions"

export default async function BlogAdminPage() {
  const sql = neon(process.env.DATABASE_URL!)
  const blogList = await sql`SELECT * FROM "Blog" ORDER BY "createdAt" DESC`

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-2xl font-bold text-white">
          Kelola Blog
        </h1>
        <Link
          href="/admin/blog/baru"
          className="bg-[#7c6dfa] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#6a5ce8] transition-colors"
        >
          + Tambah Blog
        </Link>
      </div>

      <div className="space-y-2">
        {blogList.map((blog: any) => (
          <div
            key={blog.id}
            className="bg-[#111118] border border-white/7 rounded-xl px-4 py-3 flex justify-between items-center"
          >
            <div>
              <p className="text-white text-sm font-medium">{blog.judul}</p>
              <div className="flex gap-2 mt-1">
                {blog.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-[#7c6dfa]/15 text-[#a99ff7] px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Toggle publish */}
              <form
                action={async () => {
                  "use server"
                  await togglePublishBlog(blog.id, blog.isPublished)
                }}
              >
                <button
                  type="submit"
                  className={`text-xs px-3 py-1 rounded-full transition-colors ${
                    blog.isPublished
                      ? "bg-green-500/15 text-green-400"
                      : "bg-white/5 text-[#555]"
                  }`}
                >
                  {blog.isPublished ? "Published" : "Draft"}
                </button>
              </form>

              <Link
                href={`/admin/blog/${blog.id}/edit`}
                className="text-xs text-[#7c6dfa] hover:underline"
              >
                Edit
              </Link>

              <form
                action={async () => {
                  "use server"
                  await deleteBlog(blog.id)
                }}
              >
                <button
                  type="submit"
                  className="text-xs text-red-500 hover:text-red-400 transition-colors"
                >
                  Hapus
                </button>
              </form>
            </div>
          </div>
        ))}

        {blogList.length === 0 && (
          <p className="text-[#444] text-sm">Belum ada blog.</p>
        )}
      </div>
    </div>
  )
}
