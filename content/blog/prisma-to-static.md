---
title: "Dari Prisma ke Static Markdown"
slug: "prisma-to-static"
tags: ["Prisma", "Static", "Markdown", "Next.js"]
isPublished: true
---

# Dari Prisma ke Static Markdown

Proyek ini sebelumnya menggunakan Prisma ORM dengan database PostgreSQL. Namun, untuk menghindari batasan free tier dan kompleksitas konfigurasi, kita memindahkan konten ke file markdown statis.

## Alasan Perubahan

- **Biaya**: Menghilangkan dependensi database (Neon, PlanetScale)
- **Sederhana**: Konten disimpan sebagai file `.md` di folder saja
- **Performansi**: No database query, hanya file system read
- **Deploy**: Mudah deploy ke Cloudflare Workers tanpa database

## Cara Kerja

1. Tulis konten di file `.md` di folder `content/`
2. Gunakan `fs` di runtime Next.js untuk membaca file
3. Render markdown dengan `react-markdown` dan `rehype-highlight`
4. Generate static page pada build time atau render di runtime

## Manfaat

- Biaya hosting murah (atau gratis)
- Tidak perlu mengelola database schema
- Konten bisa di-version dengan Git
- Mudah migrasi antara platform

---

*Diposting pada tanggal 20 Juli 2024 · 4 menit baca*