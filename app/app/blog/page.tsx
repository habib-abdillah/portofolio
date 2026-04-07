const WORKER_URL = process.env.WORKER_URL

export default async function BlogPage() {
  const res = await fetch(`${WORKER_URL}/api/blog`, {
    next: { revalidate: 3600 },
  })
  const blogList = await res.json()

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <p className="text-xs tracking-[0.15em] uppercase text-[#7c6dfa] mb-2">
        Blog
      </p>
      <h1 className="font-display text-3xl font-bold text-white tracking-tight mb-10">
        Tulisan saya
      </h1>

      <div className="space-y-3">
        {blogList.map((b: any) => (
          <a
            key={b.id}
            href={`/blog/${b.slug}`}
            className="block bg-[#111118] border border-white/7 rounded-xl p-5 hover:border-[#7c6dfa]/40 transition-all"
          >
            <div className="flex gap-2 mb-2">
              {b.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[10px] bg-[#7c6dfa]/15 text-[#a99ff7] px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-white font-medium">{b.judul}</h2>
            {b.deskripsi && (
              <p className="text-[#555] text-sm mt-1">{b.deskripsi}</p>
            )}
          </a>
        ))}
      </div>
    </main>
  )
}
