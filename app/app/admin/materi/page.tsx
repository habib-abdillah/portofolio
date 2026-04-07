import Link from "next/link"
import { neon } from "@neondatabase/serverless"
import { deleteMateri, togglePublish } from "./actions"

export default async function MateriAdminPage() {
  const sql = neon(process.env.DATABASE_URL!)
  const rawMateri = await sql`
    SELECT m.*, k.nama as kelas_nama 
    FROM "Materi" m 
    LEFT JOIN "Kelas" k ON m."kelasId" = k.id 
    ORDER BY m."createdAt" DESC
  `
  const materiList = rawMateri.map((m: any) => ({
    ...m,
    kelas: { nama: m.kelas_nama }
  }))

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-2xl font-bold text-white">
          Kelola Materi
        </h1>
        <Link
          href="/admin/materi/baru"
          className="bg-[#7c6dfa] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#6a5ce8] transition-colors"
        >
          + Tambah Materi
        </Link>
      </div>

      <div className="space-y-2">
        {materiList.map((materi: any) => (
          <div
            key={materi.id}
            className="bg-[#111118] border border-white/7 rounded-xl px-4 py-3 flex justify-between items-center"
          >
            <div>
              <p className="text-white text-sm font-medium">{materi.judul}</p>
              <p className="text-[#444] text-xs mt-0.5">
                {materi.kelas.nama} · {materi.slug}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Toggle publish */}
              <form
                action={async () => {
                  "use server"
                  await togglePublish(materi.id, materi.isPublished)
                }}
              >
                <button
                  type="submit"
                  className={`text-xs px-3 py-1 rounded-full transition-colors ${
                    materi.isPublished
                      ? "bg-green-500/15 text-green-400"
                      : "bg-white/5 text-[#555]"
                  }`}
                >
                  {materi.isPublished ? "Published" : "Draft"}
                </button>
              </form>

              <Link
                href={`/admin/materi/${materi.id}/edit`}
                className="text-xs text-[#7c6dfa] hover:underline"
              >
                Edit
              </Link>

              <form
                action={async () => {
                  "use server"
                  await deleteMateri(materi.id)
                }}
              >
                <button
                  type="submit"
                  className="text-xs text-red-500 hover:text-red-400 transition-colors"
                >
                  Hapus
                </button>
              </form>
            </div>
          </div>
        ))}

        {materiList.length === 0 && (
          <p className="text-[#444] text-sm">Belum ada materi.</p>
        )}
      </div>
    </div>
  )
}
