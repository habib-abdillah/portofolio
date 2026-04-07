"use server"

import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"

export async function createBlog(data: {
  judul: string
  slug: string
  deskripsi: string
  content: string
  tags: string[]
  isPublished: boolean
}) {
  const sql = neon(process.env.DATABASE_URL!)
  const id = crypto.randomUUID()
  await sql`
    INSERT INTO "Blog" (id, judul, slug, deskripsi, content, tags, "isPublished", "createdAt", "updatedAt") 
    VALUES (${id}, ${data.judul}, ${data.slug}, ${data.deskripsi}, ${data.content}, ${data.tags}, ${data.isPublished}, NOW(), NOW())
  `
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}

export async function updateBlog(id: string, data: {
  judul: string
  slug: string
  deskripsi: string
  content: string
  tags: string[]
  isPublished: boolean
}) {
  const sql = neon(process.env.DATABASE_URL!)
  await sql`
    UPDATE "Blog" 
    SET judul = ${data.judul}, slug = ${data.slug}, deskripsi = ${data.deskripsi}, content = ${data.content}, tags = ${data.tags}, "isPublished" = ${data.isPublished}, "updatedAt" = NOW()
    WHERE id = ${id}
  `
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}

export async function deleteBlog(id: string) {
  const sql = neon(process.env.DATABASE_URL!)
  await sql`DELETE FROM "Blog" WHERE id = ${id}`
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}

export async function togglePublishBlog(id: string, isPublished: boolean) {
  const sql = neon(process.env.DATABASE_URL!)
  await sql`UPDATE "Blog" SET "isPublished" = ${!isPublished}, "updatedAt" = NOW() WHERE id = ${id}`
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}
