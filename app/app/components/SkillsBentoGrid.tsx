"use client"

import { motion } from "framer-motion"
import { Server, Layout, Database, Terminal, Cpu } from "lucide-react"

const skillDomains = [
  {
    title: "Backend & Systems Architecture",
    tagline: "Core Engineering Specialization",
    icon: Server,
    iconColor: "text-blue-400",
    badgeBg: "bg-blue-500/10 border-blue-500/20",
    skills: [
      { name: "PHP 8.3+", desc: "OPcache, JIT, Strict Typing" },
      { name: "Laravel 11/12", desc: "Modular Architecture, Horizon, Livewire" },
      { name: "Node.js & Express", desc: "Microservices & Asynchronous IO" },
      { name: "RESTful & Webhooks", desc: "API Versioning & Rate Limiting" },
      { name: "Queue & Job Processing", desc: "Redis Queues & Background Workers" },
    ],
  },
  {
    title: "Modern Frontend & UI/UX",
    tagline: "High Performance Web Experiences",
    icon: Layout,
    iconColor: "text-sky-400",
    badgeBg: "bg-sky-500/10 border-sky-500/20",
    skills: [
      { name: "Next.js 16 (App Router)", desc: "RSC, Server Actions, SSG" },
      { name: "React 19", desc: "Hooks, Suspense, Concurrent Rendering" },
      { name: "TypeScript", desc: "Strict Type Safety & Interfaces" },
      { name: "Tailwind CSS v4", desc: "Design Tokens & Utility Layouts" },
      { name: "Framer Motion", desc: "Physics Springs & Layout Animations" },
    ],
  },
  {
    title: "Database & Storage Systems",
    tagline: "Reliable Persistence & Speed",
    icon: Database,
    iconColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20",
    skills: [
      { name: "PostgreSQL", desc: "JSONB, Partitioning, Indexing" },
      { name: "MySQL / MariaDB", desc: "Relational Models & Migrations" },
      { name: "Redis", desc: "Cache Layer, Pub/Sub & Session Store" },
      { name: "Static Markdown (SSG)", desc: "Zero-Database Content Driven" },
    ],
  },
  {
    title: "DevOps, Cloud & Infrastructure",
    tagline: "Continuous Delivery & Automation",
    icon: Terminal,
    iconColor: "text-amber-400",
    badgeBg: "bg-amber-500/10 border-amber-500/20",
    skills: [
      { name: "Docker & Compose", desc: "Containerized Microservices" },
      { name: "Docker Swarm", desc: "Multi-node Cluster Orchestration" },
      { name: "Nginx Reverse Proxy", desc: "SSL, Load Balancing & Upstreams" },
      { name: "Linux Server Automation", desc: "Debian/Ubuntu Bash Automation" },
      { name: "CI/CD & Git", desc: "GitHub Actions Automated Pipelines" },
    ],
  },
]

export default function SkillsBentoGrid() {
  return (
    <section id="skills" className="relative py-24 scroll-mt-16 bg-[#0c0d14]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Keahlian & Ekosistem Teknologi
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Kombinasi backend engineering yang kokoh, antarmuka modern yang interaktif, serta automasi cloud infrastructure tanpa kompromi.
          </p>
        </motion.div>

        {/* Bento Grid with Scroll Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillDomains.map((domain, idx) => {
            const Icon = domain.icon
            return (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative p-6 sm:p-8 rounded-2xl bg-[#11131a] border border-white/10 hover:border-blue-500/40 shadow-xl shadow-black/40 transition-all duration-300"
              >
                {/* Domain Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                      {domain.tagline}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white mt-1">
                      {domain.title}
                    </h3>
                  </div>
                  <div className={`p-3 rounded-xl border ${domain.badgeBg}`}>
                    <Icon className={`w-5 h-5 ${domain.iconColor}`} />
                  </div>
                </div>

                {/* Skills list */}
                <div className="space-y-2.5">
                  {domain.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#0e0f16] hover:bg-[#161822] border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <span className="text-sm font-semibold text-slate-200 font-mono">
                        {skill.name}
                      </span>
                      <span className="text-xs text-slate-400 text-right font-mono">
                        {skill.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
