import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full p-8 rounded-3xl bg-[#11131a] border border-white/10 shadow-2xl text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center font-mono font-black text-xl">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-display font-bold text-white">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono leading-relaxed">
            [ERR_ROUTE_NOT_FOUND]: Dokumen atau halaman yang Anda cari tidak tersedia dalam direktori statis portofolio ini.
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition-all shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
