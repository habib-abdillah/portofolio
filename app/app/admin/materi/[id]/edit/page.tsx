import { neon } from "@neondatabase/serverless"
import MateriForm from "../../_components/MateriForm"

export default async function EditMateriPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const sql = neon(process.env.DATABASE_URL!)

  const [kelasList, materiResult] = await Promise.all([
    sql`SELECT * FROM "Kelas" ORDER BY "createdAt" ASC`,
    sql`SELECT * FROM "Materi" WHERE id = ${id}`
  ])

  const materi = materiResult && materiResult.length > 0 ? materiResult[0] : null;

  if (!materi) {
    return <div className="text-white">Materi tidak ditemukan</div>
  }

  return <MateriForm kelasList={kelasList as any} initialData={materi as any} />
}
