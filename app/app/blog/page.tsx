import { getAllPosts } from "@/lib/content"
import BlogClient from "./BlogClient"

export const metadata = {
  title: "Catatan Rekayasa & Engineering Blog",
  description:
    "Kumpulan tulisan teknis, arsitektur backend, Next.js, dan optimasi performa web oleh Muhammad Habib Abdillah.",
}

export default function BlogPage() {
  const posts = getAllPosts()
  return <BlogClient initialPosts={posts} />
}