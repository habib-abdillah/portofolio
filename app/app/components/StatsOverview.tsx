"use client"

import { motion } from "framer-motion"
import { Clock, Activity, ShieldCheck, Layers } from "lucide-react"

const stats = [
  {
    icon: Clock,
    value: "3+ Tahun",
    label: "Pengalaman Kerja",
    desc: "Fokus backend PHP/Laravel, modular ERP, dan modern web apps",
    iconColor: "text-blue-400",
    badgeBg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Activity,
    value: "1,000+",
    label: "Transaksi Harian",
    desc: "Diproses di sistem inventory & SDM aktif tanpa hambatan",
    iconColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: ShieldCheck,
    value: "99.98%",
    label: "Target Reliabilitas",
    desc: "Orkestrasi Docker Swarm & rolling updates tanpa downtime",
    iconColor: "text-amber-400",
    badgeBg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Layers,
    value: "100%",
    label: "Desain Modular",
    desc: "Clean code, decoupled services, dan dokumentasi arsitektur",
    iconColor: "text-sky-400",
    badgeBg: "bg-sky-500/10 border-sky-500/20",
  },
]

export default function StatsOverview() {
  return (
    <section className="relative py-10 border-y border-white/10 bg-[#0c0d14]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative p-5 rounded-2xl bg-[#11131a] border border-white/10 hover:border-blue-500/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`p-2.5 rounded-xl border ${item.badgeBg}`}>
                    <Icon className={`w-5 h-5 ${item.iconColor}`} />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    METRIC #{idx + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">
                    {item.value}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
