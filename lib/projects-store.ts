import fs from "fs"
import path from "path"
import { INITIAL_PROJECTS, ProjectData } from "./projects-data"

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "projects.json")

// Cache mémoire pour garantir la réactivité et la compatibilité serverless
let inMemoryProjects: ProjectData[] = [...INITIAL_PROJECTS]
let isInitialized = false

function loadProjectsFromFile(): ProjectData[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8")
      const parsed = JSON.parse(content)
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryProjects = parsed
        return inMemoryProjects
      }
    }
  } catch (error) {
    console.error("Erreur lecture data/projects.json :", error)
  }
  return inMemoryProjects
}

function saveProjectsToFile(projects: ProjectData[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), "utf-8")
  } catch (error) {
    console.warn("Écriture fichier impossible (environnement serverless/read-only) :", error)
  }
}

export function getAllProjects(): ProjectData[] {
  if (!isInitialized) {
    loadProjectsFromFile()
    isInitialized = true
  }
  return inMemoryProjects
}

export function addProject(project: Omit<ProjectData, "id" | "num">): ProjectData {
  const current = getAllProjects()
  const nextIndex = current.length + 1
  const newProject: ProjectData = {
    ...project,
    id: "proj-" + Date.now(),
    num: nextIndex < 10 ? `0${nextIndex}` : `${nextIndex}`,
    createdAt: new Date().toISOString(),
  }
  const updated = [newProject, ...current]
  inMemoryProjects = updated
  saveProjectsToFile(updated)
  return newProject
}

export function updateProject(id: string, updates: Partial<ProjectData>): ProjectData | null {
  const current = getAllProjects()
  const index = current.findIndex((p) => p.id === id)
  if (index === -1) return null

  const updatedProject = { ...current[index], ...updates }
  current[index] = updatedProject
  inMemoryProjects = [...current]
  saveProjectsToFile(inMemoryProjects)
  return updatedProject
}

export function deleteProject(id: string): boolean {
  const current = getAllProjects()
  const filtered = current.filter((p) => p.id !== id)
  if (filtered.length === current.length) return false

  inMemoryProjects = filtered
  saveProjectsToFile(inMemoryProjects)
  return true
}
