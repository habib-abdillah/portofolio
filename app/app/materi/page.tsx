import { getAllMateri } from "@/lib/content"
import MateriClient from "./MateriClient"

export const metadata = {
  title: "Kumpulan Materi & Silabus Belajar Terbuka",
  description:
    "Modul pembelajaran teknis mandiri seputar Laravel, Next.js, Docker, dan arsitektur web modern yang dapat diakses secara gratis.",
}

export default function MateriPage() {
  const materiList = getAllMateri()
  return <MateriClient initialMateri={materiList} />
}