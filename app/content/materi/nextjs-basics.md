---
title: "Dasar-dasar Next.js 16 (App Router)"
judul: "Dasar-dasar Next.js 16 (App Router)"
slug: "nextjs-basics"
kelas: "Next.js Dasar"
deskripsi: "Pahami fundamental Next.js App Router, Server Components, Streaming, dan optimasi static rendering tanpa database."
date: "2024-05-10"
isPublished: true
---

# Dasar-dasar Next.js 16 (App Router)

Next.js adalah React Framework untuk produksi yang mengombinasikan kecepatan Static Site Generation (SSG) dengan kapabilitas Server Components modern.

## 4 Pilar Utama Next.js App Router

### 1. React Server Components (RSC) Secara Default
Semua komponen di dalam direktori `app/` secara default dieksekusi di server. Manfaatnya:
- Ukuran bundle JavaScript di browser menjadi jauh lebih ringan (0-bundle size untuk dependencies server).
- Keamanan lebih terjamin karena credential dan API secret tidak pernah bocor ke client.

### 2. Client Components (`"use client"`)
Ketika komponen memerlukan interaktivitas, state (`useState`), effect (`useEffect`), atau event handler browser (`onClick`, `framer-motion`), cukup tambahkan direktif `"use client"` di baris paling atas file.

```tsx
"use client"

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked: {count}
    </button>
  )
}
```

### 3. File-System Based Routing
- `page.tsx`: File tampilan halaman publik.
- `layout.tsx`: Kerangka bersama (header, footer, nav) yang mempertahankan state antar navigasi.
- `loading.tsx`: UI fallback berbasis React Suspense otomatis.
- `error.tsx`: Error boundary untuk menangani crash pada segmen route.

### 4. Zero-Database Static Architecture
Anda bisa membangun website portofolio, blog, maupun dokumentasi super cepat hanya dengan file Markdown lokal via `fs` dan `gray-matter`. Tanpa database server, tanpa biaya bulanan, dan waktu load mendekati instan!