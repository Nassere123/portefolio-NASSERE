import { NextResponse } from "next/server"
import { getAllProjects, addProject, updateProject, deleteProject } from "@/lib/projects-store"
import { isAuthenticated } from "@/lib/admin-auth"

export async function GET() {
  try {
    const projects = getAllProjects()
    return NextResponse.json({ success: true, projects })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur chargement projets" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const authed = await isAuthenticated()
    if (!authed) {
      return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
    }

    const data = await req.json()
    if (!data.title || !data.category) {
      return NextResponse.json({ success: false, error: "Titre et catégorie obligatoires" }, { status: 400 })
    }

    const newProject = addProject({
      category: data.category,
      filterKeys: data.filterKeys || [data.category.toLowerCase().includes("web") ? "web" : "mobile"],
      title: data.title,
      description: data.description || "",
      technologies: Array.isArray(data.technologies)
        ? data.technologies
        : (data.technologies || "").split(",").map((t: string) => t.trim()).filter(Boolean),
      learnings: data.learnings || "",
      gradient: data.gradient || "from-indigo-500 to-violet-600",
      image: data.image || null,
      iconName: data.iconName || "Laptop",
      link: data.link || "#",
      github: data.github || null,
      status: data.status || "En Développement",
      isProduction: Boolean(data.isProduction),
    })

    return NextResponse.json({ success: true, project: newProject }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur lors de l'ajout" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const authed = await isAuthenticated()
    if (!authed) {
      return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
    }

    const { id, ...updates } = await req.json()
    if (!id) {
      return NextResponse.json({ success: false, error: "ID manquant" }, { status: 400 })
    }

    if (updates.technologies && typeof updates.technologies === "string") {
      updates.technologies = updates.technologies.split(",").map((t: string) => t.trim()).filter(Boolean)
    }

    const updated = updateProject(id, updates)
    if (!updated) {
      return NextResponse.json({ success: false, error: "Projet introuvable" }, { status: 404 })
    }

    return NextResponse.json({ success: true, project: updated })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur lors de la modification" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const authed = await isAuthenticated()
    if (!authed) {
      return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ success: false, error: "ID manquant" }, { status: 400 })
    }

    const deleted = deleteProject(id)
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Projet introuvable" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Projet supprimé avec succès" })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur lors de la suppression" }, { status: 500 })
  }
}
