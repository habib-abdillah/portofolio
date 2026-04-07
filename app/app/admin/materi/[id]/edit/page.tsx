import { PrismaClient } from "@/app/generated/prisma/client"
import { PrismaNeonHttp } from "@prisma/adapter-neon"
import { notFound } from "next/navigation"
import MateriForm from "../../_components/MateriForm"

const neonAdapter = new PrismaNeonHttp(process.env.DATABASE_URL!, {
  arrayMode: false,
  fullResults: false,
})
// @ts-ignore
const prisma = new PrismaClient({ adapter: neonAdapter })

export default async function EditMateriPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [kelasList, materi] = await Promise.all([
    prisma.kelas.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.materi.findUnique({ where: { id } })
  ])

  if (!materi) {
    notFound()
  }

  return <MateriForm kelasList={kelasList as any} initialData={materi as any} />
}
