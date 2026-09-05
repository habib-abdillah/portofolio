import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface ProjectData {
  slug: string
  title: string
  deskripsi: string
  tags: string[]
  category?: string
  featured?: boolean
  date?: string
  role?: string
  liveUrl?: string
  githubUrl?: string
  metrics?: { label: string; value: string }[]
  content: string
}

export interface BlogPostData {
  slug: string
  title: string
  deskripsi: string
  tags: string[]
  date: string
  readingTime: string
  content: string
}

export interface MateriData {
  slug: string
  title: string
  kelas: string
  deskripsi: string
  tags: string[]
  date: string
  readingTime: string
  content: string
}

function getContentDirectory(subfolder: string): string {
  const possiblePaths = [
    path.join(/* turbopackIgnore: true */ process.cwd(), "content", subfolder),
    path.join(/* turbopackIgnore: true */ process.cwd(), "app", "content", subfolder),
    path.join(/* turbopackIgnore: true */ process.cwd(), "..", "content", subfolder),
    path.join(/* turbopackIgnore: true */ process.cwd(), "..", "app", "content", subfolder),
  ]

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p
    }
  }

  return possiblePaths[0]
}

function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 180)
  return `${minutes} min read`
}

// ──────────────────── PROJECTS ────────────────────
export function getAllProjects(): ProjectData[] {
  const dir = getContentDirectory("projects")
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"))

  const projects = files.map((file) => {
    const slug = file.replace(".md", "")
    const fullPath = path.join(dir, file)
    const raw = fs.readFileSync(fullPath, "utf-8")
    const { data, content } = matter(raw)

    return {
      slug: data.slug || slug,
      title: data.title || data.judul || slug,
      deskripsi: data.deskripsi || data.description || "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      category: data.category || "Full-Stack",
      featured: Boolean(data.featured),
      date: data.date || "2024",
      role: data.role || "Lead Backend Developer",
      liveUrl: data.liveUrl || "",
      githubUrl: data.githubUrl || "",
      metrics: data.metrics || [],
      content,
    }
  })

  return projects.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
}

export function getProjectBySlug(slug: string): ProjectData | null {
  const projects = getAllProjects()
  return projects.find((p) => p.slug === slug) || null
}

// ──────────────────── BLOG ────────────────────
export function getAllPosts(): BlogPostData[] {
  const dir = getContentDirectory("blog")
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"))

  const posts = files.map((file) => {
    const slug = file.replace(".md", "")
    const fullPath = path.join(dir, file)
    const raw = fs.readFileSync(fullPath, "utf-8")
    const { data, content } = matter(raw)

    const title = data.title || data.judul || content.split("\n")[0]?.replace(/^#\s+/, "") || slug
    const deskripsi = data.deskripsi || data.description || content.split("\n").slice(1, 4).join(" ").trim()

    return {
      slug: data.slug || slug,
      title,
      deskripsi,
      tags: Array.isArray(data.tags) ? data.tags : [],
      date: data.date || "2024-07-21",
      readingTime: calculateReadingTime(content),
      content,
    }
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPostData | null {
  const posts = getAllPosts()
  return posts.find((p) => p.slug === slug) || null
}

// ──────────────────── MATERI ────────────────────
export function getAllMateri(): MateriData[] {
  const dir = getContentDirectory("materi")
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"))

  const materi = files.map((file) => {
    const slug = file.replace(".md", "")
    const fullPath = path.join(dir, file)
    const raw = fs.readFileSync(fullPath, "utf-8")
    const { data, content } = matter(raw)

    const title = data.judul || data.title || content.split("\n")[0]?.replace(/^#\s+/, "") || slug
    const deskripsi = data.deskripsi || data.description || ""
    const kelas = data.kelas || "Umum"

    return {
      slug: data.slug || slug,
      title,
      kelas,
      deskripsi,
      tags: Array.isArray(data.tags) ? data.tags : [kelas],
      date: data.date || "2024-06-15",
      readingTime: calculateReadingTime(content),
      content,
    }
  })

  return materi
}

export function getMateriBySlug(slug: string): MateriData | null {
  const list = getAllMateri()
  return list.find((m) => m.slug === slug) || null
}

// ──────────────────── ABOUT ────────────────────
export function getAboutContent(): string {
  const possiblePaths = [
    path.join(/* turbopackIgnore: true */ process.cwd(), "content", "about.md"),
    path.join(/* turbopackIgnore: true */ process.cwd(), "app", "content", "about.md"),
  ]

  for (const p of possiblePaths) {
    if (fs.existsSync(p) && !fs.statSync(p).isDirectory()) {
      const raw = fs.readFileSync(p, "utf-8")
      const { content } = matter(raw)
      return content
    }
  }

  return `Saya Muhammad Habib Abdillah — Full-Stack Developer dengan spesialisasi di PHP, Laravel, Node.js, Next.js, dan arsitektur sistem informasi modular yang scalable.`
}
