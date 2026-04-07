import Link from "next/link"

const WORKER_URL = process.env.WORKER_URL

export default async function MateriPublikPage({
  searchParams,
}: {
  searchParams: Promise<{ kelas?: string }>
}) {
  const { kelas: selectedKelas } = await searchParams;

  const res = await fetch(`${WORKER_URL}/api/materi`, {
    next: { revalidate: 3600 },
  })
  const allMateri = await res.json()

  // Ambil daftar kelas unik dari materi yang ada
  const uniqueKelas = Array.from(new Set(allMateri.map((m: any) => m.kelas?.nama))).filter(Boolean)

  const displayedMateri = selectedKelas
    ? allMateri.filter((m: any) => m.kelas?.nama === selectedKelas)
    : allMateri

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 relative">
      {/* Visual Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-[#7c6dfa]/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <p className="text-xs tracking-[0.15em] uppercase text-[#7c6dfa] mb-2 font-medium">
        Kumpulan Materi
      </p>
      <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
        Materi Pembelajaran
      </h1>

      {/* Pilihan Kelas */}
      {uniqueKelas.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <Link
            href="/materi"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              !selectedKelas 
                ? "bg-[#7c6dfa]/15 text-[#a99ff7] border-[#7c6dfa]/30 shadow-[inset_0_0_20px_rgba(124,109,250,0.1)]" 
                : "bg-[#111118]/50 text-[#888] border-white/5 hover:bg-[#111118] hover:text-white"
            }`}
          >
            Semua Kelas
          </Link>
          {uniqueKelas.map((k: any) => (
            <Link
              key={k}
              href={`/materi?kelas=${encodeURIComponent(k)}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                selectedKelas === k
                  ? "bg-[#7c6dfa]/15 text-[#a99ff7] border-[#7c6dfa]/30 shadow-[inset_0_0_20px_rgba(124,109,250,0.1)]"
                  : "bg-[#111118]/50 text-[#888] border-white/5 hover:bg-[#111118] hover:text-white"
              }`}
            >
              {k}
            </Link>
          ))}
        </div>
      )}

      {/* Daftar Materi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedMateri.map((m: any) => (
          <Link
            key={m.id}
            href={`/materi/${m.slug}`}
            className="group block bg-[#111118]/80 backdrop-blur-sm border border-white/7 rounded-2xl p-6 hover:border-[#7c6dfa]/40 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-black/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] bg-[#7c6dfa]/15 text-[#a99ff7] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                {m.kelas?.nama}
              </span>
            </div>
            <h2 className="text-white text-lg font-bold group-hover:text-[#7c6dfa] transition-colors">{m.judul}</h2>
            {m.deskripsi && (
              <p className="text-[#888] text-sm mt-2 leading-relaxed line-clamp-2">{m.deskripsi}</p>
            )}
            
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#7c6dfa] group-hover:gap-3 transition-all">
              Mulai Belajar <span>→</span>
            </div>
          </Link>
        ))}
        {displayedMateri.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-2xl">
            <p className="text-[#888]">Materi tidak ditemukan.</p>
          </div>
        )}
      </div>
    </main>
  )
}
