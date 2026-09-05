import HeroSection from "./components/HeroSection"
import StatsOverview from "./components/StatsOverview"
import ProjectsSection from "./components/ProjectsSection"
import SkillsBentoGrid from "./components/SkillsBentoGrid"
import ArchitecturePhilosophy from "./components/ArchitecturePhilosophy"
import InteractiveTerminal from "./components/InteractiveTerminal"
import NotesAndMateriSection from "./components/NotesAndMateriSection"
import ContactSection from "./components/ContactSection"
import { getAllProjects, getAllPosts, getAllMateri } from "@/lib/content"

export const metadata = {
  title: "Muhammad Habib Abdillah — Full-Stack Developer & Systems Architect",
  description:
    "Portfolio resmi Muhammad Habib Abdillah: Full-Stack Developer spesialis PHP/Laravel, Next.js, arsitektur modular, dan DevOps cloud container.",
}

export default function Home() {
  const projects = getAllProjects()
  const posts = getAllPosts()
  const materi = getAllMateri()

  return (
    <main className="relative min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Key Engineering Metrics */}
      <StatsOverview />

      {/* 3. Selected Projects */}
      <ProjectsSection projects={projects} />

      {/* 4. Technical Skills Bento Grid */}
      <SkillsBentoGrid />

      {/* 5. Engineering & Modular Philosophy */}
      <ArchitecturePhilosophy />

      {/* 6. Interactive Developer CLI Terminal */}
      <InteractiveTerminal />

      {/* 7. Engineering Notes & Free Materi */}
      <NotesAndMateriSection posts={posts} materi={materi} />

      {/* 8. Contact & Collaboration */}
      <ContactSection />
    </main>
  )
}