"use server"

import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"

export async function createMateri(data: {
  judul: string
  slug: string
  deskripsi: string
  content: string
  kelasId: string
  isPublished: boolean
}) {
  const sql = neon(process.env.DATABASE_URL!)
  const id = crypto.randomUUID()
  await sql`
    INSERT INTO "Materi" (id, judul, slug, deskripsi, content, "kelasId", "isPublished", "createdAt", "updatedAt") 
    VALUES (${id}, ${data.judul}, ${data.slug}, ${data.deskripsi}, ${data.content}, ${data.kelasId}, ${data.isPublished}, NOW(), NOW())
  `
  revalidatePath("/admin/materi")
  revalidatePath("/materi")
}

export async function updateMateri(id: string, data: {
  judul: string
  slug: string
  deskripsi: string
  content: string
  kelasId: string
  isPublished: boolean
}) {
  const sql = neon(process.env.DATABASE_URL!)
  await sql`
    UPDATE "Materi" 
    SET judul = ${data.judul}, slug = ${data.slug}, deskripsi = ${data.deskripsi}, content = ${data.content}, "kelasId" = ${data.kelasId}, "isPublished" = ${data.isPublished}, "updatedAt" = NOW()
    WHERE id = ${id}
  `
  revalidatePath("/admin/materi")
  revalidatePath("/materi")
}

export async function deleteMateri(id: string) {
  const sql = neon(process.env.DATABASE_URL!)
  await sql`DELETE FROM "Materi" WHERE id = ${id}`
  revalidatePath("/admin/materi")
  revalidatePath("/materi")
}

export async function togglePublish(id: string, isPublished: boolean) {
  const sql = neon(process.env.DATABASE_URL!)
  await sql`UPDATE "Materi" SET "isPublished" = ${!isPublished}, "updatedAt" = NOW() WHERE id = ${id}`
  revalidatePath("/admin/materi")
  revalidatePath("/materi")
}
