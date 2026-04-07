import { neon } from "@neondatabase/serverless"
import MateriForm from "../_components/MateriForm"

export default async function TambahMateriPage() {
  const sql = neon(process.env.DATABASE_URL!)
  const kelasList = await sql`SELECT * FROM "Kelas" ORDER BY "createdAt" ASC`
  return <MateriForm kelasList={kelasList as any} />
}
