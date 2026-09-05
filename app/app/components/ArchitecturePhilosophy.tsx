"use client"

import { motion } from "framer-motion"
import { Layers, ShieldCheck, Zap, Code, CheckCircle2 } from "lucide-react"

const principles = [
  {
    icon: Layers,
    title: "Modularitas Arsitektur",
    desc: "Membangun sistem dengan batasan modul yang jelas. Setiap fitur dirancang independen sehingga mudah dikembangkan, diuji, dan di-scale tanpa merusak dependensi modul lain.",
    tags: ["Domain-Driven", "Decoupled Services", "Clean Architecture"],
  },
  {
    icon: Zap,
    title: "Efisiensi & Performa Nyata",
    desc: "Mengoptimalkan performa dari tingkat query database hingga rendering browser. Seperti web portofolio ini yang 100% statis tanpa database sehingga response time instan.",
    tags: ["Static Generation (SSG)", "Query Indexing", "Zero Database Overhead"],
  },
  {
    icon: ShieldCheck,
    title: "Integritas & Keamanan Data",
    desc: "Menerapkan strict typing, validasi berlapis, transaksi database atomik (ACID), serta enkripsi data sensitif untuk melindungi sistem dari anomali data di level produksi.",
    tags: ["ACID Transactions", "Strict Types", "Audit Logging"],
  },
  {
    icon: Code,
    title: "Maintainability & DX Tim",
    desc: "Software yang baik adalah software yang bisa dibaca dan dilanjutkan oleh developer lain tanpa frustrasi. Standardisasi PSR-12, TypeScript types, dan dokumentasi yang jelas.",
    tags: ["Clean Code", "Docker Reproducibility", "Human-Readable Code"],
  },
]

export default function ArchitecturePhilosophy() {
  return (
    <section id="about" className="relative py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column with Scroll Animation */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Engineering Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
              Filosofi Pengembangan: <br />
              <span className="text-blue-500">Bukan Sekadar Berjalan,</span> tapi Andal & Scalable.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Saya percaya bahwa kualitas engineer tercermin dari bagaimana sistem mereka bertahan saat menghadapi lonjakan beban data, serta kemudahan tim lain dalam melakukan iterasi fitur.
            </p>

            <div className="p-5 rounded-2xl bg-[#11131a] border border-white/10 space-y-3">
              <p className="text-xs uppercase font-mono text-slate-400 font-semibold">
                Status Saat Ini
              </p>
              <p className="text-sm text-slate-200 leading-relaxed">
                Aktif merancang modul ekosistem sistem informasi terpadu (SDM, Keuangan, Akademik) dan terbuka untuk proyek freelance, kontrak sistem, atau posisi full-time.
              </p>
            </div>
          </motion.div>

          {/* Right Column: 4 Principles with Scroll Animation */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {principles.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="p-6 rounded-2xl bg-[#11131a] border border-white/10 hover:border-blue-500/30 transition-all flex flex-col justify-between shadow-lg shadow-black/30"
                >
                  <div>
                    <div className="p-2.5 w-fit rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-display font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161922] text-slate-300 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
