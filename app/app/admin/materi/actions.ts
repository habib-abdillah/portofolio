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

export async function createMateri(data: {
  judul: string
  slug: string
  deskripsi: string
  content: string
  kelasId: string
  isPublished: boolean
}) {
  await prisma.materi.create({ data })
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
  await prisma.materi.update({ where: { id }, data })
  revalidatePath("/admin/materi")
  revalidatePath("/materi")
}

export async function deleteMateri(id: string) {
  await prisma.materi.delete({ where: { id } })
  revalidatePath("/admin/materi")
  revalidatePath("/materi")
}

export async function togglePublish(id: string, isPublished: boolean) {
  await prisma.materi.update({
    where: { id },
    data: { isPublished: !isPublished },
  })
  revalidatePath("/admin/materi")
  revalidatePath("/materi")
}
