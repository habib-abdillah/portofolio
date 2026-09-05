"use client"

import { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { ArrowRight, Copy, Check } from "lucide-react"

export default function HeroSection() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<"php" | "stack" | "cli">("php")

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("muhabibabd@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  }

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left Column: Bio & Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            {/* Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Open for Opportunities</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
                <span>📍 Indonesia (UTC+7)</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-xs uppercase font-mono tracking-widest text-blue-400 font-semibold">
                Muhammad Habib Abdillah
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.08]">
                Merancang Arsitektur{" "}
                <span className="text-blue-500">
                  Sistem Informasi Modular
                </span>{" "}
                & Web Modern.
              </h1>
            </motion.div>

            {/* Subtitle / Pitch */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal"
            >
              Full-Stack Developer & Systems Architect dengan 3+ tahun pengalaman mengimplementasikan
              ekosistem backend tangguh (Laravel, PHP, PostgreSQL), arsitektur modular, serta
              antarmuka responsif performan tinggi (Next.js, TypeScript).
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="pt-2 flex flex-wrap gap-3 items-center">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm shadow-sm transition-colors"
              >
                <span>Lihat Karya Terpilih</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* <a
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#131620] hover:bg-[#1a1e2b] border border-white/10 hover:border-blue-500/40 text-slate-200 hover:text-white font-medium text-sm transition-colors"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Download CV</span>
              </a> */}

              <button
                onClick={handleCopyEmail}
                className="relative inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-sm font-mono transition-colors cursor-pointer"
                title="Salin alamat email"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 text-xs">Email Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span className="text-xs">Salin Email</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Tech Badges List */}
            <motion.div variants={itemVariants} className="pt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-500 mr-2">Core Stacks:</span>
              {["Laravel", "Next.js 16", "PHP 8.3+", "PostgreSQL", "Docker Swarm", "TypeScript"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-[#131620] border border-white/10 text-[11px] font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Right Column: Interactive Code & Architecture Terminal */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#0f1118] border border-white/10 shadow-xl shadow-black/70 overflow-hidden group">
              {/* Mac Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0c0d14] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">habib-systems@core</span>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg text-[11px] font-mono">
                  <button
                    onClick={() => setActiveTab("php")}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      activeTab === "php" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Habib.php
                  </button>
                  <button
                    onClick={() => setActiveTab("stack")}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      activeTab === "stack" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Stack.json
                  </button>
                  <button
                    onClick={() => setActiveTab("cli")}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      activeTab === "cli" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Terminal
                  </button>
                </div>
              </div>

              {/* Window Body */}
              <div className="p-5 font-mono text-xs leading-relaxed min-h-[310px] overflow-x-auto selection:bg-blue-600/40">
                {activeTab === "php" && (
                  <div className="space-y-1 text-slate-300">
                    <p className="text-slate-500">{"// Architecture Definition"}</p>
                    <p>
                      <span className="text-blue-400">namespace</span> App\Core\Engine;
                    </p>
                    <p className="pt-2">
                      <span className="text-blue-400">class</span>{" "}
                      <span className="text-amber-300">SoftwareEngineer</span>{" "}
                      <span className="text-blue-400">implements</span>{" "}
                      <span className="text-sky-300">SolutionArchitect</span>
                    </p>
                    <p>{"{"}</p>
                    <div className="pl-4 space-y-1">
                      <p>
                        <span className="text-blue-400">public string</span>{" "}
                        <span className="text-slate-200">$name</span> ={" "}
                        <span className="text-emerald-300">&quot;Muhammad Habib Abdillah&quot;</span>;
                      </p>
                      <p>
                        <span className="text-blue-400">public int</span>{" "}
                        <span className="text-slate-200">$experience</span> ={" "}
                        <span className="text-amber-400">3</span>;{" "}
                        <span className="text-slate-500">{"// years+"}</span>
                      </p>
                      <p>
                        <span className="text-blue-400">public array</span>{" "}
                        <span className="text-slate-200">$focus</span> = [
                      </p>
                      <div className="pl-4 space-y-0.5 text-emerald-300">
                        <p>&quot;Modular ERP Systems&quot;,</p>
                        <p>&quot;High-Volume Queues & Redis&quot;,</p>
                        <p>&quot;Containerized Microservices&quot;,</p>
                      </div>
                      <p>];</p>
                      <p className="pt-1">
                        <span className="text-blue-400">public function</span>{" "}
                        <span className="text-sky-300">deployScalableSystem</span>():{" "}
                        <span className="text-amber-300">UptimeGuarantee</span>
                      </p>
                      <p className="pl-4">
                        <span className="text-blue-400">return new</span>{" "}
                        <span className="text-sky-300">UptimeGuarantee</span>(ratio:{" "}
                        <span className="text-amber-400">99.98</span>);
                      </p>
                    </div>
                    <p>{"}"}</p>
                  </div>
                )}

                {activeTab === "stack" && (
                  <div className="space-y-1 text-slate-300">
                    <p className="text-slate-500">{"// Engineering Stack Matrix"}</p>
                    <p className="text-slate-400">{"{"}</p>
                    <div className="pl-4 space-y-1">
                      <p>
                        <span className="text-sky-300">&quot;backend&quot;</span>: [
                        <span className="text-amber-300">&quot;PHP&quot;</span>,{" "}
                        <span className="text-amber-300">&quot;Laravel&quot;</span>,{" "}
                        <span className="text-amber-300">&quot;Node.js&quot;</span>],
                      </p>
                      <p>
                        <span className="text-sky-300">&quot;frontend&quot;</span>: [
                        <span className="text-blue-400">&quot;Next.js&quot;</span>,{" "}
                        <span className="text-blue-400">&quot;React&quot;</span>,{" "}
                        <span className="text-blue-400">&quot;TypeScript&quot;</span>],
                      </p>
                      <p>
                        <span className="text-sky-300">&quot;database&quot;</span>: [
                        <span className="text-emerald-300">&quot;PostgreSQL&quot;</span>,{" "}
                        <span className="text-emerald-300">&quot;MySQL&quot;</span>,{" "}
                        <span className="text-emerald-300">&quot;Redis&quot;</span>],
                      </p>
                      <p>
                        <span className="text-sky-300">&quot;devops&quot;</span>: [
                        <span className="text-sky-400">&quot;Docker Swarm&quot;</span>,{" "}
                        <span className="text-sky-400">&quot;Nginx Reverse Proxy&quot;</span>,{" "}
                        <span className="text-sky-400">&quot;Linux&quot;</span>],
                      </p>
                      <p>
                        <span className="text-sky-300">&quot;database_dependency&quot;</span>:{" "}
                        <span className="text-rose-400">false</span>,
                      </p>
                      <p>
                        <span className="text-sky-300">&quot;performance_score&quot;</span>:{" "}
                        <span className="text-emerald-400">100</span>
                      </p>
                    </div>
                    <p className="text-slate-400">{"}"}</p>
                  </div>
                )}

                {activeTab === "cli" && (
                  <div className="space-y-2 text-slate-300">
                    <p className="text-slate-500">{"$ habib-cli system-check --verbose"}</p>
                    <div className="space-y-1 text-slate-300 pl-2 border-l border-blue-500/40">
                      <p className="text-emerald-400">✓ Kernel: Linux x86_64 LTS</p>
                      <p className="text-emerald-400">✓ PHP runtime: 8.3.6 (OPcache JIT enabled)</p>
                      <p className="text-emerald-400">✓ Frontend: Next.js 16.2 (Turbopack SSG)</p>
                      <p className="text-emerald-400">✓ Cluster status: 4/4 nodes active</p>
                      <p className="text-blue-400">✓ Database status: Zero DB required (Static SSG)</p>
                    </div>
                    <div className="pt-2 text-slate-400 flex items-center gap-2">
                      <span className="text-emerald-400">guest@portfolio:~$</span>
                      <span className="animate-pulse w-2 h-4 bg-blue-500 inline-block" />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quick Status */}
              <div className="px-4 py-2 bg-[#0a0b10] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Cluster: Healthy
                </span>
                <span>SSG Mode: 0ms DB Query</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
