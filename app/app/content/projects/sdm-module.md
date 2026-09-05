---
title: "Modul SDM & Payroll Otomatis"
slug: "sdm-module"
category: "Backend & ERP"
featured: true
date: "2024"
role: "Backend Architect"
deskripsi: "Sistem manajemen sumber daya manusia terintegrasi: data kepegawaian dinamis, kalkulasi potongan PPh 21 otomatis, cuti online, dan slip gaji terenkripsi."
tags: ["Laravel 11", "PostgreSQL", "Queue Worker", "REST API", "Docker"]
metrics:
  - label: "Karyawan Dikelola"
    value: "500+"
  - label: "Kalkulasi Payroll"
    value: "< 10 Detik"
  - label: "Tingkat Akurasi"
    value: "100%"
---

# Modul SDM & Payroll Otomatis

Modul manajemen sumber daya manusia (HRIS) terintegrasi yang dirancang sebagai micro-service modular untuk ekosistem ERP yang lebih luas.

### Fitur Kunci
- **Formula Payroll Dinamis**: Mengakomodasi tunjangan variabel, lembur, absensi berbasis geolocation & selfie, serta pemotongan pajak PPh 21 TER (Tarif Efektif Rata-Rata) terbaru.
- **Workflow Persetujuan Cuti Berjenjang**: Pengajuan cuti terhubung dengan notifikasi email/webhook ke supervisor dan update sisa cuti otomatis.
- **Security & Enkripsi Data Pribadi**: Enkripsi nomor rekening, data gaji pokok, dan generate slip PDF yang diproteksi password unik.