"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Terminal } from "lucide-react"

interface CommandHistory {
  cmd: string
  output: string | React.ReactNode
}

export default function InteractiveTerminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      cmd: "habib --version",
      output: "Habib Systems Engine v3.4.0 (Architecture: Modular Enterprise / Zero-DB SSG)",
    },
    {
      cmd: "help",
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-slate-400">Daftar perintah yang tersedia:</p>
          <p>
            <span className="text-blue-400 font-bold">whoami</span> — Informasi profil singkat
          </p>
          <p>
            <span className="text-sky-400 font-bold">skills</span> — Ringkasan spesialisasi teknologi
          </p>
          <p>
            <span className="text-emerald-400 font-bold">projects</span> — Daftar proyek yang telah selesai
          </p>
          <p>
            <span className="text-amber-400 font-bold">contact</span> — Informasi kontak & email
          </p>
          <p>
            <span className="text-slate-400 font-bold">clear</span> — Bersihkan layar terminal
          </p>
        </div>
      ),
    },
  ])

  const terminalScreenRef = useRef<HTMLDivElement>(null)
  const isMounted = useRef(false)

  useEffect(() => {
    // Abaikan scroll saat pertama kali web dibuka (initial mount)
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    // Scroll hanya di dalam kotak terminal, tidak menggeser halaman web
    if (terminalScreenRef.current) {
      terminalScreenRef.current.scrollTop = terminalScreenRef.current.scrollHeight
    }
  }, [history])

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase()
    if (!trimmed) return

    let output: string | React.ReactNode = ""

    switch (trimmed) {
      case "help":
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-slate-400">Daftar perintah yang tersedia:</p>
            <p>
              <span className="text-blue-400 font-bold">whoami</span> — Informasi profil singkat
            </p>
            <p>
              <span className="text-sky-400 font-bold">skills</span> — Ringkasan spesialisasi teknologi
            </p>
            <p>
              <span className="text-emerald-400 font-bold">projects</span> — Daftar proyek terpilih
            </p>
            <p>
              <span className="text-amber-400 font-bold">contact</span> — Informasi email & kontak
            </p>
            <p>
              <span className="text-slate-400 font-bold">clear</span> — Bersihkan tampilan terminal
            </p>
          </div>
        )
        break

      case "whoami":
        output = (
          <p className="text-slate-300">
            Muhammad Habib Abdillah — Full-Stack Developer & Systems Architect dengan 3+ tahun pengalaman di PHP, Laravel, Next.js, dan DevOps container.
          </p>
        )
        break

      case "skills":
        output = (
          <p className="text-emerald-300">
            [Backend]: PHP 8.3, Laravel 11, Node.js | [Frontend]: Next.js 16, React 19, TS, Tailwind | [DB]: PostgreSQL, MySQL, Redis | [DevOps]: Docker Swarm, Nginx, CI/CD
          </p>
        )
        break

      case "projects":
        output = (
          <div className="space-y-0.5 text-sky-300">
            <p>1. Enterprise ERP & Smart Inventory (Supply chain, Redis queue, Postgres)</p>
            <p>2. Cloud Infrastructure & Swarm Cluster (Docker Swarm, Zero-Downtime, Nginx)</p>
            <p>3. Sistem Informasi Pendidikan (Portal Siswa, E-Raport Kurikulum Merdeka)</p>
            <p>4. Modul SDM & Payroll Otomatis (HRIS, Pajak PPh 21, Slip Terenkripsi)</p>
          </div>
        )
        break

      case "contact":
      case "email":
        output = (
          <p className="text-blue-300">
            Email: muhabibabd@gmail.com | LinkedIn: linkedin.com/in/mhabibabdillah | GitHub: github.com/habib-abdillah
          </p>
        )
        break

      case "clear":
        setHistory([])
        setInput("")
        return

      default:
        output = (
          <span className="text-rose-400">
            Perintah tidak dikenali: &quot;{trimmed}&quot;. Ketik &quot;help&quot; untuk bantuan.
          </span>
        )
        break
    }

    setHistory((prev) => [...prev, { cmd: cmdText, output }])
    setInput("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeCommand(input)
  }

  return (
    <section className="relative py-20 bg-[#090a0f]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-2xl bg-[#0f1118] border border-white/10 shadow-xl shadow-black/80 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0c0d14] border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <div className="flex items-center gap-1.5 ml-3 text-xs font-mono text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>habib-interactive-cli --bash</span>
              </div>
            </div>

            {/* Quick Command Chips */}
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono">
              <span className="text-slate-500 mr-1">Coba:</span>
              {["whoami", "skills", "projects", "contact", "clear"].map((c) => (
                <button
                  key={c}
                  onClick={() => executeCommand(c)}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-blue-600/20 text-slate-300 hover:text-blue-300 border border-white/10 transition-colors cursor-pointer"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Screen */}
          <div
            ref={terminalScreenRef}
            className="p-5 font-mono text-xs max-h-[300px] overflow-y-auto space-y-3"
          >
            {history.map((h, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400">habib@workstation:~$</span>
                  <span className="text-white font-semibold">{h.cmd}</span>
                </div>
                <div className="pl-4 text-slate-300">{h.output}</div>
              </div>
            ))}
          </div>

          {/* Input Prompt */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3 bg-[#0c0d14] border-t border-white/10"
          >
            <span className="text-emerald-400 font-mono text-xs">habib@workstation:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik 'help', 'whoami', 'skills'..."
              className="flex-1 bg-transparent font-mono text-xs text-white placeholder-slate-600 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-medium transition-colors cursor-pointer shadow-sm"
            >
              Enter ↵
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
