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

export async function createBlog(data: {
  judul: string
  slug: string
  deskripsi: string
  content: string
  tags: string[]
  isPublished: boolean
}) {
  await prisma.blog.create({ data })
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
  await prisma.blog.update({ where: { id }, data })
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}

export async function deleteBlog(id: string) {
  await prisma.blog.delete({ where: { id } })
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}

export async function togglePublishBlog(id: string, isPublished: boolean) {
  await prisma.blog.update({
    where: { id },
    data: { isPublished: !isPublished },
  })
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}
