import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Daftarkan font custom supaya bisa dipakai sebagai class Tailwind
        // font-display → pakai Syne (untuk heading besar)
        // font-body    → pakai Outfit (untuk teks biasa)
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-outfit)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config