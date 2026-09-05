"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Copy,
  Check,
  Send,
  MessageSquare,
  Sparkles,
  Clock,
} from "lucide-react"

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState("")
  const [contactInfo, setContactInfo] = useState("")
  const [subject, setSubject] = useState("Proyek Sistem Baru")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("muhabibabd@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const getMailtoUrl = () => {
    const bodyText = `Halo Habib,\n\nNama: ${name}\nKontak: ${contactInfo}\nKebutuhan: ${subject}\n\nPesan:\n${message}`
    return `mailto:muhabibabd@gmail.com?subject=${encodeURIComponent(
      `[Kolaborasi] ${subject} - ${name}`
    )}&body=${encodeURIComponent(bodyText)}`
  }

  const getWhatsAppUrl = () => {
    const text = `Halo Habib, saya ${name} (${contactInfo}). Ingin berdiskusi tentang: ${subject}. ${message}`
    return `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`
  }

  return (
    <section id="contact" className="relative py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="grid lg:grid-cols-12 gap-12"
        >
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let&apos;s Connect</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Punya Rencana Sistem atau Ingin Berkolaborasi?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Saya selalu terbuka mendiskusikan arsitektur sistem baru, optimasi aplikasi skala menengah/besar, maupun peluang peran rekayasa perangkat lunak.
            </p>

            {/* Direct Cards */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#11131a] border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-slate-400 uppercase">Email Utama</p>
                    <a
                      href="mailto:muhabibabd@gmail.com"
                      className="text-sm font-semibold text-white hover:text-blue-400 transition-colors"
                    >
                      muhabibabd@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
                  title="Salin Email"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#11131a] border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-slate-400 uppercase">WhatsApp Direct</p>
                    <p className="text-sm font-semibold text-white">Chat Langsung</p>
                  </div>
                </div>

                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-mono transition-colors"
                >
                  Buka WA →
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Waktu respon standar: Kurang dari 24 jam kerja</span>
            </div>
          </div>

          {/* Right Column: Interactive Quick Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#11131a] border border-white/10 shadow-2xl relative overflow-hidden">
              {!submitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-display font-bold text-white">
                      Kirim Pesan Cepat
                    </h3>
                    <p className="text-xs text-slate-400">
                      Isi formulir berikut untuk langsung menghubungi saya via Email atau WhatsApp.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Nama Anda *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Budi Santoso"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d14] border border-white/10 text-white text-xs font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Email / WhatsApp *</label>
                      <input
                        type="text"
                        required
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder="email@perusahaan.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d14] border border-white/10 text-white text-xs font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Kebutuhan / Topik</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d14] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="Pengembangan Sistem ERP & Modul">Pengembangan Sistem ERP & Modul</option>
                      <option value="Pembangunan Web App Full-Stack">Pembangunan Web App Full-Stack</option>
                      <option value="Konsultasi Arsitektur Backend & Database">Konsultasi Arsitektur Backend & Database</option>
                      <option value="Peluang Kerja / Kontrak Software Engineer">Peluang Kerja / Kontrak Software Engineer</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Pesan Singkat *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ceritakan gambaran singkat kebutuhan atau project Anda..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0d14] border border-white/10 text-white text-xs font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono uppercase tracking-wider font-bold shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Lanjutkan Kirim Pesan</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xl font-display font-bold text-white">
                      Pesan Anda Sudah Siap!
                    </h4>
                    <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                      Pilih kanal pengiriman favorit Anda di bawah untuk langsung meneruskan pesan ke saya:
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                    <a
                      href={getMailtoUrl()}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-colors shadow-sm"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Kirim via Email Client</span>
                    </a>

                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-semibold transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Kirim via WhatsApp</span>
                    </a>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono text-slate-400 hover:text-slate-200 underline cursor-pointer pt-2 block mx-auto"
                  >
                    ← Kembali edit pesan
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
