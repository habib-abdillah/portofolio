import { neon } from "@neondatabase/serverless"
import { notFound } from "next/navigation"
import BlogForm from "../../_components/BlogForm"

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sql = neon(process.env.DATABASE_URL!)
  const blogResult = await sql`SELECT * FROM "Blog" WHERE id = ${id}`
  const blog = blogResult && blogResult.length > 0 ? blogResult[0] : null

  if (!blog) {
    notFound()
  }

  return <BlogForm initialData={blog as any} />
}
