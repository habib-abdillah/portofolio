import type { Metadata } from 'next'
import { Syne, Outfit } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

// Mengunduh font dari Google Fonts secara otomatis saat build
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',   // jadi CSS variable, bisa dipanggil di mana saja
  weight: ['400', '700', '800'],
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Habib — Web Developer',
  description: 'Portfolio web developer berbasis Indonesia',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-color-mode="dark">
      {/*
        className di <body>:
        ${syne.variable}   → daftarkan font Syne sebagai CSS variable
        ${outfit.variable} → daftarkan font Outfit sebagai CSS variable
        font-sans          → set font default ke system font (akan kita override di tailwind.config)
        bg-[#0a0a0f]       → warna background halaman, gelap hampir hitam
        text-[#e8e8f0]     → warna teks default, putih keabu-abuan
        antialiased        → rendering font lebih halus di layar
      */}
      <body className={`${syne.variable} ${outfit.variable} font-sans bg-[#0a0a0f] text-[#e8e8f0] antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}