import { getAllProjects } from "@/lib/content"
import ProjectsClient from "./ProjectsClient"

export const metadata = {
  title: "Proyek Terpilih & Studi Kasus Rekayasa",
  description:
    "Koleksi sistem informasi modular, aplikasi ERP, dan infrastruktur container yang dirancang oleh Muhammad Habib Abdillah.",
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return <ProjectsClient initialProjects={projects} />
}
