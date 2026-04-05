export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] font-body">

      {/* ───────────── NAVBAR ───────────── */}
      <nav className="
        sticky top-0 z-50
        flex justify-between items-center
        px-6 md:px-16 py-4
        border-b border-white/5
        backdrop-blur-md bg-[#0a0a0f]/80
      ">
        <span className="font-display font-extrabold text-lg tracking-tight text-white">
          dev<span className="text-[#7c6dfa]">.</span>porto
        </span>

        <ul className="hidden md:flex gap-8 list-none">
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="
                  text-sm text-[#888] tracking-widest uppercase
                  hover:text-white transition-colors duration-200
                "
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ───────────── HERO ───────────── */}
      <section className="max-w-4xl mx-auto px-6 md:px-0 pt-24 pb-20">

        {/* Badge */}
        <div className="
          inline-flex items-center gap-2
          bg-[#7c6dfa]/10 border border-[#7c6dfa]/30
          rounded-full px-4 py-1.5
          text-xs text-[#a99ff7] mb-8
        ">
          <span className="w-1.5 h-1.5 bg-[#7c6dfa] rounded-full animate-pulse" />
          Open to opportunities
        </div>

        {/* Judul */}
        <h1 className="
          font-display text-4xl md:text-6xl font-extrabold
          leading-tight tracking-tight text-white mb-5
        ">
          Halo, saya<br />
          <span className="text-[#7c6dfa]">Web Developer</span><br />
          berbasis Indonesia.
        </h1>

        {/* Subjudul */}
        <p className="text-lg text-[#888] font-light max-w-xl mb-10 leading-relaxed">
          Saya membangun antarmuka web yang cepat, bersih, dan bermakna —
          dari konsep hingga deployment.
        </p>

        {/* Tombol */}
        <div className="flex gap-3 flex-wrap">
          <a
            href="#projects"
            className="
              bg-[#7c6dfa] text-white px-6 py-3 rounded-lg
              text-sm font-medium hover:bg-[#6a5ce8] transition-colors
            "
          >
            Lihat Projects →
          </a>
          <a
            href="/cv.pdf"
            className="
              border border-white/15 text-[#ccc] px-6 py-3 rounded-lg
              text-sm font-medium hover:border-[#7c6dfa] hover:text-white transition-all
            "
          >
            Download CV
          </a>
        </div>
      </section>

      <hr className="border-white/5 max-w-4xl mx-auto" />

      {/* ───────────── ABOUT ───────────── */}
      <section id="about" className="max-w-4xl mx-auto px-6 md:px-0 py-20">
        <p className="text-xs tracking-[0.15em] uppercase text-[#7c6dfa] mb-2">
          01 — About
        </p>
        <h2 className="font-display text-3xl font-bold text-white tracking-tight mb-10">
          Sedikit tentang saya
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <p className="text-[#888] font-light leading-loose">
            Saya seorang{' '}
            <strong className="text-[#ddd] font-medium">web developer</strong> yang
            fokus pada pengalaman pengguna dan performa. Saya senang memecahkan masalah
            kompleks menjadi antarmuka yang intuitif.
            <br /><br />
            Di luar coding, saya juga{' '}
            <strong className="text-[#ddd] font-medium">berbagi ilmu</strong> — mengajar
            web development ke mahasiswa dan komunitas lokal.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { num: '3+', desc: 'Tahun pengalaman' },
              { num: '20+', desc: 'Project selesai' },
              { num: '40+', desc: 'Siswa diajar' },
              { num: '5★', desc: 'Rating klien' },
            ].map(({ num, desc }) => (
              <div
                key={desc}
                className="bg-[#111118] border border-white/7 rounded-xl p-5"
              >
                <div className="font-display text-3xl font-extrabold text-[#7c6dfa]">
                  {num}
                </div>
                <div className="text-xs text-[#555] mt-1">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-white/5 max-w-4xl mx-auto" />

      {/* ───────────── SKILLS ───────────── */}
      <section id="skills" className="max-w-4xl mx-auto px-6 md:px-0 py-20">
        <p className="text-xs tracking-[0.15em] uppercase text-[#7c6dfa] mb-2">02 — Skills</p>
        <h2 className="font-display text-3xl font-bold text-white tracking-tight mb-10">
          Tech stack saya
        </h2>

        <div className="space-y-8">
          {[
            { label: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'] },
            { label: 'Backend', items: ['Node.js', 'Prisma', 'PostgreSQL', 'REST API'] },
            { label: 'Tools', items: ['Git', 'Vercel', 'Figma', 'VS Code'] },
          ].map(({ label, items }) => (
            <div key={label}>
              <p className="text-xs text-[#444] uppercase tracking-widest mb-3">{label}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="
                      bg-[#111118] border border-white/8 rounded-lg
                      px-4 py-2 text-sm text-[#aaa] cursor-default
                      hover:border-[#7c6dfa]/60 hover:text-white transition-all
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-white/5 max-w-4xl mx-auto" />

      {/* ───────────── PROJECTS ───────────── */}
      <section id="projects" className="max-w-4xl mx-auto px-6 md:px-0 py-20">
        <p className="text-xs tracking-[0.15em] uppercase text-[#7c6dfa] mb-2">03 — Projects</p>
        <h2 className="font-display text-3xl font-bold text-white tracking-tight mb-10">
          Yang sudah saya bangun
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              tag: 'Next.js · Tailwind',
              title: 'Platform Materi Kelas',
              desc: 'Web untuk distribusi materi ke siswa. Static + ISR, deploy di Vercel.',
              live: '#',
              repo: '#',
            },
            {
              tag: 'React · Node.js',
              title: 'Dashboard Analytics',
              desc: 'Visualisasi data real-time untuk monitoring performa aplikasi klien.',
              live: '#',
              repo: '#',
            },
            {
              tag: 'TypeScript · Prisma',
              title: 'REST API Boilerplate',
              desc: 'Template API production-ready dengan auth, validasi, dan dokumentasi.',
              live: '#',
              repo: '#',
            },
          ].map(({ tag, title, desc, live, repo }) => (
            <div
              key={title}
              className="
                bg-[#111118] border border-white/7 rounded-2xl p-6
                hover:border-[#7c6dfa]/40 hover:-translate-y-1
                transition-all duration-300
              "
            >
              <span className="
                text-[10px] bg-[#7c6dfa]/15 text-[#a99ff7]
                px-3 py-1 rounded-full inline-block mb-4
              ">
                {tag}
              </span>
              <h3 className="font-display font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-[#555] leading-relaxed mb-4">{desc}</p>
              <div className="flex gap-4">
                <a href={live} className="text-xs text-[#7c6dfa] hover:underline">Live →</a>
                <a href={repo} className="text-xs text-[#7c6dfa] hover:underline">GitHub →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-white/5 max-w-4xl mx-auto" />

      {/* ───────────── CONTACT ───────────── */}
      <section id="contact" className="max-w-4xl mx-auto px-6 md:px-0 py-20">
        <p className="text-xs tracking-[0.15em] uppercase text-[#7c6dfa] mb-2">04 — Contact</p>
        <h2 className="font-display text-3xl font-bold text-white tracking-tight mb-10">
          Mari berkolaborasi
        </h2>

        <div className="
          bg-[#111118] border border-[#7c6dfa]/20
          rounded-2xl p-10 text-center
        ">
          <p className="text-[#666] mb-6">
            Punya project menarik atau ingin berdiskusi? Hubungi saya di:
          </p>
          <a
            href="mailto:kamu@email.com"
            className="
              font-display text-xl text-white
              border-b border-[#7c6dfa] pb-0.5
              hover:text-[#7c6dfa] transition-colors
            "
          >
            kamu@email.com
          </a>
          <div className="flex justify-center gap-3 mt-8 flex-wrap">
            {['GitHub', 'LinkedIn', 'Twitter/X'].map((s) => (
              <a
                key={s}
                href="#"
                className="
                  text-xs text-[#555] border border-white/8
                  px-4 py-2 rounded-lg
                  hover:text-white hover:border-[#7c6dfa]/50 transition-all
                "
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="
        text-center py-8 text-xs text-[#2a2a2a]
        border-t border-white/5
      ">
        Dibuat dengan Next.js &amp; Tailwind CSS · {new Date().getFullYear()}
      </footer>
    </main>
  )
}