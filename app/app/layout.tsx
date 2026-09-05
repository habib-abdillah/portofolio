import type { Metadata, Viewport } from "next"
import { Syne, Outfit, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollProgressBar from "./components/ScrollProgressBar"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["500", "600", "700", "800"],
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: "#08090d",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "Muhammad Habib Abdillah — Full-Stack Developer & Systems Architect",
    template: "%s | Habib.dev",
  },
  description:
    "Portfolio resmi Muhammad Habib Abdillah — Full-Stack Developer & Systems Architect spesialis PHP, Laravel, Next.js, dan arsitektur sistem informasi modular yang scalable.",
  keywords: [
    "Muhammad Habib Abdillah",
    "Full-Stack Developer",
    "Laravel Developer Indonesia",
    "Next.js Developer",
    "Systems Architect",
    "Portfolio Web Developer",
  ],
  authors: [{ name: "Muhammad Habib Abdillah" }],
  creator: "Muhammad Habib Abdillah",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://habib.dev",
    title: "Muhammad Habib Abdillah — Full-Stack Developer",
    description:
      "Membangun sistem informasi modular, performan, dan berdaya tahan tinggi dengan Laravel, Next.js, dan Cloud DevOps.",
    siteName: "Habib Portfolio",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <body
        suppressHydrationWarning={true}
        className={`${syne.variable} ${outfit.variable} ${jetbrainsMono.variable} font-sans bg-[#090a0f] text-[#f8fafc] antialiased selection:bg-blue-600/30 selection:text-white relative min-h-screen flex flex-col`}
      >
        <ScrollProgressBar />

        {/* Global Subtle Grid */}
        <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}