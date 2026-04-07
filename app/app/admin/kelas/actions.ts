"use server"

import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"
// Import crypto for generating cuid-like IDs (we will just use native crypto.randomUUID instead of cuid)

export async function createKelas(nama: string) {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    console.log("Mencoba membuat kelas:", nama);
    // Convert to UUID since prisma default cuid generates strings, but text works fine for ID
    const id = crypto.randomUUID();
    const result = await sql`INSERT INTO "Kelas" (id, nama, "createdAt") VALUES (${id}, ${nama}, NOW()) RETURNING *`;
    console.log("Berhasil insert kelas:", result);
    revalidatePath("/admin/kelas")
  } catch (error) {
    console.error("Gagal create kelas:", error);
  }
}

export async function deleteKelas(id: string) {
  const sql = neon(process.env.DATABASE_URL!)
  await sql`DELETE FROM "Kelas" WHERE id = ${id}`
  revalidatePath("/admin/kelas")
}
