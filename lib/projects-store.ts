import { INITIAL_PROJECTS, ProjectData } from "./projects-data"

// Mode Démo / Sécurisé : Les projets officiels déployés sont en lecture seule
// Aucune écriture sur le disque (data/projects.json) pour préserver 100% des projets déployés
let sessionDemoProjects: ProjectData[] = [...INITIAL_PROJECTS]

export function getAllProjects(): ProjectData[] {
  return [...sessionDemoProjects]
}

export function resetDemoProjects(): ProjectData[] {
  sessionDemoProjects = [...INITIAL_PROJECTS]
  return sessionDemoProjects
}

export function addProject(project: Omit<ProjectData, "id" | "num">): ProjectData {
  const nextIndex = sessionDemoProjects.length + 1
  const newProject: ProjectData = {
    ...project,
    id: "proj-" + Date.now(),
    num: nextIndex < 10 ? `0${nextIndex}` : `${nextIndex}`,
    createdAt: new Date().toISOString(),
  }
  sessionDemoProjects = [newProject, ...sessionDemoProjects]
  return newProject
}

export function updateProject(id: string, updates: Partial<ProjectData>): ProjectData | null {
  const index = sessionDemoProjects.findIndex((p) => p.id === id)
  if (index === -1) return null

  const updatedProject = { ...sessionDemoProjects[index], ...updates }
  sessionDemoProjects[index] = updatedProject
  return updatedProject
}

export function deleteProject(id: string): boolean {
  const filtered = sessionDemoProjects.filter((p) => p.id !== id)
  if (filtered.length === sessionDemoProjects.length) return false

  sessionDemoProjects = filtered
  return true
}

