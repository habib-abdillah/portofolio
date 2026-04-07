"use server"

import { PrismaClient } from "@/app/generated/prisma/client"
import { PrismaNeonHttp } from "@prisma/adapter-neon"
import { revalidatePath } from "next/cache"

const neonAdapter = new PrismaNeonHttp(process.env.DATABASE_URL!, {
  arrayMode: false,
  fullResults: false,
})
// @ts-ignore
const prisma = new PrismaClient({ adapter: neonAdapter })

export async function createKelas(nama: string) {
  try {
    console.log("Mencoba membuat kelas:", nama);
    const result = await prisma.kelas.create({ data: { nama } });
    console.log("Berhasil insert kelas:", result);
    revalidatePath("/admin/kelas")
  } catch (error) {
    console.error("Gagal create kelas:", error);
  }
}

export async function deleteKelas(id: string) {
  await prisma.kelas.delete({ where: { id } })
  revalidatePath("/admin/kelas")
}
