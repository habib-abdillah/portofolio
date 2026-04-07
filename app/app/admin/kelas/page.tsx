import { neon } from "@neondatabase/serverless"
import { createKelas, deleteKelas } from "./actions"

export default async function KelasPage() {
  const sql = neon(process.env.DATABASE_URL!)
  const kelasList = await sql`SELECT * FROM "Kelas" ORDER BY "createdAt" ASC`

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-8">
        Kelola Kelas
      </h1>

      {/* Form tambah kelas */}
      <form
        action={async (formData: FormData) => {
          "use server"
          const nama = formData.get("nama") as string
          if (nama) await createKelas(nama)
        }}
        className="flex gap-3 mb-8"
      >
        <input
          name="nama"
          required
          placeholder="Nama kelas, misal: Kelas A"
          className="bg-[#111118] border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder:text-[#888] flex-1 outline-none focus:border-[#7c6dfa] focus:ring-1 focus:ring-[#7c6dfa]"
        />
        <button
          type="submit"
          className="bg-[#7c6dfa] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#6a5ce8] transition-colors"
        >
          Tambah
        </button>
      </form>

      {/* List kelas */}
      <div className="space-y-2">
        {kelasList.map((kelas: any) => (
          <div
            key={kelas.id}
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 flex justify-between items-center"
          >
            <span className="text-slate-200 font-medium text-sm">{kelas.nama}</span>
            <form
              action={async () => {
                "use server"
                await deleteKelas(kelas.id)
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
        ))}

        {kelasList.length === 0 && (
          <p className="text-[#444] text-sm">Belum ada kelas.</p>
        )}
      </div>
    </div>
  )
}
