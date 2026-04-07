import { PrismaClient } from "@/app/generated/prisma/client"
import { PrismaNeonHttp } from "@prisma/adapter-neon"
import MateriForm from "../_components/MateriForm"

const neonAdapter = new PrismaNeonHttp(process.env.DATABASE_URL!, {
  arrayMode: false,
  fullResults: false,
})
// @ts-ignore
const prisma = new PrismaClient({ adapter: neonAdapter })

export default async function TambahMateriPage() {
  const kelasList = await prisma.kelas.findMany()
  return <MateriForm kelasList={kelasList} />
}
