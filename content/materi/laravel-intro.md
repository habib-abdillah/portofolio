---
title: "Pengantar Framework Laravel"
judul: "Pengantar Framework Laravel"
slug: "laravel-intro"
kelas: "Laravel Dasar"
deskripsi: "Mengenal arsitektur framework PHP Laravel 11, routing, blade engine, dan Eloquent ORM untuk pemula hingga menengah."
date: "2024-06-15"
isPublished: true
---

# Pengantar Framework Laravel

Laravel adalah framework PHP modern yang paling populer di dunia karena sintaksnya yang ekspresif, elegan, dan ekosistemnya yang sangat matang untuk membangun aplikasi web berskala kecil hingga enterprise.

## Mengapa Memilih Laravel?

- **Sintaks yang Elegan & Readable**: Kode terasa intuitif dan mudah dipelajari oleh anggota tim baru.
- **Ekosistem Sangat Lengkap**: Dukungan resmi untuk queue worker (Horizon), admin panel (Filament), full-stack reactivity (Livewire), dan deployment tooling (Forge).
- **Database Migrations & Seeding**: Version control database yang aman, konsisten, dan mudah direplikasi antar developer.
- **Eloquent ORM**: Abstraksi database tingkat tinggi yang mempermudah relasi data yang kompleks (One to Many, Many to Many, Polymorphic).
- **Robust Queue System**: Pemrosesan background jobs seperti pengiriman email dan kalkulasi data berat di background worker.

## Langkah Instalasi Dasar

Pastikan Composer dan PHP 8.2+ sudah terpasang di sistem operasi Anda:

```bash
composer create-project laravel/laravel portofolio-app
cd portofolio-app
```

Jalankan local development server:

```bash
php artisan serve
```

## Konfigurasi Penting

1. Sesuaikan variabel database pada file `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=app_db
DB_USERNAME=root
DB_PASSWORD=
```
2. Generate Application Encryption Key:
```bash
php artisan key:generate
```
3. Eksekusi migrasi tabel:
```bash
php artisan migrate
```

Selamat belajar! Arsitektur Laravel siap mengawal project sistem informasi Anda menjadi scalable dan reliable.