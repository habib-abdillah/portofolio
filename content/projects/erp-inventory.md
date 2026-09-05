---
title: "Enterprise ERP & Smart Inventory"
slug: "erp-inventory"
category: "Full-Stack"
featured: true
date: "2024"
role: "Full-Stack Engineer"
deskripsi: "Sistem Enterprise Resource Planning (ERP) terintegrasi untuk supply chain, manajemen pergudangan multi-cabang, barcode scanning, dan laporan keuangan real-time."
tags: ["Laravel 11", "PostgreSQL", "Next.js", "Redis", "Tailwind CSS"]
metrics:
  - label: "Daily Transactions"
    value: "15,000+"
  - label: "Query Speedup"
    value: "68%"
  - label: "Branches"
    value: "12 Hubs"
---

# Enterprise ERP & Smart Inventory

Sistem ERP berskala enterprise yang dirancang khusus untuk memodernisasi rantai pasok dan pergudangan ritel multi-cabang. Menggabungkan backend tangguh berbasis Laravel 11 dengan antarmuka front-end responsif dan performan.

### Latar Belakang & Masalah
Manajemen inventaris konvensional di 12 cabang retail mengalami desinkronisasi stok hingga 14%, menyebabkan keterlambatan restock dan kesulitan dalam kalkulasi HPP (Harga Pokok Penjualan) secara akurat.

### Solusi Arsitektur
1. **Event-Driven Stock Sync**: Menggunakan event & listener Laravel dipadukan dengan Redis Queue untuk sinkronisasi inventaris multi-cabang tanpa memblokir request pengguna.
2. **Database Sharding & Partitioning**: PostgreSQL dengan partisi tabel per kuartal fiskal untuk menjaga kecepatan agregasi laporan keuangan.
3. **PWA Mobile Barcode**: Antarmuka scanning cepat berbasis Next.js untuk operator gudang lapangan dengan dukungan offline cache.

### Dampak & Hasil
- Desinkronisasi data berkurang hingga 0.02%.
- Waktu pelaporan laba rugi bulanan berkurang dari 3 hari menjadi hitungan menit.
- Skalabilitas siap mendukung ekspansi hingga 50 cabang.
